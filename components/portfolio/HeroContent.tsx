'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WORDS = ['FRONTEND', 'BACKEND'];
const BIO_TEXT =
  "I'm Kurniawan Dwi Prasetyo — a full stack developer crafting bold, high-contrast digital experiences that are intuitive, impactful, and built to stand out.";

function ScrambleText({ word }: { word: string }) {
  const [displayText, setDisplayText] = useState(word);

  useEffect(() => {
    let iteration = 0;
    const maxIterations = 10;
    const interval = setInterval(() => {
      setDisplayText((oldText) =>
        oldText
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return word[index];
            }
            return String.fromCharCode(65 + Math.floor(Math.random() * 26));
          })
          .join(''),
      );

      if (iteration >= word.length) {
        clearInterval(interval);
        setDisplayText(word);
      }

      iteration += 1 / 3;
    }, 50);

    return () => clearInterval(interval);
  }, [word]);

  return <>{displayText}</>;
}

export default function HeroContent() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 4000);

    return () => {
      clearInterval(wordInterval);
    };
  }, []);

  return (
    <div className="relative z-20 flex-1 flex flex-col items-start justify-center pointer-events-none mt-20 px-4 md:px-10">
      <div className="flex flex-col items-start text-left">
        <h2
          className="font-display uppercase tracking-tight"
          style={{
            WebkitTextStroke: '1px white',
            color: 'transparent',
            fontSize: 'clamp(17px, 4vw, 55px)',
            lineHeight: 1,
          }}
        >
          BUILDING
        </h2>

        <h1
          className="font-display uppercase text-gray-300"
          style={{
            fontSize: 'clamp(35px, 8vw, 110px)',
            lineHeight: 0.9,
            textShadow: '0 0 20px rgba(209,213,219,0.3)',
          }}
        >
          <ScrambleText key={wordIndex} word={WORDS[wordIndex]} />
        </h1>
      </div>

      <div className="absolute bottom-40 right-8 md:bottom-48 md:right-24 max-w-sm md:max-w-md text-right">
        <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed">
          {BIO_TEXT}
        </p>
      </div>
    </div>
  );
}
