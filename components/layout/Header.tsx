"use client";

import { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/components/providers/SoundProvider';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { playSound, isMuted, toggleMute } = useSound();

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    playSound('click');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'About', href: 'about' },
    { label: 'Works', href: 'projects' },
    { label: 'Contact', href: 'contact' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled
        ? 'glass-dark border-b border-amber-900/10 py-2'
        : 'bg-transparent py-4'
        }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative flex items-center h-16">
          
          {/* Left: Logo/Name */}
          <motion.div
            className="flex-shrink-0 z-20"
            whileHover={{ scale: 1.05 }}
          >
            <button 
              onClick={() => {
                playSound('click');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onMouseEnter={() => playSound('hover')}
              className="group flex items-center gap-1"
            >
              <span className="text-lg sm:text-xl font-poppins font-bold tracking-tighter text-amber-50 group-hover:text-amber-400 transition-all">
                kurniawandwipras
              </span>
              <span className="w-1 h-1 bg-amber-500 rounded-full group-hover:scale-150 transition-transform duration-300" />
            </button>
          </motion.div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                onMouseEnter={() => playSound('hover')}
                className="text-amber-50/70 hover:text-amber-50 transition-all duration-300 text-sm font-poppins font-medium tracking-wide relative py-1"
                whileHover={{ y: -2 }}
              >
                {item.label}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 rounded-full"
                  whileHover={{ width: "100%" }}
                />
              </motion.button>
            ))}
          </nav>

          {/* Right: Actions/Socials */}
          <div className="hidden md:flex items-center ml-auto gap-8 z-20">
            {/* Sound Toggle */}
            <button 
              onClick={toggleMute}
              onMouseEnter={() => playSound('hover')}
              className="flex items-center justify-center p-2 rounded-full hover:bg-white/5 transition-all text-amber-50/60 hover:text-amber-400"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('click')}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-poppins font-medium text-amber-50/60 hover:text-amber-400 transition-all group"
            >
              Linkedin
              <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('click')}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-poppins font-medium text-amber-50/60 hover:text-amber-400 transition-all group"
            >
              Resume
              <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>

          {/* Mobile: Toggle */}
          <div className="md:hidden ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="text-amber-100 hover:bg-amber-900/20 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-amber-900/20 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-lg font-poppins font-medium text-left text-amber-50/70 hover:text-amber-400 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="h-px bg-amber-900/20 w-full" />
                <div className="flex flex-col gap-4">
                  <a href="#" className="flex items-center justify-between text-sm font-poppins text-amber-50/50">
                    LinkedIn <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a href="#" className="flex items-center justify-between text-sm font-poppins text-amber-50/50">
                    Resume <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;