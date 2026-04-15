"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Image from 'next/image';

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

    // {
    //   title: 'Portfolio Website',
    //   description: 'A responsive portfolio website showcasing projects and skills with smooth animations and modern design.',
    //   image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
    //   technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    //   githubUrl: 'https://github.com',
    //   liveUrl: 'https://example.com',
    //   featured: false
    // },
    // {
    //   title: 'Weather Dashboard',
    //   description: 'A comprehensive weather dashboard with location-based forecasts, interactive maps, and weather alerts.',
    //   image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600',
    //   technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'CSS3'],
    //   githubUrl: 'https://github.com',
    //   liveUrl: 'https://example.com',
    //   featured: false
    // },
    // {
    //   title: 'Blog Platform',
    //   description: 'A modern blog platform with content management, SEO optimization, and social sharing features.',
    //   image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600',
    //   technologies: ['Gatsby', 'GraphQL', 'Contentful', 'Netlify'],
    //   githubUrl: 'https://github.com',
    //   liveUrl: 'https://example.com',
    //   featured: false
    // },
    // {
    //   title: 'Mobile Banking App UI',
    //   description: 'Modern mobile banking application UI design with intuitive navigation and secure transaction flows.',
    //   image: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=600',
    //   technologies: ['Figma', 'React Native', 'UI/UX Design', 'Prototyping'],
    //   githubUrl: 'https://github.com',
    //   liveUrl: 'https://example.com',
    //   featured: false
    // }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="down">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient-animated">My Projects</h2>
            <p className="text-lg text-amber-100/80 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and creativity.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Projects */}
        <div className="mb-16">
          <ScrollReveal direction="up">
            <h3 className="text-2xl font-bold mb-8 text-center text-amber-100">Featured Projects</h3>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group overflow-hidden border-0 shadow-lg glass-dark">
                    <div className="relative overflow-hidden h-64 bg-amber-900/20">
                      {project.image && (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          quality={85}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-end p-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary" className="glass" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button size="sm" variant="secondary" className="glass" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <h4 className="text-xl font-bold text-amber-100">{project.title}</h4>
                    </CardHeader>
                    <CardContent className="pt-2">
                      {/* Minimalist footer - Navigation icons available on image hover */}
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <ScrollReveal direction="up">
              <h3 className="text-2xl font-bold mb-8 text-center text-amber-100">Other Projects</h3>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <ScrollReveal key={index} delay={index * 0.05} direction="up">
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ type: "tween", duration: 0.2 }}
                  >
                  <Card className="group overflow-hidden border-0 shadow-md glass-dark">
                      <div className="relative overflow-hidden h-32 bg-amber-900/20">
                        {project.image && (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            quality={75}
                          />
                        )}
                        {/* Hover Overlay with Icons for Other Projects */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                          <Button size="icon" variant="secondary" className="glass w-10 h-10" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-5 w-5" />
                            </a>
                          </Button>
                          <Button size="icon" variant="secondary" className="glass w-10 h-10" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-5 w-5" />
                            </a>
                          </Button>
                        </div>
                      </div>
                      <CardHeader className="pb-2 text-center">
                        <h4 className="text-lg font-bold text-amber-100">{project.title}</h4>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {/* Minimalist card content */}
                      </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;