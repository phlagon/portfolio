import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

export default function Home() {
  const catImage = placeholderImages.find(p => p.id === 'portfolio-hero-cat');

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
                            {catImage && (
                                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[80px] h-[60px] sm:w-[120px] sm:h-[90px] md:w-[160px] md:h-[120px] animate-cat-peek">
                                    <Image
                                        src={catImage.imageUrl}
                                        alt={catImage.description}
                                        fill
                                        className="object-contain"
                                        data-ai-hint={catImage.imageHint}
                                        priority
                                    />
                                </div>
                            )}
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
