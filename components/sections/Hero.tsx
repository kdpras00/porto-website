"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '@/components/ParticleBackground';

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Set loaded state after component mounts
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            id="hero"
            className="min-h-screen flex items-center justify-center text-white relative overflow-hidden"
        >
            {/* Particle Background */}
            <ParticleBackground />

            {/* Background Image - Adjusted positioning for the 'Censored' look */}
            <div
                className="absolute inset-0 z-0 transition-opacity duration-1000 ease-out"
                style={{
                    backgroundImage: `url('/seriously-face.jpeg')`,
                    backgroundSize: '100%',
                    backgroundPosition: '50% 24%',
                    backgroundRepeat: 'no-repeat',
                    opacity: isLoaded ? 1 : 0
                }}
            />

            {/* Enhanced overlay with better gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/30 z-10"></div>

            <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center z-20">
                {/* Hero Content with Elite Artistic Sensor Bar */}
                <motion.div 
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="relative w-fit flex flex-col items-center justify-center text-center bg-[#0a0a0a] px-8 py-6 sm:px-16 sm:py-10 border-x border-amber-500/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                >
                    {/* Viewfinder L-Corners */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-amber-500/40" />
                        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-amber-500/40" />
                        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-amber-500/40" />
                        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-amber-500/40" />
                    </div>

                    {/* Subtle Scanline Overlay */}
                    <motion.div 
                        animate={{ y: ['0%', '100%', '0%'] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-full h-[1px] bg-amber-500/5 z-0 pointer-events-none"
                    />

                    {/* Internal Tech Labels - Now Elite Artistic */}
                    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between w-[calc(100%-32px)] pointer-events-none overflow-hidden">
                        <div className="flex flex-col gap-1 items-start">
                            <div className="flex items-center gap-1">
                                <motion.div 
                                    animate={{ opacity: [1, 0, 1] }} 
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="w-1 h-1 bg-red-500 rounded-full" 
                                />
                                <span className="text-[6px] sm:text-[8px] font-mono tracking-[0.3em] uppercase text-amber-500/40">Scanning</span>
                            </div>
                            <motion.span 
                                animate={{ opacity: [0.3, 0.1, 0.3, 0.2, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="text-[6px] sm:text-[8px] font-mono text-amber-500/10"
                            >
                                40.7128N
                            </motion.span>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                            <span className="text-[6px] sm:text-[8px] font-mono tracking-[0.3em] uppercase text-amber-500/40">Identity_Verified</span>
                            <motion.span 
                                animate={{ opacity: [0.3, 0.2, 0.4, 0.1, 0.3] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="text-[6px] sm:text-[8px] font-mono text-amber-500/10"
                            >
                                74.0060W
                            </motion.span>
                        </div>
                    </div>

                    {/* Enhanced Hero Text */}
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-amber-50 leading-tight relative z-10"
                    >
                        <motion.span
                            className="block mb-2 whitespace-nowrap"
                            animate={{ opacity: [0, 1, 0.8, 1] }}
                            transition={{ duration: 0.2, delay: 1.4 }}
                        >
                            I BUILD THE QUIET SPACE
                        </motion.span>
                        <motion.span
                            className="block text-gradient-animated neon-glow whitespace-nowrap"
                            animate={{ opacity: [0, 1, 0.9, 1] }}
                            transition={{ duration: 0.2, delay: 1.6 }}
                        >
                            WHERE FUNCTION AND BEAUTY MEET.
                        </motion.span>
                    </motion.h1>
                </motion.div>
            </div>

            {/* Additional decorative elements with animations */}
            <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute top-1/2 left-2 sm:left-4 md:left-8 w-px h-16 sm:h-20 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent z-10"
            ></motion.div>
            <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="absolute top-1/2 right-2 sm:right-4 md:right-8 w-px h-16 sm:h-20 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent z-10"
            ></motion.div>
        </section>
    );
};

export default Hero;