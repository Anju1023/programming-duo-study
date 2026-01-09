import { getCourseData, getUserProgress } from '@/db/queries';
import { UnitSection } from '@/components/learn/unit-section';
import { ScrollController } from '@/components/learn/scroll-controller';
import { Mascot } from '@/components/ui/mascot';
import { BookOpen, Heart, Sparkles } from 'lucide-react';
import { Unit, Lesson } from '@/types/course';

export default async function LearnPage() {
	const courseData = await getCourseData();
	const userProgress = await getUserProgress();

	if (!courseData) {
		return <div>コースデータが見つかりません。</div>;
	}

	// Default to empty array if no progress yet
	const completedLessonIds = userProgress?.completed_lesson_ids || [];

	// Find the last completed lesson (order logic maintained)
	let scrollToLessonId: number | undefined = undefined;
	if (courseData) {
		const allLessons = courseData.units.flatMap((u: Unit) => u.lessons);
		const completedInOrder = allLessons.filter((l: Lesson) =>
			completedLessonIds.includes(l.id)
		);
		scrollToLessonId =
			completedInOrder.length > 0
				? completedInOrder[completedInOrder.length - 1]?.id
				: allLessons[0]?.id;
	}

	const allLessons = courseData.units.flatMap((u: Unit) => u.lessons);
	const activeLessonId = allLessons.find(
		(l: Lesson) => !completedLessonIds.includes(l.id)
	)?.id;

	return (
		<div className="flex flex-col items-center gap-8 py-8 w-full px-4 md:px-8 max-w-4xl mx-auto">
			<ScrollController activeLessonId={scrollToLessonId} />

			{/* Dashboard Header */}
			<div className="w-full flex items-center justify-between bg-card/50 backdrop-blur-sm p-6 rounded-[2rem] border border-border/50 mb-4 shadow-sm">
				<div>
					<h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-2">
						おかえりなさい <Sparkles className="w-5 h-5 text-accent" />
					</h2>
					<p className="text-muted-foreground text-sm">
						今日は「Pythonの基礎」を少しだけ。
						<br />
						無理せず、あなたのペースで進めましょう。
					</p>
				</div>
				<div className="hidden sm:block">
					<Mascot emotion="neutral" size="sm" />
				</div>
			</div>

			{/* Daily Quote (Mock) */}
			<div className="w-full bg-white dark:bg-card p-5 rounded-[2rem] shadow-sm border border-border/50 flex items-center gap-4 relative overflow-hidden">
				<div className="text-secondary shrink-0">
					<Heart size={24} className="fill-current" />
				</div>
				<p className="text-sm text-foreground/80 italic font-medium leading-relaxed">
					「千里の道も一歩から。今日の1行が、未来のアプリを作ります。」
				</p>
			</div>

			<div className="w-full border-t border-border/40 my-2"></div>

			{courseData.units.map((unit: Unit) => (
				<UnitSection
					key={unit.id}
					unit={unit}
					activeLessonId={activeLessonId}
					completedLessonIds={completedLessonIds}
				/>
			))}

			{/* Column Section */}
			<div className="w-full bg-white dark:bg-card p-6 rounded-[2rem] shadow-sm border border-border/50 mt-8">
				<div className="flex items-start gap-4">
					<div className="bg-primary/10 p-3 rounded-2xl text-primary shrink-0">
						<BookOpen size={24} />
					</div>
					<div>
						<h4 className="font-bold text-foreground text-base mb-1">
							コラム：エラーは怖くない
						</h4>
						<p className="text-sm text-muted-foreground leading-relaxed">
							赤い文字が出ても大丈夫。それはコンピュータからの「もう少し詳しく教えて」というメッセージです。
							<br />
							深呼吸して、ゆっくり読み解いてみましょう。
						</p>
					</div>
				</div>
			</div>

			<div className="h-24"></div>
		</div>
	);
}
