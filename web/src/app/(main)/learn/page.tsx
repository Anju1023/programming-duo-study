import { getCourseData, getUserProgress } from "@/db/queries";
import { UnitSection } from "@/components/learn/unit-section";
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
        {/* Sticky Header could go here */}
        
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
