'use client';

import { Button } from '@/components/ui/button';
import { CircleCheck, CircleX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface LessonFooterProps {
	status: 'idle' | 'correct' | 'incorrect';
	isValidating: boolean;
	onCheck: () => void;
	onContinue: () => void;
	onRetry: () => void;
}

export function LessonFooter({
	status,
	isValidating,
	onCheck,
	onContinue,
	onRetry,
}: LessonFooterProps) {
	return (
		<footer
			className={cn(
				'fixed bottom-0 w-full border-t p-4 transition-colors duration-300 lg:p-10',
				status === 'correct' && 'bg-green-100 border-green-200',
				status === 'incorrect' && 'bg-rose-100 border-rose-200',
				status === 'idle' && 'bg-background'
			)}
		>
			<div className="mx-auto flex max-w-5xl items-center justify-between h-14">
				{' '}
				{/* Fixed height to prevent layout shift */}
				<AnimatePresence mode="wait">
					{status === 'idle' && <div className="hidden lg:block lg:w-40" />}

					{status === 'correct' && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className="flex items-center gap-2 text-xl font-bold text-green-600"
						>
							<div className="bg-white rounded-full p-1">
								<CircleCheck className="h-8 w-8 fill-green-600 text-white" />
							</div>
							<span>正解！</span>
						</motion.div>
					)}

					{status === 'incorrect' && (
						<motion.div
							initial={{ opacity: 0, x: 20 }} // Shake-like entrance? Or just slide
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							className="flex items-center gap-2 text-xl font-bold text-rose-600"
						>
							<div className="bg-white rounded-full p-1">
								<CircleX className="h-8 w-8 fill-rose-600 text-white" />
							</div>
							<span>不正解...</span>
						</motion.div>
					)}
				</AnimatePresence>
				<div className="w-full lg:w-40 ml-4 lg:ml-0">
					{status === 'idle' && (
						<Button
							onClick={onCheck}
							disabled={isValidating}
							size="lg"
							className="w-full text-lg font-bold uppercase tracking-wide"
						>
							{isValidating ? '確認中...' : '確認する'}
						</Button>
					)}

					{status === 'correct' && (
						<Button
							onClick={onContinue}
							size="lg"
							className="w-full text-lg font-bold uppercase tracking-wide bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg transition-all"
						>
							続ける
						</Button>
					)}

					{status === 'incorrect' && (
						<Button
							onClick={onRetry}
							size="lg"
							variant="destructive"
							className="w-full text-lg font-bold uppercase tracking-wide"
						>
							やり直す
						</Button>
					)}
				</div>
			</div>
		</footer>
	);
}
