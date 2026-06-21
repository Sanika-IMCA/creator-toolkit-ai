"use client";

import { useState, useEffect } from "react";
import { Sparkles, User, Radio, FileText, ArrowRight, Terminal, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Hero from "../components/Hero";
import BioGenerator from "../components/BioGenerator";
import HookGenerator from "../components/HookGenerator";
import CaptionGenerator from "../components/CaptionGenerator";
import Features from "../components/Features";
import Footer from "../components/Footer";
import BootSequence from "../components/BootSequence";

const CircuitBackground = dynamic(() => import("../components/CircuitBackground"), {
  ssr: false,
});

type ToolType = "bio" | "hooks" | "captions";

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);
  const [activeTab, setActiveTab] = useState<ToolType>("bio");
  const [isScrolled, setIsScrolled] = useState(false);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    if (!isBooted) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isBooted]);

  // Handle shrink on scroll
  useEffect(() => {
    if (!isBooted) return;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBooted]);

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    if (!isBooted) return;

    gsap.registerPlugin(ScrollTrigger);

    // Animate tools section title on scroll
    gsap.fromTo(
      "#tools-section h2",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#tools-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isBooted]);

  const handleSelectTool = (tool: ToolType) => {
    setActiveTab(tool);
    const element = document.getElementById("tools-section");
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isBooted && (
          <BootSequence key="boot" onComplete={() => setIsBooted(true)} />
        )}
      </AnimatePresence>

      {isBooted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col min-h-screen relative z-10"
        >
          {/* Animated Background Mesh & Orbs */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <CircuitBackground />
            <div className="absolute top-[15%] left-[5%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-violet-600/[0.04] rounded-full blur-[120px] animate-orb-1" />
            <div className="absolute top-[45%] right-[5%] w-[400px] md:w-[650px] h-[400px] md:h-[650px] bg-indigo-600/[0.04] rounded-full blur-[130px] animate-orb-2" />
            <div className="absolute bottom-[5%] left-[25%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-pink-600/[0.03] rounded-full blur-[110px] animate-orb-3" />
          </div>

          {/* Grid Overlay */}
          <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none z-0"></div>

          {/* Frosted Shrinking Navigation Header */}
          <header
            className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 flex items-center ${
              isScrolled
                ? "h-14 bg-black/75 backdrop-blur-xl border-b border-white/10"
                : "h-20 bg-transparent border-b border-transparent"
            }`}
          >
            <div className="max-w-6xl w-full mx-auto px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-white">
                  <Terminal className="h-4 w-4 text-violet-400" />
                </div>
                <span className="font-bold text-sm tracking-[0.2em] text-white uppercase font-display">
                  CREATOR OS
                </span>
              </div>

              <nav className="hidden md:flex items-center gap-8">
                <a
                  href="#features"
                  className="text-[10px] font-mono font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-[0.15em]"
                >
                  01 / System Features
                </a>
                <a
                  href="#tools-section"
                  className="text-[10px] font-mono font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-[0.15em]"
                >
                  02 / Engine Playground
                </a>
              </nav>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-2 text-[10px] font-mono font-bold px-3 py-2 rounded-lg border border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span>GITHUB.DEV</span>
                </a>
                <button
                  onClick={() => handleSelectTool("bio")}
                  className="flex items-center gap-1.5 bg-white text-black hover:bg-zinc-200 text-[10px] font-mono font-bold px-4 py-2 rounded-lg transition-all active:scale-95 cursor-pointer shadow-lg shadow-white/5"
                >
                  <span>BOOT_PLAYGROUND</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </header>

          <main className="flex-grow pt-20">
            {/* Hero Section */}
            <Hero onSelectTool={handleSelectTool} />

            {/* Tools Dashboard Section */}
            <section id="tools-section" className="py-32 relative border-y border-white/5 scroll-mt-14">
              <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Heading Info */}
                <div className="text-center max-w-xl mx-auto mb-16">
                  <span className="text-[10px] font-mono font-bold text-violet-400 uppercase tracking-[0.25em] bg-violet-500/5 border border-violet-500/10 px-3 py-1 rounded-full">
                    PLAYGROUND MODULE
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-4 tracking-tight font-display">
                    Interactive Engine Core
                  </h2>
                  <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-medium">
                    Configure your parameters and trigger real-time social positioning pipelines utilizing custom generative directives.
                  </p>
                </div>

                {/* Tab Selection Row */}
                <div className="flex justify-center mb-16">
                  <div className="inline-flex p-1 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-md shadow-2xl">
                    <button
                      onClick={() => setActiveTab("bio")}
                      className={`flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-xl text-xs font-bold tracking-wider transition-all cursor-pointer ${
                        activeTab === "bio"
                          ? "bg-white text-black shadow-lg"
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]"
                      }`}
                    >
                      <User className="h-4 w-4" />
                      <span>IDENTITY ENGINE</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("hooks")}
                      className={`flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-xl text-xs font-bold tracking-wider transition-all cursor-pointer ${
                        activeTab === "hooks"
                          ? "bg-white text-black shadow-lg"
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]"
                      }`}
                    >
                      <Radio className="h-4 w-4" />
                      <span>ATTENTION ENGINE</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("captions")}
                      className={`flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-xl text-xs font-bold tracking-wider transition-all cursor-pointer ${
                        activeTab === "captions"
                          ? "bg-white text-black shadow-lg"
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]"
                      }`}
                    >
                      <FileText className="h-4 w-4" />
                      <span>NARRATIVE ENGINE</span>
                    </button>
                  </div>
                </div>

                {/* Active Generator Component */}
                <div className="min-h-[450px]">
                  {activeTab === "bio" && <BioGenerator />}
                  {activeTab === "hooks" && <HookGenerator />}
                  {activeTab === "captions" && <CaptionGenerator />}
                </div>

              </div>
            </section>

            {/* Features Section */}
            <Features />
          </main>

          {/* Footer Section */}
          <Footer />
        </motion.div>
      )}
    </>
  );
}
