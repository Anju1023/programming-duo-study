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
			<span className="font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
				木漏れ日コード
			</span>
		</div>
	);
};
