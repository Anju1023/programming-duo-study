'use client';

import { useState, useEffect } from 'react';
import { CodeEditor } from '@/components/code/code-editor';
import { Terminal } from '@/components/code/terminal';
import { usePython } from '@/hooks/use-python';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export const PythonPlayground = () => {
	const { runPython, stdout, stderr, isLoading, isReady, clearOutput } =
		usePython();
	const [code, setCode] = useState('print("Hello Python from Pyodide!")');

	// Clear output when playground opens
	useEffect(() => {
		clearOutput();
	}, []);

	const handleRun = async () => {
		await runPython(code);
	};

	// Hotkey: Ctrl+Enter or Cmd+Enter to run code
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
			e.preventDefault();
			if (isReady && !isLoading) {
				handleRun();
			}
		}
	};

	return (
		<div
			className="w-full max-w-3xl flex flex-col gap-4"
			onKeyDown={handleKeyDown}
		>
			<div className="flex items-center justify-between">
				<h3 className="font-bold text-lg">Python Playground</h3>
				<Button
					onClick={handleRun}
					disabled={!isReady || isLoading}
					className="gap-2"
				>
					<Play className="h-4 w-4 fill-current" />
					{isLoading ? 'Running...' : 'Run Code'}
				</Button>
			</div>

			<CodeEditor
				value={code}
				onChange={setCode}
				className="min-h-[250px] shadow-sm"
			/>
			<Terminal className="min-h-[150px]" />
		</div>
	);
};
