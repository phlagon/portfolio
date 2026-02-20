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
  RotateCcw
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

type ProjectType = (typeof projects)[0];

export default function ProjectClient({ project, placeholderImages }: { project: ProjectType, placeholderImages: ImagePlaceholder[] }) {
  const [rapidoScreen, setRapidoScreen] = useState<'ride' | 'travel' | 'offline' | 'live' | 'profile' | 'flight' | 'your-trip' | 'public-transport'>('ride');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  
  const [transitResults, setTransitResults] = useState<TransitSearchOutput | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Reset scroll to top when screen changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [rapidoScreen]);

  const projectImages = (project.imageIds || []).map(id => placeholderImages.find(img => img.id === id)).filter(Boolean) as any[];
  const isRapido = project.id === 'project-1';
  
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

  const getRapidoImage = () => {
    if (rapidoScreen === 'flight') return placeholderImages.find(img => img.id === 'rapido-flight')?.imageUrl;
    if (rapidoScreen === 'offline') return placeholderImages.find(img => img.id === 'rapido-offline')?.imageUrl;
    if (rapidoScreen === 'profile') return placeholderImages.find(img => img.id === 'rapido-profile')?.imageUrl;
    if (rapidoScreen === 'live') return placeholderImages.find(img => img.id === 'rapido-live')?.imageUrl;
    if (rapidoScreen === 'travel') return placeholderImages.find(img => img.id === 'rapido-travel')?.imageUrl;
    if (rapidoScreen === 'your-trip') return placeholderImages.find(img => img.id === 'rapido-your-trip')?.imageUrl;
    if (rapidoScreen === 'public-transport') return placeholderImages.find(img => img.id === 'rapido-public-transport')?.imageUrl;
    return placeholderImages.find(img => img.id === 'rapido-home')?.imageUrl;
  };

  const navTabs = [
    { id: 'ride', label: 'Ride', icon: Navigation },
    { id: 'travel', label: 'Travel', icon: Palmtree },
    { id: 'offline', label: 'Offline', icon: CloudOff },
    { id: 'live', label: 'Live', icon: MapPin },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const isStaticScreen = ['flight', 'your-trip', 'public-transport'].includes(rapidoScreen);

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
        <div className="w-full">
          {isRapido ? (
            <div className="flex flex-col items-center gap-12">
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
                              <>
                                <button 
                                  onClick={() => {
                                    setRapidoScreen('public-transport');
                                    setTransitResults(null);
                                  }}
                                  className="absolute top-[17.2%] left-[5%] w-[15%] h-[7%] bg-transparent cursor-pointer z-[95]"
                                  title="Bus / Public Transport"
                                />
                                <button 
                                  onClick={() => {
                                    setRapidoScreen('flight');
                                    setTransitResults(null);
                                  }}
                                  className="absolute top-[45.2%] left-[5%] w-[28%] h-[7%] bg-transparent cursor-pointer z-[95]"
                                  title="Flight"
                                />
                              </>
                            )}

                            {rapidoScreen === 'live' && (
                              <button 
                                onClick={() => setRapidoScreen('your-trip')}
                                className="absolute top-[12.5%] left-[5%] w-[45%] h-[5%] bg-transparent cursor-pointer z-[95]"
                                title="Your Trip"
                              />
                            )}

                            {rapidoScreen === 'your-trip' && (
                              <>
                                <button 
                                  onClick={() => setRapidoScreen('public-transport')}
                                  className="absolute top-[65%] left-[5%] w-[30%] h-[15%] bg-transparent cursor-pointer z-[95]"
                                  title="Public Transport Tab"
                                />
                                <button 
                                  onClick={() => setRapidoScreen('flight')}
                                  className="absolute top-[65%] left-[5%] w-[30%] h-[15%] bg-transparent cursor-pointer z-[95]"
                                  title="Flight Tab"
                                />
                              </>
                            )}

                            {rapidoScreen === 'public-transport' && (
                                <button 
                                  onClick={() => setRapidoScreen('flight')}
                                  className="absolute top-[35%] left-[5%] w-[30%] h-[10%] bg-transparent cursor-pointer z-[95]"
                                  title="Flight Tab"
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

                             <div className="mt-12 py-8 flex flex-col items-center space-y-4">
                                <div className="flex items-center gap-4 w-full px-8">
                                   <div className="h-px bg-black/10 flex-1" />
                                   <span className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em]">Partner Integration</span>
                                   <div className="h-px bg-black/10 flex-1" />
                                </div>
                                <div className="flex items-center justify-center gap-8 opacity-40 grayscale">
                                   <p className="text-xs font-black uppercase text-black tracking-tighter">goibibo</p>
                                   <p className="text-xs font-black uppercase text-black tracking-tighter">redBus</p>
                                   <p className="text-xs font-black uppercase text-black tracking-tighter">Confirmtkt</p>
                                </div>
                             </div>
                          </div>
                        )}
                      </div>

                      <div className="absolute bottom-0 left-0 w-full h-[84px] z-[60] bg-white border-t border-black/5 flex items-center justify-around px-2 pb-4">
                        {navTabs.map((tab) => {
                          const Icon = tab.icon;
                          const isActive = rapidoScreen === tab.id || (tab.id === 'travel' && (rapidoScreen === 'flight' || rapidoScreen === 'public-transport')) || (tab.id === 'live' && rapidoScreen === 'your-trip');
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
              <div className="flex flex-col items-center gap-3">
                <p className="text-[10px] text-primary font-black uppercase tracking-[0.4em]">Integrated Transit Engine</p>
                <p className="text-[10px] text-foreground/30 uppercase tracking-[0.2em]">Figma Mockup x AI Logic</p>
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
            </div>
          )}
        </div>
        
        <div className="space-y-8 max-w-3xl mx-auto text-center pb-24">
            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary">Concept Narrative</h2>
            <p className="text-sm text-foreground/50 leading-loose uppercase tracking-[0.2em] px-12">
              {project.longDescription}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-16 pt-12 text-primary text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
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
        </div>
      </div>
    </div>
  );
}
