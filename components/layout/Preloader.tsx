"use client";

import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+0123456789";

const Line = ({ targetText, delay, className, onComplete }: { 
    targetText: string, 
    delay: number, 
    className: string,
    onComplete?: () => void 
}) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let iteration = 0;
        let interval: any;

        const startScramble = () => {
            interval = setInterval(() => {
                setDisplayText(
                    targetText
                        .split("")
                        .map((char, index) => {
                            if (char === " ") return " ";
                            if (index < iteration) {
                                return targetText[index];
                            }
                            return characters[Math.floor(Math.random() * characters.length)];
                        })
                        .join("")
                );

                if (iteration >= targetText.length) {
                    clearInterval(interval);
                    if (onComplete) onComplete();
                }

                iteration += 1 / 2.5; // Controls the speed of resolution
            }, 30);
        };

        const timeout = setTimeout(startScramble, delay);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [targetText, delay, onComplete]);

    return (
        <span className={className}>
            {displayText}
        </span>
    );
};

const Preloader = () => {
    const [progress, setProgress] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
        const handleResize = () => setDimension({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const increment = Math.random() * 5 + 1;
                return Math.min(Math.floor(prev + increment), 100);
            });
        }, 40);
        return () => clearInterval(interval);
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
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
        }
    }), [initialPath, targetPath]) as any;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
                opacity: 0,
                transition: { duration: 0.4, delay: 0.8 } 
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

            {/* Seamless Layout Match with Hero - 1:1 Structural Duplicate */}
            <div className="absolute top-[22%] sm:top-[25%] left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center z-20">
                {/* Hero Content with Identical Padding */}
                <div className="relative w-fit flex flex-col items-center justify-center text-center px-4 py-8 sm:px-16 sm:py-10">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-amber-50 leading-[1.1] relative z-10">
                        <Line 
                            targetText="I BUILD THE QUIET SPACE" 
                            delay={400} 
                            className="block mb-2" 
                        />
                        <Line 
                            targetText="WHERE FUNCTION AND BEAUTY MEET." 
                            delay={1000} 
                            className="block text-gradient-animated neon-glow" 
                        />
                    </h1>
                </div>
            </div>

            {/* Progress Counter - Corner Data */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-10 right-10 flex items-center gap-4 z-10 hidden sm:flex"
            >
                <div className="text-right font-mono">
                    <div className="flex items-baseline justify-end tabular-nums">
                        <span className="text-2xl font-light text-amber-500/40">{progress}</span>
                        <span className="text-xs text-amber-500/10 ml-1">%</span>
                    </div>
                </div>
            </motion.div>

            {/* Aesthetic Overlays */}
            <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none z-10" />
        </motion.div>
    );
};

export default Preloader;
