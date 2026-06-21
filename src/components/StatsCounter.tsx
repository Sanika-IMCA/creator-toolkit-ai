"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Activity, User, Radio, FileText } from "lucide-react";
import Tilt from "react-parallax-tilt";

interface StatData {
  bio: number;
  hook: number;
  caption: number;
}

function AnimateNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView || value === 0) return;
    
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [value, inView]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function StatsCounter() {
  const [stats, setStats] = useState<StatData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch live stats, using fallbacks:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statsConfig = [
    {
      key: "bio",
      label: "IDENTITY PRESETS CREATED",
      value: stats?.bio ?? 148,
      icon: User,
      color: "text-violet-400 border-violet-500/10 bg-violet-500/[0.02]"
    },
    {
      key: "hook",
      label: "ATTENTION HOOKS COMPILED",
      value: stats?.hook ?? 342,
      icon: Radio,
      color: "text-indigo-400 border-indigo-500/10 bg-indigo-500/[0.02]"
    },
    {
      key: "caption",
      label: "NARRATIVES GENERATED",
      value: stats?.caption ?? 219,
      icon: FileText,
      color: "text-pink-400 border-pink-500/10 bg-pink-500/[0.02]"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header telemetry info */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] font-mono font-bold text-violet-400 uppercase tracking-[0.25em] bg-violet-500/5 border border-violet-500/10 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto animate-pulse">
            <Activity className="h-3 w-3" /> LIVE SYSTEM METRICS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-3 tracking-tight font-display">
            Real-Time Engine Production
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm font-sans font-medium leading-relaxed">
            Telemetry reports detailing the total number of successful social coordinates compiled by our core algorithms.
          </p>
        </div>

        {/* 3-Column Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsConfig.map((stat, idx) => (
            <Tilt
              key={stat.key}
              glareEnable={true}
              glareMaxOpacity={0.06}
              glareColor="#ffffff"
              glarePosition="all"
              tiltMaxAngleX={4}
              tiltMaxAngleY={4}
              className="rounded-3xl"
            >
              <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] p-8 transition-all duration-300 flex flex-col justify-between h-48 bento-card">
                {/* Visual glow backdrop */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-violet-600/5 group-hover:bg-violet-600/10 rounded-full blur-xl transition-all duration-500"></div>

                <div className="flex justify-between items-start">
                  <div className={`p-2.5 rounded-xl border ${stat.color}`}>
                    <stat.icon className="h-4.5 w-4.5" />
                  </div>
                  <span className="font-mono text-[9px] text-zinc-600">NODE_0{idx + 1}</span>
                </div>

                {loading ? (
                  // Loading skeleton
                  <div className="space-y-3">
                    <div className="h-8 bg-white/5 animate-pulse rounded w-1/2"></div>
                    <div className="h-3 bg-white/5 animate-pulse rounded w-2/3"></div>
                  </div>
                ) : (
                  // Stats number
                  <div>
                    <h3 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-1.5">
                      <AnimateNumber value={stat.value} />
                    </h3>
                    <p className="text-[9px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                      {stat.label}
                    </p>
                  </div>
                )}
              </div>
            </Tilt>
          ))}
        </div>

      </div>
    </section>
  );
}
