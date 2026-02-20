
'use client';

import { Progress } from "@/components/ui/progress";

export function Loading({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center gap-8">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-32 h-auto rounded-full shadow-[0_0_40px_rgba(0,255,255,0.15)] grayscale"
          src="https://raw.githubusercontent.com/phlagon/purr-folio/d25ba5df001779aebe0796e887711a5284d9ca05/cat%20purrfolio.mp4"
        >
          Your browser does not support the video tag.
        </video>
        <div className="w-64 space-y-3">
           <Progress value={progress} className="h-0.5 bg-border/20" indicatorClassName="bg-primary" />
           <p className="text-center text-[10px] text-primary/60 font-bold uppercase tracking-[0.3em]">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  );
}
