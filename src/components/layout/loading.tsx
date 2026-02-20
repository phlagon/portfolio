'use client';

import { Progress } from "@/components/ui/progress";

export function Loading({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-[9999] transition-all duration-1000">
      <div className="w-full max-w-xs space-y-4 px-8">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Initializing Portfolio</span>
          <span className="text-[10px] font-black text-primary/60">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-[1px] bg-white/5" indicatorClassName="bg-primary" />
      </div>
    </div>
  );
}
