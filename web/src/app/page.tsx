import { Button } from '@/components/ui/button';
import { Mascot } from '@/components/ui/mascot';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { BookOpen, RefreshCw, Sparkles, Star } from 'lucide-react';

export default async function Home() {
	// サーバーサイドでユーザー情報を取得
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<div className="flex min-h-screen flex-col bg-background overflow-hidden relative">
			{/* Decorative Background Elements */}
			<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
			<div
				className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-3xl -z-10 animate-pulse"
				style={{ animationDelay: '1s' }}
			/>

			<main className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
				<div className="mb-10 relative group cursor-pointer hover:scale-105 transition-transform duration-700">
					<div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
					<Mascot emotion="happy" size="xl" />
				</div>

				<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-foreground/80 text-sm font-medium mb-6 animate-slide-up">
					<Sparkles className="w-4 h-4 text-accent-foreground" />
					<span>癒やしのプログラミング学習</span>
				</div>

				<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight leading-tight">
					木漏れ日コード
				</h1>

				<p className="text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed text-lg md:text-xl">
					あせらず、ゆっくり。
					<br />
					あなたのペースでプログラミングを。
					<span className="text-sm mt-4 block opacity-70 font-medium">
						1日5分から始める、心にやさしい習慣 🌿
					</span>
				</p>

				<div
					className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mx-auto animate-slide-up"
					style={{ animationDelay: '0.2s' }}
				>
					{user ? (
						<Link href="/learn" className="w-full">
							<Button
								size="lg"
								className="w-full text-lg h-14 shadow-xl shadow-primary/20"
							>
								おかえりなさい
							</Button>
						</Link>
					) : (
						<Link href="/login" className="w-full">
							<Button
								size="lg"
								className="w-full text-lg h-14 shadow-xl shadow-primary/20"
							>
								今日も始める
							</Button>
						</Link>
					)}
				</div>

				{/* Feature Highlights (Simple & Gentle) */}
				<div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full px-4">
					<div className="bg-white/60 dark:bg-card/60 backdrop-blur-sm p-6 rounded-[2rem] border border-border/40 shadow-sm hover:shadow-md transition-all duration-300">
						<div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-4 mx-auto text-green-600 dark:text-green-400">
							<RefreshCw className="w-6 h-6" />
						</div>
						<h3 className="font-bold text-foreground mb-2">マイペースに</h3>
						<p className="text-sm text-muted-foreground leading-relaxed">
							期限も競争もありません。
							<br />
							あなたの時間はあなたのもの。
						</p>
					</div>
					<div className="bg-white/60 dark:bg-card/60 backdrop-blur-sm p-6 rounded-[2rem] border border-border/40 shadow-sm hover:shadow-md transition-all duration-300">
						<div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-4 mx-auto text-orange-600 dark:text-orange-400">
							<Star className="w-6 h-6" />
						</div>
						<h3 className="font-bold text-foreground mb-2">少しずつ成長</h3>
						<p className="text-sm text-muted-foreground leading-relaxed">
							大きな目標も、小さな一歩の
							<br />
							積み重ねから始まります。
						</p>
					</div>
					<div className="bg-white/60 dark:bg-card/60 backdrop-blur-sm p-6 rounded-[2rem] border border-border/40 shadow-sm hover:shadow-md transition-all duration-300">
						<div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-4 mx-auto text-blue-600 dark:text-blue-400">
							<BookOpen className="w-6 h-6" />
						</div>
						<h3 className="font-bold text-foreground mb-2">創造する喜び</h3>
						<p className="text-sm text-muted-foreground leading-relaxed">
							コードで何かを作る楽しさを、
							<br />
							一番大切にしています。
						</p>
					</div>
				</div>
			</main>

			<footer className="py-8 text-center text-xs text-muted-foreground/60">
				<p>© 2026 Komorebi Code. Made with 🌿</p>
			</footer>
		</div>
	);
}
