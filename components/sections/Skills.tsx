"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Code, Palette, Database, Globe, Smartphone, PenTool as Tool } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Code className="h-6 w-6" />,
      skills: [
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'TypeScript', level: 88 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'JavaScript', level: 90 },
        { name: 'HTML/CSS', level: 95 }
      ]
    },
    {
      title: 'Backend Development',
      icon: <Database className="h-6 w-6" />,
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 80 },
        { name: 'Express.js', level: 85 },
        { name: 'GraphQL', level: 75 }
      ]
    },
    {
      title: 'UI/UX Design',
      icon: <Palette className="h-6 w-6" />,
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
      title: 'Mobile Development',
      icon: <Smartphone className="h-6 w-6" />,
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
      icon: <Tool className="h-6 w-6" />,
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
      title: 'Web Technologies',
      icon: <Globe className="h-6 w-6" />,
      skills: [
        { name: 'REST APIs', level: 90 },
        { name: 'WebSockets', level: 80 },
        { name: 'PWA', level: 85 },
        { name: 'SEO', level: 88 },
        { name: 'Web Performance', level: 85 },
        { name: 'Accessibility', level: 80 }
      ]
    }
  ];

  const tools = [
    'VS Code',
    'Git',
    'Postman',
    'Figma',
    'Docker',
    'AWS',
    'Vercel',
    'Netlify',
    'MongoDB Atlas',
    'Supabase'
  ];

  return (
    <section id="skills" className="py-20 bg-warm-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-lg">{category.title}</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tools & Technologies */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <h3 className="text-2xl font-bold text-center">Tools & Technologies</h3>
            <p className="text-muted-foreground text-center">
              Software and platforms I use regularly in my development workflow
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 justify-center">
              {tools.map((tool) => (
                <Badge key={tool} variant="secondary" className="px-4 py-2 text-sm">
                  {tool}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Skills;