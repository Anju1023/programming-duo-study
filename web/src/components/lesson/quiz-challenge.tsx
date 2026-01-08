'use client';

import { cn } from '@/lib/utils';
import { MarkdownView } from '@/components/ui/markdown-view';
import { useState } from 'react';

interface QuizChallengeProps {
	question: string;
	options: string[];
	selectedOption: string | null;
	onSelect: (option: string) => void;
	status: 'idle' | 'correct' | 'incorrect';
}

export function QuizChallenge({
	question,
	options,
	selectedOption,
	onSelect,
	status,
}: QuizChallengeProps) {
	return (
		<div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
			<MarkdownView
				content={question}
				className="text-2xl font-bold text-center leading-relaxed"
			/>

			<div className="grid grid-cols-1 gap-4">
				{options.map((option, i) => (
					<div
						key={option}
						onClick={() => status === 'idle' && onSelect(option)}
						className={cn(
							'cursor-pointer rounded-xl border-2 p-4 text-lg font-medium transition-all hover:bg-muted/50 active:scale-[0.98]',
							selectedOption === option &&
								'border-blue-400 bg-blue-50 text-blue-500',
							status === 'correct' &&
								selectedOption === option &&
								'border-green-500 bg-green-100 text-green-700',
							status === 'incorrect' &&
								selectedOption === option &&
								'border-rose-500 bg-rose-100 text-rose-700',
							// Disabled state look
							status !== 'idle' &&
								selectedOption !== option &&
								'opacity-50 cursor-not-allowed'
						)}
					>
						<div className="flex items-center gap-4">
							<div
								className={cn(
									'flex h-8 w-8 items-center justify-center rounded-lg border text-sm font-bold opacity-70',
									selectedOption === option && 'border-blue-400 text-blue-500'
								)}
							>
								{i + 1}
							</div>
							{option}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
