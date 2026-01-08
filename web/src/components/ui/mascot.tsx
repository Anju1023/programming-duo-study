import React from 'react';

interface MascotProps {
	emotion: 'happy' | 'neutral' | 'thinking' | 'encouraging';
	size?: 'sm' | 'md' | 'lg' | 'xl';
	className?: string;
}

export const Mascot: React.FC<MascotProps> = ({
	emotion,
	size = 'md',
	className = '',
}) => {
	const sizeClasses = {
		sm: 'w-16 h-16',
		md: 'w-32 h-32',
		lg: 'w-48 h-48',
		xl: 'w-64 h-64',
	};

	// Map emotions to Tailwind colors
	const getColorClass = () => {
		switch (emotion) {
			case 'happy':
				return 'text-green-500 dark:text-green-400';
			case 'encouraging':
				return 'text-secondary';
			case 'thinking':
				return 'text-primary';
			default:
				return 'text-primary';
		}
	};

	return (
		<div
			className={`${
				sizeClasses[size]
			} ${getColorClass()} relative animate-float transition-all duration-500 drop-shadow-lg ${className}`}
		>
			<svg viewBox="0 0 100 100" className="w-full h-full fill-current">
				{/* Body */}
				<path d="M50 10 C 20 10, 10 40, 10 60 C 10 85, 30 95, 50 95 C 70 95, 90 85, 90 60 C 90 40, 80 10, 50 10 Z" />
				{/* Eyes */}
				<circle cx="35" cy="45" r="4" fill="white" />
				<circle cx="65" cy="45" r="4" fill="white" />

				{/* Mouth Changes based on emotion */}
				{emotion === 'happy' && (
					<path
						d="M 35 60 Q 50 70 65 60"
						stroke="white"
						strokeWidth="3"
						fill="none"
						strokeLinecap="round"
					/>
				)}
				{emotion === 'neutral' && <circle cx="50" cy="65" r="3" fill="white" />}
				{emotion === 'thinking' && (
					<line
						x1="40"
						y1="65"
						x2="60"
						y2="65"
						stroke="white"
						strokeWidth="3"
						strokeLinecap="round"
					/>
				)}
				{emotion === 'encouraging' && (
					<path
						d="M 35 65 Q 50 55 65 65"
						stroke="white"
						strokeWidth="3"
						fill="none"
						strokeLinecap="round"
					/>
				)}

				{/* Leaf on head */}
				<path
					d="M 50 10 Q 30 -10 20 5 Q 35 5 50 10"
					className="text-slate-600 dark:text-slate-300 fill-current"
				/>
			</svg>
		</div>
	);
};
