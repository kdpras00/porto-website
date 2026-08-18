"use client";

import { Menu, FileText, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";

interface HeaderProps {
  onOpenDrawer: () => void;
}

export default function Header({ onOpenDrawer }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 pointer-events-auto transition-all duration-500 ${
        scrolled
          ? "bg-[#030014]/80 backdrop-blur-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div
        className="flex items-center group cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <h1 className="font-display text-xl md:text-2xl tracking-widest uppercase hover:text-[#D1D5DB] transition-colors">
          KURNIAWAN DWI PRASETYO
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Resume Link */}
        <a
          href="https://drive.google.com/file/d/1pKH7zUE5EWJkmqWwYP9A2WS3A1pj18LI/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 font-mono text-xs text-white/70 hover:text-white transition-colors uppercase tracking-widest px-4 py-2 border border-white/20 rounded-full hover:border-white/40"
        >
          <FileText size={14} />
          Resume
        </a>

        {/* LinkedIn Link */}
        <a
          href="https://www.linkedin.com/in/kurniawan-dwi-prasetyo"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 font-mono text-xs text-white/70 hover:text-white transition-colors uppercase tracking-widest px-4 py-2 border border-white/20 rounded-full hover:border-white/40"
        >
          <Linkedin size={14} />
          LinkedIn
        </a>

        {/* Menu Button */}
        <button
          onClick={onOpenDrawer}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 hover:border-[#D1D5DB] hover:text-[#D1D5DB] transition-colors group"
        >
          <Menu size={16} />
        </button>
      </div>
    </header>
  );
}
