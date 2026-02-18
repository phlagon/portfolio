'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Plane, MapPin, Luggage, Gem, Sparkles, Crown, ChevronLeft, ChevronRight } from 'lucide-react';

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
  
  const projectImages = (project.imageIds || []).map(id => placeholderImages.find(img => img.id === id)).filter(Boolean) as any[];
  const isAppProject = project.tags.includes("Mobile App");
  const isLosmoProject = project.id === 'project-2';
  const isPackageProject = project.id === 'project-5';
  const isTypeSpecimen = project.id === 'project-6';

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-8">
        <Link href="/#projects" className="inline-flex items-center text-sm text-foreground/80 hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </div>

      <header className="mb-8 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary animate-fade-in-down">{project.title}</h1>
        <div className="flex justify-center flex-wrap gap-2 animate-fade-in-down" style={{ animationDelay: '200ms' }}>
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-sm">{tag}</Badge>
          ))}
        </div>
      </header>

      {isLosmoProject && (
        <div className="flex justify-center gap-4 mb-12 animate-fade-in-down" style={{ animationDelay: '300ms' }}>
          <Button 
            variant={activePart === 'website' ? 'default' : 'outline'}
            onClick={() => setActivePart('website')}
            className="rounded-full px-6"
          >
            Website
          </Button>
          <Button 
            variant={activePart === 'app' ? 'default' : 'outline'}
            onClick={() => setActivePart('app')}
            className="rounded-full px-6"
          >
            App Concept
          </Button>
          <Button 
            variant={activePart === 'logo' ? 'default' : 'outline'}
            onClick={() => setActivePart('logo')}
            className="rounded-full px-6"
          >
            Logo Variation
          </Button>
        </div>
      )}
      
      <div className="flex flex-col gap-16 items-center">
        {/* Video for Package Project - Displayed at the top */}
        {isPackageProject && (
          <div className="w-full max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: '300ms' }}>
             <div className="p-4 rounded-xl bg-gradient-to-br from-card to-background/80 border border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden">
                <video
                    src="https://raw.githubusercontent.com/phlagon/purr-folio/9cdfabedb3d405c90563cc732aaa3532d718a5bb/medmix%20packaging.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto rounded-lg"
                >
                    Your browser does not support the video tag.
                </video>
             </div>
          </div>
        )}

        <div className="animate-fade-in-up w-full" style={{ animationDelay: '400ms' }}>
          {isAppProject ? (
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
                <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-background">
                    <Carousel className="w-full h-full">
                      <CarouselContent className="ml-0">
                        {projectImages.map((image, index) => (
                          <CarouselItem key={index} className="p-0">
                            <Card className="border-none shadow-none h-full w-full bg-transparent">
                              <CardContent className="p-0 h-full overflow-y-auto">
                                {image && (
                                  <Image
                                    src={image.imageUrl}
                                    alt={`${project.title} screenshot ${index + 1}`}
                                    width={272}
                                    height={598}
                                    className="w-full h-auto"
                                    data-ai-hint={image.imageHint}
                                    priority={index === 0}
                                  />
                                )}
                              </CardContent>
                            </Card>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-4 text-primary" />
                      <CarouselNext className="right-4 text-primary" />
                    </Carousel>
                </div>
            </div>
          ) : isLosmoProject ? (
            <div className="w-full">
              {activePart === 'website' && (
                <div className="p-4 rounded-xl bg-gradient-to-br from-card to-background/80 border border-primary/20 shadow-2xl shadow-primary/10 w-full max-w-6xl mx-auto">
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
                                        width={800}
                                        height={1200}
                                        data-ai-hint={image.imageHint}
                                        className="w-full h-auto"
                                    />
                                    )}
                                </CardContent>
                                </Card>
                            </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-[-50px] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CarouselNext className="right-[-50px] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Carousel>
                </div>
              )}

              {activePart === 'app' && (
                <div className="space-y-12 max-w-6xl mx-auto animate-fade-in-up">
                  <div className="space-y-12">
                    <Card className="overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                      <CardContent className="p-0">
                        <Image
                          src="https://raw.githubusercontent.com/phlagon/purr-folio/71c54d64fd51dfb14c2157d784043438c397591f/Screenshot%202026-02-08%20at%2021.23.20.png?raw=true"
                          alt="LOSMO App Screenshot 1"
                          width={1200}
                          height={900}
                          className="w-full h-auto object-cover"
                          data-ai-hint="app mockup"
                        />
                      </CardContent>
                    </Card>
                    <Card className="overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                      <CardContent className="p-0">
                        <Image
                          src="https://raw.githubusercontent.com/phlagon/purr-folio/71c54d64fd51dfb14c2157d784043438c397591f/Screenshot%202026-02-08%20at%2021.22.21.png?raw=true"
                          alt="LOSMO App Screenshot 2"
                          width={1200}
                          height={900}
                          className="w-full h-auto object-cover"
                          data-ai-hint="app screen"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activePart === 'logo' && (
                <div className="max-w-6xl mx-auto animate-fade-in-up">
                  <Card className="overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                    <CardContent className="p-0">
                      <Image
                        src="https://raw.githubusercontent.com/phlagon/purr-folio/71c54d64fd51dfb14c2157d784043438c397591f/Screenshot%202026-02-08%20at%2021.23.50.png?raw=true"
                        alt="LOSMO Logo Variation"
                        width={1200}
                        height={900}
                        className="w-full h-auto object-cover"
                        data-ai-hint="logo variation"
                      />
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          ) : isTypeSpecimen ? (
            <div className="w-full max-w-5xl mx-auto animate-fade-in-up">
              <div className="relative perspective-2000 h-[90vh] w-full flex items-center justify-center">
                {projectImages.map((image, idx) => (
                  <div 
                    key={idx}
                    className={cn(
                      "absolute inset-0 transition-all duration-1000 transform-gpu origin-left ease-in-out",
                      idx === currentPage 
                        ? "z-20 rotate-y-0 translate-z-0 opacity-100 scale-100" 
                        : idx < currentPage 
                          ? "z-10 -rotate-y-110 -translate-x-full translate-z-20 skew-y-6 opacity-0 pointer-events-none scale-95" 
                          : "z-0 rotate-y-5 translate-z-[-50px] opacity-0 pointer-events-none scale-105"
                    )}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      transitionTimingFunction: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
                    }}
                  >
                    <Card className="h-full w-full overflow-hidden border-2 border-primary/20 bg-background shadow-2xl relative">
                      <CardContent className="p-0 h-full flex items-center justify-center relative group">
                        <Image
                          src={image.imageUrl}
                          alt={`Page ${idx + 1}`}
                          fill
                          className="object-contain p-8 transition-transform duration-1000 group-hover:scale-[1.02]"
                        />
                        
                        {/* Curved fold shadow - simulate the "flow" of paper */}
                        <div className={cn(
                          "absolute inset-0 pointer-events-none transition-opacity duration-1000",
                          idx === currentPage ? "opacity-0" : "opacity-40",
                          "bg-gradient-to-r from-black/60 via-transparent to-transparent"
                        )} />

                        {/* Moving highlight shadow during the turn */}
                        <div className={cn(
                          "absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out",
                          idx < currentPage ? "translate-x-full opacity-0" : "translate-x-[-100%] opacity-0",
                          "bg-gradient-to-r from-transparent via-white/5 to-transparent z-30"
                        )} />
                        
                        <div className="absolute bottom-4 right-8 text-xs text-foreground/40 font-mono">
                          {idx + 1} / {projectImages.length}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
                
                {/* Navigation Overlays */}
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  className={cn(
                    "absolute left-4 z-30 p-2 rounded-full bg-background/50 backdrop-blur hover:bg-primary hover:text-primary-foreground transition-all border border-primary/20",
                    currentPage === 0 && "opacity-0 pointer-events-none"
                  )}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(projectImages.length - 1, prev + 1))}
                  className={cn(
                    "absolute right-4 z-30 p-2 rounded-full bg-background/50 backdrop-blur hover:bg-primary hover:text-primary-foreground transition-all border border-primary/20",
                    currentPage === projectImages.length - 1 && "opacity-0 pointer-events-none"
                  )}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-gradient-to-br from-card to-background/80 border border-primary/20 shadow-2xl shadow-primary/10 w-full max-w-6xl mx-auto">
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
                              style={{ objectFit: 'contain' }}
                              data-ai-hint={image.imageHint}
                              className="rounded-lg object-contain"
                            />
                          )}
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-[-50px] opacity-0 group-hover:opacity-100 transition-opacity" />
                <CarouselNext className="right-[-50px] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Carousel>
            </div>
          )}
        </div>
        
        <div className="space-y-4 animate-fade-in-up max-w-3xl mx-auto text-center" style={{ animationDelay: '600ms' }}>
            <h2 className="text-xs font-bold font-headline uppercase tracking-widest text-primary">The Vision</h2>
            <p className="text-[10px] text-foreground/80 leading-relaxed uppercase tracking-widest px-4">
              {project.longDescription}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-primary text-[10px] uppercase tracking-tighter opacity-80">
                {isAppProject ? (
                    <>
                        <div className="flex items-center gap-2">
                            <Plane className="h-3 w-3"/>
                            <span className="font-semibold">Seamless Journeys</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3"/>
                            <span className="font-semibold">Intuitive Navigation</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Luggage className="h-3 w-3"/>
                            <span className="font-semibold">Luxury Experience</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2">
                            <Gem className="h-3 w-3"/>
                            <span className="font-semibold">Timeless Elegance</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-3 w-3"/>
                            <span className="font-semibold">Modern Craft</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Crown className="h-3 w-3"/>
                            <span className="font-semibold">Signature Luxury</span>
                        </div>
                    </>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
