"use client";

import { useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";

interface ResultCardProps {
  title: string;
  content: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export default function ResultCard({
  title,
  content,
  onRegenerate,
  isRegenerating = false,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      
      // Launch micro confetti burst at the click location
      confetti({
        particleCount: 25,
        spread: 35,
        colors: ["#a78bfa", "#f472b6", "#818cf8"],
        origin: { y: 0.8 }
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative group overflow-hidden rounded-2xl border border-white/5 bg-white/[0.01] p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03] hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
      {/* Visual backlight on hover */}
      <div className="absolute -inset-px bg-gradient-to-r from-violet-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 rounded-2xl blur-sm transition-all duration-500 pointer-events-none"></div>
      
      <div className="relative z-10 flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold tracking-widest text-violet-400 uppercase bg-violet-500/5 border border-violet-500/10 px-3 py-1 rounded">
          {title}
        </span>
        <div className="flex items-center gap-2 font-mono">
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="flex items-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 px-3 py-1.5 text-[10px] font-bold text-zinc-300 hover:text-white transition-all cursor-pointer active:scale-95 disabled:cursor-not-allowed uppercase"
              aria-label={`Regenerate ${title}`}
            >
              <RefreshCw className={`h-3 w-3 ${isRegenerating ? "animate-spin" : ""}`} />
              <span>{isRegenerating ? "REGEN..." : "REGEN"}</span>
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 px-3 py-1.5 text-[10px] font-bold text-zinc-300 hover:text-white transition-all cursor-pointer active:scale-95 uppercase"
            aria-label={`Copy ${title}`}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400 animate-in fade-in zoom-in duration-200" />
                <span className="text-emerald-400">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 text-zinc-400" />
                <span>COPY</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="relative z-10 text-zinc-200 text-sm whitespace-pre-wrap leading-relaxed select-all selection:bg-violet-500/20 font-medium font-sans">
        {content}
      </div>
    </div>
  );
}
