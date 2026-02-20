
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Plane, 
  MapPin, 
  Luggage, 
  Gem, 
  Sparkles, 
  Crown, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  Navigation,
  Palmtree,
  CloudOff,
  User,
  Briefcase
} from 'lucide-react';

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
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [rapidoScreen, setRapidoScreen] = useState<'ride' | 'travel' | 'offline' | 'live' | 'profile' | 'flight'>('ride');
  
  const projectImages = (project.imageIds || []).map(id => placeholderImages.find(img => img.id === id)).filter(Boolean) as any[];
  const isRapido = project.id === 'project-1';
  const isPackageProject = project.id === 'project-5';
  const isTypeSpecimen = project.id === 'project-6';

  const handleNextPage = () => {
    if (currentPage < projectImages.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsAnimating(false);
      }, 2500); 
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0 && !isAnimating) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const getRapidoImage = () => {
    if (rapidoScreen === 'flight') return placeholderImages.find(img => img.id === 'rapido-flight')?.imageUrl;
    if (rapidoScreen === 'travel') return "https://raw.githubusercontent.com/phlagon/purr-folio/d65df9b43e62721b4bff28ad3c0c65f1b90e3396/travel%202.jpg";
    return placeholderImages.find(img => img.id === 'rapido-home')?.imageUrl;
  };

  const navTabs = [
    { id: 'ride', label: 'Ride', icon: Navigation },
    { id: 'travel', label: 'Travel', icon: Palmtree },
    { id: 'offline', label: 'Offline', icon: CloudOff },
    { id: 'live', label: 'Live', icon: MapPin },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="container py-12 md:py-24">
      <div className="mb-12">
        <Link href="/#projects" className="inline-flex items-center text-xs uppercase tracking-widest font-black text-primary hover:opacity-70 transition-opacity">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Link>
      </div>

      <header className="mb-16 text-center space-y-6">
        <h1 className="text-5xl md:text-[10rem] font-black text-white uppercase tracking-tighter leading-none">{project.title}</h1>
        <div className="flex justify-center flex-wrap gap-3">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px] uppercase tracking-[0.2em] font-black border-primary/20 text-primary px-4 py-1">{tag}</Badge>
          ))}
        </div>
      </header>
      
      <div className="flex flex-col gap-24 items-center">
        {isPackageProject && (
          <div className="w-full max-w-6xl mx-auto">
             <div className="p-1 bg-white/5 border border-white/10 shadow-2xl overflow-hidden">
                <video
                    src="https://raw.githubusercontent.com/phlagon/purr-folio/9cdfabedb3d405c90563cc732aaa3532d718a5bb/medmix%20packaging.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto grayscale"
                >
                    Your browser does not support the video tag.
                </video>
             </div>
          </div>
        )}

        <div className="w-full">
          {isRapido ? (
            <div className="flex flex-col items-center gap-12">
              <div className="relative mx-auto border-[#0a0a0a] bg-[#0a0a0a] border-[12px] rounded-[3.5rem] h-[720px] w-[360px] shadow-[0_60px_120px_-30px_rgba(0,0,0,1)] overflow-hidden">
                  <div className="w-[120px] h-[34px] bg-black top-4 rounded-[1.2rem] left-1/2 -translate-x-1/2 absolute z-[70] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white/10 ml-auto mr-4" />
                  </div>
                  
                  <div className="w-full h-full bg-white relative flex flex-col">
                      <div className="flex-1 overflow-y-auto scrollbar-hide pb-[84px]">
                        <div className="relative w-full">
                          <Image
                            src={getRapidoImage() || ''}
                            alt={`Rapido Screen`}
                            width={360}
                            height={1200}
                            className="w-full h-auto block"
                            priority
                            unoptimized
                          />
                          
                          {rapidoScreen === 'travel' && (
                            <button 
                              onClick={() => setRapidoScreen('flight')}
                              className="absolute top-[18%] left-0 w-[40%] h-[15%] bg-transparent cursor-pointer z-[40]"
                              title="Go to Flights"
                            />
                          )}
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 w-full h-[84px] z-[60] bg-white border-t border-black/5 flex items-center justify-around px-2 pb-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                        {navTabs.map((tab) => {
                          const Icon = tab.icon;
                          const isActive = rapidoScreen === tab.id || (tab.id === 'travel' && rapidoScreen === 'flight');
                          return (
                            <button
                              key={tab.id}
                              onClick={() => setRapidoScreen(tab.id as any)}
                              className="flex flex-col items-center justify-center gap-1.5 h-full flex-1 transition-all duration-300"
                            >
                              <Icon 
                                className={cn(
                                  "h-6 w-6 transition-colors",
                                  isActive ? "text-[#F9D915]" : "text-black/40"
                                )} 
                              />
                              <span className={cn(
                                "text-[10px] font-bold tracking-tight transition-colors",
                                isActive ? "text-[#F9D915]" : "text-black"
                              )}>
                                {tab.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {rapidoScreen === 'flight' && (
                        <button 
                          onClick={() => setRapidoScreen('travel')}
                          className="absolute bottom-24 right-6 w-12 h-12 rounded-full bg-[#F9D915] text-black flex items-center justify-center z-[80] shadow-2xl hover:scale-110 transition-transform"
                        >
                          <RotateCcw className="h-5 w-5" />
                        </button>
                      )}
                  </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <p className="text-[10px] text-primary font-black uppercase tracking-[0.4em]">Interactive Mobile Prototype</p>
                <p className="text-[10px] text-foreground/30 uppercase tracking-[0.2em]">Vertical Scroll • Fixed App Shell Navigation</p>
              </div>
            </div>
          ) : isTypeSpecimen ? (
            <div className="w-full max-w-5xl mx-auto">
              <div className="relative perspective-3000 h-[80vh] w-full flex items-center justify-center">
                {projectImages.map((image, idx) => {
                  const isCurrent = idx === currentPage;
                  const isNext = idx === currentPage + 1 && isAnimating;
                  const isVisible = isCurrent || isNext;
                  
                  if (!isVisible) return null;

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
                      <Card className="h-full w-full overflow-hidden border-none bg-background shadow-2xl relative">
                        <CardContent className="p-0 h-full flex items-center justify-center relative">
                          <Image
                            src={image.imageUrl}
                            alt={`Page ${idx + 1}`}
                            fill
                            className="object-contain p-12 grayscale"
                          />
                          
                          {isCurrent && isAnimating && <div className="fold-shadow" />}

                          <div className="absolute inset-y-0 left-0 w-px bg-white/5 pointer-events-none z-10" />
                          
                          <div className="absolute bottom-6 right-10 text-[10px] text-white/20 font-black tracking-widest uppercase">
                            Plate {idx + 1}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
                
                <button 
                  onClick={handlePrevPage}
                  className={cn(
                    "absolute left-4 z-40 p-4 rounded-full bg-black/80 hover:bg-primary hover:text-black transition-all border border-white/10",
                    (currentPage === 0 || isAnimating) && "opacity-0 pointer-events-none"
                  )}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button 
                  onClick={handleNextPage}
                  className={cn(
                    "absolute right-4 z-40 p-4 rounded-full bg-black/80 hover:bg-primary hover:text-black transition-all border border-white/10",
                    (currentPage === projectImages.length - 1 || isAnimating) && "opacity-0 pointer-events-none"
                  )}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-1 bg-white/5 border border-white/10 shadow-2xl w-full max-w-6xl mx-auto">
              <Carousel className="w-full group">
                <CarouselContent>
                  {projectImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <Card className="border-none shadow-none bg-transparent">
                        <CardContent className="relative h-[85vh] flex items-center justify-center p-0">
                          {image && (
                            <Image
                              src={image.imageUrl}
                              alt={`${project.title} image ${index + 1}`}
                              fill
                              className="object-contain grayscale"
                            />
                          )}
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-6 bg-black/80 border-white/10" />
                <CarouselNext className="right-6 bg-black/80 border-white/10" />
              </Carousel>
            </div>
          )}
        </div>
        
        <div className="space-y-8 max-w-3xl mx-auto text-center pb-24">
            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary">Concept Narrative</h2>
            <p className="text-sm text-foreground/50 leading-loose uppercase tracking-[0.2em] px-12">
              {project.longDescription}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-16 pt-12 text-primary text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
                {isRapido ? (
                    <>
                        <div className="flex items-center gap-3">
                            <Plane className="h-5 w-5"/>
                            <span>Seamless</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5"/>
                            <span>Intuitive</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Luggage className="h-5 w-5"/>
                            <span>Premium</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-3">
                            <Gem className="h-5 w-5"/>
                            <span>Artisanal</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Sparkles className="h-5 w-5"/>
                            <span>Impactful</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Crown className="h-5 w-5"/>
                            <span>Elite</span>
                        </div>
                    </>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
