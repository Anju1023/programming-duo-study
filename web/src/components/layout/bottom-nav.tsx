import Link from "next/link";
import { Trophy, User, BookOpen } from "lucide-react";

const navItems = [
  { label: "Learn", href: "/learn", icon: BookOpen },
  { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { label: "Profile", href: "/profile", icon: User },
];

export function BottomNav() {
  return (
    <div className="flex h-16 w-full items-center justify-around border-t bg-card px-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors"
        >
          <item.icon className="h-6 w-6" />
          <span className="text-xs font-medium">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
