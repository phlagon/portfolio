"use client";

import { useState, useEffect } from "react";
import { Loading } from "@/components/layout/loading";
import { AboutSection } from "@/components/home/about-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { HeroGraphic } from "@/components/home/hero-graphic";

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
    <main>
      <section id="home" className="flex flex-1 flex-col items-center justify-center text-white p-4 overflow-hidden min-h-screen">
        <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-8 max-w-6xl w-full">
            <div className="hidden md:block">
                <h2 style={{ writingMode: 'vertical-rl' }} className="transform rotate-180 uppercase tracking-widest text-lg text-foreground/70 justify-self-start">
                    Branding & Identity
                </h2>
            </div>
            
            <div className="flex flex-col items-center text-center w-full">
                 <div className="relative flex items-center justify-center w-full max-w-sm mx-auto aspect-square my-8">
                    <HeroGraphic />
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                    Creative Digital Design
                </h1>
                <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-2xl">
                    Specializing in UI/UX, branding, and packaging that combines elegance with purpose.
                </p>
            </div>

            <div className="hidden md:block">
                <h2 style={{ writingMode: 'vertical-rl' }} className="uppercase tracking-widest text-lg text-foreground/70 justify-self-end">
                    UI/UX & Interaction
                </h2>
            </div>
        </div>

        <div className="md:hidden text-lg uppercase tracking-widest text-foreground/70 mt-16 flex flex-wrap justify-center gap-x-4 gap-y-2">
          <span>UI/UX</span>
          <span>Branding</span>
          <span>Logos</span>
          <span>Packaging</span>
        </div>
      </section>
      <div className="relative isolate">
        <video autoPlay loop muted playsInline className="absolute inset-0 -z-10 h-full w-full object-cover">
            <source src="https://raw.githubusercontent.com/phlagon/purr-folio/main/web-bg1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className="relative z-10">
          <AboutSection />
          <ProjectsSection />
        </div>
      </div>
    </main>
  );
}
