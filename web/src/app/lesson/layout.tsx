import { PythonProvider } from "@/components/providers/python-provider";

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PythonProvider>
       {children}
    </PythonProvider>
  );
}
