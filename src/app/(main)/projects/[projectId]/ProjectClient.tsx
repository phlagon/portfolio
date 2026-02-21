
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  ArrowLeft, 
  MapPin, 
  Navigation,
  Palmtree,
  CloudOff,
  User,
  Monitor,
  ChevronLeft,
  ChevronRight,
  Luggage,
  Loader2,
  Smartphone,
  ArrowUpRight
} from 'lucide-react';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Dynamically import PDF components to ensure polyfills from root are loaded first
const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), { 
  ssr: false,
  loading: () => <div className="flex items-center gap-4 text-white font-black uppercase tracking-widest text-xs h-[400px] justify-center"><Loader2 className="animate-spin" /> Preparing Viewer...</div>
});
const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), { ssr: false });

import type { ImagePlaceholder } from '@/lib/placeholder-images';
import type { projects } from '@/lib/projects';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getTransitOptions, type TransitSearchOutput } from '@/ai/flows/transit-search-flow';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';

type ProjectType = (typeof projects)[0];

const PDF_URL = "https://raw.githubusercontent.com/phlagon/purr-folio/3dea7a623a7b346182ae83d184f86bfa8883b84d/recusive%20final_compressed.pdf";

export default function ProjectClient({ project, placeholderImages }: { project: ProjectType, placeholderImages: ImagePlaceholder[] }) {
  const [rapidoScreen, setRapidoScreen] = useState<'ride' | 'travel' | 'offline' | 'live' | 'profile' | 'flight' | 'your-trip' | 'public-transport' | 'stops' | 'confirmation' | 'auto-find' | 'gps-confirm' | 'weather'>('ride');
  const [losmoTab, setLosmoTab] = useState<'web' | 'app'>('web');
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [isTurning, setIsTurning] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  
  const [transitResults, setTransitResults] = useState<TransitSearchOutput | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Configure worker inside useEffect to ensure it only runs on client
    import('react-pdf').then(pdfjs => {
      pdfjs.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.pdfjs.version}/build/pdf.worker.min.mjs`;
    });
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [rapidoScreen, losmoTab]);

  const projectImages = (project.imageIds || []).map(id => placeholderImages.find(img => img.id === id)).filter(Boolean) as any[];
  
  // Explicitly map Losmo app screens in requested order
  const losmoAppImageIds = Array.from({ length: 14 }, (_, i) => `losmo-app-${i + 1}`);
  const losmoAppImages = losmoAppImageIds.map(id => placeholderImages.find(img => img.id === id)).filter(Boolean) as any[];

  const isRapido = project.id === 'project-1';
  const isLosmo = project.id === 'project-2';
  const isLogoProject = project.id === 'project-3' || project.id === 'project-logo-redesign';
  const isPackageProject = project.id === 'project-5' || project.id === 'project-packaging-redesign';
  const isTypeSpecimen = project.id === 'project-6';
  
  const handleSearchTransit = async () => {
    if (!pickupLocation || !dropLocation) return;
    setIsSearching(true);
    try {
      const results = await getTransitOptions({ pickup: pickupLocation, drop: dropLocation });
      const order = { 'Train': 1, 'Flight': 2, 'Bus': 3, 'Taxi': 4 };
      const sortedOptions = [...results.options].sort((a, b) => 
        (order[a.type as keyof typeof order] || 99) - (order[b.type as keyof typeof order] || 99)
      );
      setTransitResults({ options: sortedOptions });
    } catch (error) {
      console.error("Failed to fetch transit options", error);
    } finally {
      setIsSearching(false);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const nextPage = () => {
    if (numPages && currentPage < numPages && !isTurning) {
      setIsTurning(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsTurning(false);
      }, 600);
    }
  };

  const prevPage = () => {
    if (currentPage > 1 && !isTurning) {
      setIsTurning(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsTurning(false);
      }, 300);
    }
  };

  const getRapidoImage = () => {
    const screens: Record<string, string | undefined> = {
      flight: 'rapido-flight',
      offline: 'rapido-offline',
      confirmation: 'rapido-confirmation',
      'auto-find': 'rapido-auto-find',
      'gps-confirm': 'rapido-gps-confirm',
      profile: 'rapido-profile',
      live: 'rapido-live',
      travel: 'rapido-travel',
      'your-trip': 'rapido-your-trip',
      'public-transport': 'rapido-public-transport',
      stops: 'rapido-stops',
      weather: 'rapido-weather',
    };
    const id = screens[rapidoScreen] || 'rapido-home';
    return placeholderImages.find(img => img.id === id)?.imageUrl;
  };

  const navTabs = [
    { id: 'ride', label: 'Ride', icon: Navigation },
    { id: 'travel', label: 'Travel', icon: Palmtree },
    { id: 'offline', label: 'Offline', icon: CloudOff },
    { id: 'live', label: 'Live', icon: MapPin },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const isStaticScreen = ['flight', 'your-trip', 'public-transport', 'stops', 'confirmation', 'auto-find', 'gps-confirm', 'weather'].includes(rapidoScreen);

  return (
    <div className="container py-12 md:py-24">
      <Reveal className="mb-12">
        <Link href="/#projects" className="inline-flex items-center text-xs uppercase tracking-widest font-black text-primary hover:opacity-70 transition-opacity">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Link>
      </Reveal>

      <div className="mb-16 text-center space-y-6">
        <Reveal>
          <h1 className="text-5xl md:text-[10rem] font-black text-white uppercase tracking-tighter leading-none hover:text-primary transition-all duration-500 select-none">
            {project.title}
          </h1>
        </Reveal>

        {isLosmo && (
          <Reveal delay={50}>
            <nav className="flex items-center justify-center gap-12 mt-8 mb-4">
              <button 
                onClick={() => setLosmoTab('web')}
                className={cn(
                  "transition-all uppercase tracking-[0.4em] text-[10px] font-black pb-2 border-b-2",
                  losmoTab === 'web' ? "text-primary border-primary" : "text-foreground/20 border-transparent hover:text-foreground/60"
                )}
              >
                Webpage
              </button>
              <button 
                onClick={() => setLosmoTab('app')}
                className={cn(
                  "transition-all uppercase tracking-[0.4em] text-[10px] font-black pb-2 border-b-2",
                  losmoTab === 'app' ? "text-primary border-primary" : "text-foreground/20 border-transparent hover:text-foreground/60"
                )}
              >
                App Concept
              </button>
            </nav>
          </Reveal>
        )}

        {(isLogoProject || isPackageProject) && (
          <Reveal delay={50}>
            <nav className="flex items-center justify-center gap-12 mt-8 mb-4">
              <Link 
                href={isLogoProject ? "/projects/project-3/" : "/projects/project-5/"}
                className={cn(
                  "transition-all uppercase tracking-[0.4em] text-[10px] font-black pb-2 border-b-2",
                  (project.id === 'project-3' || project.id === 'project-5') ? "text-primary border-primary" : "text-foreground/20 border-transparent hover:text-foreground/60"
                )}
              >
                {isLogoProject ? "Logo Design" : "Packaging Design"}
              </Link>
              <Link 
                href={isLogoProject ? "/projects/project-logo-redesign/" : "/projects/project-packaging-redesign/"}
                className={cn(
                  "transition-all uppercase tracking-[0.4em] text-[10px] font-black pb-2 border-b-2",
                  (project.id === 'project-logo-redesign' || project.id === 'project-packaging-redesign') ? "text-primary border-primary" : "text-foreground/20 border-transparent hover:text-foreground/60"
                )}
              >
                {isLogoProject ? "Logo Redesign" : "Packaging Redesign"}
              </Link>
            </nav>
          </Reveal>
        )}
      </div>
      
      <div className="flex flex-col gap-24 items-center">
        <div className="w-full">
          {isRapido ? (
            <Reveal className="flex flex-col items-center gap-12">
              <div className="relative mx-auto border-[#0a0a0a] bg-[#f8f9fa] border-[12px] rounded-[3.5rem] h-[720px] w-[360px] shadow-[0_60px_120px_-30px_rgba(0,0,0,1)] overflow-hidden">
                  <div className="w-[120px] h-[34px] bg-black top-4 rounded-[1.2rem] left-1/2 -translate-x-1/2 absolute z-[100] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white/10 ml-auto mr-4" />
                  </div>
                  
                  <div className="w-full h-full relative flex flex-col bg-white">
                      <div 
                        ref={scrollContainerRef}
                        className={cn(
                          "flex-1 relative bg-white pb-[84px]",
                          isStaticScreen ? "overflow-hidden" : "overflow-y-auto scrollbar-hide"
                        )}
                      >
                        <div className="relative w-full">
                            {(() => {
                              const img = getRapidoImage();
                              if (!img) return null;
                              return (
                                <Image
                                  src={img}
                                  alt={`Rapido Screen`}
                                  width={360}
                                  height={1200}
                                  className="w-full h-auto block"
                                  priority
                                  unoptimized
                                />
                              );
                            })()}
                            {(rapidoScreen === 'ride' || rapidoScreen === 'travel') && (
                              <>
                                  <input 
                                      type="text"
                                      value={pickupLocation}
                                      onChange={(e) => setPickupLocation(e.target.value)}
                                      className="absolute top-[4.2%] left-[18%] w-[68%] h-[4.5%] bg-transparent border-none text-[11px] font-medium focus:outline-none z-[80] text-black px-2"
                                      autoComplete="off"
                                      placeholder=""
                                  />
                                  <input 
                                      type="text"
                                      value={dropLocation}
                                      onChange={(e) => setDropLocation(e.target.value)}
                                      className="absolute top-[10.2%] left-[18%] w-[68%] h-[4.5%] bg-transparent border-none text-[11px] font-medium focus:outline-none z-[80] text-black px-2"
                                      autoComplete="off"
                                      placeholder=""
                                  />
                                  <button 
                                    onClick={handleSearchTransit}
                                    className="absolute top-[19.2%] left-1/2 -translate-x-1/2 w-[75%] h-[5%] bg-transparent cursor-pointer z-[90]"
                                  />
                              </>
                            )}
                            {rapidoScreen === 'travel' && (
                              <button 
                                onClick={() => setRapidoScreen('flight')}
                                className="absolute top-[35%] left-0 w-[40%] h-[15%] bg-transparent cursor-pointer z-[90]"
                                aria-label="Explore flights"
                              />
                            )}
                            {rapidoScreen === 'offline' && (
                              <button 
                                onClick={() => setRapidoScreen('auto-find')}
                                className="absolute top-[48%] left-0 w-[40%] h-[12%] bg-transparent cursor-pointer z-[90]"
                                aria-label="Auto booking"
                              />
                            )}
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 w-full h-[84px] z-[60] bg-white border-t border-black/5 flex items-center justify-around px-2 pb-4">
                        {navTabs.map((tab) => {
                          const Icon = tab.icon;
                          const isActive = tab.id === 'ride' ? (rapidoScreen === 'ride' || rapidoScreen === 'profile') : 
                                         tab.id === 'travel' ? (rapidoScreen === 'travel' || rapidoScreen === 'flight') :
                                         tab.id === 'offline' ? (rapidoScreen === 'offline' || rapidoScreen === 'confirmation' || rapidoScreen === 'auto-find' || rapidoScreen === 'gps-confirm') :
                                         tab.id === 'live' ? (rapidoScreen === 'live' || rapidoScreen === 'your-trip' || rapidoScreen === 'public-transport' || rapidoScreen === 'stops' || rapidoScreen === 'weather') :
                                         rapidoScreen === tab.id;
                          
                          return (
                            <button
                              key={tab.id}
                              onClick={() => {
                                setRapidoScreen(tab.id as any);
                                setTransitResults(null);
                              }}
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
                  </div>
              </div>
            </Reveal>
          ) : isLosmo ? (
            <Reveal className="w-full max-w-7xl mx-auto px-4">
              <div className="relative w-full">
                  {losmoTab === 'web' ? (
                    <div className="relative bg-[#0a0a0a] rounded-[2.5rem] p-[1rem] pb-[4rem] shadow-[0_100px_100px_-50px_rgba(0,0,0,0.8)] border-[2px] border-[#333] w-full aspect-[16/10.5] overflow-hidden">
                      <div className="relative w-full h-full bg-[#111] rounded-[1.5rem] overflow-hidden border border-white/5">
                        <Carousel className="w-full h-full">
                          <CarouselContent className="-ml-0 h-full">
                            {projectImages.map((image, index) => (
                              <CarouselItem key={index} className="pl-0 h-full">
                                <div className="relative w-full h-full overflow-y-auto scrollbar-hide bg-[#050505] flex flex-col">
                                     {image && (
                                       <Image
                                         src={image.imageUrl}
                                         alt={`${project.title} design ${index + 1}`}
                                         width={1400}
                                         height={2000}
                                         className="w-full h-auto block grayscale hover:grayscale-0 transition-all duration-700"
                                         unoptimized
                                       />
                                     )}
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="left-4 h-10 w-10 bg-black/40 backdrop-blur-md border-white/5 text-white hover:bg-primary hover:text-black transition-all z-50 rounded-full" />
                          <CarouselNext className="right-4 h-10 w-10 bg-black/40 backdrop-blur-md border-white/5 text-white hover:bg-primary hover:text-black transition-all z-50 rounded-full" />
                        </Carousel>
                      </div>
                    </div>
                  ) : (
                    <div className="relative mx-auto w-full max-w-3xl py-12">
                      <Carousel className="w-full">
                        <CarouselContent className="-ml-8">
                          {losmoAppImages.map((image, index) => (
                            <CarouselItem key={index} className="pl-8 basis-full md:basis-1/2 lg:basis-1/3">
                              <div className="relative aspect-[9/19] rounded-2xl overflow-y-auto scrollbar-hide bg-black shadow-2xl border border-white/10 group">
                                {image && (
                                  <Image
                                    src={image.imageUrl}
                                    alt={`Losmo App Screen ${index + 1}`}
                                    width={360}
                                    height={1200}
                                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]"
                                    priority={index < 3}
                                    unoptimized
                                  />
                                )}
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <div className="flex justify-center gap-6 mt-16">
                          <CarouselPrevious className="static translate-y-0 h-16 w-16 bg-white/5 border-white/10 text-white hover:bg-primary hover:text-black transition-all rounded-full" />
                          <CarouselNext className="static translate-y-0 h-16 w-16 bg-white/5 border-white/10 text-white hover:bg-primary hover:text-black transition-all rounded-full" />
                        </div>
                      </Carousel>
                    </div>
                  )}
              </div>
            </Reveal>
          ) : isTypeSpecimen ? (
            <div className="w-full max-w-6xl mx-auto py-12 px-4">
              <Reveal className="relative flex flex-col items-center gap-12">
                <div className="book-container w-full max-w-5xl relative min-h-[1400px] md:min-h-[1800px]">
                  <div className="absolute inset-0 bg-white/5 border border-white/10 shadow-2xl rounded-sm overflow-hidden h-fit">
                    <div className="w-full h-full relative z-10 flex items-center justify-center bg-white min-h-[1400px] md:min-h-[1800px]">
                      <Document
                        file={PDF_URL}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="flex flex-col items-center"
                      >
                        <div className={cn(
                          "page-base",
                          !isTurning && "page-active",
                          isTurning && "page-turning"
                        )}>
                          <Page 
                            pageNumber={currentPage} 
                            width={typeof window !== 'undefined' ? (window.innerWidth > 1024 ? 1000 : window.innerWidth > 768 ? 800 : 350) : 350}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                          />
                        </div>
                      </Document>
                    </div>
                  </div>

                  <div className="absolute inset-y-0 left-0 w-24 flex items-center justify-center z-[100] group">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={prevPage}
                      disabled={currentPage === 1 || isTurning}
                      className="h-16 w-16 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-primary hover:text-black disabled:opacity-0 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="h-10 w-10" />
                    </Button>
                  </div>
                  <div className="absolute inset-y-0 right-0 w-24 flex items-center justify-center z-[100] group">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={nextPage}
                      disabled={(numPages ? currentPage === numPages : false) || isTurning}
                      className="h-16 w-16 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-primary hover:text-black disabled:opacity-0 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="h-10 w-10" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full max-w-5xl border-t border-white/5 pt-12">
                  <div className="flex gap-4">
                    <Button 
                      onClick={prevPage}
                      disabled={currentPage === 1 || isTurning}
                      className="rounded-none px-8 h-12 text-[10px] font-black uppercase tracking-[0.3em] bg-white/5 text-white hover:bg-primary hover:text-black transition-all"
                    >
                      Previous
                    </Button>
                    <Button 
                      onClick={nextPage}
                      disabled={(numPages ? currentPage === numPages : false) || isTurning}
                      className="rounded-none px-8 h-12 text-[10px] font-black uppercase tracking-[0.3em] bg-white/5 text-white hover:bg-primary hover:text-black transition-all"
                    >
                      Next Page
                    </Button>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground/40">
                    Page <span className="text-primary">{currentPage}</span> / {numPages || '--'}
                  </div>
                </div>
              </Reveal>
            </div>
          ) : (isLogoProject || isPackageProject) ? (
            <div className="flex flex-col gap-40 py-24 max-w-6xl mx-auto px-4">
              {projectImages.map((image, index) => {
                const alignments = [
                  "self-start ml-0",
                  "self-end mr-0",
                  "self-center",
                  "self-start md:ml-20",
                  "self-end md:mr-20"
                ];
                const alignClass = alignments[index % alignments.length];
                const isVideo = image.imageUrl.toLowerCase().endsWith('.mp4');
                
                return (
                  <Reveal 
                    key={index} 
                    className={cn(
                      "w-full md:w-[85%] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-white/5 border border-white/5 transition-all duration-1000",
                      alignClass
                    )}
                  >
                    <div className={cn(
                      "relative group overflow-hidden",
                      isVideo ? "aspect-auto" : "aspect-video md:aspect-auto"
                    )}>
                      {isVideo ? (
                        <video 
                          src={image.imageUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-auto block grayscale hover:grayscale-0 scale-100 hover:scale-105 transition-all duration-[1.5s] ease-out"
                        />
                      ) : (
                        <Image 
                          src={image.imageUrl} 
                          alt={`Design ${index + 1}`} 
                          width={1400} 
                          height={1000} 
                          className="w-full h-auto block grayscale hover:grayscale-0 scale-100 hover:scale-110 transition-all duration-[1.5s] ease-out"
                          unoptimized
                        />
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <Reveal className="p-1 bg-white/5 border border-white/10 shadow-2xl w-full max-w-6xl mx-auto">
              <Carousel className="w-full group">
                <CarouselContent>
                  {projectImages.map((image, index) => (
                    <Card key={index} className="border-none shadow-none bg-transparent">
                      <CardContent className="relative h-[85vh] flex items-center justify-center p-0">
                        {image && (
                          <Image
                            src={image.imageUrl}
                            alt={`${project.title} image ${index + 1}`}
                            fill
                            className="object-contain grayscale hover:grayscale-0 transition-all duration-700"
                            unoptimized
                          />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-6 bg-black/80 border-white/10" />
                <CarouselNext className="right-6 bg-black/80 border-white/10" />
              </Carousel>
            </Reveal>
          )}
        </div>
        
        {!isTypeSpecimen && (
          <Reveal className="space-y-8 max-w-3xl mx-auto text-center pb-24">
              <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary">Concept Narrative</h2>
              <p className="text-sm text-foreground/50 leading-loose uppercase tracking-[0.2em] px-12">
                {project.longDescription}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-16 pt-12 text-primary text-[10px] font-black uppercase tracking-widest opacity-40">
                  <div className="flex items-center gap-3">
                      <Monitor className="h-5 w-5"/>
                      <span>Immersive</span>
                  </div>
                  <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5"/>
                      <span>Intuitive</span>
                  </div>
                  <div className="flex items-center gap-3">
                      <Luggage className="h-5 w-5"/>
                      <span>Premium</span>
                  </div>
              </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
