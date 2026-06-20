"use client";

import { useState } from "react";
import { Sparkles, RefreshCw, MessageSquare, FileText } from "lucide-react";
import { CaptionOutput } from "../data/prompts";
import ResultCard from "./ResultCard";

const TONES = [
  "Story / Personal Vibe",
  "Authority / Expert Vibe",
  "Funny / Sarcastic Vibe",
  "Aesthetic / Relaxed",
];

const PLATFORMS = [
  "Instagram",
  "TikTok",
  "YouTube Shorts",
  "LinkedIn",
  "X (Twitter)",
];

export default function CaptionGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Story / Personal Vibe");
  const [platform, setPlatform] = useState("Instagram");
  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [results, setResults] = useState<CaptionOutput | null>(null);

  const loadPreset = () => {
    setTopic("Morning Coffee Routine");
    setTone("Funny / Sarcastic Vibe");
    setPlatform("Instagram");
  };

  const handleGenerate = async (e?: React.FormEvent, isRegen = false) => {
    if (e) e.preventDefault();
    if (!topic) return;

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
          tool: "captions",
          input: {
            topic,
            tone,
            platform,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate captions");
      }

      const data = await response.json();
      setResults(data.result);
    } catch (err) {
      console.error("Error generating captions: ", err);
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
            <div className="p-2 bg-pink-500/10 rounded-lg border border-pink-500/20 text-pink-400">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg text-white">Caption Writer</h3>
          </div>
          <button
            type="button"
            onClick={loadPreset}
            className="text-xs flex items-center gap-1 text-pink-400 hover:text-pink-300 font-medium transition-colors cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" /> Preset Example
          </button>
        </div>

        <form onSubmit={(e) => handleGenerate(e, false)} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Topic or Post Concept
            </label>
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Describe your photo or video topic (e.g. launching our new app, healthy morning routine)..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/10 transition-all font-sans resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Primary Vibe/Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/10 transition-all"
              >
                {TONES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Target Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/10 transition-all"
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || regenerating || !topic}
            className="w-full mt-6 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-pink-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
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
                Drafting Captions...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate 3 Captions
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
              <div className="absolute inset-0 bg-pink-500/20 blur-xl rounded-full"></div>
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full border border-pink-500/30 bg-pink-950/40 text-pink-400">
                <MessageSquare className="h-7 w-7 animate-pulse" />
              </div>
            </div>
            <h4 className="text-white font-medium mb-1 animate-pulse">Polishing 3 Style Options...</h4>
            <p className="text-zinc-500 text-xs max-w-xs font-sans">
              Formatting story structures, expert authority formats, and funny/sarcastic captions with Gemini.
            </p>
          </div>
        )}

        {!loading && !results && (
          <div className="min-h-[350px] flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.01] p-8 text-center">
            <FileText className="h-10 w-10 text-zinc-600 mb-4" />
            <h4 className="text-zinc-400 font-semibold mb-1">Your 3 Captions Preview</h4>
            <p className="text-zinc-500 text-sm max-w-sm font-sans mb-4">
              Enter your topic/concept on the left to generate Story-style, Authority-style, and Funny-style copies for {platform}.
            </p>
            <button
              onClick={loadPreset}
              className="text-xs font-semibold px-4 py-2 rounded-full border border-white/10 hover:border-pink-500/30 text-zinc-300 hover:text-white bg-white/5 hover:bg-pink-950/20 transition-all cursor-pointer"
            >
              Fill out Example Preset
            </button>
          </div>
        )}

        {!loading && results && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <h4 className="font-semibold text-white flex items-center gap-2 text-sm uppercase tracking-wider text-zinc-400">
                <FileText className="h-4 w-4 text-pink-400" /> 3 Styles Generated
              </h4>
              <span className="text-[10px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 font-sans">
                Platform: {platform}
              </span>
            </div>

            <div className="space-y-4">
              <ResultCard
                title="Story Style"
                content={results.storyStyle}
                onRegenerate={() => handleGenerate(undefined, true)}
                isRegenerating={regenerating}
              />
              <ResultCard
                title="Authority Style"
                content={results.authorityStyle}
                onRegenerate={() => handleGenerate(undefined, true)}
                isRegenerating={regenerating}
              />
              <ResultCard
                title="Funny Style"
                content={results.funnyStyle}
                onRegenerate={() => handleGenerate(undefined, true)}
                isRegenerating={regenerating}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
