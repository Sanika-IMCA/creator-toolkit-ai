"use client";

import { useState } from "react";
import { Sparkles, User, Radio, FileText, ArrowRight } from "lucide-react";
import Hero from "../components/Hero";
import BioGenerator from "../components/BioGenerator";
import HookGenerator from "../components/HookGenerator";
import CaptionGenerator from "../components/CaptionGenerator";
import Features from "../components/Features";
import Footer from "../components/Footer";

type ToolType = "bio" | "hooks" | "captions";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ToolType>("bio");

  const handleSelectTool = (tool: ToolType) => {
    setActiveTab(tool);
    const element = document.getElementById("tools-section");
    if (element) {
      // Small delay to ensure the DOM is updated or layout is stable
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white uppercase font-sans">
              Creator Toolkit AI
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors uppercase tracking-wider"
            >
              Features
            </a>
            <a
              href="#tools-section"
              className="text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors uppercase tracking-wider"
            >
              Interactive Tools
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span>Star on GitHub</span>
            </a>
            <button
              onClick={() => handleSelectTool("bio")}
              className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-md shadow-violet-600/10 active:scale-95 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onSelectTool={handleSelectTool} />

        {/* Tools Dashboard Section */}
        <section id="tools-section" className="py-24 border-y border-white/5 bg-zinc-950/20 relative scroll-mt-16">
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            {/* Heading Info */}
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
                Try the AI Tools Playground
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm font-sans">
                Choose a generator, fill out the basic parameters, and experience immediate, copy-ready AI outputs custom-tailored for your accounts.
              </p>
            </div>

            {/* Tab Selection Row */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex p-1 rounded-2xl bg-zinc-900 border border-white/5 shadow-inner">
                <button
                  onClick={() => setActiveTab("bio")}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                    activeTab === "bio"
                      ? "bg-violet-600 text-white shadow-md shadow-violet-600/25"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]"
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Bio Generator</span>
                </button>

                <button
                  onClick={() => setActiveTab("hooks")}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                    activeTab === "hooks"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]"
                  }`}
                >
                  <Radio className="h-4 w-4" />
                  <span>Hook Generator</span>
                </button>

                <button
                  onClick={() => setActiveTab("captions")}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                    activeTab === "captions"
                      ? "bg-pink-600 text-white shadow-md shadow-pink-600/25"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>Caption Writer</span>
                </button>
              </div>
            </div>

            {/* Active Generator Component */}
            <div className="min-h-[400px]">
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
    </div>
  );
}
