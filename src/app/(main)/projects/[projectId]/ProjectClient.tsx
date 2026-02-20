
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Plane, MapPin, Luggage, Gem, Sparkles, Crown, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

import type { ImagePlaceholder } from '@/lib/placeholder-images';
import type { projects } from '@/lib/projects';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ProjectType = (typeof projects)[0];

export default function ProjectClient({ project, placeholderImages }: { project: ProjectType, placeholderImages: ImagePlaceholder[] }) {
  const [activePart, setActivePart] = useState<'website' | 'app' | 'logo'>('website');
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [rapidoScreen, setRapidoScreen] = useState<'ride' | 'travel' | 'offline' | 'live' | 'profile' | 'flight'>('ride');
  
  const projectImages = (project.imageIds || []).map(id => placeholderImages.find(img => img.id === id)).filter(Boolean) as any[];
  const isRapido = project.id === 'project-1';
  const isLosmoProject = project.id === 'project-2';
  const isPackageProject = project.id === 'project-5';
  const isTypeSpecimen = project.id === 'project-6';

  const handleNextPage = () => {
    if (currentPage < projectImages.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsAnimating(false);
      }, 3500); 
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0 && !isAnimating) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const getRapidoImage = () => {
    const id = rapidoScreen === 'ride' ? 'rapido-home' 
             : rapidoScreen === 'travel' ? 'rapido-travel' 
             : rapidoScreen === 'flight' ? 'rapido-flight'
             : 'rapido-home'; // Fallback for placeholders
    return placeholderImages.find(img => img.id === id);
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-8">
        <Link href="/#projects" className="inline-flex items-center text-sm text-foreground/80 hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </div>

      <header className="mb-8 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary uppercase tracking-tighter">{project.title}</h1>
        <div className="flex justify-center flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] uppercase tracking-wider font-bold bg-white/5 border-white/10">{tag}</Badge>
          ))}
        </div>
      </header>

      {isLosmoProject && (
        <div className="flex justify-center gap-4 mb-12">
          <button 
            onClick={() => setActivePart('website')}
            className={cn(
              "px-6 py-2 rounded-full border transition-all text-[10px] uppercase tracking-widest font-bold",
              activePart === 'website' ? "bg-primary text-black border-primary" : "bg-transparent text-foreground/70 border-white/10 hover:border-primary/50"
            )}
          >
            Website
          </button>
          <button 
            onClick={() => setActivePart('app')}
            className={cn(
              "px-6 py-2 rounded-full border transition-all text-[10px] uppercase tracking-widest font-bold",
              activePart === 'app' ? "bg-primary text-black border-primary" : "bg-transparent text-foreground/70 border-white/10 hover:border-primary/50"
            )}
          >
            App Concept
          </button>
          <button 
            onClick={() => setActivePart('logo')}
            className={cn(
              "px-6 py-2 rounded-full border transition-all text-[10px] uppercase tracking-widest font-bold",
              activePart === 'logo' ? "bg-primary text-black border-primary" : "bg-transparent text-foreground/70 border-white/10 hover:border-primary/50"
            )}
          >
            Logo Variation
          </button>
        </div>
      )}
      
      <div className="flex flex-col gap-16 items-center">
        {isPackageProject && (
          <div className="w-full max-w-6xl mx-auto">
             <div className="p-4 rounded-xl bg-gradient-to-br from-card to-background/80 border border-white/5 shadow-2xl overflow-hidden">
                <video
                    src="https://raw.githubusercontent.com/phlagon/purr-folio/9cdfabedb3d405c90563cc732aaa3532d718a5bb/medmix%20packaging.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto rounded-lg grayscale hover:grayscale-0 transition-all duration-700"
                >
                    Your browser does not support the video tag.
                </video>
             </div>
          </div>
        )}

        <div className="w-full">
          {isRapido ? (
            <div className="flex flex-col items-center gap-8">
              <div className="relative mx-auto border-[#1a1a1a] bg-[#1a1a1a] border-[14px] rounded-[2.5rem] h-[650px] w-[320px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
                  <div className="w-[148px] h-[18px] bg-[#1a1a1a] top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-40"></div>
                  <div className="h-[46px] w-[3px] bg-[#1a1a1a] absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                  <div className="h-[46px] w-[3px] bg-[#1a1a1a] absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                  <div className="h-[64px] w-[3px] bg-[#1a1a1a] absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                  
                  <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black relative">
                      <div className="w-full h-full overflow-y-auto scrollbar-hide">
                        {getRapidoImage() && (
                          <div className="relative w-full animate-in fade-in duration-500">
                            <Image
                              src={getRapidoImage()!.imageUrl}
                              alt={`Rapido ${rapidoScreen}`}
                              width={320}
                              height={1000}
                              className="w-full h-auto block"
                              priority
                            />
                            
                            {/* Inner hotspots (screen specific) */}
                            {rapidoScreen === 'travel' && (
                              <button 
                                onClick={() => setRapidoScreen('flight')}
                                className="absolute top-[28%] left-0 w-[33%] h-[12%] bg-transparent cursor-pointer z-30"
                                title="Click Flight Tab"
                              />
                            )}
                          </div>
                        )}
                      </div>

                      {/* Sticky Bottom Nav Hotspots */}
                      <div className="absolute bottom-0 left-0 w-full h-[12%] bg-transparent flex z-50">
                        <button onClick={() => setRapidoScreen('ride')} className="flex-1 h-full" title="Ride" />
                        <button onClick={() => setRapidoScreen('travel')} className="flex-1 h-full" title="Travel" />
                        <button onClick={() => setRapidoScreen('offline')} className="flex-1 h-full" title="Offline" />
                        <button onClick={() => setRapidoScreen('live')} className="flex-1 h-full" title="Live" />
                        <button onClick={() => setRapidoScreen('profile')} className="flex-1 h-full" title="Profile" />
                      </div>

                      {/* Floating Reset Button */}
                      {rapidoScreen !== 'ride' && (
                        <button 
                          onClick={() => setRapidoScreen('ride')}
                          className="absolute bottom-20 right-4 w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center z-[60] shadow-xl hover:scale-110 transition-transform"
                          title="Return to Home"
                        >
                          <RotateCcw className="h-5 w-5" />
                        </button>
                      )}
                  </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] text-primary font-bold uppercase tracking-[0.3em] opacity-80">Interactive Prototype</p>
                <p className="text-[10px] text-foreground/40 uppercase tracking-[0.1em]">Scroll vertically • Use bottom tabs to navigate</p>
              </div>
            </div>
          ) : isLosmoProject ? (
            <div className="w-full">
              {activePart === 'website' && (
                <div className="p-4 rounded-xl bg-gradient-to-br from-card to-background/80 border border-white/5 shadow-2xl w-full max-w-6xl mx-auto">
                    <Carousel className="w-full group">
                        <CarouselContent>
                            {projectImages.map((image, index) => (
                            <CarouselItem key={index}>
                                <Card className="border-none shadow-none bg-transparent">
                                <CardContent className="relative p-0 rounded-lg overflow-y-auto h-[90vh]">
                                    {image && (
                                    <Image
                                        src={image.imageUrl}
                                        alt={`${project.title} image ${index + 1}`}
                                        width={1200}
                                        height={1800}
                                        className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                    )}
                                </CardContent>
                                </Card>
                            </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 border-white/10" />
                        <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 border-white/10" />
                    </Carousel>
                </div>
              )}

              {activePart === 'app' && (
                <div className="space-y-12 max-w-6xl mx-auto">
                  <div className="space-y-12">
                    <Card className="overflow-hidden border border-white/5 shadow-2xl">
                      <CardContent className="p-0">
                        <Image
                          src="https://raw.githubusercontent.com/phlagon/purr-folio/71c54d64fd51dfb14c2157d784043438c397591f/Screenshot%202026-02-08%20at%2021.23.20.png?raw=true"
                          alt="LOSMO App Screenshot 1"
                          width={1200}
                          height={900}
                          className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                      </CardContent>
                    </Card>
                    <Card className="overflow-hidden border border-white/5 shadow-2xl">
                      <CardContent className="p-0">
                        <Image
                          src="https://raw.githubusercontent.com/phlagon/purr-folio/71c54d64fd51dfb14c2157d784043438c397591f/Screenshot%202026-02-08%20at%2021.22.21.png?raw=true"
                          alt="LOSMO App Screenshot 2"
                          width={1200}
                          height={900}
                          className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activePart === 'logo' && (
                <div className="max-w-6xl mx-auto">
                  <Card className="overflow-hidden border border-white/5 shadow-2xl">
                    <CardContent className="p-0">
                      <Image
                        src="https://raw.githubusercontent.com/phlagon/purr-folio/71c54d64fd51dfb14c2157d784043438c397591f/Screenshot%202026-02-08%20at%2021.23.50.png?raw=true"
                        alt="LOSMO Logo Variation"
                        width={1200}
                        height={900}
                        className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          ) : isTypeSpecimen ? (
            <div className="w-full max-w-5xl mx-auto">
              <div className="relative perspective-3000 h-[90vh] w-full flex items-center justify-center">
                {projectImages.map((image, idx) => {
                  const isCurrent = idx === currentPage;
                  const isNext = idx === currentPage + 1 && isAnimating;
                  const isVisible = isCurrent || isNext;
                  
                  if (!isVisible && idx < currentPage) return (
                    <div key={idx} className="absolute inset-0 page-base page-flipped" />
                  );
                  if (!isVisible) return (
                    <div key={idx} className="absolute inset-0 page-base page-upcoming" />
                  );

                  return (
                    <div 
                      key={idx}
                      className={cn(
                        "absolute inset-0 page-base",
                        isCurrent 
                          ? (isAnimating ? "page-folding" : "page-active") 
                          : "page-visible-under"
                      )}
                    >
                      <Card className="h-full w-full overflow-hidden border border-white/5 bg-background shadow-2xl relative">
                        <CardContent className="p-0 h-full flex items-center justify-center relative">
                          <Image
                            src={image.imageUrl}
                            alt={`Page ${idx + 1}`}
                            fill
                            className="object-contain p-8 grayscale"
                          />
                          
                          {isCurrent && isAnimating && <div className="fold-shadow" />}

                          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/40 to-transparent pointer-events-none z-10" />
                          
                          <div className="absolute bottom-4 right-8 text-[10px] text-white/20 font-mono tracking-widest">
                            {idx + 1} / {projectImages.length}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
                
                <button 
                  onClick={handlePrevPage}
                  className={cn(
                    "absolute left-4 z-40 p-3 rounded-full bg-black/50 backdrop-blur hover:bg-primary hover:text-black transition-all border border-white/10",
                    (currentPage === 0 || isAnimating) && "opacity-0 pointer-events-none"
                  )}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleNextPage}
                  className={cn(
                    "absolute right-4 z-40 p-3 rounded-full bg-black/50 backdrop-blur hover:bg-primary hover:text-black transition-all border border-white/10",
                    (currentPage === projectImages.length - 1 || isAnimating) && "opacity-0 pointer-events-none"
                  )}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-gradient-to-br from-card to-background/80 border border-white/5 shadow-2xl w-full max-w-6xl mx-auto">
              <Carousel className="w-full group">
                <CarouselContent>
                  {projectImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <Card className="border-none shadow-none bg-transparent">
                        <CardContent className="relative h-[90vh] flex items-center justify-center p-0">
                          {image && (
                            <Image
                              src={image.imageUrl}
                              alt={`${project.title} image ${index + 1}`}
                              fill
                              className="rounded-lg object-contain grayscale hover:grayscale-0 transition-all duration-700"
                            />
                          )}
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 border-white/10" />
                <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 border-white/10" />
              </Carousel>
            </div>
          )}
        </div>
        
        <div className="space-y-4 max-w-3xl mx-auto text-center">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">The Vision</h2>
            <p className="text-xs text-foreground/60 leading-relaxed uppercase tracking-widest px-8">
              {project.longDescription}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 pt-8 text-primary text-[10px] uppercase tracking-[0.2em] opacity-40">
                {isRapido ? (
                    <>
                        <div className="flex items-center gap-2">
                            <Plane className="h-4 w-4"/>
                            <span className="font-bold">Seamless Journeys</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4"/>
                            <span className="font-bold">Intuitive Navigation</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Luggage className="h-4 w-4"/>
                            <span className="font-bold">Luxury Experience</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2">
                            <Gem className="h-4 w-4"/>
                            <span className="font-bold">Timeless Elegance</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4"/>
                            <span className="font-bold">Modern Craft</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Crown className="h-4 w-4"/>
                            <span className="font-bold">Signature Luxury</span>
                        </div>
                    </>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
