'use client';

import { useUserStore } from '@/lib/store/user-store';
import { useEffect } from 'react';

export function HeartProvider({ children }: { children: React.ReactNode }) {
	const recoverHeart = useUserStore((state) => state.recoverHeart);

	useEffect(() => {
		// Check immediately on mount
		recoverHeart();

		// Set up an interval to check every minute
		const interval = setInterval(() => {
			recoverHeart();
		}, 60 * 1000);

		return () => clearInterval(interval);
	}, [recoverHeart]);

	return <>{children}</>;
}
