'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Plane, 
  MapPin, 
  Luggage, 
  Navigation,
  Palmtree,
  CloudOff,
  User,
  Train,
  Bus,
  Loader2,
  RotateCcw,
  PlayCircle,
  ArrowRight
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
import { cn } from '@/lib/utils';
import { getTransitOptions, type TransitSearchOutput } from '@/ai/flows/transit-search-flow';
import { useToast } from '@/hooks/use-toast';
import { Reveal } from '@/components/ui/reveal';

type ProjectType = (typeof projects)[0];

export default function ProjectClient({ project, placeholderImages }: { project: ProjectType, placeholderImages: ImagePlaceholder[] }) {
  const [rapidoScreen, setRapidoScreen] = useState<'ride' | 'travel' | 'offline' | 'live' | 'profile' | 'flight' | 'your-trip' | 'public-transport' | 'stops' | 'confirmation' | 'auto-find' | 'gps-confirm' | 'weather'>('ride');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  
  const [transitResults, setTransitResults] = useState<TransitSearchOutput | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Page Turn State for Type Specimen
  const [foldedPages, setFoldedPages] = useState<number[]>([]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [rapidoScreen]);

  const projectImages = (project.imageIds || []).map(id => placeholderImages.find(img => img.id === id)).filter(Boolean) as any[];
  const isRapido = project.id === 'project-1';
  const isLosmo = project.id === 'project-2';
  const isLogoProject = project.id === 'project-3';
  const isPackageDesign = project.id === 'project-5';
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

  const togglePageFold = (index: number) => {
    if (foldedPages.length === projectImages.length) {
      setFoldedPages([]);
      return;
    }
    if (!foldedPages.includes(index)) {
      setFoldedPages(prev => [...prev, index]);
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
          <h1 className="text-5xl md:text-[10rem] font-black text-white uppercase tracking-tighter leading-none hover:text-primary hover:drop-shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all duration-500 cursor-none select-none">
            {project.title}
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex justify-center flex-wrap gap-3">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] uppercase tracking-[0.2em] font-black border-primary/20 text-primary px-4 py-1">{tag}</Badge>
            ))}
          </div>
        </Reveal>
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
                            <Image
                              src={getRapidoImage() || ''}
                              alt={`Rapido Screen`}
                              width={360}
                              height={1200}
                              className="w-full h-auto block"
                              priority
                              unoptimized
                            />
                            
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
                                className="absolute top-[45.2%] left-[38%] w-[25%] h-[10%] bg-transparent cursor-pointer z-[95]"
                                title="Flight Booking"
                              />
                            )}

                            {rapidoScreen === 'offline' && (
                              <button 
                                onClick={() => setRapidoScreen('auto-find')}
                                className="absolute top-[38%] left-[22%] w-[20%] h-[12%] bg-transparent cursor-pointer z-[95]"
                                title="Select Auto"
                              />
                            )}

                            {rapidoScreen === 'gps-confirm' && (
                              <button 
                                onClick={() => setRapidoScreen('confirmation')}
                                className="absolute top-[68%] left-[25%] w-[30%] h-[8%] bg-transparent cursor-pointer z-[95]"
                                title="Confirm Yes"
                              />
                            )}

                            {rapidoScreen === 'live' && (
                              <>
                                <button 
                                  onClick={() => setRapidoScreen('your-trip')}
                                  className="absolute top-[12.5%] left-[5%] w-[45%] h-[8%] bg-transparent cursor-pointer z-[95]"
                                  title="Your Trip Details"
                                />
                                <button 
                                  onClick={() => setRapidoScreen('weather')}
                                  className="absolute top-[25%] left-[30%] w-[35%] h-[6%] bg-transparent cursor-pointer z-[95]"
                                  title="Weather Details"
                                />
                              </>
                            )}

                            {rapidoScreen === 'your-trip' && (
                              <button 
                                onClick={() => setRapidoScreen('public-transport')}
                                className="absolute top-[15%] left-[5%] w-[45%] h-[10%] bg-transparent cursor-pointer z-[95]"
                                title="Public Transport Details"
                              />
                            )}

                            {rapidoScreen === 'public-transport' && (
                              <button 
                                onClick={() => setRapidoScreen('stops')}
                                className="absolute top-[28%] left-[7.5%] w-[85%] h-[8%] bg-transparent cursor-pointer z-[95]"
                                title="Nearby Bus Stop"
                              />
                            )}
                        </div>

                        {isSearching && (
                          <div className="absolute inset-0 bg-white/90 z-[95] flex flex-col items-center justify-center p-12 text-center space-y-6">
                             <div className="relative">
                               <Loader2 className="h-16 w-16 text-[#F9D915] animate-spin" />
                               <div className="absolute inset-0 flex items-center justify-center">
                                 <Navigation className="h-6 w-6 text-black/20" />
                               </div>
                             </div>
                             <div className="space-y-2">
                               <p className="text-sm font-black uppercase tracking-widest text-black">Calculating Routes</p>
                               <p className="text-[10px] text-black/40 uppercase font-bold">Connecting to Transit Engine...</p>
                             </div>
                          </div>
                        )}

                        {transitResults && (rapidoScreen === 'ride' || rapidoScreen === 'travel') && (
                          <div className="bg-[#F8F9FA] min-h-[400px] animate-in slide-in-from-bottom duration-500 pb-12">
                             <div className="space-y-4 pt-4">
                                {transitResults.options.map((option, idx) => {
                                  let Icon = Train;
                                  if (option.type === 'Flight') Icon = Plane;
                                  if (option.type === 'Bus') Icon = Bus;

                                  return (
                                    <div key={idx} className="flex px-4">
                                      <div 
                                        className={cn(
                                          "w-[60px] flex flex-col items-center pt-8 space-y-2 shrink-0 cursor-default",
                                          option.type === 'Flight' && "cursor-pointer hover:opacity-70 transition-opacity"
                                        )}
                                        onClick={() => {
                                          if (option.type === 'Flight') {
                                            setRapidoScreen('flight');
                                            setTransitResults(null);
                                          }
                                        }}
                                      >
                                         <div className="h-10 w-10 flex items-center justify-center">
                                            <Icon className="h-6 w-6 text-black/80" />
                                         </div>
                                         <span className="text-[11px] font-black uppercase tracking-tight text-black">{option.type}</span>
                                      </div>

                                      <div className="flex-1 bg-white border border-black/5 shadow-sm p-4 relative">
                                        {(option.type === 'Train' || option.type === 'Flight') && (
                                          <div className={cn(
                                            "absolute left-0 top-0 bottom-0 w-[3px]",
                                            option.type === 'Train' ? "bg-[#F9D915]" : "bg-[#4F46E5]"
                                          )} />
                                        )}
                                        <div className="space-y-4">
                                          <div className="space-y-1">
                                            <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest">{option.number}</p>
                                            <h3 className="text-[13px] font-black text-black uppercase">{option.provider}</h3>
                                          </div>

                                          <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                              <p className="text-[11px] font-black text-black">{option.departureTime} <span className="text-black/40 font-bold">Fri, 23 Jan</span></p>
                                              <p className="text-[9px] font-black text-black/60 uppercase">{option.origin}</p>
                                            </div>
                                            
                                            <div className="flex flex-col items-center px-2 flex-1 mx-2">
                                               <p className="text-[8px] font-bold text-black/30 uppercase mb-1">{option.duration}</p>
                                               <div className="w-full h-[1px] bg-black/5 relative">
                                                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-black/10" />
                                               </div>
                                               <p className="text-[8px] font-black text-[#4ADE80] uppercase mt-1 tracking-tighter">M T W T F S S</p>
                                            </div>

                                            <div className="text-right space-y-1">
                                              <p className="text-[11px] font-black text-black">{option.arrivalTime} <span className="text-black/40 font-bold">Fri, 23 Jan</span></p>
                                              <p className="text-[9px] font-black text-black/60 uppercase">{option.destination}</p>
                                            </div>
                                          </div>

                                          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                                            {['SL', '3E', '3A', '2A', '1A'].map(cls => (
                                              <Badge key={cls} variant="outline" className="text-[8px] font-black h-7 min-w-[32px] justify-center bg-black/5 border-none text-black/40 rounded-sm">
                                                {cls}
                                              </Badge>
                                            ))}
                                            <button className="ml-auto text-[9px] font-black text-[#4F46E5] bg-[#E0E7FF] px-3 py-2 rounded-full uppercase tracking-tight whitespace-nowrap">
                                               See Availability
                                            </button>
                                          </div>

                                          <button className="w-full bg-[#F9D915] text-black text-[11px] font-black uppercase tracking-widest py-3 rounded-full shadow-sm">
                                            Select
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                             </div>
                          </div>
                        )}
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

                      {(rapidoScreen !== 'ride') && (
                        <button 
                          onClick={() => {
                            setRapidoScreen('ride');
                            setTransitResults(null);
                          }}
                          className="absolute bottom-24 right-6 w-10 h-10 rounded-full bg-[#F9D915] text-black flex items-center justify-center z-[80] shadow-2xl hover:scale-110 transition-transform"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </button>
                      )}
                  </div>
              </div>
            </Reveal>
          ) : isLosmo ? (
            <Reveal className="w-full max-w-6xl mx-auto">
              <div className="relative w-full group">
                <div className="relative bg-[#1a1a1a] rounded-[2.5rem] p-[2%] shadow-[0_100px_100px_-50px_rgba(0,0,0,0.8)] border-4 border-[#333]">
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden border-8 border-black shadow-inner">
                    <Carousel className="w-full h-full">
                      <CarouselContent className="-ml-0">
                        {projectImages.map((image, index) => (
                          <CarouselItem key={index} className="pl-0">
                            <div className="relative w-full h-[calc(100vh-25vh)] flex flex-col overflow-hidden bg-black/40">
                              <div className="flex-1 overflow-y-auto scrollbar-hide">
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
                              <div className="absolute top-6 right-6 bg-primary/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20 shadow-xl">
                                Live Preview • Scrollable
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-8 h-12 w-12 bg-black/80 border-white/10 text-white hover:bg-primary hover:text-black transition-all z-50" />
                      <CarouselNext className="right-8 h-12 w-12 bg-black/80 border-white/10 text-white hover:bg-primary hover:text-black transition-all z-50" />
                    </Carousel>
                  </div>
                  <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#333]" />
                </div>
                <div className="relative mx-auto w-[25%] h-20 bg-gradient-to-b from-[#333] to-[#222] mt-[-2px] clip-path-stand shadow-2xl rounded-b-lg">
                   <div className="absolute inset-x-0 bottom-0 h-1 bg-black/40" />
                </div>
                <div className="relative mx-auto w-[40%] h-3 bg-black/40 blur-xl rounded-full mt-2" />
              </div>
            </Reveal>
          ) : isLogoProject ? (
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
                
                return (
                  <Reveal 
                    key={index} 
                    className={cn(
                      "w-full md:w-[85%] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-white/5 border border-white/5 transition-all duration-1000",
                      alignClass
                    )}
                  >
                    <div className="relative group overflow-hidden">
                      <Image 
                        src={image.imageUrl} 
                        alt={`Logo Design ${index + 1}`} 
                        width={1400} 
                        height={1000} 
                        className="w-full h-auto block grayscale hover:grayscale-0 scale-100 hover:scale-105 transition-all duration-[1.5s] ease-out"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ) : isPackageDesign ? (
            <div className="w-full max-w-6xl mx-auto space-y-24">
               <Reveal className="w-full">
                 <div className="relative aspect-video bg-black/20 rounded-none overflow-hidden border border-white/5 shadow-2xl group">
                    <video 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                    >
                      <source src="https://raw.githubusercontent.com/phlagon/purr-folio/1e86a7d646b793222feceec9ded448cbd3a24335/medmix%20packaging.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <div className="absolute bottom-12 left-12 flex items-center gap-6">
                        <div className="h-12 w-12 rounded-full border border-primary/40 flex items-center justify-center animate-pulse">
                           <PlayCircle className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Now Playing</p>
                          <p className="text-sm font-bold text-white uppercase tracking-widest">MedMix Packaging Process</p>
                        </div>
                    </div>
                 </div>
               </Reveal>
               {projectImages.map((image, index) => (
                 <Reveal key={index} className="w-full">
                    <div className="relative w-full border border-white/5 shadow-2xl bg-white/5 overflow-hidden">
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
                 </Reveal>
               ))}
            </div>
          ) : isTypeSpecimen ? (
            <div className="w-full max-w-5xl mx-auto py-12">
               <Reveal className="relative perspective-3000 aspect-[4/3] w-full" onClick={() => foldedPages.length === projectImages.length && setFoldedPages([])}>
                  {projectImages.map((image, index) => {
                    const isFolded = foldedPages.includes(index);
                    const isTop = index === foldedPages.length;
                    
                    return (
                      <div 
                        key={index}
                        className={cn(
                          "absolute inset-0 page-base bg-white shadow-2xl overflow-hidden cursor-none",
                          isFolded ? "page-turned-static" : "z-20",
                          index === foldedPages[foldedPages.length - 1] && "page-turning"
                        )}
                        style={{ zIndex: projectImages.length - index }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isFolded) togglePageFold(index);
                        }}
                      >
                        <Image
                          src={image.imageUrl}
                          alt={`Specimen Page ${index + 1}`}
                          fill
                          className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
                        
                        {isTop && !isFolded && (
                          <div className="absolute bottom-8 right-8 bg-black/80 text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 animate-pulse">
                            Turn Page <ArrowLeft className="h-3 w-3 rotate-180" />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {foldedPages.length === projectImages.length && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 animate-in fade-in duration-700 z-[100]">
                       <button 
                         onClick={() => setFoldedPages([])}
                         className="flex flex-col items-center gap-6 group"
                       >
                         <div className="h-20 w-20 rounded-full border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                            <RotateCcw className="h-8 w-8 text-primary group-hover:text-black transition-colors" />
                         </div>
                         <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary">Restart Specimen</span>
                       </button>
                    </div>
                  )}
               </Reveal>
            </div>
          ) : (
            <Reveal className="p-1 bg-white/5 border border-white/10 shadow-2xl w-full max-w-6xl mx-auto">
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
                              className="object-contain grayscale hover:grayscale-0 transition-all duration-700"
                              unoptimized
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
            </Reveal>
          )}
        </div>
        
        <Reveal className="space-y-8 max-w-3xl mx-auto text-center pb-24">
            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary">Concept Narrative</h2>
            <p className="text-sm text-foreground/50 leading-loose uppercase tracking-[0.2em] px-12">
              {project.longDescription}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-16 pt-12 text-primary text-[10px] font-black uppercase tracking-widest opacity-40">
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
            </div>
        </Reveal>
      </div>
    </div>
  );
}