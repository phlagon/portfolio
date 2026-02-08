'use client';

import { Progress } from "@/components/ui/progress";
import { Cat } from 'lucide-react';

export function Loading({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 transition-opacity duration-500 ease-out">
      <div className="flex flex-col items-center gap-4 animate-fade-in-down" style={{animationDuration: '1s'}}>
        <div className="flex items-center space-x-2">
          <Cat className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline">Purrfolio</span>
        </div>
        <div className="w-48">
           <Progress value={progress} className="h-1" indicatorClassName="shadow-[0_0_15px_2px_hsl(var(--primary))] transition-all duration-300" />
        </div>
        <p className="text-sm text-primary/80 tracking-widest">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
