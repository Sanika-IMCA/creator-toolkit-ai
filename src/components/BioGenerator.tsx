"use client";

import { useState } from "react";
import { Sparkles, RefreshCw, Smartphone, User, Copy, Check, Download, AlertCircle, Award, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Tilt from "react-parallax-tilt";
import { BioOutput } from "../data/prompts";
import AILoader from "./AILoader";

const PERSONAS = [
  {
    name: "Doctor",
    profession: "Doctor",
    interests: "Beauty, Travel, Wellness",
    personality: "Friendly & Fun",
    audience: "Women & Aspiring Creators",
    style: "Luxury",
  },
  {
    name: "Fitness Coach",
    profession: "Fitness Coach",
    interests: "Workouts, Nutrition, Weight Loss",
    personality: "Bold & Motivational",
    audience: "Busy Professionals",
    style: "Authority",
  },
  {
    name: "Founder",
    profession: "SaaS Founder",
    interests: "Coding, AI Tools, Startups",
    personality: "Innovative & Direct",
    audience: "Developers & Founders",
    style: "Professional",
  },
  {
    name: "Fashion Creator",
    profession: "Fashion Stylist",
    interests: "Thrifting, Outfits, Makeup",
    personality: "Luxury & Elegant",
    audience: "Gen Z Fashionistas",
    style: "Luxury",
  },
  {
    name: "Travel Creator",
    profession: "Travel Videographer",
    interests: "Solo Travel, Hidden Gems",
    personality: "Adventurous & Witty",
    audience: "Backpackers & Nomads",
    style: "Creator",
  },
  {
    name: "Student",
    profession: "Med Student",
    interests: "Study Hacks, Productivity, Vlogs",
    personality: "Chill & Relatable",
    audience: "College Students",
    style: "Funny",
  },
];

const STYLES = ["Professional", "Luxury", "Minimal", "Creator", "Funny", "Authority"];

export default function BioGenerator() {
  const [profession, setProfession] = useState("");
  const [interests, setInterests] = useState("");
  const [personality, setPersonality] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [style, setStyle] = useState("Professional");
  
  const [apiLoading, setApiLoading] = useState(false);
  const [showAILoader, setShowAILoader] = useState(false);
  const [pendingResults, setPendingResults] = useState<BioOutput | null>(null);
  const [results, setResults] = useState<BioOutput | null>(null);
  const [regenerating, setRegenerating] = useState(false);
  
  // Selection of active template in preview & copy actions
  const [activeTemplate, setActiveTemplate] = useState<"minimal" | "professional" | "luxury">("professional");
  
  // Custom copy notification states
  const [copiedBio, setCopiedBio] = useState(false);
  const [copiedEmojis, setCopiedEmojis] = useState(false);
  const [copiedHashtags, setCopiedHashtags] = useState(false);

  // Auto fill preset
  const handleSelectPersona = (p: typeof PERSONAS[0]) => {
    setProfession(p.profession);
    setInterests(p.interests);
    setPersonality(p.personality);
    setTargetAudience(p.audience);
    setStyle(p.style);
  };

  // Helper to fetch active text
  const getActiveText = (): string => {
    if (!results) return "";
    return results[activeTemplate] || "";
  };

  const handleGenerate = async (e?: React.FormEvent, isRegen = false) => {
    if (e) e.preventDefault();
    if (!profession || !interests || !personality) return;

    if (isRegen) {
      setRegenerating(true);
    } else {
      setApiLoading(true);
      setShowAILoader(true);
      setResults(null);
      setPendingResults(null);
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
            style,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate bios");
      }

      const data = await response.json();
      
      if (isRegen) {
        setResults(data.result);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      } else {
        setPendingResults(data.result);
      }
    } catch (err) {
      console.error("Error generating bio: ", err);
      setShowAILoader(false);
    } finally {
      setApiLoading(false);
      setRegenerating(false);
    }
  };

  const handleLoaderComplete = () => {
    if (pendingResults) {
      setResults(pendingResults);
      setShowAILoader(false);
      setActiveTemplate("professional");
      
      // Trigger cinematic output confetti burst
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  // Character length of active bio
  const activeBioText = getActiveText();
  const charCount = activeBioText.length;
  const isOverLimit = charCount > 150;

  // Clipboard Copiers
  const handleCopyBio = async () => {
    try {
      const stripEmojis = activeBioText.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "").trim();
      await navigator.clipboard.writeText(stripEmojis);
      setCopiedBio(true);
      confetti({
        particleCount: 20,
        spread: 30,
        colors: ["#a78bfa", "#818cf8"]
      });
      setTimeout(() => setCopiedBio(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyWithEmojis = async () => {
    try {
      await navigator.clipboard.writeText(activeBioText);
      setCopiedEmojis(true);
      confetti({
        particleCount: 20,
        spread: 30,
        colors: ["#a78bfa", "#f472b6"]
      });
      setTimeout(() => setCopiedEmojis(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyHashtags = async () => {
    if (!results) return;
    try {
      await navigator.clipboard.writeText(results.hashtags);
      setCopiedHashtags(true);
      confetti({
        particleCount: 15,
        spread: 25,
        colors: ["#f472b6", "#fb7185"]
      });
      setTimeout(() => setCopiedHashtags(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // Export File Function
  const handleExportText = () => {
    if (!results) return;
    const fileContent = `--- CREATOR OS ---
Style Preset: ${style.toUpperCase()}
Category: ${activeTemplate.toUpperCase()}
Profession: ${profession}
Personality: ${personality}

[BIO]
${activeBioText}

[HASHTAGS]
${results.hashtags}

---
Generated by Creator OS | digitalheroesco.com`;

    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bio_${activeTemplate}_${profession.toLowerCase().replace(/\s+/g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Input Form Column */}
      <div className="lg:col-span-5 bg-white/[0.01] border border-white/5 rounded-3xl p-6 lg:p-8 backdrop-blur-xl shadow-2xl bento-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-violet-500/10 rounded-lg border border-violet-500/20 text-violet-400">
              <Terminal className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm tracking-widest text-white uppercase font-mono">01 // IDENTITY ENGINE</h3>
          </div>
          {results && (
            <button
              type="button"
              onClick={(e) => handleGenerate(e, true)}
              disabled={apiLoading || regenerating}
              className="text-xs flex items-center gap-1.5 text-violet-400 hover:text-violet-300 font-bold transition-colors cursor-pointer disabled:opacity-50 font-mono"
            >
              <RefreshCw className={`h-3 w-3 ${regenerating ? "animate-spin" : ""}`} />
              <span>REGEN</span>
            </button>
          )}
        </div>

        {/* Creator Personas Row */}
        <div className="mb-6">
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 font-mono">
            Select Configuration Preset
          </label>
          <div className="flex flex-wrap gap-2">
            {PERSONAS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => handleSelectPersona(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer border ${
                  profession === p.profession && interests.includes(p.interests.split(",")[0])
                    ? "bg-white border-white text-black shadow-lg shadow-white/5"
                    : "bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-300"
                }`}
              >
                {p.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={(e) => handleGenerate(e, false)} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 font-mono">
              Profession / Niche
            </label>
            <input
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder="e.g. Public Health Doctor, SaaS Founder"
              className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/20 transition-all font-sans"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 font-mono">
              Interests (comma separated)
            </label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g. Beauty, Solo Travel, Wellness"
              className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/20 transition-all font-sans"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 font-mono">
                Personality Vibe
              </label>
              <input
                type="text"
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                placeholder="e.g. Fun, Bold, Minimal"
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/20 transition-all font-sans"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 font-mono">
                Target Audience
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Women, Aspiring Creators"
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/20 transition-all font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 font-mono">
              Bio Style
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/20 transition-all"
            >
              {STYLES.map((st) => (
                <option key={st} value={st}>
                  {st} Style
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={apiLoading || showAILoader || regenerating || !profession || !interests || !personality}
            className="w-full mt-6 bg-white hover:bg-zinc-200 disabled:bg-zinc-800/40 disabled:text-zinc-600 disabled:cursor-not-allowed text-black font-bold py-4 px-4 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] font-mono text-xs uppercase tracking-wider"
          >
            <Sparkles className="h-4 w-4" />
            <span>Generate Identity Profiles</span>
          </button>
        </form>
      </div>

      {/* Output Results Column */}
      <div className="lg:col-span-7 space-y-6">
        {showAILoader && (
          <AILoader
            onComplete={handleLoaderComplete}
            isDataReady={!!pendingResults}
          />
        )}

        {!showAILoader && !results && (
          <div className="min-h-[450px] flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-white/[0.005] p-8 text-center backdrop-blur-md shadow-inner">
            <Smartphone className="h-10 w-10 text-zinc-700 mb-4 animate-pulse" />
            <h4 className="text-zinc-400 font-bold tracking-widest uppercase text-xs font-mono mb-2">Device Preview Offline</h4>
            <p className="text-zinc-500 text-xs max-w-sm font-sans mb-5 leading-relaxed font-medium">
              Configure parameters on the left and trigger compilation to boot the live mock preview screen.
            </p>
            <button
              onClick={() => handleSelectPersona(PERSONAS[0])}
              className="text-[10px] font-mono font-bold px-4 py-2.5 rounded-xl border border-white/10 hover:border-violet-500/30 text-zinc-300 hover:text-white bg-white/5 hover:bg-violet-950/20 transition-all cursor-pointer"
            >
              LOAD_DOCTOR_PRESET
            </button>
          </div>
        )}

        {!showAILoader && results && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
          >
            {/* Live Phone Mockup Column */}
            <div className="md:col-span-6 flex flex-col items-center">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-1.5 font-mono">
                <Smartphone className="h-3.5 w-3.5 text-violet-400 animate-pulse" /> Live Device Rendering
              </span>
              
              {/* Phone Frame wrapped with 3D Tilt */}
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.12}
                glareColor="#ffffff"
                glarePosition="all"
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                className="w-[280px] h-[520px] rounded-[42px] overflow-hidden"
              >
                <div className="w-full h-full rounded-[42px] border-[6px] border-zinc-800/80 bg-black shadow-2xl overflow-hidden flex flex-col">
                  {/* Speaker/Camera Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-800/80 rounded-full z-20"></div>

                  {/* Mock Instagram App */}
                  <div className="flex-grow flex flex-col bg-zinc-950 pt-8 text-white select-none text-[11px] font-sans">
                    {/* Insta Header */}
                    <div className="px-4 py-2 flex items-center justify-between border-b border-white/5">
                      <span className="font-extrabold text-[12px] flex items-center gap-0.5 font-sans">
                        {profession.toLowerCase().replace(/\s+/g, "_") || "creator"}_os
                        <span className="w-3 h-3 bg-sky-500 text-[8px] rounded-full inline-flex items-center justify-center text-white font-bold scale-[0.8] mb-0.5">✓</span>
                      </span>
                      <div className="flex gap-3 text-zinc-300">
                        <span>🔔</span>
                        <span>•••</span>
                      </div>
                    </div>

                    {/* Profile Info Row */}
                    <div className="px-4 py-3 flex items-center justify-between gap-4">
                      {/* Gradient Avatar */}
                      <div className="relative p-[2px] bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600 rounded-full">
                        <div className="w-14 h-14 rounded-full bg-zinc-900 border-2 border-black flex items-center justify-center text-zinc-400 text-lg font-bold">
                          {profession ? profession.charAt(0).toUpperCase() : "OS"}
                        </div>
                      </div>
                      {/* Stats */}
                      <div className="flex-grow flex justify-around text-center">
                        <div>
                          <div className="font-bold text-white">124</div>
                          <div className="text-[9px] text-zinc-400 font-medium">Posts</div>
                        </div>
                        <div>
                          <div className="font-bold text-white">12.4k</div>
                          <div className="text-[9px] text-zinc-400 font-medium">Followers</div>
                        </div>
                        <div>
                          <div className="font-bold text-white">482</div>
                          <div className="text-[9px] text-zinc-400 font-medium">Following</div>
                        </div>
                      </div>
                    </div>

                    {/* Bio Description Area */}
                    <div className="px-4 space-y-1">
                      <div className="font-bold text-white">
                        {profession ? `${style} ${profession}` : "Creator Persona"}
                      </div>
                      <div className="text-zinc-500 text-[10px]">
                        Creator OS Operator
                      </div>
                      
                      {/* Live Bio Render */}
                      <div className="text-zinc-200 whitespace-pre-wrap leading-tight text-[11px] font-medium font-sans">
                        {activeBioText}
                      </div>

                      {/* Emojis & Hashtags */}
                      <div className="text-sky-400/90 font-medium text-[10px] tracking-wide">
                        {results.hashtags}
                      </div>

                      {/* Link */}
                      <div className="text-sky-300 font-medium flex items-center gap-0.5 text-[10px] truncate cursor-pointer hover:underline">
                        🔗 <span>digitalheroesco.com</span>
                      </div>
                    </div>

                    {/* Profile Action Buttons */}
                    <div className="px-4 py-3 flex gap-1.5">
                      <button className="flex-grow py-1.5 bg-zinc-800 text-white font-bold rounded-lg text-[10px]">
                        Follow
                      </button>
                      <button className="flex-grow py-1.5 bg-zinc-800 text-white font-bold rounded-lg text-[10px]">
                        Message
                      </button>
                      <button className="px-2.5 py-1.5 bg-zinc-800 text-white font-bold rounded-lg text-[10px]">
                        ▼
                      </button>
                    </div>

                    {/* Highlights Bar */}
                    <div className="px-4 py-1 flex gap-4 overflow-x-hidden border-b border-white/5 pb-3">
                      {["Collabs", "Q&A", "Hacks"].map((item) => (
                        <div key={item} className="flex flex-col items-center gap-1 text-[9px] text-zinc-400">
                          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center">✨</div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Grid Mockup */}
                    <div className="grid grid-cols-3 gap-[2px] p-[2px] bg-zinc-950 flex-grow">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-zinc-900 flex items-center justify-center text-zinc-800 text-xs">
                          📷
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </Tilt>
            </div>

            {/* Generated Templates & Copy Actions Column */}
            <div className="md:col-span-6 space-y-6">
              
              {/* Category Tab Selectors */}
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 font-mono">
                  Select System Variant
                </label>
                <div className="flex p-0.5 rounded-xl bg-zinc-900/60 border border-white/5">
                  {(["minimal", "professional", "luxury"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTemplate(tab)}
                      className={`flex-grow py-2 text-xs font-bold font-mono uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                        activeTemplate === tab
                          ? "bg-white text-black shadow"
                          : "text-zinc-500 hover:text-zinc-200"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Character Counter & Text Area */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.015] p-5 backdrop-blur-xl shadow-lg relative glow-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-violet-400 uppercase bg-violet-500/5 border border-violet-500/10 px-2.5 py-1 rounded">
                    COMPILE_SUCCESS
                  </span>
                  
                  {/* Dynamic character counter */}
                  <span className={`text-xs font-mono font-semibold ${isOverLimit ? "text-rose-400" : "text-zinc-500"}`}>
                    {charCount} / 150
                  </span>
                </div>
                <div className="text-zinc-200 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed min-h-[80px] select-all font-medium font-sans">
                  {activeBioText}
                </div>
                {isOverLimit && (
                  <p className="text-[10px] text-rose-400 mt-3 flex items-center gap-1 font-mono font-semibold">
                    <AlertCircle className="h-3.5 w-3.5" /> CRITICAL: CHARACTER LIMIT REACHED (150)
                  </p>
                )}
              </div>

              {/* Actions Grid */}
              <div className="grid grid-cols-2 gap-2 font-mono">
                <button
                  onClick={handleCopyBio}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 px-4 py-3.5 text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  {copiedBio ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-zinc-400" />
                      <span>COPY TEXT</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopyWithEmojis}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 px-4 py-3.5 text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  {copiedEmojis ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-violet-400" />
                      <span>WITH EMOJIS</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopyHashtags}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 px-4 py-3.5 text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  {copiedHashtags ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-pink-400" />
                      <span>TAG NODES</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleExportText}
                  className="flex items-center justify-center gap-2 rounded-xl bg-violet-600/10 hover:bg-violet-600/20 border border-violet-500/10 px-4 py-3.5 text-xs font-bold text-violet-300 hover:text-violet-200 transition-all cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>EXPORT .TXT</span>
                </button>
              </div>

              {/* AI Scores Section */}
              <div className="border-t border-white/5 pt-5">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-1.5 font-mono">
                  <Award className="h-3.5 w-3.5 text-violet-400" /> AI OPTIMIZATION METRICS
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Clarity", val: results.clarityScore, color: "text-violet-400", bg: "bg-violet-500/10" },
                    { label: "Authority", val: results.authorityScore, color: "text-indigo-400", bg: "bg-indigo-500/10" },
                    { label: "Conversion", val: results.conversionScore, color: "text-pink-400", bg: "bg-pink-500/10" },
                  ].map((score) => (
                    <div key={score.label} className="bg-white/[0.005] border border-white/5 rounded-2xl p-3.5 text-center">
                      <div className="text-[10px] text-zinc-500 font-bold font-mono mb-1.5 uppercase">{score.label}</div>
                      <div className="flex items-baseline justify-center gap-0.5">
                        <span className={`text-xl font-extrabold ${score.color}`}>{score.val}</span>
                        <span className="text-[10px] text-zinc-600 font-mono">%</span>
                      </div>
                      
                      {/* Score bar */}
                      <div className="w-full h-1 bg-zinc-800 rounded-full mt-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${score.val}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full ${score.color.replace("text-", "bg-")}`}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
