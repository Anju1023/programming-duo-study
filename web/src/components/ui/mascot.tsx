import React from 'react';
import Image from 'next/image';

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
	const sizePixels = {
		sm: 64,
		md: 128,
		lg: 192,
		xl: 256,
	};

	const sizeClasses = {
		sm: 'w-16 h-16',
		md: 'w-32 h-32',
		lg: 'w-48 h-48',
		xl: 'w-64 h-64',
	};

	// Map emotions to image assets
	const getImageSrc = () => {
		switch (emotion) {
			case 'happy':
				return '/Kodama_Chan/KodamaChan_Happy.png';
			case 'thinking':
				return '/Kodama_Chan/KodamaChan_Thinking.png';
			case 'encouraging':
				return '/Kodama_Chan/KodamaChan_encouraging.png';
			case 'neutral':
				// Fallback to happy for neutral as per plan
				return '/Kodama_Chan/KodamaChan_Happy.png';
			default:
				return '/Kodama_Chan/KodamaChan_Happy.png';
		}
	};

	return (
		<div
			className={`${sizeClasses[size]} relative animate-float transition-all duration-500 drop-shadow-lg ${className}`}
		>
			<Image
				src={getImageSrc()}
				alt={`Mascot ${emotion}`}
				width={sizePixels[size]}
				height={sizePixels[size]}
				className="object-contain"
				priority={emotion === 'happy'} // Prioritize loading the default/happy state
			/>
		</div>
	);
};
