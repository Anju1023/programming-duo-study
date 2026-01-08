import { PythonPlayground } from '@/components/feature/playground';
import { Mascot } from '@/components/ui/mascot';
import { Sparkles } from 'lucide-react';

export default function PlaygroundPage() {
	return (
		<div className="flex flex-col items-center gap-8 py-8 w-full px-4 md:px-8 max-w-4xl mx-auto animate-fade-in">
			{/* Header */}
			<div className="w-full flex items-center justify-between bg-card/50 backdrop-blur-sm p-6 rounded-[2rem] border border-border/50 mb-4 shadow-sm">
				<div>
					<h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-2">
						自由研究 <Sparkles className="w-5 h-5 text-accent" />
					</h2>
					<p className="text-muted-foreground text-sm">
						自由にコードを書いて実験してみましょう。
						<br />
						失敗しても大丈夫。何度でも試せます。
					</p>
				</div>
				<div className="hidden sm:block">
					<Mascot emotion="thinking" size="sm" />
				</div>
			</div>

			{/* Playground Area */}
			<div className="w-full bg-white dark:bg-card p-6 rounded-[2rem] shadow-sm border border-border/50">
				<PythonPlayground />
			</div>
		</div>
	);
}
