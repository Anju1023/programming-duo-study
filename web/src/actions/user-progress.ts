"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deductHeart = async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Get current hearts
  const { data: profile } = await supabase
    .from("profiles")
    .select("hearts")
    .eq("id", user.id)
    .single();

  if (profile) {
    const newHearts = Math.max(0, profile.hearts - 1);
    await supabase
      .from("profiles")
      .update({ hearts: newHearts })
      .eq("id", user.id);
  }
  
  revalidatePath("/learn");
  revalidatePath("/lesson");
};

export const completeLesson = async (lessonId: number) => {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    console.log(`[completeLesson] User: ${user.id}, Lesson: ${lessonId}`);

    // 1. Update User Progress (Completed Lessons)
    const { data: progress, error: fetchError } = await supabase
      .from("user_progress")
      .select("completed_lesson_ids")
      .eq("user_id", user.id)
      .single();
    
    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "Row not found"
        console.error("[completeLesson] Fetch Error:", fetchError);
    }

    if (progress) {
      const isAlreadyCompleted = progress.completed_lesson_ids.includes(lessonId);
      if (!isAlreadyCompleted) {
        const { error: updateError } = await supabase
          .from("user_progress")
          .update({
            completed_lesson_ids: [...progress.completed_lesson_ids, lessonId],
          })
          .eq("user_id", user.id);
        
        if (updateError) console.error("[completeLesson] Update Error:", updateError);

        // 2. Award XP
        await incrementXP(user.id, 10);
      } else {
          console.log("[completeLesson] Already completed.");
      }
    } else {
      console.log("[completeLesson] Creating new progress row...");
      // Create progress row if not exists
      const { error: insertError } = await supabase.from("user_progress").insert({
        user_id: user.id,
        active_course_id: 1, // Default to Python Basics
        completed_lesson_ids: [lessonId],
      });
      
      if (insertError) console.error("[completeLesson] Insert Error:", insertError);

      await incrementXP(user.id, 10);
    }

    revalidatePath("/learn");
    revalidatePath("/lesson");
  } catch (err) {
      console.error("[completeLesson] Unexpected Error:", err);
      throw err; // Re-throw to show in UI if needed
  }
};


// We need an RPC function for atomic increment because doing select-update has race conditions, 
// though for this app simple update is fine.
// I'll stick to simple update for Profiles for simplicity unless I add an RPC in schema.sql.
// Oh wait, I can just do:
// .update({ xp: profile.xp + 10 }) 
// But I need to fetch first.
// Let's write a quick helper here instead of RPC for simplicity of deployment (no SQL file edit needed yet).

async function incrementXP(userId: string, amount: number) {
    const supabase = await createClient();
    const { data: profile } = await supabase.from("profiles").select("xp").eq("id", userId).single();
    if(profile) {
        await supabase.from("profiles").update({ xp: profile.xp + amount }).eq("id", userId);
    }
}
