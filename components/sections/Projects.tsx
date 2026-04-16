"use client";

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSound } from '@/components/providers/SoundProvider';

interface Project {
  title: string;
  description?: string;
  image: string;
  technologies?: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { playSound } = useSound();
  
  const projects: Project[] = [
    {
      title: 'Story App Dicoding',
      description: 'A social media-like application for sharing stories with location and image support.',
      image: '/storyApp-Dicoding.png',
      technologies: ['Android', 'Kotlin', 'Maps API', 'Retrofit'],
      githubUrl: 'https://github.com/kdpras00/StoryApp/',
      liveUrl: 'https://storyapp-dicoding.netlify.app/',
      featured: true
    },
    {
      title: 'GYM BRO',
      description: 'A comprehensive fitness tracking and gym management platform developed as a capstone project.',
      image: '/Gym-Bro.png',
      technologies: ['React', 'Node.js', 'Firebase', 'Tailwind CSS'],
      githubUrl: 'https://github.com/apridoilham/CapstoneProject.GYMBRO/',
      liveUrl: 'https://capstone-project-gymbro.vercel.app/',
      featured: true
    },
    {
      title: 'LAZISMU BANTEN',
      description: 'A website for LAZISMU BANTEN to help people donate to the poor.',
      image: '/lazismu-banten.png',
      technologies: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS'],
      githubUrl: 'https://github.com/kdpras00/lazismu-banten/',
      liveUrl: 'https://lazismu-banten.my.id/',
      featured: true
    },
    {
      title: 'SIBK LATANSA CENDEKIA',
      description: 'A web-based information system conseling for Latansa Cendekia built with Laravel and Tailwind CSS. ',
      image: '/sibk-latansa-cendekia.png',
      technologies: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS'],
      githubUrl: 'https://github.com/kdpras00/SIBK-Latansa-Cendekia/',
      liveUrl: 'https://sibk-latansacendekia.my.id/',
      featured: true
    },

  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax effect for ALL project images
    const projectImages = gsap.utils.toArray('.project-image-parallax');
    projectImages.forEach((img: any) => {
      gsap.to(img, {
        yPercent: 15, // Moves opposite to scroll
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Staggered entrance for cards
    const projectCards = gsap.utils.toArray('.project-card-reveal');
    projectCards.forEach((card: any) => {
      gsap.fromTo(card, 
        { 
          y: 100, 
          opacity: 0,
          scale: 0.95,
          filter: 'blur(10px)'
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-32 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="project-card-reveal text-center mb-24">
          <h2 className="text-4xl sm:text-6xl font-bold mb-6 text-gradient-animated tracking-tighter">SELECTED WORKS</h2>
          <p className="text-xl text-amber-100/40 max-w-2xl mx-auto font-light tracking-wide">
            A curated selection of digital experiences built with precision and intent.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-24 px-4 sm:px-0">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {featuredProjects.map((project, index) => (
              <div key={index} className="project-card-reveal">
                <Card className="group overflow-hidden border-0 shadow-2xl glass-dark rounded-none">
                  <div className="relative overflow-hidden h-80 sm:h-[450px] bg-amber-900/10">
                    {project.image && (
                      <div className="absolute inset-0 project-image-parallax -top-[10%] h-[120%]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain sm:object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                          loading="lazy"
                          quality={90}
                        />
                      </div>
                    )}
                    
                    {/* Minimalist Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6 z-20">
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="glass w-14 h-14 rounded-full border-amber-500/50 hover:bg-amber-500" 
                        onMouseEnter={() => playSound('hover')}
                        onClick={() => playSound('click')}
                        asChild
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-6 w-6" />
                        </a>
                      </Button>
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="glass w-14 h-14 rounded-full border-amber-500/50 hover:bg-amber-500" 
                        onMouseEnter={() => playSound('hover')}
                        onClick={() => playSound('click')}
                        asChild
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-6 w-6" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  
                  <CardHeader className="p-8 pb-4">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-amber-500/50 mb-2 block">Featured Case Study</span>
                    <h4 className="text-3xl font-bold text-amber-50 tracking-tight">{project.title}</h4>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <div className="h-px w-12 bg-amber-500/20 mb-4" />
                    <p className="text-amber-100/40 text-sm font-light leading-relaxed max-w-sm">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Other Projects Section with distinct feel */}
        {otherProjects.length > 0 && (
          <div className="border-t border-amber-500/5 pt-24">
            <h3 className="project-card-reveal text-xl uppercase tracking-[0.5em] text-center text-amber-500/30 mb-16">Archives</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProjects.map((project, index) => (
                <div key={index} className="project-card-reveal">
                  <Card className="group overflow-hidden border-0 shadow-md glass-dark rounded-none">
                    <div className="relative overflow-hidden h-48 bg-amber-900/5">
                      {project.image && (
                        <div className="absolute inset-0 project-image-parallax -top-[15%] h-[130%]">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover opacity-30 group-hover:opacity-100 transition-opacity duration-700"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="glass w-10 h-10 rounded-full"
                          onMouseEnter={() => playSound('hover')}
                          onClick={() => playSound('click')}
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-5 w-5" />
                          </a>
                        </Button>
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="glass w-10 h-10 rounded-full"
                          onMouseEnter={() => playSound('hover')}
                          onClick={() => playSound('click')}
                          asChild
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        </Button>
                      </div>
                    </div>
                    <CardHeader className="p-6">
                      <h4 className="text-lg font-bold text-amber-100/70 group-hover:text-amber-100 transition-colors uppercase tracking-widest">{project.title}</h4>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;