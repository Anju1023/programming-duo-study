'use client';

import { Editor, OnMount } from '@monaco-editor/react';
import { useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import * as monaco from 'monaco-editor';
import { Loader2 } from 'lucide-react';

interface CodeEditorProps {
	value: string;
	onChange: (value: string) => void;
	language?: string;
	className?: string;
	height?: string | number;
	onRunCode?: () => void;
}

export function CodeEditor({
	value,
	onChange,
	language = 'python',
	className,
	height = '300px',
	onRunCode,
}: CodeEditorProps) {
	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
	const onRunCodeRef = useRef(onRunCode);
	const { theme } = useTheme();

	// Update ref when prop changes to avoid stale closures in editor command
	useEffect(() => {
		onRunCodeRef.current = onRunCode;
	}, [onRunCode]);

	const handleEditorDidMount: OnMount = (editor, monaco) => {
		editorRef.current = editor;

		// Register Run Command (Ctrl+Enter or Cmd+Enter)
		// We call onRunCodeRef.current to always get the latest function
		editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
			if (onRunCodeRef.current) {
				onRunCodeRef.current();
			}
		});

		// Configure Monaco
		monaco.languages.registerCompletionItemProvider('python', {
			provideCompletionItems: (
				model: monaco.editor.ITextModel,
				position: monaco.Position
			) => {
				const word = model.getWordUntilPosition(position);
				const range = {
					startLineNumber: position.lineNumber,
					endLineNumber: position.lineNumber,
					startColumn: word.startColumn,
					endColumn: word.endColumn,
				};

				const suggestions = [
					{
						label: 'print',
						kind: monaco.languages.CompletionItemKind.Function,
						insertText: 'print(${1:object})',
						insertTextRules:
							monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Prints objects to the text stream file',
						range: range,
					},
					{
						label: 'def',
						kind: monaco.languages.CompletionItemKind.Keyword,
						insertText: 'def ${1:func_name}(${2:args}):\n\t${3:pass}',
						insertTextRules:
							monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Define a function',
						range: range,
					},
					// Add more basic Python keywords here if needed
				];
				return { suggestions: suggestions };
			},
		});
	};

	const handleEditorChange = (value: string | undefined) => {
		onChange(value || '');
	};

	return (
		<div className={`relative rounded-md overflow-hidden border ${className}`}>
			<Editor
				height={height}
				defaultLanguage={language}
				value={value}
				onChange={handleEditorChange}
				onMount={handleEditorDidMount}
				theme={theme === 'dark' ? 'vs-dark' : 'light'}
				options={{
					minimap: { enabled: false },
					fontSize: 16, // Larger font for better readability
					fontFamily: 'var(--font-mono)',
					scrollBeyondLastLine: false,
					automaticLayout: true,
					padding: { top: 16, bottom: 16 },
					tabSize: 4,
					suggest: {
						showWords: false,
					},
				}}
				loading={
					<div className="flex h-full items-center justify-center bg-muted/20">
						<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
					</div>
				}
			/>
		</div>
	);
}
