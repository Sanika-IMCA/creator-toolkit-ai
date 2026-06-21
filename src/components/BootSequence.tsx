"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Booting...");

  useEffect(() => {
    // Set overflow hidden on body to prevent scroll during boot
    document.body.style.overflow = "hidden";

    // Progress line animation over 1.6s
    const duration = 1600;
    const intervalTime = 25;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setStatus("System Ready.");
      const timeout = setTimeout(() => {
        // Restore scrolling on completion
        document.body.style.overflow = "auto";
        onComplete();
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center font-mono select-none px-6"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.6, ease: "easeInOut" }
      }}
    >
      {/* Subtle background glow */}
      <div className="absolute w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* OS Logo/Text */}
      <div className="relative flex flex-col items-center max-w-[280px] w-full">
        <motion.h1
          initial={{ letterSpacing: "0.2em", opacity: 0 }}
          animate={{ letterSpacing: "0.5em", opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-white text-3xl font-bold uppercase tracking-[0.5em] mb-8 mr-[-0.5em] font-display text-center"
        >
          CREATOR OS
        </motion.h1>

        {/* Console line info */}
        <div className="w-full flex justify-between items-center text-zinc-500 text-[10px] uppercase tracking-wider mb-2 font-mono">
          <span className="text-zinc-400 font-semibold">{status}</span>
          <span className="font-semibold">{Math.min(100, Math.floor(progress))}%</span>
        </div>

        {/* Glowing Progress Bar */}
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Small OS Boot Logs */}
        <div className="w-full mt-5 h-12 overflow-hidden text-[9px] text-zinc-600 space-y-1 font-mono text-left opacity-60">
          {progress > 15 && <p>&gt; LOAD OS_CORE_ENGINE... OK</p>}
          {progress > 45 && <p>&gt; MOUNT ATTENTION_ENGINES... OK</p>}
          {progress > 75 && <p>&gt; DETECT PLATFORMS... READY</p>}
        </div>
      </div>
    </motion.div>
  );
}
