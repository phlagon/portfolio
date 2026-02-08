'use client';

import { Progress } from "@/components/ui/progress";

const ProwlingCatIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 42 74" fill="none">
        <path d="M40.5 72.5C40.5 44.5 15.5 52.5 1.5 56C19.5 35.5 30.5 20.5 35.5 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);


export function Loading({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 transition-opacity duration-500 ease-out">
      <div className="flex flex-col items-center gap-2 animate-fade-in-down" style={{animationDuration: '1s'}}>
        <div className="w-64">
            <div className="relative h-8 mb-1">
                <div className="absolute transition-all duration-300 ease-linear" style={{left: `calc(${progress}% - 12px)`}}>
                    <ProwlingCatIcon className="h-7 w-auto text-primary" style={{filter: 'drop-shadow(0 0 5px hsl(var(--primary)))'}} />
                </div>
            </div>
           <Progress value={progress} className="h-1" indicatorClassName="shadow-[0_0_15px_2px_hsl(var(--primary))] transition-all duration-300" />
        </div>
        <p className="text-sm text-primary/80 tracking-widest">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
