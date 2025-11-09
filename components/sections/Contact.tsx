"use client";

import { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          title: "🎉 Pesan Berhasil Dikirim!",
          description: `${data.message} Saya akan membalas pesan Anda sesegera mungkin melalui email yang Anda berikan.`,
          className: "border-green-500/70 bg-gradient-to-br from-green-500/25 via-emerald-500/20 to-green-500/25 backdrop-blur-xl shadow-2xl shadow-green-500/40 ring-1 ring-green-500/30",
          duration: 6000,
        });

        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
        }, 100);
      } else {
        toast({
          title: "❌ Gagal Mengirim Pesan",
          description: data.message || 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi atau hubungi langsung melalui email/WhatsApp.',
          variant: "destructive",
          duration: 6000,
        });
      }
    } catch (error: any) {
      toast({
        title: "❌ Gagal Mengirim Pesan",
        description: error.message || 'Terjadi kesalahan pada koneksi. Silakan periksa koneksi internet Anda atau hubungi langsung melalui email/WhatsApp.',
        variant: "destructive",
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = useMemo(() => [
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'Email',
      value: 'kdpras00@gmail.com',
      href: 'mailto:kdpras00@gmail.com'
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: 'Phone',
      value: '+62 857-7076-7402',
      href: 'https://wa.me/6285770767402'
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: 'Location',
      value: 'Tangerang, Indonesia',
      href: '#'
    }
  ], []);

  const socialLinks = useMemo(() => [
    {
      icon: <Github className="h-5 w-5" />,
      label: 'GitHub',
      href: 'https://github.com/kdpras00'
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/kdpras00'
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      label: 'Instagram',
      href: 'https://instagram.com/kurniawandwipras'
    },
  ], []);

  return (
    <section id="contact" className="py-20 bg-animated-gradient relative overflow-hidden">
        <div className="absolute inset-0 particle-bg opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="down">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient-animated">Get In Touch</h2>
              <p className="text-lg text-amber-100/80 max-w-2xl mx-auto">
                Have a project in mind or just want to say hello? I'd love to hear from you.
                Let's create something amazing together!
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <ScrollReveal direction="left" delay={0.2}>
              <div>
                <Card className="border-0 shadow-lg glass-dark hover-3d">
                  <CardHeader>
                    <h3 className="text-2xl font-bold text-amber-100">Let's Connect</h3>
                    <p className="text-amber-100/70">
                      I'm always open to discussing new opportunities, creative ideas, or partnerships.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4"
                      >
                        <div className="p-3 bg-amber-900/30 rounded-lg text-amber-400 border border-amber-700/50">
                          {info.icon}
                        </div>
                        <div>
                          <p className="font-medium text-amber-100">{info.label}</p>
                          {info.href.startsWith('#') ? (
                            <p className="text-amber-100/60">{info.value}</p>
                          ) : (
                            <a
                              href={info.href}
                              className="text-amber-100/60 hover:text-amber-400 transition-colors"
                            >
                              {info.value}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Social Links */}
                    <div className="pt-6 border-t border-amber-700/30">
                      <p className="font-medium mb-4 text-amber-100">Follow me on</p>
                      <div className="flex gap-4">
                        {socialLinks.map((social, index) => (
                          <Button key={index} variant="outline" size="sm" className="glass border-amber-700/50 text-amber-100 hover:text-amber-400" asChild>
                            <a
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              {social.icon}
                              {social.label}
                            </a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal direction="right" delay={0.3}>
              <div>
                <Card className="border-0 shadow-lg glass-dark hover-3d">
                  <CardHeader>
                    <h3 className="text-2xl font-bold text-amber-100">Send a Message</h3>
                    <p className="text-amber-100/70">
                      Fill out the form below and I'll get back to you as soon as possible.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2 text-amber-100">
                            Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Your full name"
                            className="glass border-amber-700/50 bg-amber-900/20 text-amber-100 placeholder:text-amber-500/50"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2 text-amber-100">
                            Email *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="your.email@example.com"
                            className="glass border-amber-700/50 bg-amber-900/20 text-amber-100 placeholder:text-amber-500/50"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2 text-amber-100">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          placeholder="What's this about?"
                          className="glass border-amber-700/50 bg-amber-900/20 text-amber-100 placeholder:text-amber-500/50"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2 text-amber-100">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          placeholder="Tell me about your project or just say hello..."
                          className="glass border-amber-700/50 bg-amber-900/20 text-amber-100 placeholder:text-amber-500/50"
                        />
                      </div>

                      <div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white animate-gradient"
                        >
                          {isSubmitting ? (
                            <motion.span
                              animate={{ opacity: [1, 0.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              Sending...
                            </motion.span>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
  );
};

export default Contact;