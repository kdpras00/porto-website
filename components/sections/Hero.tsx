"use client";

import { ArrowDown, MousePointer, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: -999, y: -999 });
    const [isHovering, setIsHovering] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
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
            />

            {/* Background Image Container with better responsive handling */}
            <div className="absolute inset-0 z-0">
                {/* Base Image */}
                <div
                    className="absolute inset-0 hero-image image-transition"
                    style={{
                        backgroundImage: `url('/seriously-face.jpeg')`,
                        backgroundPosition: 'center 25%',
                        opacity: isImageLoaded ? 1 : 0
                    }}
                />
                
                {/* Hover Image with improved clip-path */}
                <div
                    className="absolute inset-0 hero-image transition-all duration-300 ease-out"
                    style={{
                        backgroundImage: `url('/smile-face.jpeg')`,
                        backgroundPosition: 'center 25%',
                        clipPath: `circle(${isHovering ? hoverSize / 2 : 0}px at ${mousePosition.x}px ${mousePosition.y}px)`,
                        opacity: isImageLoaded ? 1 : 0
                    }}
                />
            </div>

            {/* Enhanced gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 via-[#0a0a0a]/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/60 z-10"></div>

            {/* Noise texture with better blending */}
            <div className="absolute inset-0 bg-noise z-10 opacity-20 mix-blend-mode-overlay"></div>

            {/* Animated background particles */}
            <div className="absolute inset-0 z-5 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center relative z-20">
                {/* Hero Content */}
                <div className="w-full flex flex-col items-center justify-center text-center space-y-8">
                    {/* Enhanced hover instruction */}
                    {!hasInteracted && (
                        <div className="mb-8 flex items-center gap-3 text-sm text-amber-100/80 bg-[#0a0a0a]/90 px-4 py-2 rounded-full backdrop-blur-custom border border-amber-800/30 shadow-lg animate-pulse">
                            <MousePointer className="h-4 w-4 text-amber-400" />
                            <span className="font-medium">Hover to reveal smile</span>
                            <Sparkles className="h-4 w-4 text-amber-400" />
                        </div>
                    )}

                    {/* Enhanced Hero Text with better typography */}
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-amber-50 leading-tight">
                            <span className="block">I BUILD THE</span>
                            <span className="block text-gradient">QUIET SPACE</span>
                            <span className="block text-2xl md:text-3xl lg:text-4xl font-light text-amber-200/80 mt-4">
                                WHERE FUNCTION AND BEAUTY MEET
                            </span>
                        </h1>
                        
                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-amber-200/70 max-w-2xl mx-auto leading-relaxed">
                            Crafting digital experiences that blend elegant design with powerful functionality
                        </p>
                    </div>

                    {/* Enhanced scroll indicator */}
                    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-sm opacity-80 flex flex-col items-center text-amber-100/80 space-y-2">
                        <span className="font-medium tracking-wide">Scroll to explore</span>
                        <ArrowDown className="h-5 w-5 animate-bounce text-amber-400" />
                    </div>
                </div>
            </div>

            {/* Enhanced position indicators */}
            <div className="absolute bottom-32 left-8 md:left-24 text-lg md:text-xl font-light text-amber-100/70 z-20 backdrop-blur-custom bg-[#0a0a0a]/30 px-4 py-2 rounded-full border border-amber-800/30 shadow-lg">
                <span className="text-gradient font-medium">UI/UX Designer</span>
            </div>
            <div className="absolute bottom-32 right-8 md:right-24 text-lg md:text-xl font-light text-amber-100/70 z-20 backdrop-blur-custom bg-[#0a0a0a]/30 px-4 py-2 rounded-full border border-amber-800/30 shadow-lg">
                <span className="text-gradient font-medium">Full Stack Developer</span>
            </div>

            {/* Preload images for better performance */}
            <div className="hidden">
                <Image
                    src="/seriously-face.jpeg"
                    alt="Preload serious face"
                    width={1}
                    height={1}
                    onLoad={() => setIsImageLoaded(true)}
                />
                <Image
                    src="/smile-face.jpeg"
                    alt="Preload smile face"
                    width={1}
                    height={1}
                    onLoad={() => setIsImageLoaded(true)}
                />
            </div>
        </section>
    );
};

export default Hero;