import { getCourseData, getUserProgress } from "@/db/queries";
import { UnitSection } from "@/components/learn/unit-section";
import { PythonPlayground } from "@/components/feature/playground";
import { redirect } from "next/navigation";

export default async function LearnPage() {
  const courseData = await getCourseData();
  const userProgress = await getUserProgress();

  if (!courseData) {
      return <div>コースデータが見つかりません。</div>;
  }
  
  // Default to empty array if no progress yet
  const completedLessonIds = userProgress?.completed_lesson_ids || [];
  const activeLessonId = userProgress?.active_lesson_id; 

  return (
    <div className="flex flex-col items-center gap-8 py-8 w-full">
        {/* Temporary Playground for Testing */}
        <div className="w-full max-w-2xl bg-muted/20 p-6 rounded-xl border border-dashed border-primary/50">
            <h2 className="text-xl font-bold mb-4 text-center">🧪 Python 実験室</h2>
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
    </div>
  );
}
