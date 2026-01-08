'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Trophy,
	User,
	BookOpen,
	Heart,
	Gem,
	Flame,
	Terminal,
} from 'lucide-react';
import { useUserStore } from '@/lib/store/user-store';
import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils';

const sidebarItems = [
	{ label: '学ぶ', href: '/learn', icon: BookOpen },
	{ label: '自由研究', href: '/playground', icon: Terminal },
	{ label: 'ランキング', href: '/leaderboard', icon: Trophy },
	{ label: 'プロフィール', href: '/profile', icon: User },
];

export function Sidebar({ className }: { className?: string }) {
	const { hearts, gems, streak } = useUserStore();

	return (
		<div className={`flex h-full flex-col border-r bg-card ${className}`}>
			<div className="p-6">
				<Link href="/learn">
					<Logo />
				</Link>
			</div>

			<div className="px-6 pb-4">
				<div className="grid grid-cols-3 gap-2 p-2 bg-muted/50 rounded-xl border">
					<div className="flex flex-col items-center justify-center p-1">
						<Heart
							className={cn(
								'h-5 w-5 mb-1 fill-current',
								hearts > 0 ? 'text-rose-500' : 'text-muted-foreground'
							)}
						/>
						<span
							className={cn(
								'font-bold text-sm',
								hearts > 0 ? 'text-rose-500' : 'text-muted-foreground'
							)}
						>
							{hearts}
						</span>
					</div>
					<div className="flex flex-col items-center justify-center p-1">
						<Gem className="h-5 w-5 text-blue-500 mb-1 fill-current" />
						<span className="text-blue-500 font-bold text-sm">{gems}</span>
					</div>
					<div className="flex flex-col items-center justify-center p-1">
						<Flame className="h-5 w-5 text-orange-500 mb-1 fill-current" />
						<span className="text-orange-500 font-bold text-sm">{streak}</span>
					</div>
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
