'use client';

import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

export function AboutSection() {
  const helloCat = placeholderImages.find(p => p.id === 'hello-cat');
  const profileImage = placeholderImages.find(p => p.id === 'profile');

  return (
    <section id="about" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background py-16 md:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M20 0v20H0v-2.28c7.23-1.72 12.05-5.22 14.5-8.12C16.95 6.72 18.28 4.09 20 0zm0 40V20h20v2.28c-7.23 1.72-12.05 5.22-14.5 8.12C23.05 33.28 21.72 35.91 20 40zM0 20h20L0 0v20zm40 0H20l20 20V20z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />

      <div className="container z-10 grid grid-cols-1 items-center gap-12 md:grid-cols-2 animate-fade-in-up">
        {/* Left side */}
        <div className="space-y-8 text-center md:text-left">
          <div className="relative inline-block animate-fade-in-down">
            <h1 className="text-8xl font-extrabold uppercase text-white md:text-9xl lg:text-[10rem]">
              Hello!
            </h1>
            {helloCat && (
              <div className="absolute -top-10 -right-8 w-24 md:-top-16 md:-right-4 md:w-32 animate-fade-in-down [animation-delay:400ms]">
                <Image
                  src={helloCat.imageUrl}
                  alt={helloCat.description}
                  width={150}
                  height={100}
                  data-ai-hint={helloCat.imageHint}
                  className="transform -scale-x-100"
                />
              </div>
            )}
          </div>
          <div className="animate-fade-in-up [animation-delay:600ms]">
            <div className="relative mx-auto max-w-md rounded-lg border-2 border-primary/50 p-6 text-left shadow-lg backdrop-blur-sm md:mx-0 bg-background/50">
              <p className="text-base text-foreground/80">
                "To me, design is more than just pixels on a screen it's a solution to a problem. My background has shaped the way I see the world, encouraging me to design with empathy at the core of every user journey I create. From poster design to websites and mobile interfaces, I focus on building digital spaces that are intuitive, accessible, and intentional. Every element has a purpose. If it doesn't serve the user or align with the brand's goals, it doesn't stay."
              </p>
              <p className="mt-4 text-right font-semibold italic text-primary">
                I design things that work for the people who use them.
              </p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="relative flex flex-col items-center justify-center space-y-4">
          <div className="text-center animate-fade-in-down [animation-delay:200ms]">
            <p className="font-cursive text-5xl text-primary">I am Benzitta</p>
            <svg
              className="mx-auto mt-2 h-16 w-16 text-primary"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M85.4167 14.5833C75 25.0001 58.3333 41.6667 50 58.3334C41.6667 75.0001 35.4167 85.4167 29.1667 85.4167C22.9167 85.4167 18.75 79.1667 18.75 70.8334"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
                className="animate-draw [animation-delay:800ms]"
              />
              <path
                d="M20.8333 75C21.875 73.9584 25 70.8334 29.1667 70.8334C33.3333 70.8334 33.3333 75 29.1667 79.1667"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-fade-in [animation-delay:1200ms]"
              />
            </svg>
          </div>
          {profileImage && (
            <div className="w-64 h-96 relative animate-fade-in-up [animation-delay:800ms]">
              <Image
                src={profileImage.imageUrl}
                alt="A portrait of Benzitta"
                fill
                data-ai-hint={profileImage.imageHint}
                className="rounded-lg object-cover filter grayscale"
              />
               <div className="absolute inset-0 bg-primary/20 mix-blend-color rounded-lg"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            </div>
          )}
        </div>
      </div>
       <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-draw {
          animation: draw 1s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in forwards;
        }
      `}</style>
    </section>
  );
}
