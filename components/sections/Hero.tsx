"use client";

import { ArrowDown, MousePointer, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '@/components/ParticleBackground';

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: -999, y: -999 });
    const [isHovering, setIsHovering] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const hoverSize = 300;
    const rafId = useRef<number | null>(null);
    const lastMousePos = useRef({ x: -999, y: -999 });

    // Optimized mouse move handler with throttling using requestAnimationFrame
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect();
            const newX = e.clientX - rect.left;
            const newY = e.clientY - rect.top;
            
            // Cancel previous animation frame if exists
            if (rafId.current !== null) {
                cancelAnimationFrame(rafId.current);
            }
            
            // Use requestAnimationFrame to throttle updates
            rafId.current = requestAnimationFrame(() => {
                // Only update if position changed significantly (reduce unnecessary re-renders)
                if (Math.abs(newX - lastMousePos.current.x) > 2 || 
                    Math.abs(newY - lastMousePos.current.y) > 2) {
                    setMousePosition({
                        x: newX,
                        y: newY
                    });
                    lastMousePos.current = { x: newX, y: newY };
                }
            });
            
            if (!hasInteracted) setHasInteracted(true);
        }
    };

    // Custom cursor effect with optimized performance
    useEffect(() => {
        let animationFrameId: number | null = null;
        let lastX = 0;
        let lastY = 0;
        
        const handleGlobalMouseMove = (e: MouseEvent) => {
            // Throttle cursor updates
            if (animationFrameId === null) {
                animationFrameId = requestAnimationFrame(() => {
                    if (cursorDotRef.current) {
                        // Only update if moved significantly
                        if (Math.abs(e.clientX - lastX) > 1 || Math.abs(e.clientY - lastY) > 1) {
                            cursorDotRef.current.style.left = `${e.clientX}px`;
                            cursorDotRef.current.style.top = `${e.clientY}px`;
                            lastX = e.clientX;
                            lastY = e.clientY;
                        }
                    }
                    animationFrameId = null;
                });
            }
        };

        document.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
        
        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    // Cleanup rafId on unmount
    useEffect(() => {
        return () => {
            if (rafId.current !== null) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, []);

    // Set loaded state after component mounts
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Generate particles only on client side to avoid hydration mismatch
    const [particlesData, setParticlesData] = useState<Array<{
        id: number;
        width: number;
        height: number;
        left: number;
        top: number;
        duration: number;
        delay: number;
        xOffset: number;
    }>>([]);

    useEffect(() => {
        // Only generate particles on client side - reduced count for performance
        setParticlesData(
            Array.from({ length: 10 }, (_, i) => ({
                id: i,
                width: Math.random() * 3 + 2,
                height: Math.random() * 3 + 2,
                left: Math.random() * 100,
                top: Math.random() * 100,
                duration: Math.random() * 4 + 3,
                delay: Math.random() * 2,
                xOffset: Math.random() * 15 - 7.5,
            }))
        );
    }, []);

    return (
        <section
            id="hero"
            ref={heroRef}
            className="min-h-screen flex items-center justify-center bg-animated-gradient text-white relative overflow-hidden particle-bg"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Particle Background */}
            <ParticleBackground />

            {/* Glow Orbs */}
            <div className="glow-orb glow-orb-1"></div>
            <div className="glow-orb glow-orb-2"></div>
            <div className="glow-orb glow-orb-3"></div>

            {/* Custom cursor dot */}
            <div 
                ref={cursorDotRef} 
                className="cursor-dot transition-all duration-200 ease-out animate-pulse-glow"
                style={{
                    transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
                    opacity: isHovering ? 0.8 : 0.6
                }}
            />

            {/* Background Image - First photo with improved positioning */}
            <div
                className="absolute inset-0 z-0 transition-opacity duration-1000 ease-out"
                style={{
                    backgroundImage: `url('/seriously-face.jpeg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 20%',
                    backgroundRepeat: 'no-repeat',
                    opacity: isLoaded ? 1 : 0
                }}
            />

            {/* Hover effect - Second photo with smile face, optimized clipPath */}
            <div
                className="absolute inset-0 z-5 transition-opacity duration-300 ease-out"
                style={{
                    backgroundImage: `url('/smile-face.jpeg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 35%',
                    backgroundRepeat: 'no-repeat',
                    transform: 'translate3d(12%, 0, 0)',
                    opacity: isLoaded ? 1 : 0,
                    clipPath: `circle(${isHovering ? hoverSize / 2 : 0}px at ${mousePosition.x}px ${mousePosition.y}px)`,
                    WebkitClipPath: `circle(${isHovering ? hoverSize / 2 : 0}px at ${mousePosition.x}px ${mousePosition.y}px)`,
                    willChange: isHovering ? 'clip-path' : 'auto',
                    isolation: 'isolate', // Create new stacking context for better performance
                }}
            />

            {/* Enhanced overlay with better gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/30 z-10"></div>

            {/* Noise texture with improved opacity */}
            <div className="absolute inset-0 bg-noise z-10 opacity-20"></div>

            {/* Floating particles - Optimized with framer-motion and GPU acceleration */}
            <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
                {particlesData.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full bg-amber-400/20"
                        style={{
                            width: `${particle.width}px`,
                            height: `${particle.height}px`,
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                            willChange: 'transform, opacity',
                            transform: 'translateZ(0)', // GPU acceleration
                        }}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, particle.xOffset, 0],
                            opacity: [0.2, 0.5, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "easeInOut",
                            type: "tween", // Use tween for better performance
                            repeatType: "loop" as const,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center relative z-20">
                {/* Hero Content */}
                <div className="w-full flex flex-col items-center justify-center text-center">
                    {/* Enhanced hover instruction */}
                    {!hasInteracted && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6 sm:mb-8 flex items-center gap-2 text-xs sm:text-sm text-amber-100/80 glass-dark px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-amber-800/30 shadow-lg"
                        >
                            <MousePointer className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">Hover to reveal smile</span>
                            <span className="sm:hidden">Hover for smile</span>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-400" />
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Enhanced Hero Text with better typography and animations */}
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight text-amber-50 leading-tight px-4"
                    >
                        <motion.span
                            className="block mb-2"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            I BUILD THE QUIET SPACE
                        </motion.span>
                        <motion.span
                            className="block text-gradient-animated neon-glow"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            WHERE FUNCTION AND BEAUTY MEET.
                        </motion.span>
                    </motion.h1>

                    {/* Enhanced scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="absolute bottom-12 sm:bottom-16 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm opacity-80 flex flex-col items-center text-amber-100/80 group cursor-pointer hover:opacity-100 transition-opacity duration-300"
                    >
                        <motion.span
                            className="mb-1 sm:mb-2 group-hover:text-amber-300 transition-colors duration-300"
                            animate={{ opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Scroll to explore
                        </motion.span>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5 group-hover:text-amber-300 transition-colors duration-300" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Enhanced bottom position indicators */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute bottom-20 sm:bottom-24 left-4 sm:left-8 md:left-24 text-sm sm:text-lg md:text-xl font-light text-amber-100/70 z-20 hover:text-amber-300 transition-colors duration-300 cursor-default glass-dark px-4 py-2 rounded-full"
            >
                <span className="flex items-center gap-2">
                    <motion.div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                    <span className="hidden sm:inline">UI UX Designer</span>
                    <span className="sm:hidden">UI/UX</span>
                </span>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 md:right-24 text-sm sm:text-lg md:text-xl font-light text-amber-100/70 z-20 hover:text-amber-300 transition-colors duration-300 cursor-default glass-dark px-4 py-2 rounded-full"
            >
                <span className="flex items-center gap-2">
                    <span className="hidden sm:inline">Full Stack Developer</span>
                    <span className="sm:hidden">Developer</span>
                    <motion.div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    ></motion.div>
                </span>
            </motion.div>

            {/* Additional decorative elements with animations */}
            <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute top-1/2 left-2 sm:left-4 md:left-8 w-px h-16 sm:h-20 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent z-20"
            ></motion.div>
            <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="absolute top-1/2 right-2 sm:right-4 md:right-8 w-px h-16 sm:h-20 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent z-20"
            ></motion.div>
        </section>
    );
};

export default Hero;