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
                    <p className="text-xl md:text-2xl text-white/90 tracking-widest">Graphic Designer</p>
                    <hr className="border-t border-white/80 mt-1 max-w-sm mx-auto md:mx-0" />
                </div>

                <div className="relative mt-4 flex items-center justify-center md:justify-start">
                    <h1 className="text-7xl sm:text-8xl md:text-[120px] lg:text-[160px] font-extrabold tracking-tighter leading-none whitespace-nowrap">
                        <span className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>PORTF</span>
                        OLIO
                    </h1>
                    {catImage && (
                        <div className="relative w-[100px] h-[150px] sm:w-[150px] sm:h-[225px] md:w-[200px] md:h-[300px] -ml-8 -mb-4">
                        <Image
                            src={catImage.imageUrl}
                            alt={catImage.description}
                            fill
                            className="object-contain"
                            data-ai-hint={catImage.imageHint}
                        />
                        </div>
                    )}
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
