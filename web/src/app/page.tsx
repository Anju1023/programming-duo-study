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
            <Button variant="ghost" asChild>
              <Link href="/login">ログイン</Link>
            </Button>
            <Button>はじめる</Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 lg:py-16">
          <div className="flex max-w-[980px] flex-col items-start gap-4">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              <span className="text-primary">ゲーム感覚</span>で<br />
              Pythonをマスターしよう
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
              実際のアプリを作ったり、パズルを解いたり、友達と競い合ったり。<br />
              プログラミング学習の「一番楽しい」がここから始まります。
            </p>
          </div>
          <div className="flex gap-4">
            <Button size="lg" className="gap-2 text-lg px-8 h-12">
              今すぐ学習を始める <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="h-12 text-lg">
              カリキュラムを見る
            </Button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl border shadow-sm">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Flame className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">毎日続く</h3>
              <p className="text-muted-foreground">毎日のストリーク機能で、学習習慣が自然と身につきます。</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl border shadow-sm">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Code2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">インタラクティブ</h3>
              <p className="text-muted-foreground">ブラウザ上でPythonコードを直接実行。環境構築は不要です。</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl border shadow-sm">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">競い合う楽しさ</h3>
              <p className="text-muted-foreground">ランキングで上位を目指し、新しいスキルを習得してバッジを集めよう。</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
