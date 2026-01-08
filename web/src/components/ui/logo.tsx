import { Code2 } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
	return (
		<div
			className={`flex items-center gap-2 font-extrabold text-2xl tracking-tighter ${className}`}
		>
			<div className="relative flex items-center justify-center">
				{/* Background Blob for playful feel */}
				<div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 animate-pulse" />
				<Code2
					className="h-8 w-8 text-primary relative z-10 filter drop-shadow-sm"
					strokeWidth={2.5}
				/>
			</div>
			<span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparentXY relative z-10">
				CodePop
			</span>
		</div>
	);
}
