'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Plane, MapPin, Luggage, Gem, Sparkles, Crown } from 'lucide-react';

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

type ProjectType = (typeof projects)[0];

export default function ProjectClient({ project, placeholderImages }: { project: ProjectType, placeholderImages: ImagePlaceholder[] }) {
  const projectImages = (project.imageIds || []).map(id => placeholderImages.find(img => img.id === id)).filter(Boolean) as any[];
  const isAppProject = project.tags.includes("Mobile App");
  const isLosmoProject = project.id === 'project-2';
  const isPackageProject = project.id === 'project-5';

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-8">
        <Link href="/#projects" className="inline-flex items-center text-sm text-foreground/80 hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </div>

      <header className="mb-12 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary animate-fade-in-down">{project.title}</h1>
        <div className="flex justify-center flex-wrap gap-2 animate-fade-in-down" style={{ animationDelay: '200ms' }}>
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-sm">{tag}</Badge>
          ))}
        </div>
      </header>
      
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
            <h2 className="text-lg font-bold font-headline">The Vision</h2>
            <p className="text-xs text-foreground/80 leading-relaxed">
              {project.longDescription}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-primary text-xs">
                {isAppProject ? (
                    <>
                        <div className="flex items-center gap-2">
                            <Plane className="h-4 w-4"/>
                            <span className="font-semibold">Seamless Journeys</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4"/>
                            <span className="font-semibold">Intuitive Navigation</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Luggage className="h-4 w-4"/>
                            <span className="font-semibold">Luxury Experience</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2">
                            <Gem className="h-4 w-4"/>
                            <span className="font-semibold">Timeless Elegance</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4"/>
                            <span className="font-semibold">Modern Craft</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Crown className="h-4 w-4"/>
                            <span className="font-semibold">Signature Luxury</span>
                        </div>
                    </>
                )}
            </div>
        </div>

        {isLosmoProject && (
          <div className="w-full max-w-6xl mx-auto text-center space-y-8 pt-16 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
            <h2 className="text-3xl font-bold font-headline">Brand in Action</h2>
            <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto">
                Here's a glimpse of how the LOSMO brand extends into digital applications and other brand assets.
            </p>
            <div className="space-y-16 pt-8">
              <div className="space-y-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-left font-headline text-primary/80">App Concept</h3>
                <div className="space-y-8">
                  <Card className="overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                    <CardContent className="p-0">
                      <Image
                        src="https://raw.githubusercontent.com/phlagon/purr-folio/71c54d64fd51dfb14c2157d784043438c397591f/Screenshot%202026-02-08%20at%2021.23.20.png?raw=true"
                        alt="LOSMO App Screenshot 1"
                        width={800}
                        height={600}
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
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover"
                        data-ai-hint="app screen"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="space-y-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-left font-headline text-primary/80">Logo Variation</h3>
                <Card className="overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                  <CardContent className="p-0">
                    <Image
                      src="https://raw.githubusercontent.com/phlagon/purr-folio/71c54d64fd51dfb14c2157d784043438c397591f/Screenshot%202026-02-08%20at%2021.23.50.png?raw=true"
                      alt="LOSMO Logo Variation"
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover"
                      data-ai-hint="logo variation"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
