import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Trophy, User, BookOpen } from "lucide-react";

const sidebarItems = [
  { label: "Learn", href: "/learn", icon: BookOpen },
  { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { label: "Profile", href: "/profile", icon: User },
];

export function Sidebar({ className }: { className?: string }) {
  return (
    <div className={`flex h-full flex-col border-r bg-card ${className}`}>
      <div className="p-6">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <Code2 className="h-8 w-8" />
          <span>CodePop</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2 p-4">
        {sidebarItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className="justify-start gap-4 text-lg h-14"
            asChild
          >
            <Link href={item.href}>
              <item.icon className="h-6 w-6" />
              {item.label}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
