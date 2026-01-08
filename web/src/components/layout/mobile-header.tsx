'use client';

import { Heart, Gem } from 'lucide-react';
import { useUserStore } from '@/lib/store/user-store';
import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils';

export function MobileHeader() {
	const { hearts, gems } = useUserStore();

	return (
		<div className="flex h-16 items-center justify-between border-b bg-card px-4 lg:hidden sticky top-0 z-50">
			<Logo className="text-xl" />

			{/* Stats */}
			<div className="flex items-center gap-4">
				<div
					className={cn(
						'flex items-center gap-1 font-bold',
						hearts > 0 ? 'text-rose-500' : 'text-muted-foreground'
					)}
				>
					<Heart
						className={cn('h-5 w-5 fill-current', hearts === 0 && 'opacity-50')}
					/>
					<span>{hearts}</span>
				</div>
				<div className="flex items-center gap-1 text-blue-500 font-bold">
					<Gem className="h-5 w-5 fill-current" />
					<span>{gems}</span>
				</div>
			</div>
		</div>
	);
}
