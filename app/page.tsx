'use client';

import { useState } from 'react';
import Header from '@/components/portfolio/Header';
import HeroContent from '@/components/portfolio/HeroContent';
import HeroImage from '@/components/portfolio/HeroImage';
import FooterMarquee from '@/components/portfolio/FooterMarquee';
import InfoDrawer from '@/components/portfolio/InfoDrawer';
import AboutSection from '@/components/portfolio/AboutSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden flex flex-col bg-black w-full">
      <div className="relative h-screen w-full flex flex-col">
        <HeroImage />
        <HeroContent />
        <Header onOpenDrawer={() => setIsDrawerOpen(true)} />
        <FooterMarquee />
      </div>
      
      <AboutSection />
      <ProjectsSection />
      
      <InfoDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </main>
  );
}