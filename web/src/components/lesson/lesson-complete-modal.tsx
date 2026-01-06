'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogDescription,
} from '@/components/ui/dialog';
import { CheckCircle, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface LessonCompleteModalProps {
	open: boolean;
	xpEarned: number;
	onContinue: () => void;
}

export function LessonCompleteModal({
	open,
	xpEarned,
	onContinue,
}: LessonCompleteModalProps) {
	useEffect(() => {
		if (open) {
			// Fire confetti!
			const duration = 3 * 1000;
			const animationEnd = Date.now() + duration;
			const defaults = {
				startVelocity: 30,
				spread: 360,
				ticks: 60,
				zIndex: 100,
			}; // Ensure zIndex > Dialog

			const randomInRange = (min: number, max: number) =>
				Math.random() * (max - min) + min;

			const interval: any = setInterval(function () {
				const timeLeft = animationEnd - Date.now();

				if (timeLeft <= 0) {
					return clearInterval(interval);
				}

				const particleCount = 50 * (timeLeft / duration);
				confetti({
					...defaults,
					particleCount,
					origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
				});
				confetti({
					...defaults,
					particleCount,
					origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
				});
			}, 250);

			return () => clearInterval(interval);
		}
	}, [open]);

	return (
		<Dialog
			open={open}
			onOpenChange={() => {
				/* Prevent closing by clicking outside for now */
			}}
		>
			<DialogContent className="sm:max-w-md text-center border-2 border-slate-800 bg-slate-950 text-slate-50">
				<DialogHeader>
					<div className="flex justify-center mb-4">
						<CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
					</div>
					<DialogTitle className="text-2xl font-bold text-center text-green-400">
						Lesson Complete!
					</DialogTitle>
					<DialogDescription className="text-center text-slate-400">
						Great job! You&apos;ve mastered this lesson.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col items-center justify-center gap-4 py-6">
					<div className="flex items-center gap-2 text-3xl font-bold text-yellow-400">
						<Star className="w-8 h-8 fill-current" />
						<span>+{xpEarned} XP</span>
					</div>
					<p className="text-sm text-slate-500">Keep up the streak!</p>
				</div>

				<DialogFooter className="sm:justify-center">
					<Button
						onClick={onContinue}
						className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold px-8"
					>
						Continue Journey
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
