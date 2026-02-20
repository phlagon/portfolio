'use client';
import Image from 'next/image';
import { Reveal } from '@/components/ui/reveal';

export function AboutSection() {
  return (
    <section id="about" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background py-24">
      <div className="container z-10 grid grid-cols-1 md:grid-cols-5 items-center gap-16">
        <Reveal className="relative md:col-span-2">
           <div 
             className="drop-shadow-[0_20px_30px_hsl(var(--primary)/0.15)] rounded-2xl overflow-hidden"
             style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}
           >
             <Image 
              src="https://raw.githubusercontent.com/phlagon/purr-folio/3863ba822557d640e0d73661c34f9cfc16c53baf/trail%204%403x%403x.png"
              alt="Benzitta"
              width={800}
              height={800}
              className="mx-auto w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
              data-ai-hint="portrait"
              priority
             />
           </div>
        </Reveal>
        <Reveal delay={200} className="space-y-8 text-center md:text-left md:col-span-3">
          <h2 className="text-6xl md:text-8xl font-bold text-white/10 uppercase tracking-tighter leading-none mb-[-2rem]">
            Hello!
          </h2>
          <p className="font-cursive text-4xl text-primary pl-4">I am Benzitta</p>
          
          <div className="max-w-xl space-y-6">
            <p className="text-lg text-foreground/80 leading-relaxed italic border-l-4 border-primary pl-6 py-2">
              "To me, design is more than just pixels on a screen—it's a solution to a problem. My background has shaped the way I see the world, encouraging me to design with empathy at the core of every user journey I create."
            </p>
            <p className="text-base text-foreground/60 leading-relaxed">
              From branding and interaction to complete mobile interfaces, I focus on building digital spaces that are intuitive, accessible, and intentional. Every element has a purpose. If it doesn't serve the user or align with the brand's goals, it doesn't stay.
            </p>
            <p className="text-lg font-bold text-primary">
              I design things that work for the people who use them.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
