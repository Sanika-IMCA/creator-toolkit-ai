"use client";

import { useState } from "react";
import { Sparkles, RefreshCw, Layers, Radio } from "lucide-react";
import { HookOutput } from "../data/prompts";
import ResultCard from "./ResultCard";

const PLATFORMS = [
  "Instagram",
  "TikTok",
  "YouTube Shorts",
  "X (Twitter)",
  "LinkedIn",
];

export default function HookGenerator() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [results, setResults] = useState<HookOutput | null>(null);

  const loadPreset = () => {
    setTopic("Skincare");
    setAudience("Women");
    setPlatform("Instagram");
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Input Form Column */}
      <div className="lg:col-span-5 bg-white/[0.02] border border-white/10 rounded-3xl p-6 lg:p-8 backdrop-blur-md shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-400">
              <Radio className="h-5 w-5 animate-pulse" />
            </div>
            <h3 className="font-semibold text-lg text-white">Viral Hook Generator</h3>
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
              placeholder="e.g. Skincare, Productivity Hacks, Crypto"
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
              placeholder="e.g. Women, Gen Z, Tech Professionals"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all font-sans"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Target Platform
            </label>
            <div className="grid grid-cols-3 gap-2">
              {PLATFORMS.map((plat) => (
                <button
                  key={plat}
                  type="button"
                  onClick={() => setPlatform(plat)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                    platform === plat
                      ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300 shadow-md shadow-indigo-500/5"
                      : "bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
                  }`}
                >
                  {plat}
                </button>
              ))}
            </div>
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
                Generating 10 Hooks...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate 10 Viral Hooks
              </>
            )}
          </button>
        </form>
      </div>

      {/* Output Results Column */}
      <div className="lg:col-span-7 space-y-6">
        {loading && (
          <div className="min-h-[300px] flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.01] p-8 text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full"></div>
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-indigo-400">
                <Radio className="h-7 w-7 animate-ping duration-1000" />
              </div>
            </div>
            <h4 className="text-white font-medium mb-1 animate-pulse">Generating 10 Viral Social Hooks...</h4>
            <p className="text-zinc-500 text-xs max-w-xs font-sans">
              Optimizing syntax layout with Gemini to match attention-grabbing copy patterns for {platform}.
            </p>
          </div>
        )}

        {!loading && !results && (
          <div className="min-h-[350px] flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.01] p-8 text-center">
            <Layers className="h-10 w-10 text-zinc-600 mb-4" />
            <h4 className="text-zinc-400 font-semibold mb-1">Your 10 Social Hooks Preview</h4>
            <p className="text-zinc-500 text-sm max-w-sm font-sans mb-4">
              Fill out the details on the left to generate exactly 10 high-conversion hooks custom-engineered for {platform}.
            </p>
            <button
              onClick={loadPreset}
              className="text-xs font-semibold px-4 py-2 rounded-full border border-white/10 hover:border-indigo-500/30 text-zinc-300 hover:text-white bg-white/5 hover:bg-indigo-950/20 transition-all cursor-pointer"
            >
              Fill out Example Preset
            </button>
          </div>
        )}

        {!loading && results && results.hooks && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <h4 className="font-semibold text-white flex items-center gap-2 text-sm uppercase tracking-wider text-zinc-400">
                <Layers className="h-4 w-4 text-indigo-400" /> 10 Social Hooks Generated
              </h4>
              <span className="text-[10px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 font-sans">
                Platform: {platform}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
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
    </div>
  );
}
