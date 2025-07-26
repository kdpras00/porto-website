"use client";

import { Heart, Code } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>and</span>
            <Code className="h-4 w-4 text-blue-500" />
            <span>by Ahmad Rifaldi</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {currentYear} Ahmad Rifaldi. All rights reserved.
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Built with Next.js, Tailwind CSS, and deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;