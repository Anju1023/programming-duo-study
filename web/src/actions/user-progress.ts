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
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // 1. Update User Progress (Completed Lessons)
  const { data: progress } = await supabase
    .from("user_progress")
    .select("completed_lesson_ids")
    .eq("user_id", user.id)
    .single();

  if (progress) {
    const isAlreadyCompleted = progress.completed_lesson_ids.includes(lessonId);
    if (!isAlreadyCompleted) {
      await supabase
        .from("user_progress")
        .update({
          completed_lesson_ids: [...progress.completed_lesson_ids, lessonId],
        })
        .eq("user_id", user.id);
        
        // 2. Award XP
        await incrementXP(user.id, 10);
     }
  } else {
    // Create progress row if not exists
    await supabase.from("user_progress").insert({
      user_id: user.id,
      active_course_id: 1, // Default to Python Basics
      completed_lesson_ids: [lessonId],
    });
     await incrementXP(user.id, 10);
  }

  revalidatePath("/learn");
  revalidatePath("/lesson");
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
