import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const MAX_HEARTS = 5;
export const HEART_RECOVERY_TIME_ms = 30 * 60 * 1000; // 30 minutes in ms

interface UserState {
	hearts: number;
	gems: number;
	xp: number;
	streak: number;
	nextHeartAt: number | null; // Timestamp for next heart recovery

	// Actions
	deductHeart: () => boolean; // returns success/failure
	recoverHeart: () => void;
	fullHeal: () => void;
	addGem: (amount: number) => void;
	addXp: (amount: number) => void;
	incrementStreak: () => void;
}

export const useUserStore = create<UserState>()(
	persist(
		(set, get) => ({
			hearts: MAX_HEARTS,
			gems: 100, // Initial bonus
			xp: 0,
			streak: 0,
			nextHeartAt: null,

			deductHeart: () => {
				const { hearts, nextHeartAt } = get();
				if (hearts <= 0) return false;

				const now = Date.now();
				const newHearts = hearts - 1;

				// If we were at full hearts, start the timer
				// If we already had a timer, keep it (don't reset progress)
				let newNextHeartAt = nextHeartAt;
				if (hearts === MAX_HEARTS) {
					newNextHeartAt = now + HEART_RECOVERY_TIME_ms;
				}

				set({
					hearts: newHearts,
					nextHeartAt: newNextHeartAt,
				});
				return true;
			},

			recoverHeart: () => {
				const { hearts, nextHeartAt } = get();
				if (hearts >= MAX_HEARTS) {
					set({ nextHeartAt: null });
					return;
				}

				const now = Date.now();
				// Check if it's actually time to recover (double check for safety)
				if (nextHeartAt && now >= nextHeartAt) {
					const newHearts = Math.min(hearts + 1, MAX_HEARTS);

					// If still not full, set next timer
					let newNextHeartAt: number | null = null;
					if (newHearts < MAX_HEARTS) {
						newNextHeartAt = now + HEART_RECOVERY_TIME_ms;
					}

					set({
						hearts: newHearts,
						nextHeartAt: newNextHeartAt,
					});
				}
			},

			fullHeal: () => set({ hearts: MAX_HEARTS, nextHeartAt: null }),

			addGem: (amount) => set((state) => ({ gems: state.gems + amount })),

			addXp: (amount) => set((state) => ({ xp: state.xp + amount })),

			incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
		}),
		{
			name: 'user-storage', // name of item in the storage (must be unique)
		}
	)
);
