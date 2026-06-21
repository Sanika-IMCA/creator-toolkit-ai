"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Check, Loader2 } from "lucide-react";

interface AILoaderProps {
  onComplete: () => void;
  isDataReady: boolean;
}

const STEPS = [
  "Initializing Creator OS...",
  "Analyzing profile...",
  "Building positioning...",
  "Optimizing authority...",
  "Generating assets...",
  "Transmission complete."
];

export default function AILoader({ onComplete, isDataReady }: AILoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 6 steps, animate sequential transitions every ~550ms
    const stepDuration = 550;
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  // Smooth loading progression
  useEffect(() => {
    const totalDuration = 3300; // 550ms * 6 steps
    const intervalTime = 30;
    const step = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // When animation finishes AND API data is loaded, exit
  useEffect(() => {
    if (currentStep === STEPS.length - 1 && progress >= 100 && isDataReady) {
      const delay = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [currentStep, progress, isDataReady, onComplete]);

  return (
    <div className="min-h-[450px] flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-900/10 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-violet-600/10 rounded-full blur-[80px]"></div>

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 relative z-10">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-violet-400 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-zinc-400 tracking-wider">CREATOR_OS // SYSTEM_PIPELINE</span>
        </div>
        <span className="text-[10px] font-mono font-semibold text-zinc-400">{Math.floor(progress)}%</span>
      </div>

      {/* Step Checklist */}
      <div className="my-10 space-y-4 relative z-10 font-mono text-xs sm:text-sm text-left">
        {STEPS.map((step, idx) => {
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;
          const isPending = idx > currentStep;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: isPending ? 0.2 : 1,
                x: 0,
                color: isActive ? "#a78bfa" : isCompleted ? "#ffffff" : "#71717a"
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              {isCompleted ? (
                <div className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Check className="w-2.5 h-2.5" />
                </div>
              ) : isActive ? (
                <div className="flex items-center justify-center w-4.5 h-4.5">
                  <Loader2 className="w-3.5 h-3.5 text-violet-400 animate-spin" />
                </div>
              ) : (
                <div className="w-4.5 h-4.5 rounded-full border border-white/5 bg-white/5"></div>
              )}

              <span className={isActive ? "font-semibold tracking-wide" : ""}>
                {step}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Track */}
      <div className="relative z-10">
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[9px] font-mono text-zinc-500 text-center mt-3.5 tracking-widest uppercase">
          {progress < 100 ? "PROCESSOR_ACTIVE" : "SYNCHRONIZING_OUTPUT..."}
        </p>
      </div>
    </div>
  );
}
