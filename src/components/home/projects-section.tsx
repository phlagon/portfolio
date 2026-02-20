
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import { placeholderImages } from '@/lib/placeholder-images';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

const DISTANCE_LIMIT = 150;
const MAGNIFICATION = 1.8;

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

  // Calculate auto-scroll based on mouse position
  const dockX = useSpring(0, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.pageX);
    
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const percentage = relativeX / containerWidth;
    
    // Determine scroll amount (if content is wider than container)
    if (contentWidth > containerWidth) {
      const maxScroll = contentWidth - containerWidth;
      // We add some padding/inset for the scroll trigger
      const edgeThreshold = 0.2; // 20% from edges
      let targetX = 0;
      
      if (percentage < edgeThreshold) {
        targetX = 0;
      } else if (percentage > (1 - edgeThreshold)) {
        targetX = -maxScroll;
      } else {
        // Linear mapping in the center
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
    <section id="projects" className="bg-background py-40 overflow-hidden relative">
      <div className="container max-w-6xl mx-auto px-4 mb-24">
        <Reveal className="text-center space-y-6">
          <p className="text-primary font-black tracking-[0.5em] uppercase text-[10px]">Work</p>
          <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">Selected.</h2>
        </Reveal>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full relative flex items-center justify-center py-20 px-4 md:px-0"
      >
        <motion.div 
          ref={scrollRef}
          style={{ x: dockX }}
          className="flex items-end gap-4 p-6 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] h-[180px] min-w-fit"
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
      
      {/* Visual Indicator of Scroll Availability */}
      {contentWidth > containerWidth && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-20 group">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[8px] font-black uppercase tracking-[0.6em] text-white">Scroll to Explore</span>
        </div>
      )}
    </section>
  );
}

function DockItem({ project, mouseX, }: { project: any, mouseX: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() || { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-DISTANCE_LIMIT, 0, DISTANCE_LIMIT], [80, 80 * MAGNIFICATION, 80]);
  const width = useSpring(widthSync, { stiffness: 200, damping: 25, mass: 0.1 });

  const projectImage = placeholderImages.find(p => p.id === project.thumbnailId);

  return (
    <Link 
      href={`/projects/${project.id}`}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/90 backdrop-blur-md rounded-xl border border-white/10 pointer-events-none z-50 whitespace-nowrap"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{project.title}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={ref}
        style={{ width, height: width }}
        className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-[#111] transition-shadow hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)] cursor-none"
      >
        {projectImage && (
          <Image
            src={projectImage.imageUrl}
            alt={project.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </Link>
  );
}
