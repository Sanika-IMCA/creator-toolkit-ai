"use client";

import { useState } from "react";
import { Sparkles, RefreshCw, Layers, Radio, Download, Flame, FileText, Check } from "lucide-react";
import { HookOutput } from "../data/prompts";
import ResultCard from "./ResultCard";

const PLATFORMS = [
  "Instagram",
  "TikTok",
  "YouTube Shorts",
  "X (Twitter)",
  "LinkedIn",
];

const TRENDING_HOOKS = [
  { text: "Nobody talks about this skincare hack...", topic: "Skincare Secrets" },
  { text: "I tried this automation for 30 days...", topic: "Python Automation" },
  { text: "The exact framework to make $10k/month...", topic: "SaaS Side Hustle" },
  { text: "Stop scrolling if you write CSS...", topic: "Tailwind Styling Hacks" },
  { text: "Why 99% of creators fail in 30 days...", topic: "Creator consistency" },
];

export default function HookGenerator() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [results, setResults] = useState<HookOutput | null>(null);
  
  // Custom export check feedback
  const [exported, setExported] = useState(false);

  const loadPreset = () => {
    setTopic("Skincare");
    setAudience("Women");
    setPlatform("Instagram");
  };

  const handleSelectTrending = (item: typeof TRENDING_HOOKS[0]) => {
    setTopic(item.topic);
    setAudience("Creators");
  };

  const handleGenerate = async (e?: React.FormEvent, isRegen = false) => {
    if (e) e.preventDefault();
    if (!topic || !audience) return;

    if (isRegen) {
      setRegenerating(true);
    } else {
      setLoading(true);
      setResults(null);
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tool: "hooks",
          input: {
            topic,
            audience,
            platform,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate hooks");
      }

      const data = await response.json();
      setResults(data.result);
    } catch (err) {
      console.error("Error generating hooks: ", err);
    } finally {
      setLoading(false);
      setRegenerating(false);
    }
  };

  // Export hooks to a single file
  const handleExportText = () => {
    if (!results || !results.hooks) return;
    const hooksTextList = results.hooks.map((h, i) => `[Hook #${i + 1}]\n${h}`).join("\n\n");
    const fileContent = `--- VIRAL SOCIAL HOOKS ---
Topic: ${topic}
Audience: ${audience}
Platform: ${platform}

${hooksTextList}

---
Generated with Creator Toolkit AI | digitalheroesco.com`;

    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `viral_hooks_${topic.toLowerCase().replace(/\s+/g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Input Form Column (col-span-4) */}
      <div className="lg:col-span-4 bg-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-400">
              <Radio className="h-5 w-5 animate-pulse" />
            </div>
            <h3 className="font-semibold text-lg text-white">Hook Creator</h3>
          </div>
          <button
            type="button"
            onClick={loadPreset}
            className="text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium transition-colors cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" /> Preset Example
          </button>
        </div>

        <form onSubmit={(e) => handleGenerate(e, false)} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Skincare, Side Hustle"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all font-sans"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Audience
            </label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. Women, Gen Z, Busy Creators"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all font-sans"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Target Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all"
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading || regenerating || !topic || !audience}
            className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating Hooks...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate 10 Hooks
              </>
            )}
          </button>
        </form>
      </div>

      {/* Output Results Grid (col-span-5) */}
      <div className="lg:col-span-5 space-y-6">
        {loading && (
          <div className="min-h-[400px] flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.01] p-8 text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full"></div>
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-indigo-400">
                <Radio className="h-7 w-7 animate-ping" />
              </div>
            </div>
            <h4 className="text-white font-medium mb-1 animate-pulse">Running Engagement Diagnostics...</h4>
            <p className="text-zinc-500 text-xs max-w-xs font-sans">
              Compiling 10 scroll stoppers targeted to your audience profile.
            </p>
          </div>
        )}

        {!loading && !results && (
          <div className="min-h-[400px] flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.01] p-8 text-center">
            <Layers className="h-10 w-10 text-zinc-600 mb-4" />
            <h4 className="text-zinc-400 font-semibold mb-1">Your 10 social hooks will appear here</h4>
            <p className="text-zinc-500 text-sm max-w-sm font-sans mb-4">
              Specify your topic and platform, or select one of the trending templates on the right to start.
            </p>
            <button
              onClick={loadPreset}
              className="text-xs font-semibold px-4 py-2 rounded-full border border-white/10 hover:border-indigo-500/30 text-zinc-300 hover:text-white bg-white/5 hover:bg-indigo-950/20 transition-all cursor-pointer"
            >
              Fill out Skincare Example
            </button>
          </div>
        )}

        {!loading && results && results.hooks && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <h4 className="font-semibold text-white flex items-center gap-2 text-sm uppercase tracking-wider text-zinc-400">
                <Layers className="h-4 w-4 text-indigo-400" /> Viral Social Hooks
              </h4>
              
              {/* Batch Export Button */}
              <button
                onClick={handleExportText}
                className="text-xs flex items-center gap-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 text-indigo-300 hover:text-indigo-200 transition-all cursor-pointer font-bold"
              >
                {exported ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Exported!</span>
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5" />
                    <span>Export all (.txt)</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
              {results.hooks.map((hook, index) => (
                <ResultCard
                  key={index}
                  title={`Hook #${index + 1}`}
                  content={hook}
                  onRegenerate={() => handleGenerate(undefined, true)}
                  isRegenerating={regenerating}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trending Hooks Sidebar (col-span-3) */}
      <div className="lg:col-span-3 bg-white/[0.02] border border-white/5 rounded-3xl p-5 backdrop-blur-md">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-1.5">
          <Flame className="h-4 w-4 text-rose-500 animate-pulse" /> Trending Copy Hooks
        </span>
        <p className="text-zinc-500 text-xs mb-4 leading-relaxed font-sans">
          Click any viral angle below to auto-load the topic values into the form:
        </p>

        <div className="space-y-3">
          {TRENDING_HOOKS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectTrending(item)}
              className="w-full text-left p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-violet-500/20 transition-all cursor-pointer group active:scale-[0.98]"
            >
              <div className="text-[10px] text-violet-400 font-bold mb-1.5 flex items-center gap-1">
                <FileText className="h-3 w-3" /> {item.topic}
              </div>
              <p className="text-zinc-300 text-[11px] leading-snug font-sans group-hover:text-white transition-colors">
                &quot;{item.text}&quot;
              </p>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
