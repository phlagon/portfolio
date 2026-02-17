'use client';

import { Progress } from "@/components/ui/progress";

export function Loading({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 transition-opacity duration-500 ease-out">
      <div className="flex flex-col items-center gap-4 animate-fade-in-down" style={{animationDuration: '1s'}}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-48 h-auto rounded-lg"
          src="https://raw.githubusercontent.com/phlagon/purr-folio/d25ba5df001779aebe0796e887711a5284d9ca05/cat%20purrfolio.mp4"
        >
          Your browser does not support the video tag.
        </video>
        <div className="w-64">
           <Progress value={progress} className="h-1" indicatorClassName="shadow-[0_0_15px_2px_hsl(var(--primary))] transition-all duration-300" />
           <p className="text-center text-sm text-primary/80 tracking-widest mt-2">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  );
}
