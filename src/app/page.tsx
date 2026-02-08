"use client";

import { useState, useEffect } from "react";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Loading } from "@/components/layout/loading";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setShowLoader(false);
          }, 500); // Wait half a second after 100%
          return 100;
        }
        return oldProgress + 1;
      });
    }, 30);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (showLoader) {
    return <Loading progress={progress} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-white p-4 overflow-hidden">
        <div className="grid grid-cols-[auto_1fr] items-center gap-4 md:gap-8 max-w-6xl w-full">
            <div className="hidden md:block justify-self-center">
                <h2 style={{ writingMode: 'vertical-rl' }} className="transform rotate-180 uppercase tracking-widest text-lg text-white/70">
                UI &amp; UX
                </h2>
            </div>

            <div>
                <div className="text-center md:text-left">
                    <p className="text-lg md:text-xl text-white/90 max-w-md mx-auto md:mx-0 text-center md:text-left">
                      I'm PurrfectDev, welcome to my whisker-twitching portfolio.
                    </p>
                    <hr className="border-t border-white/80 mt-1 max-w-sm mx-auto md:mx-0" />
                </div>

                <div className="relative mt-4 flex items-center justify-center md:justify-start">
                    <h1 className="text-7xl sm:text-8xl md:text-[120px] lg:text-[160px] font-extrabold tracking-tighter leading-none whitespace-nowrap flex items-center">
                        <span className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>PORTF</span>
                        <span className="relative">
                            O
                        </span>
                        LIO
                    </h1>
                </div>
            </div>
        </div>

        <h2 className="md:hidden text-lg uppercase tracking-widest text-white/70 mt-16">
          UI &amp; UX
        </h2>
      </main>
      <Footer />
    </div>
  );
}
