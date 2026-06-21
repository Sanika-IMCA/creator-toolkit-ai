"use client";

import { Sparkles, Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black/80 py-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          
          {/* Brand Info & Custom Bio */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/5 border border-white/10 rounded-lg text-white">
                <Terminal className="h-4 w-4 text-violet-400" />
              </div>
              <span className="font-bold text-base tracking-[0.2em] text-white uppercase font-display">
                CREATOR OS
              </span>
            </div>
            
            <div className="space-y-1.5 font-mono text-xs">
              <p className="text-zinc-300 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
                Operator: <span className="text-white">Sanika Sadre</span>
              </p>
              <p className="text-zinc-500 font-medium">
                System: <span className="text-zinc-400">sanikasunilsadre@gmail.com</span>
              </p>
            </div>

            <p className="text-zinc-500 text-xs sm:text-sm max-w-sm leading-relaxed font-sans font-medium">
              A high-end, AI-powered social media operating system designed for modern creators, digital teams, and personal brands.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:border-white/10 hover:bg-white/10 transition-all" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:border-white/10 hover:bg-white/10 transition-all" aria-label="Instagram">
                <svg className="h-4 w-4 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:border-white/10 hover:bg-white/10 transition-all" aria-label="YouTube">
                <svg className="h-4 w-4 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <polygon points="10 15 15 12 10 9" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:border-white/10 hover:bg-white/10 transition-all" aria-label="GitHub">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Categories & Digital Heroes CTA */}
          <div className="md:col-span-6 grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em] font-display">System Nodes</h4>
              <ul className="space-y-2.5 text-xs font-mono text-zinc-500">
                <li><a href="#tools-section" className="hover:text-violet-400 transition-colors">01 / Identity Engine</a></li>
                <li><a href="#tools-section" className="hover:text-violet-400 transition-colors">02 / Attention Engine</a></li>
                <li><a href="#tools-section" className="hover:text-violet-400 transition-colors">03 / Narrative Engine</a></li>
                <li><a href="#features" className="hover:text-violet-400 transition-colors">04 / Core Features</a></li>
              </ul>
            </div>

            <div className="flex flex-col justify-start items-start space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em] font-display">Production</h4>
              <a
                href="https://digitalheroesco.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center sm:w-auto inline-flex items-center justify-center bg-white text-black hover:bg-zinc-200 text-xs font-bold px-5 py-3 rounded-xl transition-all cursor-pointer active:scale-95 whitespace-nowrap"
              >
                Built for Digital Heroes
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} CREATOR OS. All rights reserved.
            </p>
            <p className="text-[9px] font-mono text-zinc-600 mt-1">
              STATUS // ACTIVE • POWERED BY GEMINI 2.5 FLASH
            </p>
          </div>
          
          {/* END OF TRANSMISSION logo signature */}
          <div className="text-right">
            <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded font-mono text-[9px] font-bold text-zinc-400 tracking-[0.3em] uppercase select-none hover:text-white hover:border-violet-500/30 transition-all duration-300">
              ⚡ END OF TRANSMISSION
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
