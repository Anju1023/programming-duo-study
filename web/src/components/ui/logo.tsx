import { Mascot } from '@/components/ui/mascot';
import { cn } from '@/lib/utils';

interface LogoProps {
	className?: string;
}

export const Logo = ({ className }: LogoProps) => {
	return (
		<div
			className={cn('flex items-center gap-2 group cursor-pointer', className)}
		>
			<div className="relative transition-transform group-hover:scale-110 duration-300">
				<Mascot emotion="happy" size="sm" className="!w-10 !h-10" />
			</div>
			<div className="relative h-8 w-48 transition-opacity group-hover:opacity-80">
				{/* 
                  Using a standard img tag here because we are in a component that might be used
                  in contexts where Next.js Image optimization nuances (like requiring width/height)
                  might be tricky effectively without fixed dimensions. 
                  However, standard practice is next/image. Let's use next/image. 
                  We need to import Image.
                */}
				<img
					src="/logo.png"
					alt="木漏れ日コード"
					className="h-full w-full object-contain object-left"
				/>
			</div>
		</div>
	);
};
