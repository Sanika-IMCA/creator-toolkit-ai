"use client";

import { useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";

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
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.06] hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold tracking-wider text-violet-400 uppercase bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full">
          {title}
        </span>
        <div className="flex items-center gap-2">
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="flex items-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 text-xs text-zinc-300 hover:text-white transition-all duration-200 cursor-pointer active:scale-95 disabled:cursor-not-allowed"
              aria-label={`Regenerate ${title}`}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRegenerating ? "animate-spin" : ""}`} />
              <span>{isRegenerating ? "Regenerating..." : "Regenerate"}</span>
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 text-xs text-zinc-300 hover:text-white transition-all duration-200 cursor-pointer active:scale-95"
            aria-label={`Copy ${title}`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400 animate-in fade-in zoom-in duration-200" />
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="text-zinc-200 text-sm whitespace-pre-wrap leading-relaxed select-all selection:bg-violet-500/30 font-medium">
        {content}
      </div>
    </div>
  );
}
