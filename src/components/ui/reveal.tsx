'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [duration, setDuration] = useState(800);
  const ref = useRef<HTMLDivElement>(null);
  
  // Refs for scroll velocity calculation to avoid re-renders on every scroll tick
  const lastScrollY = useRef(0);
  const lastTime = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize velocity tracking
    lastScrollY.current = window.scrollY;
    lastTime.current = Date.now();

    const updateVelocity = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      
      const distance = Math.abs(currentScrollY - lastScrollY.current);
      const deltaTime = currentTime - lastTime.current;
      
      if (deltaTime > 0) {
        // velocity in pixels per millisecond
        const velocity = distance / deltaTime;
        
        // Map velocity to duration: 
        // Fast scroll (high velocity) -> Low duration (fast animation)
        // Slow scroll (low velocity) -> High duration (slow animation)
        // Clamp between 200ms (very fast) and 1200ms (slow/graceful)
        const targetDuration = Math.max(200, Math.min(1200, 800 / (1 + velocity * 1.2)));
        setDuration(targetDuration);
      }
      
      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;
    };

    window.addEventListener('scroll', updateVelocity, { passive: true });
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger reveal when visible, reset when fully out of view
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px' 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      window.removeEventListener('scroll', updateVelocity);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all ease-out will-change-transform',
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-24 scale-[0.8]',
        className
      )}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionDelay: `${isVisible ? delay : 0}ms` 
      }}
    >
      {children}
    </div>
  );
}
