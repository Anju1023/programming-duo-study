import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Flame, Trophy } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <Code2 className="h-6 w-6" />
            <span>CodePop</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost">Log in</Button>
            <Button>Get Started</Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 lg:py-16">
          <div className="flex max-w-[980px] flex-col items-start gap-4">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Master Python <br className="hidden sm:inline" />
              with <span className="text-primary">Gamified Learning</span>
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
              Build real apps, solve puzzles, and compete with friends. 
              The most fun way to learn programming starts here.
            </p>
          </div>
          <div className="flex gap-4">
            <Button size="lg" className="gap-2 text-lg px-8 h-12">
              Start Learning Now <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="h-12 text-lg">
              View Syllabus
            </Button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl border shadow-sm">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Flame className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Daily Streaks</h3>
              <p className="text-muted-foreground">Build a habit by coding every day. Don't break the chain!</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl border shadow-sm">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Code2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Interactive Code</h3>
              <p className="text-muted-foreground">Run Python directly in your browser. No setup required.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl border shadow-sm">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Compete & Win</h3>
              <p className="text-muted-foreground">Climb the leaderboard and earn badges as you master new skills.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
