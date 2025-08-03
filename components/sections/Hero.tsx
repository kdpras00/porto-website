"use client";

import { ArrowDown, MousePointer, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: -999, y: -999 });
    const [isHovering, setIsHovering] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const heroRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const hoverSize = 300; // Increased hover effect size

    // Optimized mouse move handler with throttling
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
            if (!hasInteracted) setHasInteracted(true);
        }
    }, [hasInteracted]);

    // Enhanced cursor effect with smooth animation
    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (cursorDotRef.current) {
                cursorDotRef.current.style.left = `${e.clientX}px`;
                cursorDotRef.current.style.top = `${e.clientY}px`;
            }
        };

        document.addEventListener('mousemove', handleGlobalMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
        };
    }, []);

    // Parallax scroll effect
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Loading animation
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 500);
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
            {/* Custom cursor dot with enhanced styling */}
            <div 
                ref={cursorDotRef} 
                className={`cursor-dot transition-all duration-300 ${isHovering ? 'scale-150 bg-amber-400' : 'scale-100'}`}
            />

            {/* Background Image Container with better optimization */}
            <div className="absolute inset-0 z-0">
                {/* Optimized background image for first photo with perfect positioning */}
                <div
                    className="absolute inset-0 transition-transform duration-1000 ease-out hero-bg-image"
                    style={{
                        transform: `translateY(${scrollY * 0.5}px)`,
                        backgroundImage: `url('/seriously-face.jpeg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 30%',
                        backgroundRepeat: 'no-repeat',
                        filter: 'brightness(0.7) contrast(1.1)',
                    }}
                />
                
                {/* Enhanced hover effect with smooth transition and perfect alignment */}
                <div
                    className="absolute inset-0 z-5 transition-all duration-300 ease-out hero-hover-image"
                    style={{
                        backgroundImage: `url('/smile-face.jpeg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 30%', // Match exactly with main image
                        backgroundRepeat: 'no-repeat',
                        filter: 'brightness(0.8) contrast(1.2) saturate(1.1)',
                        clipPath: `circle(${isHovering ? hoverSize / 2 : 0}px at ${mousePosition.x}px ${mousePosition.y}px)`,
                        transform: `translateY(${scrollY * 0.3}px)`,
                    }}
                />
            </div>

            {/* Enhanced gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/80 via-[#0a0a0a]/60 to-[#1a0f0a]/40 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />

            {/* Improved noise texture with animation */}
            <div className="absolute inset-0 bg-noise z-10 opacity-20 animate-pulse-slow" />

            {/* Floating particles effect */}
            <div className="absolute inset-0 z-15">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    />
                ))}
            </div>

            <div className={`max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center relative z-20 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {/* Hero Content */}
                <div className="w-full flex flex-col items-center justify-center text-center">
                    {/* Enhanced hover instruction with better styling */}
                    {!hasInteracted && (
                        <div className="mb-8 flex items-center gap-3 text-sm text-amber-100/80 bg-gradient-to-r from-[#0a0a0a]/90 to-[#1a0f0a]/90 px-4 py-2 rounded-full backdrop-blur-lg border border-amber-800/30 shadow-lg animate-pulse-subtle">
                            <MousePointer className="h-4 w-4 text-amber-400 animate-bounce" />
                            <span className="font-medium">Hover to reveal the magic</span>
                            <Sparkles className="h-3 w-3 text-amber-400/70" />
                        </div>
                    )}

                    {/* Enhanced Hero Text with better typography */}
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 leading-tight">
                            <span className="block animate-slide-up" style={{ animationDelay: '0.2s' }}>
                                I BUILD THE QUIET SPACE
                            </span>
                            <span className="block text-3xl md:text-5xl lg:text-6xl mt-2 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                                WHERE FUNCTION AND
                            </span>
                            <span className="block text-amber-400 font-extrabold animate-slide-up" style={{ animationDelay: '0.6s' }}>
                                BEAUTY MEET.
                            </span>
                        </h1>
                        
                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-amber-100/70 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.8s' }}>
                            Crafting digital experiences that blend seamless functionality with elegant design, 
                            creating spaces where users feel at home.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="mt-12 flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '1s' }}>
                        <button
                            onClick={() => scrollToSection('about')}
                            className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
                        >
                            <span className="relative z-10">Explore My Work</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="px-8 py-4 border-2 border-amber-400/50 hover:border-amber-400 text-amber-100 hover:text-white font-semibold rounded-full transition-all duration-300 hover:bg-amber-400/10 hover:shadow-lg hover:shadow-amber-400/20 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
                        >
                            Get In Touch
                        </button>
                    </div>

                    {/* Enhanced Scroll Indicator */}
                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-sm opacity-70 flex flex-col items-center text-amber-100/70 animate-fade-in" style={{ animationDelay: '1.2s' }}>
                        <span className="mb-2 font-medium">Scroll to explore</span>
                        <div className="relative">
                            <ArrowDown className="h-5 w-5 animate-bounce text-amber-400" />
                            <div className="absolute inset-0 h-5 w-5 bg-amber-400/20 rounded-full animate-ping" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Position Indicators with better styling */}
            <div className="absolute bottom-24 left-4 sm:left-8 md:left-24 z-20 animate-slide-left" style={{ animationDelay: '1.4s' }}>
                <div className="flex flex-col items-start space-y-2">
                    <div className="text-lg md:text-xl font-light text-amber-100/80 tracking-wide">
                        UI/UX Designer
                    </div>
                    <div className="h-0.5 w-16 bg-gradient-to-r from-amber-400 to-transparent" />
                </div>
            </div>
            <div className="absolute bottom-24 right-4 sm:right-8 md:right-24 z-20 animate-slide-right" style={{ animationDelay: '1.6s' }}>
                <div className="flex flex-col items-end space-y-2">
                    <div className="text-lg md:text-xl font-light text-amber-100/80 tracking-wide">
                        Full Stack Developer
                    </div>
                    <div className="h-0.5 w-16 bg-gradient-to-l from-amber-400 to-transparent" />
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 left-8 w-1 h-16 bg-gradient-to-b from-amber-400 to-transparent opacity-30 animate-pulse" />
            <div className="absolute top-1/3 right-8 w-1 h-12 bg-gradient-to-b from-amber-400 to-transparent opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </section>
    );
};

export default Hero;