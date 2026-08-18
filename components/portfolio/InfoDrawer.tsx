"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface InfoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = ["ABOUT", "PROJECTS", "LET'S WORK"];

export default function InfoDrawer({ isOpen, onClose }: InfoDrawerProps) {
  const [view, setView] = useState<"menu" | "contact">("menu");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Website Design",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Gagal mengirim pesan.");

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "Website Design",
        message: "",
      });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.message || "Terjadi kesalahan.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleMenuClick = (item: string) => {
    if (item === "LET'S WORK") {
      setView("contact");
    } else if (item === "ABOUT" || item === "PROJECTS") {
      onClose();
      setTimeout(() => {
        document
          .getElementById(item.toLowerCase())
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const handleBack = () => {
    setView("menu");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:max-w-xl md:max-w-2xl bg-[#333333] border-l border-white/5 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#333333]/90 backdrop-blur-md px-8 py-6 flex items-center justify-between border-b border-white/5 z-10">
              {view === "contact" ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 font-mono text-xs hover:text-[#D1D5DB] transition-colors"
                >
                  <ArrowLeft size={16} /> BACK
                </button>
              ) : (
                <span className="font-mono text-xs text-white/50">MENU</span>
              )}

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#D1D5DB] hover:text-[#D1D5DB] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-12 flex flex-col">
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {view === "menu" ? (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex flex-col gap-6"
                    >
                      {MENU_ITEMS.map((item) => (
                        <button
                          key={item}
                          onClick={() => handleMenuClick(item)}
                          className="text-left font-display text-5xl md:text-7xl uppercase tracking-tighter hover:text-[#D1D5DB] transition-colors duration-300"
                        >
                          {item}
                        </button>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="contact"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-12"
                    >
                      <div>
                        <h2 className="font-display text-5xl md:text-6xl uppercase tracking-tighter text-[#D1D5DB]">
                          LET&apos;S WORK
                        </h2>
                        <p className="font-sans text-white/60 mt-4">
                          Ready to start a project? Fill out the form below and
                          I&apos;ll get back to you as soon as possible.
                        </p>
                      </div>

                      <form
                        className="flex flex-col gap-8 font-sans"
                        onSubmit={handleSubmit}
                      >
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-mono text-white/50 uppercase">
                            Name
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full bg-transparent border-b border-white/20 pb-2 outline-none focus:border-[#D1D5DB] transition-colors text-xl"
                            placeholder="Your Name"
                            disabled={status === "loading"}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-mono text-white/50 uppercase">
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full bg-transparent border-b border-white/20 pb-2 outline-none focus:border-[#D1D5DB] transition-colors text-xl"
                            placeholder="hello@example.com"
                            disabled={status === "loading"}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-mono text-white/50 uppercase">
                            Project Type
                          </label>
                          <select
                            value={formData.subject}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                subject: e.target.value,
                              })
                            }
                            disabled={status === "loading"}
                            className="w-full bg-transparent border-b border-white/20 pb-2 outline-none focus:border-[#D1D5DB] transition-colors text-xl appearance-none cursor-pointer"
                          >
                            <option className="bg-[#333333]">
                              Website Design
                            </option>
                            <option className="bg-[#333333]">
                              UI/UX Audit
                            </option>
                            <option className="bg-[#333333]">Branding</option>
                            <option className="bg-[#333333]">
                              Full Stack Development
                            </option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-mono text-white/50 uppercase">
                            Details
                          </label>
                          <textarea
                            rows={4}
                            required
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                message: e.target.value,
                              })
                            }
                            className="w-full bg-transparent border-b border-white/20 pb-2 outline-none focus:border-[#D1D5DB] transition-colors text-xl resize-none"
                            placeholder="Tell me about your project..."
                            disabled={status === "loading"}
                          />
                        </div>

                        {status === "error" && (
                          <div className="text-red-400 font-mono text-xs uppercase">
                            {errorMessage}
                          </div>
                        )}
                        {status === "success" && (
                          <div className="text-green-400 font-mono text-xs uppercase">
                            Message sent successfully!
                          </div>
                        )}

                        <button
                          disabled={
                            status === "loading" || status === "success"
                          }
                          className={`mt-4 font-mono text-sm tracking-widest py-4 px-8 w-full transition-colors uppercase ${
                            status === "loading"
                              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                              : status === "success"
                                ? "bg-green-500 text-black"
                                : "bg-[#D1D5DB] text-black hover:bg-white"
                          }`}
                        >
                          {status === "loading"
                            ? "Sending..."
                            : status === "success"
                              ? "Sent!"
                              : "Submit"}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Social Footer */}
              {view === "menu" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-16 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8"
                >
                  <a
                    href="https://drive.google.com/file/d/1pKH7zUE5EWJkmqWwYP9A2WS3A1pj18LI/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-white/50 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest"
                  >
                    Resume <ArrowUpRight size={14} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kurniawan-dwi-prasetyo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-white/50 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest"
                  >
                    LinkedIn <ArrowUpRight size={14} />
                  </a>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
