'use client';

import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-okaidia.css'; // High contrast theme (Monokai style)
import { cn } from '@/lib/utils';

interface CodeEditorProps {
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

export function CodeEditor({ value, onChange, className }: CodeEditorProps) {
	return (
		<div
			className={cn(
				'relative overflow-hidden rounded-lg border bg-[#272822] font-mono text-sm',
				className
			)}
		>
			<div className="absolute top-0 right-0 p-2 z-10 text-xs text-gray-500 font-bold select-none">
				PYTHON 3
			</div>
			<Editor
				value={value}
				onValueChange={onChange}
				highlight={(code) => highlight(code, languages.python, 'python')}
				padding={20}
				className="min-h-[200px] font-mono text-sm"
				textareaClassName="focus:outline-none"
				style={{
					fontFamily: '"Fira Code", "Fira Mono", monospace',
					fontSize: 14,
					backgroundColor: 'transparent',
				}}
			/>
		</div>
	);
}
