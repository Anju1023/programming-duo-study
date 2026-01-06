import { Button } from "@/components/ui/button";

export default function LearnPage() {
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">ユニット 1: Python入門</h1>
        <p className="text-muted-foreground">プログラミングの世界への第一歩を踏み出しましょう。</p>
      </div>

      {/* TODO: Sugoroku Map Component will go here */}
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <div className="p-4 border rounded-xl bg-card w-full text-center shadow-sm">
           <div className="mb-2 font-bold text-lg">レッスン 1: Hello World</div>
           <Button className="w-full" size="lg">スタート</Button>
        </div>
        
        {/* Mock Locked Lessons */}
        <div className="p-4 border rounded-xl bg-muted w-full text-center opacity-70">
           <div className="mb-2 font-bold text-lg">レッスン 2: 変数</div>
           <Button variant="outline" className="w-full" disabled>ロック中</Button>
        </div>
      </div>
    </div>
  );
}
