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
		<div className="flex min-h-screen flex-col bg-background">
			{/* Header */}
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-16 items-center justify-between">
					<div className="flex items-center gap-2 font-bold text-xl text-primary">
						<Code2 className="h-6 w-6" />
						<span>CodePop</span>
					</div>
					<nav className="flex items-center gap-4">
						{user ? (
							// ログイン済みの場合
							<>
								<Button variant="ghost" asChild>
									<Link href="/learn" className="flex items-center gap-2">
										<User className="h-4 w-4" />
										学習を続ける
									</Link>
								</Button>
								<Button asChild>
									<Link href="/learn">ダッシュボード</Link>
								</Button>
							</>
						) : (
							// 未ログインの場合
							<>
								<Button variant="ghost" asChild>
									<Link href="/login">ログイン</Link>
								</Button>
								<Button asChild>
									<Link href="/login">はじめる</Link>
								</Button>
							</>
						)}
					</nav>
				</div>
			</header>

			<main className="flex-1">
				{/* Hero Section */}
				<section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 lg:py-16">
					<div className="flex max-w-[980px] flex-col items-start gap-4">
						<h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
							<span className="text-primary">ゲーム感覚</span>で<br />
							プログラミングをマスター
						</h1>
						<p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
							1日5分から始められる。楽しく学んで、気づいたらコードが書けるようになる。
							<br />
							プログラミングの「はじめの一歩」はここから。
						</p>
					</div>
					<div className="flex gap-4">
						{user ? (
							// ログイン済みの場合
							<>
								<Button size="lg" className="gap-2 text-lg px-8 h-12" asChild>
									<Link href="/learn">
										学習を続ける <ArrowRight className="h-5 w-5" />
									</Link>
								</Button>
								<Button
									variant="outline"
									size="lg"
									className="h-12 text-lg"
									asChild
								>
									<Link href="/learn">進捗を確認</Link>
								</Button>
							</>
						) : (
							// 未ログインの場合
							<>
								<Button size="lg" className="gap-2 text-lg px-8 h-12" asChild>
									<Link href="/login">
										今すぐ学習を始める <ArrowRight className="h-5 w-5" />
									</Link>
								</Button>
								<Button variant="outline" size="lg" className="h-12 text-lg">
									カリキュラムを見る
								</Button>
							</>
						)}
					</div>

					{/* Feature Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
						<div className="flex flex-col items-center text-center p-6 bg-card rounded-xl border shadow-sm">
							<div className="p-4 bg-primary/10 rounded-full mb-4">
								<Flame className="h-8 w-8 text-orange-500" />
							</div>
							<h3 className="text-xl font-bold mb-2">習慣になる</h3>
							<p className="text-muted-foreground">
								続けるほど楽しくなる。毎日の小さな積み重ねが大きな力に。
							</p>
						</div>
						<div className="flex flex-col items-center text-center p-6 bg-card rounded-xl border shadow-sm">
							<div className="p-4 bg-primary/10 rounded-full mb-4">
								<Code2 className="h-8 w-8 text-primary" />
							</div>
							<h3 className="text-xl font-bold mb-2">すぐ動く</h3>
							<p className="text-muted-foreground">
								面倒な環境構築は一切なし。ブラウザを開いたらすぐコードが書ける。
							</p>
						</div>
						<div className="flex flex-col items-center text-center p-6 bg-card rounded-xl border shadow-sm">
							<div className="p-4 bg-primary/10 rounded-full mb-4">
								<Trophy className="h-8 w-8 text-yellow-500" />
							</div>
							<h3 className="text-xl font-bold mb-2">成長が見える</h3>
							<p className="text-muted-foreground">
								クリアするたびにレベルアップ。自分の成長を実感できる。
							</p>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
