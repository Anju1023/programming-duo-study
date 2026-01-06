"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonFooterProps {
  status: "idle" | "correct" | "incorrect";
  isValidating: boolean;
  onCheck: () => void;
  onContinue: () => void;
  onRetry: () => void;
}

export function LessonFooter({
  status,
  isValidating,
  onCheck,
  onContinue,
  onRetry,
}: LessonFooterProps) {
  return (
    <footer
      className={cn(
        "fixed bottom-0 w-full border-t p-4 transition-colors lg:p-10",
        status === "correct" && "bg-green-100 border-green-200",
        status === "incorrect" && "bg-rose-100 border-rose-200",
        status === "idle" && "bg-background"
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        {status === "idle" && (
            <div className="hidden lg:block lg:w-40" /> // Spacer
        )}

        {status === "correct" && (
          <div className="flex items-center gap-2 text-xl font-bold text-green-600">
            <CheckCircle className="h-8 w-8 fill-current" />
            <span>正解！</span>
          </div>
        )}

        {status === "incorrect" && (
          <div className="flex items-center gap-2 text-xl font-bold text-rose-600">
            <XCircle className="h-8 w-8 fill-current" />
            <span>不正解...</span>
          </div>
        )}

        <div className="w-full lg:w-40">
            {status === "idle" && (
            <Button 
                onClick={onCheck} 
                disabled={isValidating} 
                size="lg" 
                className="w-full text-lg font-bold uppercase tracking-wide"
            >
                {isValidating ? "確認中..." : "確認する"}
            </Button>
            )}

            {status === "correct" && (
            <Button 
                onClick={onContinue} 
                size="lg" 
                className="w-full text-lg font-bold uppercase tracking-wide bg-green-500 hover:bg-green-600 text-white"
            >
                続ける
            </Button>
            )}

            {status === "incorrect" && (
            <Button 
                onClick={onRetry} 
                size="lg" 
                variant="destructive"
                className="w-full text-lg font-bold uppercase tracking-wide"
            >
                やり直す
            </Button>
            )}
        </div>
      </div>
    </footer>
  );
}
