'use client';

import { CodeEditor } from '@/components/code/code-editor';
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
}

export function CodeChallenge({
	question,
	initialCode,
	code,
	onChange,
	status,
}: CodeChallengeProps) {
	// Set initial code if empty
	useEffect(() => {
		if (!code && initialCode) {
			onChange(initialCode);
		}
	}, [initialCode, code, onChange]);

	return (
		<div className="flex flex-col gap-4 w-full h-full max-w-4xl mx-auto">
			<MarkdownView
				content={question}
				className="text-xl font-bold leading-relaxed mb-2"
			/>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full min-h-[400px]">
				{/* Editor Area */}
				<div className="flex flex-col gap-2">
					<div className="font-bold text-sm text-muted-foreground">
						コードエディタ
					</div>
					<CodeEditor
						value={code}
						onChange={onChange}
						className="flex-1 min-h-[300px] border-2 shadow-sm"
					/>
				</div>

				{/* Output Area */}
				<div className="flex flex-col gap-2">
					<div className="font-bold text-sm text-muted-foreground">
						実行結果 (確認ボタンを押して実行)
					</div>
					<Terminal className="flex-1 min-h-[300px] border-2" />
				</div>
			</div>
		</div>
	);
}
