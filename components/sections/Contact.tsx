"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSound } from '@/components/providers/SoundProvider';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { playSound } = useSound();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(".contact-header", 
      { y: 50, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: "power3.out" }
    );

    tl.fromTo(".contact-card",
      { y: 80, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.2, ease: "power4.out" },
      "-=0.6"
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    playSound('click');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "🎉 Message Sent!",
          description: "Your inquiry has been processed. I will get back to you shortly.",
        });

        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast({
          title: "❌ Failed",
          description: data.message || 'Error occurred.',
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "❌ Error",
        description: 'Connection error.',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = useMemo(() => [
    { icon: <Mail className="h-4 w-4" />, label: 'Direct', value: 'kdpras00@gmail.com', href: 'mailto:kdpras00@gmail.com' },
    { icon: <Phone className="h-4 w-4" />, label: 'Secure', value: '+62 857-7076-7402', href: 'https://wa.me/6285770767402' },
    { icon: <MapPin className="h-4 w-4" />, label: 'Origin', value: 'Tangerang, Indonesia', href: '#' }
  ], []);

  const socialLinks = useMemo(() => [
    { icon: <Github className="h-5 w-5" />, label: 'GitHub', href: 'https://github.com/kdpras00' },
    { icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn', href: 'https://linkedin.com/in/kdpras00' },
    { icon: <Instagram className="h-5 w-5" />, label: 'Instagram', href: 'https://instagram.com/kurniawandwipras' },
  ], []);

  return (
    <section id="contact" className="py-32 relative overflow-hidden" ref={containerRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="contact-header text-center mb-24">
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 text-gradient-animated tracking-tighter uppercase">Initiate Connection</h2>
            <p className="text-xl text-amber-100/40 max-w-2xl mx-auto font-light tracking-wide">
              Ready to architect something monumental? Let's start the dialogue.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <div className="contact-card">
              <Card className="border-0 shadow-2xl glass-dark rounded-none p-10 group">
                <CardHeader className="p-0 mb-10">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-amber-500/50 font-bold mb-4 block">Communication Channels</span>
                  <h3 className="text-3xl font-bold text-amber-50">Let's Connect</h3>
                </CardHeader>
                <CardContent className="p-0 space-y-8">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.href}
                      onMouseEnter={() => playSound('hover')}
                      className="flex items-center gap-6 group/link"
                    >
                      <div className="p-4 bg-amber-500/5 rounded-full text-amber-500/50 group-hover/link:text-amber-500 transition-colors">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-amber-500/30">{info.label}</p>
                        <p className="text-amber-100/70 border-b border-transparent group-hover/link:border-amber-500/30 transition-all font-light tracking-wide">{info.value}</p>
                      </div>
                    </a>
                  ))}

                  <div className="pt-10 border-t border-amber-500/10">
                    <p className="text-[10px] uppercase tracking-[0.4em] mb-6 text-amber-500/50 font-bold">Social Matrix</p>
                    <div className="flex gap-4">
                      {socialLinks.map((social, index) => (
                        <Button 
                          key={index} 
                          variant="ghost" 
                          size="icon" 
                          className="glass rounded-none border border-amber-500/10 text-amber-100/40 hover:text-amber-500 hover:border-amber-500 transition-all" 
                          onMouseEnter={() => playSound('hover')}
                          asChild
                        >
                          <a href={social.href} target="_blank" rel="noopener noreferrer">
                            {social.icon}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <div className="contact-card">
              <Card className="border-0 shadow-2xl glass-dark rounded-none p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-amber-500/30 font-bold ml-1">Identity</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => playSound('hover')}
                        required
                        placeholder="NAME"
                        className="bg-transparent border-b border-x-0 border-t-0 border-amber-500/10 rounded-none h-12 focus-visible:ring-0 focus:border-amber-500 transition-all text-amber-50 placeholder:text-amber-500/10 tracking-widest"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-amber-500/30 font-bold ml-1">Electronic Mail</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => playSound('hover')}
                        required
                        placeholder="EMAIL@DOMAIN.COM"
                        className="bg-transparent border-b border-x-0 border-t-0 border-amber-500/10 rounded-none h-12 focus-visible:ring-0 focus:border-amber-500 transition-all text-amber-50 placeholder:text-amber-500/10 tracking-widest"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-amber-500/30 font-bold ml-1">Purpose</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onFocus={() => playSound('hover')}
                      required
                      placeholder="PROJECT SCOPE"
                      className="bg-transparent border-b border-x-0 border-t-0 border-amber-500/10 rounded-none h-12 focus-visible:ring-0 focus:border-amber-500 transition-all text-amber-50 placeholder:text-amber-500/10 tracking-widest"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-amber-500/30 font-bold ml-1">Information Matrix</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => playSound('hover')}
                      required
                      rows={4}
                      placeholder="DESCRIBE THE VISION..."
                      className="bg-transparent border-b border-x-0 border-t-0 border-amber-500/10 rounded-none focus-visible:ring-0 focus:border-amber-500 transition-all text-amber-50 placeholder:text-amber-500/10 tracking-widest resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => playSound('hover')}
                    className="w-full h-14 bg-amber-500 text-[#0a0a0a] rounded-none font-bold uppercase tracking-[0.4em] hover:bg-amber-400 transition-all"
                  >
                    {isSubmitting ? "TRANSMITTING..." : "SEND SIGNAL"}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Contact;