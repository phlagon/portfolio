'use client';

import { Progress } from "@/components/ui/progress";

export function Loading({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="w-1/2 max-w-sm space-y-4 text-center">
        <h1 className="text-2xl font-bold font-headline text-primary animate-pulse">Purrfolio</h1>
        <Progress value={progress} className="w-full h-2" />
        <p className="text-primary text-sm font-mono">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
