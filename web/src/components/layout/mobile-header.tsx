import { Heart, Zap, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileHeader() {
  return (
    <div className="flex h-16 items-center justify-between border-b bg-card px-4 lg:hidden">
      {/* Course Selector (Placeholder) */}
      <Button variant="ghost" className="font-bold">
        Python Basics
      </Button>

      {/* Stats */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-rose-500 font-bold">
          <Heart className="h-5 w-5 fill-current" />
          <span>5</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 font-bold">
          <Gem className="h-5 w-5 fill-current" />
          <span>120</span>
        </div>
      </div>
    </div>
  );
}
