import { getCourseData, getUserProgress } from '@/db/queries';
import { UnitSection } from '@/components/learn/unit-section';
import { PythonPlayground } from '@/components/feature/playground';
import { FlaskConical } from 'lucide-react';
import { ScrollController } from '@/components/learn/scroll-controller';

export default async function LearnPage() {
	const courseData = await getCourseData();
	const userProgress = await getUserProgress();

	if (!courseData) {
		return <div>コースデータが見つかりません。</div>;
	}

	// Default to empty array if no progress yet
	const completedLessonIds = userProgress?.completed_lesson_ids || [];

	// Find the last completed lesson (in course order) to scroll to
	let scrollToLessonId: number | undefined = undefined;
	if (courseData) {
		const allLessons = courseData.units.flatMap((u: any) => u.lessons);
		// Find the last completed lesson by iterating in order and picking completed ones
		const completedInOrder = allLessons.filter((l: any) =>
			completedLessonIds.includes(l.id)
		);
		scrollToLessonId =
			completedInOrder.length > 0
				? completedInOrder[completedInOrder.length - 1]?.id
				: allLessons[0]?.id; // Default to first lesson if none completed
	}

	// For UnitSection, activeLessonId is the first uncompleted (for styling purposes)
	const allLessons = courseData.units.flatMap((u: any) => u.lessons);
	const activeLessonId = allLessons.find(
		(l: any) => !completedLessonIds.includes(l.id)
	)?.id;

	return (
		<div className="flex flex-col items-center gap-8 py-8 w-full px-4 md:px-8">
			<ScrollController activeLessonId={scrollToLessonId} />
			{/* Temporary Playground for Testing */}
			<div className="w-full max-w-2xl bg-muted/20 p-6 rounded-xl border border-dashed border-primary/50">
				<h2 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
					<FlaskConical className="h-6 w-6" />
					コード実験室
				</h2>
				<PythonPlayground />
			</div>
			<div className="w-full border-t my-4 opacity-20"></div>
			{courseData.units.map((unit: any) => (
				<UnitSection
					key={unit.id}
					unit={unit}
					activeLessonId={activeLessonId}
					completedLessonIds={completedLessonIds}
				/>
			))}
			<div className="h-20"></div> {/* Bottom Spacer */}
			{/* DEBUG: Temporary Progress Viewer */}
			<div className="fixed bottom-4 right-4 p-4 bg-black/80 text-white text-xs rounded-lg max-w-xs z-50 pointer-events-none">
				<h4 className="font-bold border-b mb-1">Debug Info</h4>
				<p>Completed: {JSON.stringify(completedLessonIds)}</p>
				<p>Active ID: {activeLessonId || 'None'}</p>
			</div>
		</div>
	);
}
