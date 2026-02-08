'use client';
import Image from 'next/image';

export function AboutSection() {
  return (
    <section id="about" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-transparent py-16 md:py-24">
      <div className="container z-10 grid grid-cols-1 md:grid-cols-5 items-center gap-8 md:gap-16">
        <div className="relative animate-fade-in-up [animation-delay:400ms] order-last md:order-first md:col-span-2">
           <Image 
            src="https://raw.githubusercontent.com/phlagon/purr-folio/3863ba822557d640e0d73661c34f9cfc16c53baf/trail%204%403x%403x.png"
            alt="Benzitta"
            width={800}
            height={800}
            className="mx-auto w-full h-auto drop-shadow-[0_20px_30px_hsl(var(--primary)/0.2)]"
            data-ai-hint="portrait"
            priority
           />
        </div>
        <div className="space-y-8 text-center md:text-left md:col-span-3">
          <div className="relative inline-block md:inline-block animate-fade-in-down">
            <h1 className="text-8xl font-extrabold uppercase text-white md:text-9xl lg:text-[10rem]">
              Hello!
            </h1>
          </div>
          <p className="font-cursive text-5xl text-primary animate-fade-in-down [animation-delay:200ms]">I am Benzitta</p>
          <div className="animate-fade-in-up [animation-delay:600ms]">
            <div className="relative mx-auto md:mx-0 max-w-xl rounded-lg border-2 border-primary/50 p-6 text-center md:text-left shadow-lg backdrop-blur-sm bg-background/50">
              <p className="text-base text-foreground/80">
                "To me, design is more than just pixels on a screen it's a solution to a problem. My background has shaped the way I see the world, encouraging me to design with empathy at the core of every user journey I create. From poster design to websites and mobile interfaces, I focus on building digital spaces that are intuitive, accessible, and intentional. Every element has a purpose. If it doesn't serve the user or align with the brand's goals, it doesn't stay."
              </p>
              <p className="mt-4 text-center md:text-left font-semibold italic text-primary">
                I design things that work for the people who use them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
