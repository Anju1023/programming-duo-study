import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';

export const getUserProgress = cache(async () => {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return null;
	}

	const { data: progress } = await supabase
		.from('user_progress')
		.select('*')
		.eq('user_id', user.id)
		.single();

	return progress;
});

export const getCourseData = cache(async () => {
	const supabase = await createClient();

	// For now, we fetch the first course (Python Basics)
	// In the future, this could be dynamic based on the user's active course
	const { data: course } = await supabase
		.from('courses')
		.select('*, units(*, lessons(*))')
		.eq('id', 1) // Python Basics
		.single();

	// Sort units and lessons by order
	if (course) {
		course.units.sort(
			(a: { order: number }, b: { order: number }) => a.order - b.order
		);
		course.units.forEach((unit: { lessons: { order: number }[] }) => {
			unit.lessons.sort(
				(a: { order: number }, b: { order: number }) => a.order - b.order
			);
		});
	}

	return course;
});

export const getLesson = cache(async (lessonId: number) => {
	const supabase = await createClient();
	const { data: lesson } = await supabase
		.from('lessons')
		.select('*')
		.eq('id', lessonId)
		.single();

	return lesson;
});
