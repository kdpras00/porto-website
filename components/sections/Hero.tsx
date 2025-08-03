"use client";

import { ArrowDown, MousePointer, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: -999, y: -999 });
    const [isHovering, setIsHovering] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const hoverSize = 300; // Increased size for better effect

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
            if (!hasInteracted) setHasInteracted(true);
        }
    };

    // Custom cursor effect with improved performance
    useEffect(() => {
        let animationFrameId: number;
        
        const handleGlobalMouseMove = (e: MouseEvent) => {
            animationFrameId = requestAnimationFrame(() => {
                if (cursorDotRef.current) {
                    cursorDotRef.current.style.left = `${e.clientX}px`;
                    cursorDotRef.current.style.top = `${e.clientY}px`;
                }
            });
        };

        document.addEventListener('mousemove', handleGlobalMouseMove);
        
        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
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

    return (
        <section
            id="hero"
            ref={heroRef}
            className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white relative overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Custom cursor dot with improved styling */}
            <div 
                ref={cursorDotRef} 
                className="cursor-dot transition-all duration-200 ease-out"
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
                    backgroundPosition: 'center 25%',
                    backgroundRepeat: 'no-repeat',
                    opacity: isLoaded ? 1 : 0
                }}
            />

            {/* Hover effect - Second photo with improved clip-path */}
            <div
                className="absolute inset-0 z-5 transition-all duration-300 ease-out"
                style={{
                    backgroundImage: `url('/smile-face.jpeg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 25%',
                    backgroundRepeat: 'no-repeat',
                    clipPath: `circle(${isHovering ? hoverSize / 2 : 0}px at ${mousePosition.x}px ${mousePosition.y}px)`,
                    opacity: isLoaded ? 1 : 0
                }}
            />

            {/* Enhanced overlay with better gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/30 z-10"></div>

            {/* Noise texture with improved opacity */}
            <div className="absolute inset-0 bg-noise z-10 opacity-20"></div>

            {/* Animated background particles */}
            <div className="absolute inset-0 z-5 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400/30 rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-400/40 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-yellow-400/30 rounded-full animate-pulse delay-500"></div>
            </div>

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center relative z-20">
                {/* Hero Content */}
                <div className="w-full flex flex-col items-center justify-center text-center">
                    {/* Enhanced hover instruction */}
                    {!hasInteracted && (
                        <div className="mb-6 sm:mb-8 flex items-center gap-2 text-xs sm:text-sm text-amber-100/80 bg-[#0a0a0a]/90 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-md border border-amber-800/30 shadow-lg animate-pulse">
                            <MousePointer className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">Hover to reveal smile</span>
                            <span className="sm:hidden">Hover for smile</span>
                            <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-400" />
                        </div>
                    )}

                                {/* Enhanced Hero Text with better typography */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight text-amber-50 leading-tight px-4">
                <span className="block mb-2">I BUILD THE QUIET SPACE</span>
                <span className="block text-gradient">WHERE FUNCTION AND BEAUTY MEET.</span>
            </h1>

                    {/* Enhanced scroll indicator */}
                    <div className="absolute bottom-12 sm:bottom-16 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm opacity-80 flex flex-col items-center text-amber-100/80 group cursor-pointer hover:opacity-100 transition-opacity duration-300">
                        <span className="mb-1 sm:mb-2 group-hover:text-amber-300 transition-colors duration-300">Scroll to explore</span>
                        <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5 animate-bounce group-hover:animate-pulse transition-all duration-300" />
                    </div>
                </div>
            </div>

            {/* Enhanced bottom position indicators */}
            <div className="absolute bottom-20 sm:bottom-24 left-4 sm:left-8 md:left-24 text-sm sm:text-lg md:text-xl font-light text-amber-100/70 z-20 hover:text-amber-300 transition-colors duration-300 cursor-default">
                <span className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full animate-pulse"></div>
                    <span className="hidden sm:inline">UI UX Designer</span>
                    <span className="sm:hidden">UI/UX</span>
                </span>
            </div>
            <div className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 md:right-24 text-sm sm:text-lg md:text-xl font-light text-amber-100/70 z-20 hover:text-amber-300 transition-colors duration-300 cursor-default">
                <span className="flex items-center gap-2">
                    <span className="hidden sm:inline">Full Stack Developer</span>
                    <span className="sm:hidden">Developer</span>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full animate-pulse delay-500"></div>
                </span>
            </div>

            {/* Additional decorative elements */}
            <div className="absolute top-1/2 left-2 sm:left-4 md:left-8 w-px h-16 sm:h-20 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent z-20"></div>
            <div className="absolute top-1/2 right-2 sm:right-4 md:right-8 w-px h-16 sm:h-20 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent z-20"></div>
        </section>
    );
};

export default Hero;