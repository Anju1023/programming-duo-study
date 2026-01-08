'use client';
import { useEffect } from 'react';

export function ScrollController({
	activeLessonId,
}: {
	activeLessonId?: number;
}) {
	useEffect(() => {
		if (activeLessonId) {
			// Small timeout to ensure layout is stable
			const timer = setTimeout(() => {
				const el = document.getElementById(`lesson-node-${activeLessonId}`);
				if (el) {
					el.scrollIntoView({ behavior: 'smooth', block: 'center' });
				}
			}, 100);
			return () => clearTimeout(timer);
		}
	}, [activeLessonId]);
	return null;
}
