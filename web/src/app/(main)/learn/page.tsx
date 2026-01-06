import { Button } from "@/components/ui/button";

export default function LearnPage() {
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Unit 1: Introduction to Python</h1>
        <p className="text-muted-foreground">Start your journey into the world of coding.</p>
      </div>

      {/* TODO: Sugoroku Map Component will go here */}
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <div className="p-4 border rounded-xl bg-card w-full text-center shadow-sm">
           <div className="mb-2 font-bold text-lg">Lesson 1: Hello World</div>
           <Button className="w-full" size="lg">Start</Button>
        </div>
        
        {/* Mock Locked Lessons */}
        <div className="p-4 border rounded-xl bg-muted w-full text-center opacity-70">
           <div className="mb-2 font-bold text-lg">Lesson 2: Variables</div>
           <Button variant="outline" className="w-full" disabled>Locked</Button>
        </div>
      </div>
    </div>
  );
}
