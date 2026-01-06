'use client';

import { useEffect, useState } from 'react';
import { LessonHeader } from '@/components/lesson/header';
import { LessonFooter } from '@/components/lesson/footer';
import { ChallengeRenderer } from '@/components/lesson/challenge-renderer';
import { LessonCompleteModal } from '@/components/lesson/lesson-complete-modal';
import { useRouter } from 'next/navigation';
import { usePython } from '@/hooks/use-python';
import { deductHeart, completeLesson } from '@/actions/user-progress';

export function LessonContainer({
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

	const [showCompleteModal, setShowCompleteModal] = useState(false);
	const [isCompleting, setIsCompleting] = useState(false);

	// Sync hearts when initialHearts loads from DB (fixes "Always starts at 5" bug)
	// Even with Server Component, this is good to keep if props update, though strictly not needed if checking pure mount.
	useEffect(() => {
		setHearts(initialHearts);
	}, [initialHearts]);

	const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>(
		'idle'
	);
	const [isValidating, setIsValidating] = useState(false);

	// Clear output on mount and unmount
	useEffect(() => {
		clearOutput();
		return () => clearOutput();
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
			// Lesson Completed! Show modal
			setShowCompleteModal(true);
		}
	};

	const handleModalContinue = async () => {
		setIsCompleting(true);
		try {
			// Ensure ID is number and handle strictly
			await completeLesson(Number(lesson.id));
			router.push('/learn');
		} catch (e) {
			console.error('Failed to complete lesson', e);
			alert('エラーが発生しました。もう一度お試しください。');
			setIsCompleting(false);
		}
	};

	const handleRetry = () => {
		setStatus('idle');
	};

	return (
		<>
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
					isValidating={isValidating || isCompleting}
					onCheck={handleCheck}
					onContinue={handleContinue}
					onRetry={handleRetry}
				/>
			</div>
			<LessonCompleteModal
				open={showCompleteModal}
				xpEarned={10}
				isLoading={isCompleting}
				onContinue={handleModalContinue}
			/>
		</>
	);
}
