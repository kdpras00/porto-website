"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';

interface SoundContextType {
  playSound: (soundName: 'click' | 'hover' | 'swoosh') => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true); // Muted by default for UX
  const [sounds, setSounds] = useState<Record<string, Howl>>({});

  useEffect(() => {
    // Initializing high-end minimalist UI sounds
    const soundAssets = {
      click: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'], // Minimalist tick
        volume: 0.2,
      }),
      hover: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'], // Soft blurp
        volume: 0.1,
      }),
      swoosh: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3'], // Low frequency swoosh
        volume: 0.15,
      }),
    };

    setSounds(soundAssets);

    return () => {
      Object.values(soundAssets).forEach((sound) => sound.unload());
    };
  }, []);

  const playSound = useCallback((soundName: 'click' | 'hover' | 'swoosh') => {
    if (!isMuted && sounds[soundName]) {
      sounds[soundName].play();
    }
  }, [isMuted, sounds]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Visual feedback for the toggle could be added here
  };

  return (
    <SoundContext.Provider value={{ playSound, isMuted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
