"use client";

import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
import Link from "next/link";
import { Heart } from "lucide-react";

interface LessonHeaderProps {
  hearts: number;
  percentage: number;
}

export function LessonHeader({ hearts, percentage }: LessonHeaderProps) {
  return (
    <header className="fixed top-0 w-full border-b bg-background px-4 lg:px-10 h-16 flex items-center justify-between z-50">
      <Link href="/learn" className="text-muted-foreground hover:text-foreground transition-colors">
        <X className="h-6 w-6" />
      </Link>

      <div className="flex-1 mx-8 max-w-2xl">
        <Progress value={percentage} className="h-4 rounded-full bg-muted" />
      </div>

      <div className="flex items-center gap-2 text-rose-500 font-bold">
        <Heart className="h-6 w-6 fill-current" />
        <span>{hearts}</span>
      </div>
    </header>
  );
}
