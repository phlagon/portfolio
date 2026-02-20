
"use client";

import { AboutSection } from "@/components/home/about-section";
import { Reveal } from "@/components/ui/reveal";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-background pt-12">
      <div className="container max-w-7xl mx-auto px-4">
        <Reveal className="mb-12">
          <Link href="/" className="inline-flex items-center text-xs uppercase tracking-widest font-black text-primary hover:opacity-70 transition-opacity">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back Home
          </Link>
        </Reveal>
      </div>
      <AboutSection />
      
      <section className="py-24 border-t border-white/5">
        <div className="container max-w-4xl mx-auto px-4">
            <Reveal className="grid md:grid-cols-2 gap-16">
                <div className="space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Core Expertise</h3>
                    <ul className="space-y-4 text-foreground/60 text-sm font-light uppercase tracking-widest">
                        <li>Visual Identity & Branding</li>
                        <li>UI/UX Strategy & Design</li>
                        <li>Interactive Prototyping</li>
                        <li>Motion Graphics</li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Design Philosophy</h3>
                    <p className="text-foreground/60 text-sm leading-loose">
                        I believe in design that transcends aesthetic appeal to solve real-world problems. By balancing high-end visuals with intuitive functionality, I create digital experiences that resonate emotionally while delivering measurable results.
                    </p>
                </div>
            </Reveal>
        </div>
      </section>
    </main>
  );
}
