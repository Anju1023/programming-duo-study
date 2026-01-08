'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';

interface LessonInstructionProps {
	content: string; // Markdown-like content
	onComplete: () => void;
}

export function LessonInstruction({
	content,
	onComplete,
}: LessonInstructionProps) {
	// Simple markdown-ish parser for demo purposes
	// In a real app, use 'react-markdown'
	const parseContent = (text: string) => {
		return text.split('\n').map((line, i) => {
			// Header
			if (line.startsWith('# ')) {
				return (
					<h2 key={i} className="text-2xl font-bold mb-4 mt-2 text-primary">
						{line.replace('# ', '')}
					</h2>
				);
			}
			// Code block (simple one-line detection for now)
			if (line.startsWith('`') && line.endsWith('`')) {
				return (
					<div
						key={i}
						className="bg-slate-950 text-slate-50 p-4 rounded-md font-mono my-4 border border-slate-800 shadow-sm relative overflow-hidden"
					>
						<div className="absolute top-2 right-2 flex gap-1">
							<div className="h-2 w-2 rounded-full bg-red-500" />
							<div className="h-2 w-2 rounded-full bg-yellow-500" />
							<div className="h-2 w-2 rounded-full bg-green-500" />
						</div>
						{line.replace(/`/g, '')}
					</div>
				);
			}
			// Bullet point
			if (line.startsWith('- ')) {
				return (
					<li key={i} className="ml-4 list-disc mb-2">
						{line.replace('- ', '')}
					</li>
				);
			}
			// Normal paragraph
			if (line.trim() === '') return <div key={i} className="h-4" />;

			return (
				<p key={i} className="mb-2 leading-relaxed text-muted-foreground">
					{line}
				</p>
			);
		});
	};

	return (
		<div className="w-full max-w-2xl mx-auto flex flex-col h-full max-h-[60vh] lg:max-h-[70vh]">
			<div className="flex items-center gap-2 mb-6 border-b pb-4">
				<div className="bg-primary/10 p-2 rounded-full">
					<BookOpen className="h-6 w-6 text-primary" />
				</div>
				<h3 className="text-xl font-bold">Lecture</h3>
			</div>

			<ScrollArea className="flex-1 pr-4">
				<div className="text-lg">{parseContent(content)}</div>
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
