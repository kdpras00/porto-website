"use client";

import { useState } from "react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    title: "SIPKL SMK Mandiri 01 Panongan",
    image: "/projects/sisteminformasipkl.png",
    link: "https://sipkl-smkmandiri01panongan.sch.id",
  },
  {
    title: "Lazismu Banten",
    image: "/projects/lazismu-banten.png",
    link: "https://lazismu-banten.my.id",
  },
  {
    title: "Friday Store",
    image: "/projects/fridaystore.png",
    link: "https://fridaystore.web.id",
  },
  {
    title: "Gymbro",
    image: "/projects/gymbro.png",
    link: "https://capstone-project-gymbro.vercel.app",
  },
  {
    title: "Calping Coffee",
    image: "/projects/calpingcoffe.png",
    link: "https://calpingpos.my.id",
  },
  {
    title: "E-Dumas",
    image: "/projects/e-dumas.png",
    link: "https://e-dumas.my.id",
  },
  {
    title: "Lingkojan",
    image: "/projects/lingkojan.png",
    link: "https://lingkojan.my.id",
  },
  {
    title: "SIBK SMA Latansa Cendekia",
    image: "/projects/sibk-latansacendekia.png",
    link: "https://sibk-latansacendekia.my.id",
  },
];

export default function ProjectsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    const isOpening = expandedIndex !== index;
    setExpandedIndex(isOpening ? index : null);
    
    if (isOpening) {
      setTimeout(() => {
        const element = document.getElementById(`project-${index}`);
        if (element) {
          // Adjust scroll position to account for the sticky header
          const y = element.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 400); // 400ms waits for the previous accordion to mostly collapse so the Y calculation is accurate
    }
  };

  return (
    <section
      id="projects"
      className="relative z-20 w-full px-8 md:px-24 py-32 text-left mb-32 border-t border-dashed border-white/20 mt-32"
    >
      <h2 className="font-display text-5xl md:text-8xl tracking-tight uppercase text-white mb-20">
        Selected Works
      </h2>

      <div className="flex flex-col border-t border-white/20">
        {PROJECTS.map((project, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <div
              id={`project-${index}`}
              key={index}
              className="group flex flex-col border-b border-white/20 px-4 -mx-4"
            >
              {/* Header Row (Clickable) */}
              <div
                onClick={() => toggleExpand(index)}
                className="flex flex-col md:flex-row md:items-center justify-between py-10 cursor-pointer hover:bg-white/5 transition-colors duration-500"
              >
                <div className="flex items-center gap-8 md:gap-16">
                  <h3 className="font-display text-4xl md:text-6xl text-gray-300 uppercase tracking-tighter group-hover:text-white transition-colors duration-500">
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4 mt-6 md:mt-0 ml-4 md:ml-0">
                  {/* Link Icon (Only show if there is an actual link) */}
                  {project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-white/40 hover:text-white transition-colors duration-300 p-2"
                    >
                      <ArrowUpRight size={28} />
                    </a>
                  )}
                  {/* Toggle Icon */}
                  <div className="text-white/40 group-hover:text-white transition-colors duration-500 p-2">
                    {isExpanded ? <Minus size={28} /> : <Plus size={28} />}
                  </div>
                </div>
              </div>

              {/* Expandable Image Content */}
              <motion.div
                initial={false}
                animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-10 pt-4">
                  <div className="w-full bg-[#111] relative overflow-hidden group-hover:border group-hover:border-white/10 transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
