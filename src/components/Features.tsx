"use client";

import { Zap, Target, Smartphone, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "⚡ Instant Generation",
    description: "Powered by Gemini 2.5 Flash, generate optimized creator copy, bios, scroll-stopping hooks, and formatted captions in under 2 seconds.",
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Target,
    title: "🎯 Creator Focused",
    description: "Designed specifically to solve creator writer's block. Built using copywriting frameworks structured to scale personal brands.",
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: Smartphone,
    title: "📱 Social Ready",
    description: "Copy-ready structures containing optimized layout formatting, tags, spaces, and platform-specific tone adaptations.",
    color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  },
  {
    icon: Sparkles,
    title: "🚀 Free Forever",
    description: "100% free interactive toolkit for content creators. No sign-up walls, credit cards, or hidden limits. Jump straight in.",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Next-Gen Toolkit Built for Social Growth
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Stop starting from scratch. Leverage fine-tuned prompt layouts to optimize social bios, write hooks, and draft hashtags in seconds.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/10"
            >
              {/* Backlight effect */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-violet-600/5 group-hover:bg-violet-600/10 rounded-full blur-xl transition-all duration-500"></div>

              {/* Icon Container */}
              <div className={`inline-flex p-3 rounded-xl border mb-5 transition-transform group-hover:scale-110 duration-300 ${feat.color}`}>
                <feat.icon className="h-5 w-5" />
              </div>

              {/* Info */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                {feat.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans font-medium">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
