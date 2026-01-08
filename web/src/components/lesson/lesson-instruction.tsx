'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';
import { MarkdownView } from '@/components/ui/markdown-view';

interface LessonInstructionProps {
	content: string; // Markdown-like content
	onComplete: () => void;
}

export function LessonInstruction({
	content,
	onComplete,
}: LessonInstructionProps) {
	// In a real app, use 'react-markdown'
	// const parseContent = (text: string) => { ... } // Removed manual parser

	return (
		<div className="w-full max-w-2xl mx-auto flex flex-col h-full max-h-[60vh] lg:max-h-[70vh]">
			<div className="flex items-center gap-2 mb-6 border-b pb-4">
				<div className="bg-primary/10 p-2 rounded-full">
					<BookOpen className="h-6 w-6 text-primary" />
				</div>
				<h3 className="text-xl font-bold">Lecture</h3>
			</div>

			<ScrollArea className="flex-1 pr-4">
				<MarkdownView content={content} />
			</ScrollArea>

			<div className="pt-8 mt-auto">
				<Button
					onClick={onComplete}
					size="lg"
					className="w-full text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
				>
					わかった！ (Got it!)
				</Button>
			</div>
		</div>
	);
}
