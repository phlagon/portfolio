'use client';

import { Progress } from "@/components/ui/progress";

const RunningCatIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 32 20" fill="none">
        <path d="M2,9 C2,6 5,4 9,4 C13,4 15,6 16,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16,8 C17,7 20,7 22,8 C25,11 22,13 20,14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22,8 C22,7 23,6.5 24.5,6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2,9 C2,12 4,16 9,16 C14,16 16,12 16,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7,16V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12,16V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);


export function Loading({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 transition-opacity duration-500 ease-out">
      <div className="flex flex-col items-center gap-2 animate-fade-in-down" style={{animationDuration: '1s'}}>
        <div className="w-64">
            <div className="relative h-6 mb-1">
                <div className="absolute transition-all duration-300 ease-linear" style={{left: `calc(${progress}% - 12px)`}}>
                    <RunningCatIcon className="h-5 w-auto text-primary" style={{filter: 'drop-shadow(0 0 5px hsl(var(--primary)))'}} />
                </div>
            </div>
           <Progress value={progress} className="h-1" indicatorClassName="shadow-[0_0_15px_2px_hsl(var(--primary))] transition-all duration-300" />
        </div>
        <p className="text-sm text-primary/80 tracking-widest">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
