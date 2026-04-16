"use client";

import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Code, Palette, Coffee } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSound } from '@/components/providers/SoundProvider';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { playSound } = useSound();

  const interests = [
    'Web Development',
    'UI/UX Design',
    'Mobile Apps',
    'Machine Learning',
  ];

  const experience = [
    {
      title: 'Junior Full Stack Developer',
      company: 'Farovon Maju Bersama.',
      period: 'April 2025 - Juli 2025',
      description: 'Participated in the development of web application features using Next.js and React.js on the frontend, and Laravel for backend needs. Assisted with API integration and performed debugging and feature testing alongside the senior development team.'
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Title reveal
    tl.fromTo(".about-title", 
      { y: 50, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: "power3.out" }
    );

    // Cards staggered entrance
    tl.fromTo(".about-card",
      { y: 100, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.2, ease: "power4.out" },
      "-=0.5"
    );

    // Subtle drift for the whole container to feel 'liquid'
    gsap.to(containerRef.current, {
      y: -20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="about-title text-center mb-24">
          <h2 className="text-4xl sm:text-6xl font-bold mb-6 text-gradient-animated tracking-tighter uppercase font-poppins">Technical Identity</h2>
          <p className="text-xl text-amber-100/40 max-w-2xl mx-auto font-light tracking-wide italic">
            "Merging structured engineering with intuitive human-centric design."
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Personal Info */}
          <div className="about-card">
            <Card 
              className="border-0 shadow-2xl glass-dark rounded-none group"
              onMouseEnter={() => playSound('hover')}
            >
              <CardContent className="p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-amber-500/10 rounded-full">
                    <Code className="h-6 w-6 text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-amber-50 tracking-tight">The Profile</h3>
                </div>
                
                <p className="text-amber-100/60 mb-6 leading-relaxed font-light">
                  I am a full-stack architect who views code as a medium for artistic expression. With a focus on 
                  <strong> performance, fluid kinetics,</strong> and <strong>premium aesthetics</strong>, I build digital 
                  ecosystems that do more than just function—they resonate.
                </p>
                <p className="text-amber-100/60 mb-10 leading-relaxed font-light">
                  My philosophy is rooted in the "Quiet Space" where technology disappears and only the experience remains. 
                  Every pixel is intentional, every animation represents a breath.
                </p>

                <div className="flex flex-wrap items-center gap-6 text-xs text-amber-100/40 mb-10 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-amber-500/50" />
                    <span>Tangerang, IDN</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-amber-500/50" />
                    <span>Available Worldwide</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-[0.4em] text-amber-500/50 font-bold">Domain Focus</h4>
                  <div className="flex flex-wrap gap-3">
                    {interests.map((interest) => (
                      <Badge 
                        key={interest} 
                        variant="secondary" 
                        className="bg-amber-500/5 text-amber-200/60 border-amber-500/10 rounded-none px-4 py-1.5 hover:bg-amber-500 hover:text-[#0a0a0a] transition-all cursor-default"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Experience */}
          <div className="about-card lg:mt-24">
            <Card 
              className="border-0 shadow-2xl glass-dark rounded-none group"
              onMouseEnter={() => playSound('hover')}
            >
              <CardContent className="p-10">
                <div className="flex items-center gap-4 mb-12">
                  <div className="p-3 bg-amber-500/10 rounded-full">
                    <Palette className="h-6 w-6 text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-amber-50 tracking-tight">Chronicle</h3>
                </div>

                <div className="space-y-12">
                  {experience.map((exp, index) => (
                    <div
                      key={index}
                      className="relative pl-8 border-l border-amber-500/20 last:border-l-0"
                    >
                      <div className="absolute -left-[5px] top-0 w-2 h-2 bg-amber-500 rounded-full group-hover:scale-150 transition-transform"></div>
                      <div className="pb-4">
                        <span className="text-[10px] text-amber-500/40 uppercase tracking-[0.3em] font-mono">{exp.period}</span>
                        <h4 className="font-bold text-xl text-amber-50 mt-2 tracking-tight">{exp.title}</h4>
                        <p className="text-amber-400/80 font-medium text-sm italic mb-4">{exp.company}</p>
                        <p className="text-amber-100/40 text-sm leading-relaxed font-light">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;