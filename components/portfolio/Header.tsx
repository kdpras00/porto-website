'use client';

import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenDrawer: () => void;
}

export default function Header({ onOpenDrawer }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 pointer-events-auto transition-all duration-500 ${
        scrolled ? 'bg-[#030014]/80 backdrop-blur-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div 
        className="flex items-center group cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <h1 className="font-display text-2xl md:text-3xl tracking-widest uppercase hover:text-[#D1D5DB] transition-colors">
          KURNIAWAN DWI PRASETYO
        </h1>
      </div>

      <button 
        onClick={onOpenDrawer}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 hover:border-[#D1D5DB] hover:text-[#D1D5DB] transition-colors group"
      >
        <Menu size={16} />
      </button>
    </header>
  );
}
