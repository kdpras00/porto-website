"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from '@/components/layout/Preloader';

interface PreloaderContextType {
    isLoading: boolean;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export function PreloaderProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Set a minimum loading time for the animation to play out nicely
        const timer = setTimeout(() => {
            setIsLoading(false);
            // Re-enable scrolling after loading
            document.body.style.overflow = 'auto';
        }, 4000); // 4 seconds total to accommodate shuffle + branding reveal

        // Disable scrolling while loading
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <PreloaderContext.Provider value={{ isLoading }}>
            <AnimatePresence>
                {isLoading && <Preloader key="preloader" />}
            </AnimatePresence>
            {children}
        </PreloaderContext.Provider>
    );
}

export const usePreloader = () => {
    const context = useContext(PreloaderContext);
    if (context === undefined) {
        throw new Error('usePreloader must be used within a PreloaderProvider');
    }
    return context;
};
