"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Code, Palette, Coffee } from 'lucide-react';

const About = () => {
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
      period: ' April 2025 - Juli 2025',
      description: 'Participated in the development of web application features using Next.js and React.js on the frontend, and Laravel for backend needs. Assisted with API integration and performed debugging and feature testing alongside the senior development team.'
    },

  ];

  return (
    <section id="about" className="py-20 bg-warm-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my journey, experience, and what drives my passion for technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Personal Info */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Code className="h-6 w-6 text-amber-600" />
                  Who Am I?
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  I'm a passionate full-stack developer with over 3 years of experience building
                  modern web applications. I love creating digital experiences that are not only
                  functional but also beautiful and intuitive.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, contributing to
                  open-source projects, or capturing moments through photography. I believe in
                  continuous learning and staying up-to-date with the latest industry trends.
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Tangerang, Indonesia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Available for work</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Coffee className="h-4 w-4" />
                    Interests
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Experience */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Palette className="h-6 w-6 text-amber-600" />
                  Experience
                </h3>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={index} className="relative pl-6 border-l-2 border-amber-200 dark:border-amber-800 last:border-l-0">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-amber-600 rounded-full"></div>
                      <div className="pb-6">
                        <h4 className="font-semibold text-lg">{exp.title}</h4>
                        <p className="text-amber-600 font-medium">{exp.company}</p>
                        <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
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