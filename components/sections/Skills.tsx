"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Palette, Database, Smartphone, PenTool as Tool, Shapes, FileCode, Zap, Webhook, Monitor, Search, Gauge, Eye, Lightbulb, Users, Layout, Layers, Package, GitBranch } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, memo, useMemo, useCallback } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiVuedotjs, SiGatsby,
  SiNodedotjs, SiPython, SiExpress, SiPostgresql, SiMongodb, SiGraphql,
  SiFlutter, SiApple, SiAndroid, SiExpo,
  SiGit, SiDocker, SiAmazon, SiVercel, SiLinux,
  SiFigma, SiAdobexd,
  SiStripe, SiSocketdotio, SiFramer, SiVite, SiChartdotjs, SiContentful, SiReacthookform,
  SiPostman, SiNetlify, SiSupabase
} from 'react-icons/si';

const Skills = () => {
  // Icon mapping for skills
  const skillIcons: { [key: string]: any } = {
    'React': SiReact,
    'Next.js': SiNextdotjs,
    'TypeScript': SiTypescript,
    'JavaScript': SiJavascript,
    'HTML/CSS': SiHtml5,
    'Tailwind CSS': SiTailwindcss,
    'Vue.js': SiVuedotjs,
    'Gatsby': SiGatsby,
    'Node.js': SiNodedotjs,
    'Python': SiPython,
    'Express.js': SiExpress,
    'PostgreSQL': SiPostgresql,
    'MongoDB': SiMongodb,
    'GraphQL': SiGraphql,
    'React Native': SiReact,
    'Flutter': SiFlutter,
    'iOS Development': SiApple,
    'Android Development': SiAndroid,
    'Expo': SiExpo,
    'Git': SiGit,
    'Docker': SiDocker,
    'AWS': SiAmazon,
    'Vercel': SiVercel,
    'Linux': SiLinux,
    'Figma': SiFigma,
    'Adobe XD': SiAdobexd,
    'Stripe': SiStripe,
    'Socket.io': SiSocketdotio,
    'Framer Motion': SiFramer,
    'Vite': SiVite,
    'Chart.js': SiChartdotjs,
    'Contentful': SiContentful,
    'react-hook-form': SiReacthookform,
    'REST APIs': Webhook,
    'WebSockets': Zap,
    'PWA': Monitor,
    'SEO': Search,
    'Web Performance': Gauge,
    'Accessibility': Eye,
    'Prototyping': Lightbulb,
    'User Research': Users,
    'Wireframing': Layout,
    'Design Systems': Layers,
    'App Store Deployment': Package,
    'CI/CD': GitBranch,
  };

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'TypeScript', level: 88 },
        { name: 'JavaScript', level: 90 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Vue.js', level: 75 },
        { name: 'Gatsby', level: 75 }
      ]
    },
    {
      title: 'Backend Development',
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'Express.js', level: 85 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 80 },
        { name: 'GraphQL', level: 75 }
      ]
    },
    {
      title: 'Mobile Development',
      icon: Smartphone,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      skills: [
        { name: 'React Native', level: 80 },
        { name: 'Flutter', level: 75 },
        { name: 'iOS Development', level: 70 },
        { name: 'Android Development', level: 72 },
        { name: 'Expo', level: 85 },
        { name: 'App Store Deployment', level: 78 }
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: Tool,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 80 },
        { name: 'AWS', level: 75 },
        { name: 'Vercel', level: 90 },
        { name: 'CI/CD', level: 80 },
        { name: 'Linux', level: 82 }
      ]
    },
    {
      title: 'UI/UX Design',
      icon: Palette,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/30',
      skills: [
        { name: 'Figma', level: 90 },
        { name: 'Adobe XD', level: 85 },
        { name: 'Prototyping', level: 88 },
        { name: 'User Research', level: 80 },
        { name: 'Wireframing', level: 85 },
        { name: 'Design Systems', level: 88 }
      ]
    },
    {
      title: 'Web Technologies',
      icon: Shapes,
      color: 'from-amber-500 to-yellow-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      skills: [
        { name: 'REST APIs', level: 90 },
        { name: 'WebSockets', level: 80 },
        { name: 'PWA', level: 85 },
        { name: 'SEO', level: 88 },
        { name: 'Web Performance', level: 85 },
        { name: 'Accessibility', level: 80 },
        { name: 'Stripe', level: 75 },
        { name: 'Socket.io', level: 80 },
        { name: 'Framer Motion', level: 85 },
        { name: 'Vite', level: 88 },
        { name: 'Chart.js', level: 80 },
        { name: 'Contentful', level: 78 },
        { name: 'react-hook-form', level: 85 }
      ]
    }
  ];

  // Tools with icons
  const tools = [
    { name: 'VS Code', icon: FileCode },
    { name: 'Git', icon: SiGit },
    { name: 'Postman', icon: SiPostman },
    { name: 'Figma', icon: SiFigma },
    { name: 'Docker', icon: SiDocker },
    { name: 'AWS', icon: SiAmazon },
    { name: 'Vercel', icon: SiVercel },
    { name: 'Netlify', icon: SiNetlify },
    { name: 'MongoDB Atlas', icon: SiMongodb },
    { name: 'Supabase', icon: SiSupabase }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Circular Progress Component - Memoized for performance
  const CircularProgress = memo(({ value, delay = 0, size = 40, strokeWidth = 4, color = "amber" }: { 
    value: number; 
    delay?: number; 
    size?: number;
    strokeWidth?: number;
    color?: string;
  }) => {
    const [progress, setProgress] = useState(0);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    useEffect(() => {
      if (isInView) {
        const timer = setTimeout(() => {
          setProgress(value);
        }, delay * 50);
        return () => clearTimeout(timer);
      } else {
        setProgress(0);
      }
    }, [isInView, value, delay]);

    const colorClasses = {
      amber: 'stroke-amber-500',
      blue: 'stroke-blue-500',
      green: 'stroke-green-500',
      purple: 'stroke-purple-500',
      orange: 'stroke-orange-500',
      pink: 'stroke-pink-500',
    };

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-amber-900/20"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`${colorClasses[color as keyof typeof colorClasses]} transition-all duration-1000 ease-out`}
            style={{ willChange: 'stroke-dashoffset' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-amber-100">{Math.round(progress)}%</span>
        </div>
      </div>
    );
  });
  CircularProgress.displayName = 'CircularProgress';

  // Enhanced Progress Bar - Memoized for performance
  const EnhancedProgressBar = memo(({ value, delay = 0, color = "amber" }: { 
    value: number; 
    delay?: number;
    color?: string;
  }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      if (isInView) {
        const timer = setTimeout(() => {
          setProgress(value);
        }, delay * 50);
        return () => clearTimeout(timer);
      } else {
        setProgress(0);
      }
    }, [isInView, value, delay]);

    const gradientClasses = {
      amber: 'from-amber-500 via-orange-500 to-amber-600',
      blue: 'from-blue-500 via-cyan-500 to-blue-600',
      green: 'from-green-500 via-emerald-500 to-green-600',
      purple: 'from-purple-500 via-pink-500 to-purple-600',
      orange: 'from-orange-500 via-red-500 to-orange-600',
      pink: 'from-pink-500 via-rose-500 to-pink-600',
    };

    return (
      <div className="relative w-full h-2.5 bg-amber-900/20 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${gradientClasses[color as keyof typeof gradientClasses]} rounded-full transition-all duration-1000 ease-out shadow-lg`}
          style={{
            width: `${progress}%`,
            willChange: 'width',
            transform: 'translateZ(0)',
            boxShadow: `0 0 10px rgba(245, 158, 11, ${progress / 100 * 0.5})`,
          }}
        />
        {progress > 0 && (
          <motion.div 
            className="absolute top-0 left-0 h-full w-1/2 opacity-20"
            animate={{
              x: ['-100%', '300%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0.5
            }}
            style={{
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)`,
            }}
          />
        )}
      </div>
    );
  });
  EnhancedProgressBar.displayName = 'EnhancedProgressBar';

  return (
    <section id="skills" className="py-24 bg-animated-gradient relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 particle-bg opacity-20"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}


        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            const colorMap: { [key: string]: string } = {
              'from-blue-500 to-cyan-500': 'blue',
              'from-green-500 to-emerald-500': 'green',
              'from-purple-500 to-pink-500': 'purple',
              'from-orange-500 to-red-500': 'orange',
              'from-pink-500 to-rose-500': 'pink',
              'from-amber-500 to-yellow-500': 'amber',
            };
            const progressColor = colorMap[category.color] || 'amber';

            return (
            <ScrollReveal key={index} delay={index * 0.1} direction="up">
              <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "tween", duration: 0.2 }}
                  className="group relative h-full"
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.color} rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500`}></div>
                  
                  <Card className={`relative border-2 ${category.borderColor} ${category.bgColor} backdrop-blur-xl shadow-2xl h-full transition-all duration-300 group-hover:shadow-amber-500/20`}>
                    <CardHeader className="pb-6">
                      <div className="flex items-center justify-between mb-4">
                      <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}
                        >
                          {IconComponent && (
                            <IconComponent className="h-6 w-6 text-white" />
                          )}
                      </div>
                        <CircularProgress 
                          value={Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length)} 
                          delay={index * 0.1}
                          size={50}
                          color={progressColor}
                        />
                    </div>
                      <h3 className="font-bold text-xl text-amber-50 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-orange-400 transition-all duration-300">
                        {category.title}
                      </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                        {category.skills.map((skill, skillIndex) => {
                          const SkillIcon = skillIcons[skill.name];
                          return (
                        <div
                          key={skillIndex}
                              className="group/item"
                            >
                              <div className="flex items-center justify-between gap-3 mb-2">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  {SkillIcon && (
                                    <div className="p-1.5 rounded-lg bg-amber-900/30 border border-amber-700/30 group-hover/item:border-amber-500/50 group-hover/item:bg-amber-900/50 transition-colors">
                                      <SkillIcon className="h-4 w-4 text-amber-400 flex-shrink-0" />
                                    </div>
                                  )}
                                  <span className="text-sm font-medium text-amber-100/90 truncate group-hover/item:text-amber-50 transition-colors">
                                    {skill.name}
                                  </span>
                                </div>
                                <span className="text-xs font-bold text-amber-400 flex-shrink-0 bg-amber-900/30 px-2 py-1 rounded">
                                  {skill.level}%
                                </span>
                          </div>
                              <EnhancedProgressBar 
                                value={skill.level} 
                                delay={skillIndex} 
                                color={progressColor}
                              />
                        </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
            );
          })}
        </div>

        {/* Tools & Technologies */}
        <ScrollReveal direction="up" delay={0.4}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-2 border-amber-500/30 bg-amber-900/10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(245, 158, 11, 0.3) 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }}></div>
              </div>
              
              <CardHeader className="relative z-10">
                <div className="text-center mb-2">
                  <h3 className="text-3xl sm:text-4xl font-bold text-gradient-animated mb-3">
                    Tools & Technologies
                  </h3>
                  <p className="text-amber-100/70 text-lg">
                  Software and platforms I use regularly in my development workflow
                </p>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex flex-wrap gap-4 justify-center">
                  {tools.map((tool, index) => {
                    const IconComponent = tool.icon;
                    return (
                    <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ 
                          delay: 0.3 + (index * 0.03),
                          duration: 0.3,
                          type: "tween"
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          y: -3
                        }}
                        className="group"
                      >
                        <div className="relative">
                          {/* Glow on hover */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
                          
                          <Badge 
                            variant="secondary" 
                            className="relative px-5 py-3 text-sm bg-amber-900/40 text-amber-100 border-2 border-amber-700/50 flex items-center gap-3 group-hover:border-amber-500/80 group-hover:bg-amber-900/60 transition-all duration-300 shadow-lg group-hover:shadow-amber-500/30"
                          >
                            {IconComponent && (
                              <IconComponent className="h-5 w-5 text-amber-400 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                            )}
                            <span className="font-semibold">{tool.name}</span>
                      </Badge>
                        </div>
                    </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Skills;
