"use client";

import { ArrowDown, MousePointer } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: -999, y: -999 });
    const [isHovering, setIsHovering] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const hoverSize = 250; // Size of the hover effect in pixels
    // Dynamically adjust background position so the face in the photo is always centred nicely on different devices
    const [bgPosition, setBgPosition] = useState<string>('center 20%');

    useEffect(() => {
        const updateBackgroundPosition = () => {
            const width = window.innerWidth;
            // Fine-tuned breakpoints for a pleasant framing of the image
            if (width < 640) {
                setBgPosition('center 10%'); // mobile – bring face slightly higher
            } else if (width < 1024) {
                setBgPosition('center 15%'); // tablet
            } else if (width < 1440) {
                setBgPosition('center 20%'); // small desktop (default)
            } else {
                setBgPosition('center 25%'); // large displays – a bit lower for balance
            }
        };

        // Initialise & listen for resize events
        updateBackgroundPosition();
        window.addEventListener('resize', updateBackgroundPosition);
        return () => window.removeEventListener('resize', updateBackgroundPosition);
    }, []);

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

    // Custom cursor effect
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
            {/* Custom cursor dot */}
            <div ref={cursorDotRef} className="cursor-dot"></div>

            {/* Background Image - First photo */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url('/seriously-face.jpeg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: bgPosition,
                    backgroundRepeat: 'no-repeat'
                }}
            />

            {/* Hover effect - Second photo (using clip-path for perfect alignment) */}
            <div
                className="absolute inset-0 z-5"
                style={{
                    backgroundImage: `url('/smile-face.jpeg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: bgPosition, // Must match the main image
                    backgroundRepeat: 'no-repeat',
                    clipPath: `circle(${isHovering ? hoverSize / 2 : 0}px at ${mousePosition.x}px ${mousePosition.y}px)`,
                }}
            />

            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/40 z-10"></div>

            {/* Noise texture */}
            <div className="absolute inset-0 bg-noise z-10 opacity-30"></div>

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center relative z-20">
                {/* Hero Content */}
                <div className="w-full flex flex-col items-center justify-center text-center">
                    {/* Hover instruction */}
                    {!hasInteracted && (
                        <div className="mb-8 flex items-center gap-2 text-sm text-amber-100/70 bg-[#0a0a0a]/80 px-3 py-1 rounded-full backdrop-blur-sm border border-amber-800/20">
                            <MousePointer className="h-3 w-3" />
                            <span>Hover to reveal smile</span>
                        </div>
                    )}

                    {/* Hero Text */}
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-amber-50">
                        I BUILD THE QUIET SPACE-
                        <br />
                        WHERE FUNCTION AND BEAUTY MEET.
                    </h1>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-sm opacity-70 flex flex-col items-center text-amber-100/70">
                        <span>Scroll to explore</span>
                        <ArrowDown className="h-4 w-4 mt-2 animate-bounce" />
                    </div>
                </div>
            </div>

            {/* Bottom Position Indicators */}
            <div className="absolute bottom-24 left-8 md:left-24 text-lg md:text-xl font-light text-amber-100/70 z-20">
                UI UX Designer
            </div>
            <div className="absolute bottom-24 right-8 md:right-24 text-lg md:text-xl font-light text-amber-100/70 z-20">
                Full Stack Developer
            </div>
        </section>
    );
};

export default Hero;