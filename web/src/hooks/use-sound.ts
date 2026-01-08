import { useCallback, useRef, useEffect } from 'react';

/**
 * A hook to play sound effects using the Web Audio API.
 * This avoids the need for external audio files and reduces bundle size.
 */
export function useSoundEffects() {
	const audioContextRef = useRef<AudioContext | null>(null);

	// Initialize AudioContext lazily (it requires user interaction usually)
	const getAudioContext = useCallback(() => {
		if (!audioContextRef.current) {
			const AudioContextClass =
				window.AudioContext ||
				(window as unknown as { webkitAudioContext: typeof AudioContext })
					.webkitAudioContext;
			if (AudioContextClass) {
				audioContextRef.current = new AudioContextClass();
			}
		}
		return audioContextRef.current;
	}, []);

	const playSuccess = useCallback(() => {
		const ctx = getAudioContext();
		if (!ctx) return;

		// Ensure context is running (it might be suspended)
		if (ctx.state === 'suspended') {
			ctx.resume().catch(() => {});
		}

		// Create a nice major chord arpeggio (C5 - E5 - G5 - C6)
		const notes = [523.25, 659.25, 783.99, 1046.5];
		const now = ctx.currentTime;

		notes.forEach((freq, i) => {
			// Volume handled by gain
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();

			osc.type = 'sine';
			osc.frequency.value = freq;

			// Envelope
			gain.gain.setValueAtTime(0, now + i * 0.1);
			gain.gain.linearRampToValueAtTime(0.3, now + i * 0.1 + 0.05);
			gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.5);

			osc.connect(gain);
			gain.connect(ctx.destination);

			osc.start(now + i * 0.1);
			osc.stop(now + i * 0.1 + 0.5);
		});
	}, [getAudioContext]);

	const playError = useCallback(() => {
		const ctx = getAudioContext();
		if (!ctx) return;

		if (ctx.state === 'suspended') {
			ctx.resume().catch(() => {});
		}

		const now = ctx.currentTime;
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();

		osc.type = 'sawtooth';
		osc.frequency.setValueAtTime(150, now);
		osc.frequency.linearRampToValueAtTime(80, now + 0.3); // Pitch Down

		gain.gain.setValueAtTime(0, now);
		gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
		gain.gain.linearRampToValueAtTime(0, now + 0.3);

		osc.connect(gain);
		gain.connect(ctx.destination);

		osc.start(now);
		osc.stop(now + 0.3);
	}, [getAudioContext]);

	const playComplete = useCallback(() => {
		const ctx = getAudioContext();
		if (!ctx) return;

		if (ctx.state === 'suspended') {
			ctx.resume().catch(() => {});
		}

		// Fanfare-ish sequence
		const notes = [523.25, 523.25, 523.25, 659.25, 783.99, 1046.5]; // C C C E G C
		const timings = [0, 0.15, 0.3, 0.45, 0.6, 0.9];
		const durations = [0.1, 0.1, 0.1, 0.15, 0.2, 0.8];

		const now = ctx.currentTime;

		notes.forEach((freq, i) => {
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();

			osc.type = i === notes.length - 1 ? 'triangle' : 'square'; // Last note smoother
			osc.frequency.value = freq;

			gain.gain.setValueAtTime(0, now + timings[i]);
			gain.gain.linearRampToValueAtTime(0.15, now + timings[i] + 0.05);
			gain.gain.exponentialRampToValueAtTime(
				0.001,
				now + timings[i] + durations[i]
			);

			osc.connect(gain);
			gain.connect(ctx.destination);

			osc.start(now + timings[i]);
			osc.stop(now + timings[i] + durations[i]);
		});
	}, [getAudioContext]);

	return { playSuccess, playError, playComplete };
}
