'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import { placeholderImages } from '@/lib/placeholder-images';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

// Increased limits for a much larger, bolder dock
const DISTANCE_LIMIT = 250;
const MAGNIFICATION = 2.5;
const BASE_WIDTH = 180; // Larger base icon size

export function ProjectsSection() {
  const displayProjects = projects.filter(p => 
    !['project-logo-redesign', 'project-packaging-redesign'].includes(p.id)
  );

  const mouseX = useMotionValue(Infinity);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const updateWidths = () => {
      if (containerRef.current && scrollRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setContentWidth(scrollRef.current.scrollWidth);
      }
    };
    updateWidths();
    window.addEventListener('resize', updateWidths);
    return () => window.removeEventListener('resize', updateWidths);
  }, []);

  const dockX = useSpring(0, { stiffness: 40, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.pageX);
    
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const percentage = relativeX / containerWidth;
    
    if (contentWidth > containerWidth) {
      const maxScroll = contentWidth - containerWidth;
      const edgeThreshold = 0.2;
      let targetX = 0;
      
      if (percentage < edgeThreshold) {
        targetX = 0;
      } else if (percentage > (1 - edgeThreshold)) {
        targetX = -maxScroll;
      } else {
        const normalized = (percentage - edgeThreshold) / (1 - 2 * edgeThreshold);
        targetX = -normalized * maxScroll;
      }
      dockX.set(targetX);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(Infinity);
  };

  return (
    <section id="projects" className="bg-background py-60 overflow-hidden relative">
      <div className="container max-w-7xl mx-auto px-4 mb-32">
        <Reveal className="text-center space-y-8">
          <p className="text-primary font-black tracking-[0.6em] uppercase text-[12px]">Portfolio</p>
          <h2 className="text-8xl md:text-[12rem] font-black text-white uppercase tracking-tighter leading-none">Curated.</h2>
        </Reveal>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full relative flex items-center justify-center py-40 px-4 md:px-0"
      >
        <motion.div 
          ref={scrollRef}
          style={{ x: dockX }}
          className="flex items-end gap-10 p-12 bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 shadow-[0_60px_150px_-30px_rgba(0,0,0,1)] h-[400px] min-w-fit"
        >
          {displayProjects.map((project) => (
            <DockItem 
              key={project.id} 
              project={project} 
              mouseX={mouseX} 
            />
          ))}
        </motion.div>
      </div>
      
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 group animate-bounce">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white">Scroll to Explore</span>
      </div>
    </section>
  );
}

function DockItem({ project, mouseX, }: { project: any, mouseX: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() || { x: 0, width: 0 };
    return val - (bounds.x + bounds.width / 2);
  });

  const widthSync = useTransform(
    distance, 
    [-DISTANCE_LIMIT, 0, DISTANCE_LIMIT], 
    [BASE_WIDTH, BASE_WIDTH * MAGNIFICATION, BASE_WIDTH]
  );
  
  const width = useSpring(widthSync, { stiffness: 180, damping: 25, mass: 0.1 });

  const projectImage = placeholderImages.find(p => p.id === project.thumbnailId);

  return (
    <Link 
      href={`/projects/${project.id}`}
      className="relative group flex flex-col items-center justify-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -80, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 px-8 py-4 bg-black/95 backdrop-blur-xl rounded-2xl border border-white/20 pointer-events-none z-50 whitespace-nowrap shadow-2xl"
          >
            <p className="text-[14px] font-black uppercase tracking-[0.5em] text-primary">{project.title}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={ref}
        style={{ width, height: width }}
        className="relative rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 bg-[#111] transition-shadow hover:shadow-[0_0_60px_rgba(var(--primary-rgb),0.4)] cursor-none"
      >
        {projectImage && (
          <Image
            src={projectImage.imageUrl}
            alt={project.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1000ms] ease-in-out"
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </Link>
  );
}
