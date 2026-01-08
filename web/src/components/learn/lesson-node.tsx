'use client';

import { Check, Star, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type LessonStatus = 'LOCKED' | 'ACTIVE' | 'COMPLETED';

interface LessonNodeProps {
	id: number;
	index: number;
	totalCount: number;
	status: LessonStatus;
	position?: 'left' | 'center' | 'right'; // Manual override if needed
}

export const LessonNode = ({
	id,
	index,
	totalCount,
	status,
}: LessonNodeProps) => {
	const cycleIndex = index % 8; // Cycle of 8 for the zig-zag pattern

	let indentation = '0';

	// Zig-zag pattern logic (0 to 8)
	// 0: center
	// 1: right-1
	// 2: right-2
	// 3: right-1
	// 4: center
	// 5: left-1
	// 6: left-2
	// 7: left-1

	if (cycleIndex <= 2) {
		indentation = `${cycleIndex * 40}px`; // Move Right
	} else if (cycleIndex <= 4) {
		indentation = `${(4 - cycleIndex) * 40}px`; // Move back to Center
	} else if (cycleIndex <= 6) {
		indentation = `${(4 - cycleIndex) * 40}px`; // Move Left (negative values handled by transform)
	} else {
		indentation = `${(cycleIndex - 8) * 40}px`; // Move back to Center
	}

	const rightPosition = cycleIndex <= 4 ? indentation : '0';
	const leftPosition = cycleIndex > 4 ? indentation.replace('-', '') : '0'; // Remove negative sign for left style

	return (
		<div
			id={`lesson-node-${id}`}
			className="relative flex justify-center"
			style={{
				// We use inline styles for dynamic positioning to keep Tailwind clean
				// In a real app we might use a more robust grid system, but this mimics the "path" look
				right: cycleIndex <= 4 ? `-${indentation}` : undefined,
				left: cycleIndex > 4 ? indentation.replace('-', '') : undefined,
				transform:
					cycleIndex > 4
						? `translateX(-${indentation.replace('-', '')})`
						: `translateX(${indentation})`,
			}}
		>
			<Link
				href={status === 'LOCKED' ? '#' : `/lesson/${id}`}
				className={cn(
					'relative flex h-20 w-20 items-center justify-center rounded-full border-b-4 transition-all hover:scale-105 active:scale-100 active:border-b-0',
					status === 'COMPLETED' && 'bg-green-500 border-green-600 text-white',
					status === 'ACTIVE' &&
						'bg-primary border-primary-foreground/50 text-primary-foreground shadow-[0_0_20px_rgba(59,130,246,0.5)]', // Glow effect for active
					status === 'LOCKED' &&
						'bg-muted border-muted-foreground/30 text-muted-foreground pointer-events-none'
				)}
				aria-disabled={status === 'LOCKED'}
			>
				<div className="absolute -top-3 left-1/2 -translate-x-1/2">
					{status === 'ACTIVE' && (
						<div className="animate-bounce bg-primary text-white text-xs px-2 py-1 rounded-full whitespace-nowrap border-2 border-white font-bold">
							Start
						</div>
					)}
				</div>

				{status === 'COMPLETED' && <Check className="h-10 w-10 stroke-[4]" />}
				{status === 'ACTIVE' && <Star className="h-10 w-10 fill-current" />}
				{status === 'LOCKED' && <Lock className="h-8 w-8" />}
			</Link>
		</div>
	);
};
