"use client";

import { useState } from "react";
import { Sparkles, RefreshCw, Smartphone, User } from "lucide-react";
import { BioOutput } from "../data/prompts";
import ResultCard from "./ResultCard";

export default function BioGenerator() {
  const [profession, setProfession] = useState("");
  const [interests, setInterests] = useState("");
  const [personality, setPersonality] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [results, setResults] = useState<BioOutput | null>(null);

  // Quick preset loader
  const loadPreset = () => {
    setProfession("Doctor");
    setInterests("Beauty, Travel");
    setPersonality("Fun");
    setTargetAudience("Women");
  };

  const handleGenerate = async (e?: React.FormEvent, isRegen = false) => {
    if (e) e.preventDefault();
    if (!profession || !interests || !personality) return;

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
          tool: "bio",
          input: {
            profession,
            interests,
            personality,
            targetAudience,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate bios");
      }

      const data = await response.json();
      setResults(data.result);
    } catch (err) {
      console.error("Error generating bio: ", err);
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
            <div className="p-2 bg-violet-500/10 rounded-lg border border-violet-500/20 text-violet-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg text-white">Bio Generator</h3>
          </div>
          <button
            type="button"
            onClick={loadPreset}
            className="text-xs flex items-center gap-1 text-violet-400 hover:text-violet-300 font-medium transition-colors cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" /> Use Example Preset
          </button>
        </div>

        <form onSubmit={(e) => handleGenerate(e, false)} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Profession / Niche
            </label>
            <input
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder="e.g. Doctor, Tech Founder, Travel Vlogger"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10 transition-all font-sans"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Interests (comma separated)
            </label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g. Beauty, Travel, Fitness, Cooking"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10 transition-all font-sans"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Personality
              </label>
              <input
                type="text"
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                placeholder="e.g. Fun, Bold, Witty"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10 transition-all font-sans"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Target Audience
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Women, Gen Z"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10 transition-all font-sans"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || regenerating || !profession || !interests || !personality}
            className="w-full mt-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-violet-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
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
                Generating Bio...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Creator Bios
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
              <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full"></div>
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full border border-violet-500/30 bg-violet-950/40 text-violet-400">
                <Sparkles className="h-7 w-7 animate-pulse" />
              </div>
            </div>
            <h4 className="text-white font-medium mb-1 animate-pulse">Consulting Gemini Engine...</h4>
            <p className="text-zinc-500 text-xs max-w-xs font-sans">
              Analyzing profiles, interests, personality tag setups, and compiling custom-tailored creative copies.
            </p>
          </div>
        )}

        {!loading && !results && (
          <div className="min-h-[350px] flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.01] p-8 text-center">
            <Smartphone className="h-10 w-10 text-zinc-600 mb-4" />
            <h4 className="text-zinc-400 font-semibold mb-1">Your Bio Preview is Ready</h4>
            <p className="text-zinc-500 text-sm max-w-sm font-sans mb-4">
              Fill in your creator profile on the left and click generate to instantly view Instagram, LinkedIn, and Collab bio copies.
            </p>
            <button
              onClick={loadPreset}
              className="text-xs font-semibold px-4 py-2 rounded-full border border-white/10 hover:border-violet-500/30 text-zinc-300 hover:text-white bg-white/5 hover:bg-violet-950/20 transition-all cursor-pointer"
            >
              Fill out Example Preset
            </button>
          </div>
        )}

        {!loading && results && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <h4 className="font-semibold text-white flex items-center gap-2 text-sm uppercase tracking-wider text-zinc-400">
                <User className="h-4 w-4 text-violet-400" /> Generated Results
              </h4>
              <span className="text-[10px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 font-sans">
                Active Session
              </span>
            </div>

            <div className="space-y-4">
              <ResultCard
                title="Instagram Bio"
                content={results.instagramBio}
                onRegenerate={() => handleGenerate(undefined, true)}
                isRegenerating={regenerating}
              />
              <ResultCard
                title="LinkedIn Headline"
                content={results.linkedInHeadline}
                onRegenerate={() => handleGenerate(undefined, true)}
                isRegenerating={regenerating}
              />
              <ResultCard
                title="Collaboration Line"
                content={results.collaborationLine}
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
