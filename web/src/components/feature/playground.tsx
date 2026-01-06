"use client";

import { useState } from "react";
import { CodeEditor } from "@/components/code/code-editor";
import { Terminal } from "@/components/code/terminal";
import { usePython } from "@/hooks/use-python";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export function PythonPlayground() {
  const [code, setCode] = useState("print(\"Hello, CodePop!\")\nx = 10\nprint(f\"x * 2 = {x * 2}\")");
  const { runPython, isLoading, isReady } = usePython();

  const handleRun = async () => {
    await runPython(code);
  };

  return (
    <div className="w-full max-w-3xl flex flex-col gap-4">
      <div className="flex items-center justify-between">
         <h3 className="font-bold text-lg">Python Playground</h3>
         <Button 
            onClick={handleRun} 
            disabled={!isReady || isLoading}
            className="gap-2"
         >
            <Play className="h-4 w-4 fill-current" />
            {isLoading ? "Running..." : "Run Code"}
         </Button>
      </div>
      
      <CodeEditor value={code} onChange={setCode} className="min-h-[250px] shadow-sm" />
      <Terminal className="min-h-[150px]" />
    </div>
  );
}
