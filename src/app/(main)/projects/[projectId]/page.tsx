'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Plane, MapPin, Luggage, Gem, Sparkles, Crown } from 'lucide-react';

import { projects } from '@/lib/projects';
import { placeholderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  const projectImages = (project.imageIds || []).map(id => placeholderImages.find(img => img.id === id)).filter(Boolean) as any[];
  const isAppProject = project.tags.includes("Mobile App");
  const isLosmoProject = project.id === 'project-2';
  const losmoBgImage = placeholderImages.find(img => img.id === 'losmo-gallery-bg');

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
      
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <h2 className="text-2xl font-bold font-headline">The Vision</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              {project.longDescription}
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-4 text-primary">
                {isAppProject ? (
                    <>
                        <div className="flex items-center gap-2">
                            <Plane className="h-6 w-6"/>
                            <span className="font-semibold">Seamless Journeys</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-6 w-6"/>
                            <span className="font-semibold">Intuitive Navigation</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Luggage className="h-6 w-6"/>
                            <span className="font-semibold">Luxury Experience</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2">
                            <Gem className="h-6 w-6"/>
                            <span className="font-semibold">Timeless Elegance</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-6 w-6"/>
                            <span className="font-semibold">Modern Craft</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Crown className="h-6 w-6"/>
                            <span className="font-semibold">Signature Luxury</span>
                        </div>
                    </>
                )}
            </div>
        </div>
        
        <div className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          {isAppProject ? (
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
                <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-background">
                    <Carousel className="w-full h-full">
                      <CarouselContent>
                        {projectImages.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="p-1">
                              <Card className="border-none shadow-none">
                                <CardContent className="flex aspect-auto items-center justify-center p-0 relative h-[572px]">
                                  {image && <Image src={image.imageUrl} alt={`${project.title} screenshot ${index + 1}`} fill style={{ objectFit: 'cover' }} data-ai-hint={image.imageHint} />}
                                </CardContent>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-4 text-primary" />
                      <CarouselNext className="right-4 text-primary" />
                    </Carousel>
                </div>
            </div>
          ) : isLosmoProject ? (
             <div className="relative w-full aspect-[1.77] max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl shadow-primary/10">
              {losmoBgImage && (
                <Image
                  src={losmoBgImage.imageUrl}
                  alt="Luxury gallery setting"
                  fill
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={losmoBgImage.imageHint}
                  priority
                />
              )}
              <div
                className="absolute"
                style={{
                  left: '38.6%',
                  top: '20.5%',
                  width: '50.2%',
                  height: '65.7%',
                }}
              >
                <Carousel className="w-full h-full group">
                  <CarouselContent className="h-full">
                    {projectImages.map((image, index) => (
                      <CarouselItem key={index} className="h-full">
                        <Card className="h-full border-none bg-transparent shadow-none">
                          <CardContent className="relative h-full flex items-center justify-center p-0">
                            {image && (
                              <Image
                                src={image.imageUrl}
                                alt={`${project.title} image ${index + 1}`}
                                fill
                                style={{ objectFit: 'contain' }}
                                data-ai-hint={image.imageHint}
                                className="object-contain"
                              />
                            )}
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-[-40px] text-primary bg-transparent border-primary/50 hover:bg-primary/20" />
                  <CarouselNext className="right-[-40px] text-primary bg-transparent border-primary/50 hover:bg-primary/20" />
                </Carousel>
              </div>
            </div>
          ) : (
             <Carousel className="w-full max-w-xl mx-auto group">
              <CarouselContent>
                {projectImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <Card className="border-none shadow-none bg-transparent">
                      <CardContent className="relative aspect-video flex items-center justify-center p-0">
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
          )}
        </div>
      </div>
    </div>
  );
}
