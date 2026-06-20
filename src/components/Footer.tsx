"use client";

import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40 backdrop-blur-md py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Info & Custom Bio */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-sm tracking-tight text-white uppercase font-sans">
                Creator Toolkit AI
              </span>
            </div>
            
            <div className="space-y-1 font-sans">
              <p className="text-zinc-300 text-sm font-semibold">
                Built by: Sanika Sadre
              </p>
              <p className="text-zinc-500 text-xs font-medium">
                Email: your-email@gmail.com
              </p>
            </div>

            <p className="text-zinc-500 text-xs sm:text-sm max-w-sm leading-relaxed font-medium">
              Free interactive creator productivity widgets. Leverage Gemini AI to optimize bios, write hooks, and draft captions in seconds.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="Instagram">
                <svg className="h-4 w-4 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="YouTube">
                <svg className="h-4 w-4 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <polygon points="10 15 15 12 10 9" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="GitHub">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Categories & Digital Heroes CTA */}
          <div className="md:col-span-6 grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product Links</h4>
              <ul className="space-y-2 text-xs text-zinc-500 font-medium">
                <li><a href="#tools-section" className="hover:text-violet-400 transition-colors">Bio Generator</a></li>
                <li><a href="#tools-section" className="hover:text-violet-400 transition-colors">Hook Generator</a></li>
                <li><a href="#tools-section" className="hover:text-violet-400 transition-colors">Caption Writer</a></li>
                <li><a href="#features" className="hover:text-violet-400 transition-colors">Features List</a></li>
              </ul>
            </div>

            <div className="flex flex-col justify-start items-start space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Action CTA</h4>
              <a
                href="https://digitalheroesco.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-lg hover:shadow-violet-600/10 cursor-pointer active:scale-95 whitespace-nowrap"
              >
                Built for Digital Heroes
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-xs">
            &copy; {new Date().getFullYear()} Creator Toolkit AI. All rights reserved.
          </p>
          <p className="text-zinc-600 text-xs flex items-center gap-1 font-sans">
            Made for modern creators. Powered by Gemini API.
          </p>
        </div>

      </div>
    </footer>
  );
}
