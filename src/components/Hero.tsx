"use client";

import { useRef } from "react";
import { Sparkles, ArrowRight, User, Radio, FileText, Terminal, Cpu } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Tilt from "react-parallax-tilt";

interface HeroProps {
  onSelectTool: (tool: "bio" | "hooks" | "captions") => void;
}

// Reusable Magnetic Button wrapper using framer-motion
function MagneticButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 120, damping: 15 });
  const springY = useSpring(y, { stiffness: 120, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Snapping pull (max 20px)
    x.set(distanceX * 0.25);
    y.set(distanceY * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export default function Hero({ onSelectTool }: HeroProps) {
  const headlineWords = "Stop staring at a blank screen. Generate social copy that sounds like you.".split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.2 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 12 },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20 px-6">
      
      {/* Background Orbs */}
      <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-violet-500/[0.04] rounded-full blur-[90px] pointer-events-none"></div>
      <div className="absolute bottom-[30%] right-[20%] w-[350px] h-[350px] bg-indigo-500/[0.04] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Glow badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md text-zinc-400 text-[10px] font-mono font-bold tracking-widest uppercase mb-10 shadow-lg"
        >
          <Cpu className="h-3.5 w-3.5 text-violet-400 animate-pulse" />
          <span>CREATOR OS // CORE_SYSTEM_v4.0</span>
        </motion.div>

        {/* Word-by-word headline reveal */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-8 font-display leading-[1.08] max-w-4xl"
        >
          {headlineWords.map((word, idx) => (
            <motion.span
              key={idx}
              variants={wordVariants}
              className={`inline-block mr-[0.2em] ${
                word.toLowerCase().includes("copy") || word.toLowerCase().includes("sounds")
                  ? "bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-pink-400 to-indigo-400"
                  : ""
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-zinc-500 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed font-mono tracking-wide"
        >
          The operating system for modern creators. Fine-tune your social identity, grab attention, and deploy narratives in seconds.
        </motion.p>

        {/* Action Buttons wrapped in Magnetic Motion */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto mb-24 w-full px-4"
        >
          <MagneticButton
            onClick={() => onSelectTool("bio")}
            className="w-full sm:w-auto min-w-[190px] group flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-zinc-200 px-6 py-4 text-xs font-mono font-bold text-black transition-all cursor-pointer shadow-lg active:scale-95 border border-white"
          >
            <User className="h-4 w-4" />
            <span>IDENTITY_ENGINE</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <MagneticButton
            onClick={() => onSelectTool("hooks")}
            className="w-full sm:w-auto min-w-[190px] group flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 px-6 py-4 text-xs font-mono font-bold text-white transition-all cursor-pointer active:scale-95"
          >
            <Radio className="h-4 w-4 text-indigo-400" />
            <span>ATTENTION_ENGINE</span>
          </MagneticButton>

          <MagneticButton
            onClick={() => onSelectTool("captions")}
            className="w-full sm:w-auto min-w-[190px] group flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 px-6 py-4 text-xs font-mono font-bold text-white transition-all cursor-pointer active:scale-95"
          >
            <FileText className="h-4 w-4 text-pink-400" />
            <span>NARRATIVE_ENGINE</span>
          </MagneticButton>
        </motion.div>

        {/* Premium Browser Mockup with 3D Tilt and Continuous Float */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-full max-w-4xl px-4 relative z-20"
        >
          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.08}
            glareColor="#ffffff"
            glarePosition="all"
            tiltMaxAngleX={4}
            tiltMaxAngleY={4}
            className="rounded-2xl"
          >
            <div className="relative rounded-2xl border border-white/10 bg-zinc-950/40 p-1.5 backdrop-blur-2xl shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)]">
              
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/[0.02] via-transparent to-indigo-500/[0.02] rounded-2xl pointer-events-none"></div>

              {/* Browser bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-zinc-900/20 rounded-t-xl font-mono">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800"></span>
                </div>
                <div className="text-[9px] text-zinc-500 bg-black/40 border border-white/5 px-8 py-1 rounded-md tracking-wider">
                  CREATOR-OS.SYSTEM/PLAYGROUND
                </div>
                <div className="w-8"></div>
              </div>

              {/* Simulated UI layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-5 min-h-[300px] text-left">
                
                {/* Left: Input Node */}
                <div className="md:col-span-5 space-y-4 bg-white/[0.005] border border-white/5 rounded-xl p-5">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-violet-400 font-bold mb-1 uppercase tracking-wider">
                    <Terminal className="h-3.5 w-3.5" /> input_matrix
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-zinc-800 rounded w-1/4"></div>
                    <div className="h-9 bg-white/5 border border-white/5 rounded-lg flex items-center px-3 text-[11px] text-zinc-500 font-mono">
                      DOCTOR
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-zinc-800 rounded w-1/3"></div>
                    <div className="h-9 bg-white/5 border border-white/5 rounded-lg flex items-center px-3 text-[11px] text-zinc-500 font-mono">
                      BEAUTY, TRAVEL, WELLNESS
                    </div>
                  </div>
                  <div className="h-10 bg-white text-black rounded-lg flex items-center justify-center text-[10px] font-mono font-bold tracking-wider uppercase shadow shadow-white/5">
                    RUN_GENERATOR
                  </div>
                </div>

                {/* Right: Output Node */}
                <div className="md:col-span-7 space-y-4 flex flex-col justify-between bg-white/[0.005] border border-white/5 rounded-xl p-5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5 font-mono text-[9px] text-zinc-500">
                    <div>OUTPUT_STREAM</div>
                    <div className="flex gap-2">
                      <span className="w-8 h-3.5 bg-zinc-800 rounded"></span>
                      <span className="w-8 h-3.5 bg-zinc-800 rounded"></span>
                    </div>
                  </div>
                  
                  {/* Result Item */}
                  <div className="space-y-3.5 py-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono font-bold tracking-wider text-violet-400 bg-violet-500/5 border border-violet-500/10 px-2 py-0.5 rounded uppercase">IDENTITY_PRESET // LUXURY</span>
                    </div>
                    <p className="text-[11.5px] text-zinc-300 font-sans leading-relaxed">
                      🩺 Doctor • Beauty • Travel • Wellness<br />
                      ✨ Curating mindful habits & everyday aesthetic vlogs.<br />
                      📩 Inquiries: hello@creator.os
                    </p>
                  </div>

                  {/* Score indicators */}
                  <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-white/5 font-mono text-[9px] font-bold text-zinc-500">
                    {["CLARITY 96%", "AUTHORITY 90%", "CONVERSION 94%"].map((score, i) => (
                      <div key={i} className="bg-black/20 border border-white/5 rounded p-1.5 text-center">
                        {score}
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>
          </Tilt>
        </motion.div>

      </div>
    </section>
  );
}
