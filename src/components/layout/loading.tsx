'use client';

import { Progress } from "@/components/ui/progress";

export function Loading({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="w-1/3 max-w-xs">
         <Progress value={progress} className="h-1" indicatorClassName="shadow-[0_0_15px_hsl(var(--primary))]" />
      </div>
    </div>
  );
}
