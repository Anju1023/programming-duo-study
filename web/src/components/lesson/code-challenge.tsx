'use client';

import { CodeEditor } from '@/components/editor/code-editor';
import { MarkdownView } from '@/components/ui/markdown-view';
import { Terminal } from '@/components/code/terminal';
import { usePython } from '@/hooks/use-python';
import { useEffect } from 'react';

interface CodeChallengeProps {
	question: string;
	initialCode: string; // Boilerplate code
	code: string;
	onChange: (value: string) => void;
	status: 'idle' | 'correct' | 'incorrect';
	onHotkey?: () => void; // Ctrl+Enter to check
}

export function CodeChallenge({
	question,
	initialCode,
	code,
	onChange,
	status,
	onHotkey,
}: CodeChallengeProps) {
	// Set initial code if empty
	useEffect(() => {
		if (!code && initialCode) {
			onChange(initialCode);
		}
	}, [initialCode, code, onChange]);

	return (
		<div className="flex flex-col gap-4 w-full h-full max-w-5xl mx-auto">
			<MarkdownView
				content={question}
				className="text-xl font-bold leading-relaxed mb-2"
			/>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full min-h-[500px]">
				{/* Editor Area */}
				<div className="flex flex-col gap-2 h-full">
					<div className="font-bold text-sm text-muted-foreground flex justify-between items-center">
						<span>コードエディタ</span>
						<span className="text-xs bg-muted px-2 py-1 rounded">
							Ctrl+Enter で実行
						</span>
					</div>
					<CodeEditor
						value={code}
						onChange={onChange}
						className="flex-1 min-h-[400px] border-2 shadow-sm h-full"
						height="100%"
						onRunCode={onHotkey}
					/>
				</div>

				{/* Output Area */}
				<div className="flex flex-col gap-2 h-full">
					<div className="font-bold text-sm text-muted-foreground">
						実行結果
					</div>
					<Terminal className="flex-1 min-h-[400px] border-2 h-full" />
				</div>
			</div>
		</div>
	);
}
