"use client";

import { Heart, Code } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex-1" />
          <div className="text-sm text-amber-100/70 md:text-right w-full md:w-auto">
            © {currentYear} Kurniawan Dwi Prasetyo. All rights reserved.
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-amber-900/10 text-center">
          <p className="text-xs text-amber-100/50"></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;