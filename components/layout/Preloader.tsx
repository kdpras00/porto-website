"use client";

import { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+0123456789";

const ScrambleLine = ({ targetText, delay, className }: { 
    targetText: string, 
    delay: number, 
    className: string
}) => {
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        let iteration = 0;
        const duration = 1.5; // seconds
        const frames = 60;
        const totalIterations = duration * frames;
        
        const scramble = () => {
            if (!textRef.current) return;
            
            textRef.current.innerText = targetText
                .split("")
                .map((char, index) => {
                    if (char === " ") return " ";
                    if (index < iteration) {
                        return targetText[index];
                    }
                    return characters[Math.floor(Math.random() * characters.length)];
                })
                .join("");

            if (iteration >= targetText.length) {
                gsap.ticker.remove(scramble);
            }

            iteration += targetText.length / totalIterations;
        };

        const timer = setTimeout(() => {
            gsap.ticker.add(scramble);
            gsap.fromTo(textRef.current, 
                { opacity: 0, filter: 'blur(10px)' }, 
                { opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }
            );
        }, delay);

        return () => {
            clearTimeout(timer);
            gsap.ticker.remove(scramble);
        };
    }, [targetText, delay]);

    return (
        <span ref={textRef} className={className}>
            &nbsp;
        </span>
    );
};

const Preloader = () => {
    const [progress, setProgress] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
        const handleResize = () => setDimension({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Master GSAP Timeline for the Preloader sequence
        const tl = gsap.timeline({
            onComplete: () => {
                // Any logic after preloader finish
            }
        });

        // Simulating loading progress with GSAP ease
        const obj = { value: 0 };
        tl.to(obj, {
            value: 100,
            duration: 2.5,
            ease: "power2.inOut",
            onUpdate: () => setProgress(Math.floor(obj.value)),
        });

        return () => {
            tl.kill();
        };
    }, []);

    const initialPath = useMemo(() => 
        `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`,
        [dimension]
    );
    
    const targetPath = useMemo(() => 
        `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} -300 0 0 L0 0`,
        [dimension]
    );

    const curve = useMemo(() => ({
        initial: {
            d: initialPath,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: targetPath,
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
        }
    }), [initialPath, targetPath]) as any;

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 1 }}
            exit={{ 
                opacity: 0,
                transition: { duration: 0.4, delay: 1.2 } 
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent overflow-hidden"
        >
            {/* SVG Curtain */}
            {dimension.width > 0 && (
                <svg className="absolute top-0 left-0 w-full h-[calc(100%_+_300px)] pointer-events-none">
                    <motion.path
                        variants={curve}
                        initial="initial"
                        exit="exit"
                        fill="#0a0a0a"
                    />
                </svg>
            )}

            {/* Seamless Layout Match with Hero */}
            <div className="absolute top-[22%] sm:top-[25%] left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center z-20">
                <div className="relative w-fit flex flex-col items-center justify-center text-center px-4 py-8 sm:px-16 sm:py-10">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-amber-50 leading-[1.1] relative z-10">
                        <ScrambleLine 
                            targetText="I BUILD THE QUIET SPACE" 
                            delay={400} 
                            className="block mb-2" 
                        />
                        <ScrambleLine 
                            targetText="WHERE FUNCTION AND BEAUTY MEET." 
                            delay={1200} 
                            className="block text-gradient-animated neon-glow" 
                        />
                    </h1>
                </div>
            </div>

            {/* Progress Counter - Digital Data */}
            <div 
                ref={counterRef}
                className="absolute bottom-10 right-10 flex items-center gap-4 z-10 hidden sm:flex"
            >
                <div className="text-right font-mono">
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="h-px w-24 bg-amber-500/20 mb-2 origin-right"
                    />
                    <div className="flex items-baseline justify-end tabular-nums">
                        <span className="text-2xl font-light text-amber-500/60 uppercase tracking-widest mr-4 text-[10px]">Processing</span>
                        <span className="text-4xl font-light text-amber-500/40">{progress.toString().padStart(3, '0')}</span>
                    </div>
                </div>
            </div>

            {/* Aesthetic Overlays */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10" />
        </motion.div>
    );
};

export default Preloader;
