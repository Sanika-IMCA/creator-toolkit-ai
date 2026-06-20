"use client";

import { Sparkles, ArrowRight, User, Radio, FileText } from "lucide-react";

interface HeroProps {
  onSelectTool: (tool: "bio" | "hooks" | "captions") => void;
}

export default function Hero({ onSelectTool }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-28 pb-16 px-4">
      {/* Dynamic colorful blur backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse duration-5000"></div>
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]"></div>

      {/* Grid Overlay background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* Glow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-md text-violet-300 text-xs font-semibold tracking-wider uppercase mb-8 shadow-[0_0_20px_rgba(139,92,246,0.15)] animate-bounce duration-[3000ms]">
          <Sparkles className="h-3.5 w-3.5 text-violet-400" />
          <span>Supercharged by Creator AI v2.0</span>
        </div>

        {/* Big Bold Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 font-sans leading-[1.1] selection:bg-violet-500/30">
          Scale Your Social Value with{" "}
          <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-pink-400 to-amber-300 drop-shadow-[0_2px_10px_rgba(168,85,247,0.15)]">
            Creator Toolkit AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Stop staring at a blank screen. Generate hyper-converting creator bios, viral video hooks, and formatted captions in seconds.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          <button
            onClick={() => onSelectTool("bio")}
            className="w-full sm:w-auto min-w-[170px] group flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:shadow-violet-600/30 transition-all duration-200 cursor-pointer active:scale-95"
          >
            <User className="h-4 w-4 text-violet-200" />
            <span>Generate Bio</span>
            <ArrowRight className="h-4 w-4 text-violet-300 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onSelectTool("hooks")}
            className="w-full sm:w-auto min-w-[170px] group flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 cursor-pointer active:scale-95"
          >
            <Radio className="h-4 w-4 text-indigo-400" />
            <span>Generate Hooks</span>
          </button>

          <button
            onClick={() => onSelectTool("captions")}
            className="w-full sm:w-auto min-w-[170px] group flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 cursor-pointer active:scale-95"
          >
            <FileText className="h-4 w-4 text-pink-400" />
            <span>Generate Captions</span>
          </button>
        </div>

        {/* Sub-note */}
        <p className="text-zinc-600 text-xs mt-6 font-sans">
          No sign-up required. Free interactive templates.
        </p>
      </div>
    </section>
  );
}
