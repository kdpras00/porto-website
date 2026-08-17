"use client";

const SKILLS = [
  {
    category: "Languages",
    items: ["PHP", "JavaScript", "TypeScript", "Python", "Go"],
  },
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "Vue",
      "Tailwind CSS",
      "Bootstrap",
      "jQuery",
      "Flowbite",
      "SweetAlert2",
      "Chart.js",
      "Leaflet",
    ],
  },
  {
    category: "Backend",
    items: [
      "Laravel",
      "Express.js",
      "REST APIs",
      "MVC Architecture",
      "JWT Auth",
      "RBAC",
    ],
  },
  {
    category: "Database",
    items: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Supabase",
      "Database Design",
      "Query Optimization",
    ],
  },
  {
    category: "Mobile",
    items: ["Flutter", "Firebase", "Provider"],
  },
  {
    category: "DevOps & Infrastructure",
    items: [
      "Linux",
      "Nginx",
      "Apache",
      "GitHub Actions",
      "Vercel",
      "VPS Management",
      "SSH / SSL",
      "cPanel",
    ],
  },
  {
    category: "Third-Party Integrations",
    items: ["Midtrans", "Cloudinary", "WebSockets", "Payment Gateways"],
  },
  {
    category: "Tools",
    items: ["Git", "Postman", "Figma"],
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-20 w-full px-8 md:px-24 py-32 mt-[40vh] md:mt-[60vh] text-left"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-5xl md:text-8xl tracking-tight uppercase text-white mb-12">
          About
        </h2>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="flex-1 flex flex-col gap-6">
            <p
              className="font-sans text-xl md:text-3xl text-gray-300 leading-relaxed font-light text-justify hyphens-auto"
              lang="en"
            >
              I am a full-stack architect who views code as a medium for
              artistic expression. With a focus on performance, fluid kinetics,
              and premium aesthetics, I&nbsp;build digital ecosystems that do more
              than just function—they resonate.
            </p>
            <p
              className="font-sans text-xl md:text-3xl text-gray-300 leading-relaxed font-light text-justify hyphens-auto"
              lang="en"
            >
              My philosophy is rooted in the &quot;Quiet Space&quot; where technology
              disappears and only the experience remains. Every pixel is
              intentional, every animation represents a breath.
            </p>
          </div>

          <div className="flex-1 flex flex-col gap-8">
            <div className="flex flex-col border-t border-white/20 pt-8 mt-2 lg:mt-0">
              <span className="font-mono text-xs text-white/50 uppercase tracking-widest mb-6">
                Experience
              </span>
              <h3 className="font-display text-3xl md:text-5xl text-gray-300 uppercase tracking-tighter mb-4">
                Junior Full Stack Developer
              </h3>
              <span className="font-mono text-sm text-white/80 uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full self-start mb-6">
                Farovon Maju Bersama
              </span>
              <p
                className="font-sans text-base md:text-lg text-white/50 leading-relaxed font-light text-justify hyphens-auto"
                lang="en"
              >
                Participated in the development of web application features
                using Next.js and React.js on the frontend, and Laravel for
                backend needs. Assisted with API integration and performed
                debugging and feature testing alongside the senior development
                team.
              </p>
            </div>
          </div>
        </div>

        {/* Key Skills Section */}
        <div className="mt-32 pt-16 border-t border-dashed border-white/20">
          <h2 className="font-display text-5xl md:text-8xl tracking-tight uppercase text-white mb-16">
            Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
            {SKILLS.map((skillGroup, index) => (
              <div key={index} className="flex flex-col gap-6">
                <h4 className="font-sans text-base text-gray-200 font-medium">
                  {skillGroup.category}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="font-sans text-sm text-gray-400 px-4 py-2 rounded-full border border-white/10 bg-transparent hover:border-gray-300 hover:text-gray-200 transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
