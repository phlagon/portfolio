'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const particles = useRef<Particle[]>([]);
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get primary color from CSS variables
    const getThemeColor = () => {
      if (typeof window === 'undefined') return '255, 255, 255';
      const rootStyle = getComputedStyle(document.documentElement);
      const primary = rootStyle.getPropertyValue('--primary').trim();
      // Most shadcn themes use HSL, we'll convert a sample HSL to RGB-like string for canvas
      // For this specific app, primary is roughly cyan: 191 100% 50%
      return primary || '0, 255, 255'; 
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Create new particles on move
      const color = getThemeColor();
      for (let i = 0; i < 3; i++) {
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          life: 1.0,
          color: color.includes(' ') ? `hsla(${color.replace(/ /g, ',')},` : `rgba(255, 255, 255,`
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.current = particles.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.025; // Slightly faster fade for snappier feel

        if (p.life <= 0) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        
        // Glow effect
        ctx.shadowBlur = 10 * p.life;
        ctx.shadowColor = 'white';
        
        // Use HSL if detected, otherwise default to white with alpha
        if (p.color.startsWith('hsla')) {
          ctx.fillStyle = `${p.color}${p.life})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.life})`;
        }
        
        ctx.fill();

        return true;
      });

      // Draw the main cursor dot (Main Focus)
      ctx.beginPath();
      ctx.arc(mousePos.current.x, mousePos.current.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'white';
      ctx.fill();
      
      // Add a subtle ring around the dot
      ctx.beginPath();
      ctx.arc(mousePos.current.x, mousePos.current.y, 8, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.stroke();

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
