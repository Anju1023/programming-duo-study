"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import Script from "next/script";

interface PythonContextType {
  runPython: (code: string) => Promise<any>;
  stdout: string[];
  stderr: string[];
  isLoading: boolean;
  isReady: boolean;
  clearOutput: () => void;
}

const PythonContext = createContext<PythonContextType | undefined>(undefined);

declare global {
  interface Window {
    loadPyodide: (config: any) => Promise<any>;
    pyodide: any;
  }
}

export function PythonProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stdout, setStdout] = useState<string[]>([]);
  const [stderr, setStderr] = useState<string[]>([]);
  const [pyodide, setPyodide] = useState<any>(null);

  const handleLoad = async () => {
    try {
      const pyodideInstance = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/", // Use a fixed version
      });

      // Redirect stdout/stderr
      pyodideInstance.setStdout({ batched: (msg: string) => setStdout((prev) => [...prev, msg]) });
      pyodideInstance.setStderr({ batched: (msg: string) => setStderr((prev) => [...prev, msg]) });

      setPyodide(pyodideInstance);
      setIsReady(true);
      setIsLoading(false);
      console.log("Pyodide Ready!");
    } catch (error) {
      console.error("Failed to load Pyodide:", error);
      setIsLoading(false);
    }
  };

  const clearOutput = useCallback(() => {
    setStdout([]);
    setStderr([]);
  }, []);

  const runPython = useCallback(
    async (code: string) => {
      if (!isReady || !pyodide) {
        throw new Error("Python environment is not ready yet.");
      }

      setIsLoading(true);
      clearOutput();

      try {
        await pyodide.runPythonAsync(code);
      } catch (error: any) {
        setStderr((prev) => [...prev, error.message]);
      } finally {
        setIsLoading(false);
      }
    },
    [isReady, pyodide, clearOutput]
  );

  return (
    <PythonContext.Provider
      value={{
        runPython,
        stdout,
        stderr,
        isLoading,
        isReady,
        clearOutput,
      }}
    >
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"
        onLoad={handleLoad}
        strategy="afterInteractive"
      />
      {children}
    </PythonContext.Provider>
  );
}

export function usePython() {
  const context = useContext(PythonContext);
  if (context === undefined) {
    throw new Error("usePython must be used within a PythonProvider");
  }
  return context;
}
