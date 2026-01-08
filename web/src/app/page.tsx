import { Button } from '@/components/ui/button';
import { ArrowRight, Code2, Flame, Trophy, User } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function Home() {
	// サーバーサイドでユーザー情報を取得
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<div className="flex min-h-screen flex-col bg-[#F8FAFC] dark:bg-[#0F172A]">
			{/* Header */}
			<header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-16 items-center justify-between px-4 md:px-8">
					<div className="flex items-center gap-2">
						{/* Logo Component embedded directly or imported if we had one for public page */}
						<div className="flex items-center gap-2 font-extrabold text-2xl tracking-tighter">
							<div className="relative flex items-center justify-center">
								<Code2
									className="h-7 w-7 text-primary relative z-10"
									strokeWidth={2.5}
								/>
							</div>
							<span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
								CodePop
							</span>
						</div>
					</div>
					<nav className="flex items-center gap-4">
						{user ? (
							// ログイン済みの場合
							<>
								<Button
									variant="ghost"
									asChild
									className="hidden sm:inline-flex rounded-full text-base font-bold text-muted-foreground hover:text-primary"
								>
									<Link href="/learn" className="flex items-center gap-2">
										<User className="h-4 w-4" />
										学習を続ける
									</Link>
								</Button>
								<Button
									asChild
									className="rounded-full px-6 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
								>
									<Link href="/learn">ダッシュボード</Link>
								</Button>
							</>
						) : (
							// 未ログインの場合
							<>
								<Button
									variant="ghost"
									asChild
									className="rounded-full text-base font-bold text-muted-foreground hover:text-primary"
								>
									<Link href="/login">ログイン</Link>
								</Button>
								<Button
									asChild
									className="rounded-full px-6 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
								>
									<Link href="/login">はじめる</Link>
								</Button>
							</>
						)}
					</nav>
				</div>
			</header>

			<main className="flex-1 flex flex-col items-center justify-center">
				{/* Hero Section */}
				<section className="container flex flex-col items-center gap-8 pb-12 pt-12 md:py-24 lg:py-32 text-center">
					{/* Decorative Elements */}
					<div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl -z-10 animate-pulse" />
					<div
						className="absolute bottom-20 right-10 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl -z-10 animate-pulse"
						style={{ animationDelay: '1s' }}
					/>

					<div className="flex max-w-[980px] flex-col items-center gap-6">
						<h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-slate-50">
							<span className="bg-gradient-to-r from-primary via-blue-500 to-rose-500 bg-clip-text text-transparent">
								ゲーム感覚
							</span>
							で<br className="hidden sm:inline" />
							プログラミングをマスター
						</h1>
						<p className="max-w-[700px] text-lg text-slate-600 dark:text-slate-400 sm:text-2xl font-medium leading-relaxed">
							1日5分から始められる。楽しく学んで、
							<br className="sm:hidden" />
							気づいたらコードが書けるようになる。
						</p>
					</div>
					<div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center">
						{user ? (
							<>
								<Button
									size="lg"
									className="w-full sm:w-auto gap-2 text-xl px-10 h-16 rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
									asChild
								>
									<Link href="/learn">
										学習を続ける <ArrowRight className="h-6 w-6" />
									</Link>
								</Button>
							</>
						) : (
							<>
								<Button
									size="lg"
									className="w-full sm:w-auto gap-2 text-xl px-10 h-16 rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
									asChild
								>
									<Link href="/login">
										今すぐ始める (無料) <ArrowRight className="h-6 w-6" />
									</Link>
								</Button>
							</>
						)}
					</div>
				</section>

				{/* Feature Grid with more white space */}
				<section className="container py-24 px-4 md:px-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
						<div className="group flex flex-col items-center text-center p-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-200/50 dark:border-slate-800/50 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
							<div className="p-5 bg-orange-100 dark:bg-orange-900/30 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
								<Flame className="h-10 w-10 text-orange-500" />
							</div>
							<h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-slate-100">
								習慣になる
							</h3>
							<p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
								続けるほど楽しくなる。毎日の小さな積み重ねが大きな力に。
							</p>
						</div>
						<div className="group flex flex-col items-center text-center p-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-200/50 dark:border-slate-800/50 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-allQl duration-300">
							<div className="p-5 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
								<Code2 className="h-10 w-10 text-blue-500" />
							</div>
							<h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-slate-100">
								すぐ動く
							</h3>
							<p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
								面倒な環境構築は一切なし。ブラウザを開いたらすぐコードが書ける。
							</p>
						</div>
						<div className="group flex flex-col items-center text-center p-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-200/50 dark:border-slate-800/50 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300">
							<div className="p-5 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
								<Trophy className="h-10 w-10 text-yellow-500" />
							</div>
							<h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-slate-100">
								成長が見える
							</h3>
							<p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
								クリアするたびにレベルアップ。自分の成長を実感できる。
							</p>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
