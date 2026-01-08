'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownViewProps {
	content: string;
	className?: string;
}

export function MarkdownView({ content, className }: MarkdownViewProps) {
	return (
		<div className={cn('text-foreground', className)}>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					h1: ({ className, ...props }) => (
						<h1
							className={cn(
								'text-2xl font-bold mt-6 mb-4 text-primary',
								className
							)}
							{...props}
						/>
					),
					h2: ({ className, ...props }) => (
						<h2
							className={cn(
								'text-xl font-bold mt-5 mb-3 text-primary/90',
								className
							)}
							{...props}
						/>
					),
					h3: ({ className, ...props }) => (
						<h3
							className={cn(
								'text-lg font-semibold mt-4 mb-2 text-primary/80',
								className
							)}
							{...props}
						/>
					),
					p: ({ className, ...props }) => (
						<p className={cn('leading-7 mb-4', className)} {...props} />
					),
					ul: ({ className, ...props }) => (
						<ul
							className={cn('my-4 ml-6 list-disc [&>li]:mt-2', className)}
							{...props}
						/>
					),
					ol: ({ className, ...props }) => (
						<ol
							className={cn('my-4 ml-6 list-decimal [&>li]:mt-2', className)}
							{...props}
						/>
					),
					li: ({ className, ...props }) => (
						<li className={cn('leading-7', className)} {...props} />
					),
					blockquote: ({ className, ...props }) => (
						<blockquote
							className={cn(
								'mt-6 border-l-4 border-primary/30 pl-6 italic text-muted-foreground',
								className
							)}
							{...props}
						/>
					),
					code: ({ className, children, ...props }: any) => {
						const match = /language-(\w+)/.exec(className || '');
						const isInline =
							!match &&
							!String(children).includes('\n') &&
							!className?.includes('language-');

						// Inline code
						if (isInline) {
							return (
								<code
									className={cn(
										'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground',
										className
									)}
									{...props}
								>
									{children}
								</code>
							);
						}

						// Block code
						return (
							<pre
								className={cn(
									'overflow-x-auto rounded-lg border bg-slate-950 p-4 mb-4 text-slate-50 font-mono text-sm leading-relaxed',
									className
								)}
							>
								<code className={className} {...props}>
									{children}
								</code>
							</pre>
						);
					},
					a: ({ className, ...props }) => (
						<a
							className={cn(
								'font-medium text-primary underline underline-offset-4 hover:no-underline',
								className
							)}
							{...props}
						/>
					),
					hr: ({ className, ...props }) => (
						<hr className={cn('my-6 border-muted', className)} {...props} />
					),
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}
