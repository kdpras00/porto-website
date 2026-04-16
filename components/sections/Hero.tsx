"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ParticleBackground from '../ParticleBackground';

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+0123456789";

const HeroScramble = ({ targetText, delay, className }: { 
    targetText: string, 
    delay: number, 
    className: string
}) => {
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        let iteration = 0;
        const duration = 1.2;
        const frames = 60;
        const totalIterations = duration * frames;
        
        const scramble = () => {
            if (!textRef.current) return;
            textRef.current.innerText = targetText
                .split("")
                .map((char, index) => {
                    if (char === " ") return " ";
                    if (index < iteration) return targetText[index];
                    return characters[Math.floor(Math.random() * characters.length)];
                })
                .join("");

            if (iteration >= targetText.length) gsap.ticker.remove(scramble);
            iteration += targetText.length / totalIterations;
        };

        const timer = setTimeout(() => {
            gsap.ticker.add(scramble);
        }, delay);

        return () => {
            clearTimeout(timer);
            gsap.ticker.remove(scramble);
        };
    }, [targetText, delay]);

    return <span ref={textRef} className={className}>{targetText}</span>;
};

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const sensorRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (!bgRef.current || !sensorRef.current) return;

        const tl = gsap.timeline({ delay: 0.5 });

        // Background entrance: subtle zoom out and fade in
        tl.fromTo(bgRef.current, 
            { scale: 1.1, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 2.5, ease: "power2.out" }
        );

        // Sensor bar horizontal expansion
        tl.fromTo(sensorRef.current,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 1.2, ease: "power4.inOut" },
            "-=1.5"
        );

        // Decorative elements
        tl.fromTo(".hero-decor",
            { scaleY: 0, opacity: 0 },
            { scaleY: 1, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
            "-=0.5"
        );

    }, [bgRef, sensorRef]);

    return (
        <section
            ref={heroRef}
            id="hero"
            className="min-h-screen flex items-center justify-center text-white relative overflow-hidden"
        >
            <ParticleBackground />

            {/* GSAP Managed Background */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0 bg-no-repeat bg-cover pointer-events-none"
                style={{
                    backgroundImage: `url('/seriously-face.jpeg')`,
                    backgroundPosition: '48% 15%',
                }}
            />

            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/30 z-10"></div>

            <div className="absolute top-[22%] sm:top-[25%] left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center z-20">
                {/* Advanced GSAP Sensor Bar */}
                <div 
                    ref={sensorRef}
                    className="relative w-fit flex flex-col items-center justify-center text-center bg-[#0a0a0a]/80 backdrop-blur-md px-4 py-8 sm:px-16 sm:py-10 border-x border-amber-500/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                >
                    {/* Viewfinder L-Corners */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-amber-500/40" />
                        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-amber-500/40" />
                        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-amber-500/40" />
                        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-amber-500/40" />
                    </div>

                    {/* Infinite Scanline Overlay */}
                    <motion.div 
                        animate={{ y: ['0%', '100%', '0%'] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-full h-[1px] bg-amber-500/5 z-0 pointer-events-none"
                    />

                    {/* Metadata flickering effects */}
                    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between w-[calc(100%-32px)] pointer-events-none overflow-hidden">
                        <div className="flex flex-col gap-1 items-start">
                            <div className="flex items-center gap-1">
                                <motion.div 
                                    animate={{ opacity: [1, 0, 1] }} 
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="w-1 h-1 bg-red-500 rounded-full" 
                                />
                                <span className="text-[6px] sm:text-[8px] font-mono tracking-[0.3em] uppercase text-amber-500/40">Rec_Session</span>
                            </div>
                            <span className="text-[6px] sm:text-[8px] font-mono text-amber-500/10 flicker-text">40.7128N</span>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                            <span className="text-[6px] sm:text-[8px] font-mono tracking-[0.3em] uppercase text-amber-500/40">Verified_01</span>
                            <span className="text-[6px] sm:text-[8px] font-mono text-amber-500/10 flicker-text">74.0060W</span>
                        </div>
                    </div>

                    {/* Scrambled Hero Text for High-End Transition */}
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-amber-50 leading-[1.1] relative z-10">
                        {isMounted && (
                            <>
                                <HeroScramble 
                                    targetText="I BUILD THE QUIET SPACE" 
                                    delay={1500} 
                                    className="block mb-2" 
                                />
                                <HeroScramble 
                                    targetText="WHERE FUNCTION AND BEAUTY MEET." 
                                    delay={2200} 
                                    className="block text-gradient-animated neon-glow" 
                                />
                            </>
                        )}
                    </h1>
                </div>
            </div>

            {/* Side UI Accents */}
            <div className="hero-decor absolute top-1/2 left-2 sm:left-4 md:left-8 w-px h-20 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent z-10" />
            <div className="hero-decor absolute top-1/2 right-2 sm:right-4 md:right-8 w-px h-20 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent z-10" />
        </section>
    );
};

export default Hero;