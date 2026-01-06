import { createClient } from '@/lib/supabase/server';
import { LessonContainer } from '@/components/lesson/lesson-container';
import { redirect } from 'next/navigation';

export default async function LessonPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const supabase = await createClient();

	// Fetch Lesson
	const { data: lesson } = await supabase
		.from('lessons')
		.select('*')
		.eq('id', id)
		.single();

	if (!lesson) {
		return (
			<div className="flex h-screen items-center justify-center">
				Loading...
			</div>
		);
	}

	// Fetch User Hearts
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect('/login');
	}

	let initialHearts = 5;
	const { data: profile } = await supabase
		.from('profiles')
		.select('hearts')
		.eq('id', user.id)
		.single();

	if (profile) {
		initialHearts = profile.hearts;
	}

	return <LessonContainer lesson={lesson} initialHearts={initialHearts} />;
}
