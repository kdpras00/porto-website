"use client";

import { useEffect, useRef, memo } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const ParticleBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Optimize canvas for performance
    const dpr = window.devicePixelRatio || 1;
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Reduced particle count for better performance
    const rect = canvas.getBoundingClientRect();
    const particleCount = Math.min(20, Math.floor((rect.width * rect.height) / 35000));
    const maxDistance = 100; // Reduced connection distance
    
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.15,
    }));

    // Optimized animation with frame rate limiting (30fps for better performance)
    const animate = (currentTime: number) => {
      // Limit to ~30fps for better performance on lower-end devices
      if (currentTime - lastTimeRef.current < 33) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = currentTime;

      // Clear canvas efficiently
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        // Draw particle (optimized with fillRect for small particles)
        if (particle.size < 2) {
          ctx.fillStyle = `rgba(245, 158, 11, ${particle.opacity})`;
          ctx.fillRect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size);
        } else {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${particle.opacity})`;
          ctx.fill();
        }

        // Draw connections (optimized with distance check first)
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = Math.abs(particle.x - otherParticle.x);
          const dy = Math.abs(particle.y - otherParticle.y);
          
          // Early exit if too far
          if (dx > maxDistance || dy > maxDistance) return;
          
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const opacity = 0.08 * (1 - distance / maxDistance);
            ctx.strokeStyle = `rgba(245, 158, 11, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ 
        opacity: 0.5,
        willChange: 'transform',
        transform: 'translateZ(0)' // GPU acceleration
      }}
    />
  );
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;
