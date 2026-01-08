'use client';

import { LessonNode } from './lesson-node';
import { Unit, Lesson } from '@/types/course';

interface UnitSectionProps {
	unit: Unit;
	activeLessonId?: number;
	completedLessonIds: number[];
}

export const UnitSection = ({
	unit,
	activeLessonId,
	completedLessonIds,
}: UnitSectionProps) => {
	return (
		<div className="mb-10 w-full max-w-[400px] mx-auto">
			{/* Unit Header */}
			<div className="mb-8 rounded-xl bg-primary/90 p-5 text-primary-foreground shadow-lg flex justify-between items-center">
				<div>
					<h2 className="text-xl font-bold">{unit.title}</h2>
					<p className="text-sm opacity-90">{unit.description}</p>
				</div>
			</div>

			{/* Lesson Path */}
			<div className="flex flex-col gap-8 relative items-center">
				{unit.lessons.map((lesson: Lesson, index: number) => {
					const isCompleted = completedLessonIds.includes(lesson.id);
					// If no specific active ID is tracked yet, the first incomplete lesson is active
					// For now, let's assume the passed activeLessonId dictates strictly,
					// OR if it's undefined, we find the first one not in completed.

					let status: 'LOCKED' | 'ACTIVE' | 'COMPLETED' = 'LOCKED';

					if (isCompleted) {
						status = 'COMPLETED';
					} else if (
						lesson.id === activeLessonId ||
						(!activeLessonId && index === 0 && completedLessonIds.length === 0)
					) {
						status = 'ACTIVE';
					} else {
						// If previous lesson is completed or this is the first one (and not completed), it might be active
						// Simpler logic for now: depend on parent to pass correct state or derive here
						// For MVP:
						// If it's the first incomplete lesson, it's ACTIVE.
						// If previous one is COMPLETED, this one is ACTIVE (if not completed).

						const prevLesson = unit.lessons[index - 1];
						const prevCompleted = prevLesson
							? completedLessonIds.includes(prevLesson.id)
							: true; // First lesson has no prev, so "true"

						if (prevCompleted && !isCompleted) {
							status = 'ACTIVE';
						}
					}

					return (
						<LessonNode
							key={lesson.id}
							id={lesson.id}
							index={index}
							totalCount={unit.lessons.length}
							status={status}
						/>
					);
				})}
			</div>
		</div>
	);
};
