'use client';

import { useEffect, useState, useCallback } from 'react';
import { LessonHeader } from '@/components/lesson/header';
import { LessonFooter } from '@/components/lesson/footer';
import { ChallengeRenderer } from '@/components/lesson/challenge-renderer';
import { LessonCompleteModal } from '@/components/lesson/lesson-complete-modal';
import { useRouter } from 'next/navigation';
import { usePython } from '@/hooks/use-python';
import { deductHeart, completeLesson } from '@/actions/user-progress';
import { useSoundEffects } from '@/hooks/use-sound';

export function LessonContainer({
	lesson,
	initialHearts,
}: {
	lesson: any;
	initialHearts: number;
}) {
	const router = useRouter();
	console.log('Rendering LessonContainer. InitialHearts:', initialHearts);
	const { runPython, stdout, clearOutput } = usePython();
	const { playSuccess, playError, playComplete } = useSoundEffects();

	const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
	const [hearts, setHearts] = useState(initialHearts);

	const [showCompleteModal, setShowCompleteModal] = useState(false);
	const [isCompleting, setIsCompleting] = useState(false);

	// 間違えた問題を追跡（Duolingo風の再出題機能）
	const [wrongChallengeIndices, setWrongChallengeIndices] = useState<number[]>(
		[]
	);
	const [isRetryPhase, setIsRetryPhase] = useState(false);
	const [retryIndex, setRetryIndex] = useState(0);

	// Sync hearts when initialHearts loads from DB
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
	const currentChallenge = isRetryPhase
		? challenges[wrongChallengeIndices[retryIndex]]
		: challenges[currentChallengeIndex];

	// プログレス計算（再出題フェーズも考慮）
	const totalSteps = challenges.length + wrongChallengeIndices.length;
	const currentStep = isRetryPhase
		? challenges.length + retryIndex + 1
		: currentChallengeIndex + 1;
	const progressPercentage =
		(currentStep / Math.max(totalSteps, challenges.length)) * 100;

	const handleCheck = async () => {
		if (!currentChallengeIndex && currentChallengeIndex !== 0) return;
		if (!currentChallenge) return;

		setIsValidating(true);
		let isCorrect = false;

		if (currentChallenge.type === 'SELECT') {
			isCorrect = selectedOption === currentChallenge.correctOption;
		} else if (currentChallenge.type === 'CODE') {
			try {
				await runPython(code);
				const requiredKeyword = currentChallenge.correctOption;
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
			playSuccess();
		} else {
			setStatus('incorrect');
			playError();
			setHearts((prev) => Math.max(0, prev - 1));

			// 間違えた問題を記録（再出題フェーズでなければ）
			if (!isRetryPhase) {
				setWrongChallengeIndices((prev) => {
					// 重複を避ける
					if (!prev.includes(currentChallengeIndex)) {
						return [...prev, currentChallengeIndex];
					}
					return prev;
				});
			}

			// Server Action: Deduct Heart
			deductHeart().catch((err) =>
				console.error('Failed to deduct heart', err)
			);
		}
	};

	const handleContinue = async () => {
		// 再出題フェーズの場合
		if (isRetryPhase) {
			if (retryIndex < wrongChallengeIndices.length - 1) {
				// 次の再出題問題へ
				setRetryIndex((prev) => prev + 1);
				setStatus('idle');
				setSelectedOption(null);
				setCode('');
				clearOutput();
			} else {
				// 全ての再出題が完了
				playComplete();
				setShowCompleteModal(true);
			}
			return;
		}

		// 通常フェーズ
		if (currentChallengeIndex < challenges.length - 1) {
			setCurrentChallengeIndex((prev) => prev + 1);
			setStatus('idle');
			setSelectedOption(null);
			setCode('');
			clearOutput();
		} else {
			// 全問終了
			if (wrongChallengeIndices.length > 0) {
				// 間違えた問題がある場合は再出題フェーズへ
				setIsRetryPhase(true);
				setRetryIndex(0);
				setStatus('idle');
				setSelectedOption(null);
				setCode('');
				clearOutput();
			} else {
				// 間違えた問題がない場合は完了
				playComplete();
				setShowCompleteModal(true);
			}
		}
	};

	const handleModalContinue = async () => {
		setIsCompleting(true);
		try {
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
					{/* 再出題フェーズの場合はメッセージを表示 */}
					{isRetryPhase && (
						<div className="mb-4 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg text-sm font-medium">
							間違えた問題をもう一度！ ({retryIndex + 1}/
							{wrongChallengeIndices.length})
						</div>
					)}
					<ChallengeRenderer
						challenge={currentChallenge}
						sessionState={{ selectedOption, code }}
						onSelectOption={setSelectedOption}
						onCodeChange={setCode}
						onLearnComplete={handleContinue}
						onCodeHotkey={handleCheck}
						status={status}
					/>
				</main>

				{/* Hide footer for LEARN type as it has its own button */}
				{currentChallenge?.type !== 'LEARN' && (
					<LessonFooter
						status={status}
						isValidating={isValidating || isCompleting}
						onCheck={handleCheck}
						onContinue={handleContinue}
						onRetry={handleRetry}
					/>
				)}
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
