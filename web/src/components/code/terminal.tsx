"use client";

import { usePython } from "@/hooks/use-python";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal as TerminalIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TerminalProps {
    className?: string;
}

export function Terminal({ className }: TerminalProps) {
  const { stdout, stderr, isLoading } = usePython();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [stdout, stderr]);

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-lg border bg-slate-950 text-slate-50 font-mono text-sm shadow-xl", className)}>
      <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/50 px-4 py-2">
        <TerminalIcon className="h-4 w-4 text-slate-400" />
        <span className="text-xs font-medium text-slate-400">Terminal Output</span>
      </div>
      <ScrollArea className="flex-1 p-4 h-[200px] w-full">
        {stdout.length === 0 && stderr.length === 0 && !isLoading && (
          <div className="text-slate-500 italic">No output...</div>
        )}
        {stdout.map((line, i) => (
          <div key={`out-${i}`} className="whitespace-pre-wrap">{line}</div>
        ))}
        {stderr.map((line, i) => (
          <div key={`err-${i}`} className="whitespace-pre-wrap text-red-400">{line}</div>
        ))}
         {isLoading && (
            <div className="mt-2 flex items-center gap-2 text-yellow-500 animate-pulse">
                <span>Running...</span>
            </div>
        )}
        <div ref={bottomRef} />
      </ScrollArea>
    </div>
  );
}
