"use client";

import { Zap, Target, Smartphone, Sparkles, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const FEATURES = [
  {
    icon: Zap,
    title: "⚡ Instant Generation",
    description: "Powered by Gemini 2.5 Flash, compile creator identities, attention scroll-stoppers, and narrative flows in under 2 seconds.",
    color: "text-amber-400 bg-amber-500/5 border-amber-500/10",
    gridClass: "md:col-span-2",
  },
  {
    icon: Target,
    title: "🎯 Operating Framework",
    description: "Orchestrated using standard high-converting copywriting frameworks fine-tuned to expand authority and retention rates.",
    color: "text-violet-400 bg-violet-500/5 border-violet-500/10",
    gridClass: "md:col-span-1",
  },
  {
    icon: Smartphone,
    title: "📱 Deployment Ready",
    description: "Zero formatting required. Copy formatted text blocks complete with hashtags, line spacing, and platform optimization tags.",
    color: "text-pink-400 bg-pink-500/5 border-pink-500/10",
    gridClass: "md:col-span-1",
  },
  {
    icon: Sparkles,
    title: "🚀 Open Terminal Access",
    description: "A free interactive ecosystem for builders and creators. No subscription limits, paywalls, or hidden trackers. Immediate access to all active modules.",
    color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10",
    gridClass: "md:col-span-2",
  },
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 14 }
    }
  };

  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] font-mono font-bold text-violet-400 uppercase tracking-[0.25em] bg-violet-500/5 border border-violet-500/10 px-3 py-1 rounded-full">
            SYSTEM NODE PARAMETERS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-4 tracking-tight font-display">
            Built for Modern Distribution
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-medium">
            Fine-tuned backend assets designed to bypass writers block and establish professional authority profiles.
          </p>
        </div>

        {/* Bento Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {FEATURES.map((feat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className={`${feat.gridClass} bento-card`}
            >
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.06}
                glareColor="#ffffff"
                glarePosition="all"
                tiltMaxAngleX={4}
                tiltMaxAngleY={4}
                className="h-full rounded-3xl"
              >
                <div className="h-full group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] p-8 transition-all duration-300">
                  {/* Subtle backlight glow */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-600/5 group-hover:bg-violet-600/10 rounded-full blur-[60px] transition-all duration-500"></div>

                  <div className="flex flex-col justify-between h-full min-h-[170px]">
                    <div>
                      {/* Icon */}
                      <div className={`inline-flex p-3 rounded-xl border mb-6 transition-transform group-hover:scale-105 duration-300 ${feat.color}`}>
                        <feat.icon className="h-5 w-5" />
                      </div>

                      {/* Info */}
                      <h3 className="text-lg font-bold text-white mb-3 font-display">
                        {feat.title}
                      </h3>
                      <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-medium font-sans">
                        {feat.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-zinc-600">
                      <span>MODULE_NODE_0{idx + 1}</span>
                      <span>ACTIVE</span>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
