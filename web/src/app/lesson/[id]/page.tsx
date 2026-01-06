'use client';

import { useEffect, useState, use } from 'react';
import { LessonHeader } from '@/components/lesson/header';
import { LessonFooter } from '@/components/lesson/footer';
import { ChallengeRenderer } from '@/components/lesson/challenge-renderer';
import { getLesson } from '@/db/queries';
import { useRouter } from 'next/navigation';
import { usePython } from '@/hooks/use-python';
import { createClient } from '@/lib/supabase/client';

// Since this is a client component for state, we fetch data slightly differently or assume passed data
// For simplicity in this iteration, I'll fetch data inside useEffect or wrap in a server component.
// To keep it simple and clean: Let's make this page a Client Component that uses a wrapper to fetch data?
// No, let's keep it simple: Client Component that fetches via database action (which we need to expose as Server Action) OR
// we just fetch purely client side via Supabase Client for now for speed.
// Better: Server Component wrapper (page.tsx) -> Client Component (LessonContainer).

// Wait, I can't put `getLesson` (Server Action / DB Query) directly in Client Component conveniently without making it a Server Action.
// Let's refactor: page.tsx (Server) -> LessonClient.

// MOCK DATA for now fallback if DB fails, but we should try to use real DB data.

export default function LessonPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	// Next.js 16 params is a Promise
	const [id, setId] = useState<string | null>(null);
	const [lesson, setLesson] = useState<any>(null);

	const [hearts, setInitialHearts] = useState<number>(5);

	useEffect(() => {
		params.then((p) => setId(p.id));
	}, [params]);

	useEffect(() => {
		if (!id) return;

		const fetchData = async () => {
			const supabase = createClient();
			// Fetch Lesson
			const { data: lessonData } = await supabase
				.from('lessons')
				.select('*')
				.eq('id', id)
				.single();
			if (lessonData) setLesson(lessonData);

			// Fetch User Hearts
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				const { data: profile } = await supabase
					.from('profiles')
					.select('hearts')
					.eq('id', user.id)
					.single();
				if (profile) setInitialHearts(profile.hearts);
			}
		};
		fetchData();
	}, [id]);

	if (!lesson)
		return (
			<div className="flex h-screen items-center justify-center">
				Loading...
			</div>
		);

	return <LessonContainer lesson={lesson} initialHearts={hearts} />;
}

import { deductHeart, completeLesson } from '@/actions/user-progress';

function LessonContainer({
	lesson,
	initialHearts,
}: {
	lesson: any;
	initialHearts: number;
}) {
	const router = useRouter();
	console.log('Rendering LessonContainer. InitialHearts:', initialHearts);
	const { runPython, stdout, clearOutput } = usePython(); // Destructure clearOutput

	const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
	const [hearts, setHearts] = useState(initialHearts);
	const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>(
		'idle'
	);
	const [isValidating, setIsValidating] = useState(false);

	// Clear output on mount
	useEffect(() => {
		clearOutput();
	}, []);

	// User Inputs
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [code, setCode] = useState('');

	const challenges = lesson.challenges || [];
	const currentChallenge = challenges[currentChallengeIndex];
	const progressPercentage =
		((currentChallengeIndex + 1) / challenges.length) * 100;

	const handleCheck = async () => {
		if (!currentChallenge) return;

		setIsValidating(true);
		let isCorrect = false;

		if (currentChallenge.type === 'SELECT') {
			isCorrect = selectedOption === currentChallenge.correctOption;
		} else if (currentChallenge.type === 'CODE') {
			// Run code first
			try {
				await runPython(code);

				// Validation:
				// 1. Must not error (runPython throws if error)
				// 2. Must contain specific keyword if defined in DB (stored in correctOption for now)

				const requiredKeyword = currentChallenge.correctOption;

				// If the code ran successfully (no error caught) AND contains the required keyword
				if (code.includes(requiredKeyword)) {
					isCorrect = true;
				}
			} catch (e) {
				console.error('Validation Error (Execution Failed):', e);
				isCorrect = false;
			}
		}

		setIsValidating(false);

		if (isCorrect) {
			setStatus('correct');
			// Play Sound?
		} else {
			setStatus('incorrect');
			setHearts((prev) => Math.max(0, prev - 1));

			// Server Action: Deduct Heart
			// We don't await this to keep UI responsive
			deductHeart().catch((err) =>
				console.error('Failed to deduct heart', err)
			);

			// Play Sound?
		}
	};

	const handleContinue = async () => {
		if (currentChallengeIndex < challenges.length - 1) {
			setCurrentChallengeIndex((prev) => prev + 1);
			setStatus('idle');
			setSelectedOption(null);
			setCode('');
			clearOutput(); // Clear output for next challenge
		} else {
			// Lesson Completed!
			await completeLesson(lesson.id);
			router.push('/learn');
		}
	};

	const handleRetry = () => {
		setStatus('idle');
	};

	return (
		<div className="flex min-h-screen flex-col bg-background">
			<LessonHeader hearts={hearts} percentage={progressPercentage} />

			<main className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 pt-24 pb-32">
				<ChallengeRenderer
					challenge={currentChallenge}
					sessionState={{ selectedOption, code }}
					onSelectOption={setSelectedOption}
					onCodeChange={setCode}
					status={status}
				/>
			</main>

			<LessonFooter
				status={status}
				isValidating={isValidating}
				onCheck={handleCheck}
				onContinue={handleContinue}
				onRetry={handleRetry}
			/>
		</div>
	);
}
