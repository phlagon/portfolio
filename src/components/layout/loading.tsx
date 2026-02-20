
'use client';

import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { placeholderImages } from "@/lib/placeholder-images";

export function Loading({ progress }: { progress: number }) {
  const splashImage = placeholderImages.find(img => img.id === 'homepage-splash');

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-[9999] transition-all duration-1000">
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        {splashImage && (
          <Image
            src={splashImage.imageUrl}
            alt="Benzitta Design Portfolio"
            fill
            className="object-cover grayscale"
            priority
          />
        )}
      </div>
      
      <div className="relative z-10 flex flex-col items-center gap-12 max-w-md px-8">
        <div className="w-48 h-48 relative rounded-full overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,255,255,0.1)]">
           {splashImage && (
             <Image
                src={splashImage.imageUrl}
                alt="Benzitta"
                fill
                className="object-cover"
                priority
             />
           )}
        </div>
        
        <div className="w-full space-y-4">
           <div className="flex justify-between items-end mb-2">
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Initializing Portfolio</span>
             <span className="text-[10px] font-black text-primary/60">{Math.round(progress)}%</span>
           </div>
           <Progress value={progress} className="h-[1px] bg-white/5" indicatorClassName="bg-primary" />
        </div>
        
        <p className="text-center text-[8px] text-white/30 uppercase tracking-[0.4em] font-light">
          Crafting Digital Experiences
        </p>
      </div>
    </div>
  );
}
