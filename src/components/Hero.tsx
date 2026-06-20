"use client";

import { Sparkles, ArrowRight, User, Radio, FileText } from "lucide-react";

interface HeroProps {
  onSelectTool: (tool: "bio" | "hooks" | "captions") => void;
}

export default function Hero({ onSelectTool }: HeroProps) {
  return (
    <section className="relative min-h-[120vh] flex flex-col items-center justify-center overflow-hidden pt-28 pb-16 px-4">
      {/* Background radial meshes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[6000ms]"></div>
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[10000ms]"></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Glow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-md text-violet-300 text-xs font-semibold tracking-wider uppercase mb-8 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
          <Sparkles className="h-3.5 w-3.5 text-violet-400" />
          <span>Creator Toolkit AI v3.0</span>
        </div>

        {/* Big Bold Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 font-sans leading-[1.1] selection:bg-violet-500/30 max-w-4xl">
          Stop staring at a{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-pink-400 to-indigo-400">
            blank screen.
          </span>
          <span className="block mt-2">
            Generate bios, hooks & captions that actually sound like you.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-semibold">
          Built for creators, founders, doctors and personal brands.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-16 w-full px-4">
          <button
            onClick={() => onSelectTool("bio")}
            className="w-full sm:w-auto min-w-[170px] group flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:shadow-violet-600/30 transition-all duration-200 cursor-pointer active:scale-95"
          >
            <User className="h-4 w-4 text-violet-200" />
            <span>Bio Generator</span>
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

        {/* Premium Dashboard Mockup Graphic */}
        <div className="w-full max-w-4xl px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <div className="relative rounded-2xl border border-white/10 bg-zinc-950/60 p-1.5 backdrop-blur-xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)]">
            
            {/* Glossy overlay layer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 via-transparent to-indigo-500/5 rounded-2xl pointer-events-none"></div>

            {/* Browser top-bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-zinc-900/40 rounded-t-xl">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60"></span>
              </div>
              <div className="text-[10px] font-mono text-zinc-600 bg-black/30 border border-white/5 px-8 py-0.5 rounded-md">
                creator-toolkit-ai.app/playground
              </div>
              <div className="w-8"></div>
            </div>

            {/* Simulated UI layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 min-h-[300px] text-left">
              
              {/* Left Column: Mock Inputs */}
              <div className="md:col-span-5 space-y-3 bg-white/[0.01] border border-white/5 rounded-xl p-4">
                <div className="flex items-center gap-1.5 text-xs text-violet-400 font-bold mb-1">
                  <Sparkles className="h-3.5 w-3.5" /> Interactive Form
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-zinc-800 rounded w-1/3"></div>
                  <div className="h-8 bg-white/5 border border-white/5 rounded-lg flex items-center px-3 text-[11px] text-zinc-400">
                    Doctor
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-zinc-800 rounded w-1/2"></div>
                  <div className="h-8 bg-white/5 border border-white/5 rounded-lg flex items-center px-3 text-[11px] text-zinc-400 font-sans">
                    Beauty, Travel, Wellness
                  </div>
                </div>
                <div className="h-9 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shadow shadow-violet-600/10">
                  Generate Copy
                </div>
              </div>

              {/* Right Column: Mock Results & Preview */}
              <div className="md:col-span-7 space-y-3 flex flex-col justify-between bg-white/[0.01] border border-white/5 rounded-xl p-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="h-3 bg-zinc-800 rounded w-1/4"></div>
                  <div className="flex gap-2">
                    <span className="w-10 h-4 bg-zinc-800 rounded"></span>
                    <span className="w-10 h-4 bg-zinc-800 rounded"></span>
                  </div>
                </div>
                
                {/* Result Item */}
                <div className="space-y-2 py-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] bg-violet-500/10 text-violet-400 border border-violet-500/20 px-2 py-0.5 rounded font-bold uppercase">Instagram Bio</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                    🩺 Doctor | Creator ✨<br />
                    💄 Beauty • Travel • Wellness<br />
                    ✉️ DM for brand collaborations!
                  </p>
                </div>

                {/* Score indicators */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                  {["Clarity 94%", "Authority 88%", "Conversion 92%"].map((score, i) => (
                    <div key={i} className="bg-black/20 border border-white/5 rounded-md p-1.5 text-center text-[9px] font-bold text-zinc-500">
                      {score}
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
