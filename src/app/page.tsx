import { CatModel } from '@/components/cat/cat-model';
import { Header } from '@/components/layout/header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-4 -mt-14">
          <div className="absolute inset-0 opacity-30">
            <CatModel />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 font-headline animate-fade-in-down">
              Hi, I'm PurrfectDev
            </h1>
            <p className="text-lg md:text-2xl text-foreground/80 max-w-2xl mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              I design & build delightful, whisker-twitching experiences for the web. Welcome to my playground.
            </p>
            <Link href="/about" passHref>
              <Button size="lg" className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Explore My Work <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
