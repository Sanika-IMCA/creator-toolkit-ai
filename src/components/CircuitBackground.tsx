"use client";

import { useEffect, useMemo, useState } from "react";

interface CircuitBackgroundProps {
  disableOnMobile?: boolean;
}

interface Trace {
  id: number;
  path: string;
  length: number;
  baseColor: string;
  pulseColor: string;
  duration: number;
  delay: number;
  nodes: { x: number; y: number }[];
}

export default function CircuitBackground({ disableOnMobile = false }: CircuitBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);

  // Monitor mobile width and tab visibility
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Generate 22 traces on mount (or desktop size)
  const allTraces = useMemo<Trace[]>(() => {
    const tempTraces: Trace[] = [];
    
    for (let i = 0; i < 22; i++) {
      const xStart = Math.floor(Math.random() * 900) + 50;
      
      // Calculate random heights for turns
      const y1 = Math.floor(Math.random() * 200) + 150; // 150 - 350
      const x1 = Math.min(950, Math.max(50, xStart + (Math.random() * 300 - 150)));
      
      const y2 = Math.floor(Math.random() * 250) + 500; // 500 - 750
      const x2 = Math.min(950, Math.max(50, x1 + (Math.random() * 300 - 150)));
      
      const yEnd = 1000;

      const path = `M ${xStart} 0 V ${y1} H ${x1} V ${y2} H ${x2} V ${yEnd}`;
      
      // Exact mathematical length
      const length = y1 + Math.abs(x1 - xStart) + (y2 - y1) + Math.abs(x2 - x1) + (yEnd - y2);

      // Colors
      const isGreenBase = Math.random() > 0.4;
      const baseColor = isGreenBase ? "rgba(34, 197, 94, 0.08)" : "rgba(255, 255, 255, 0.03)";
      
      const colors = ["#4ADE80", "#FACC15", "#FFFFFF"];
      const pulseColor = colors[Math.floor(Math.random() * colors.length)];
      
      const duration = 3.5 + Math.random() * 2.5; // 3.5s - 6s
      const delay = Math.random() * -6; // 0 to -6s

      // Node coordinates (at turns/ends)
      const nodes = [
        { x: xStart, y: y1 },
        { x: x1, y: y2 }
      ];

      tempTraces.push({
        id: i,
        path,
        length,
        baseColor,
        pulseColor,
        duration,
        delay,
        nodes
      });
    }

    return tempTraces;
  }, []);

  // Filter traces and nodes for mobile optimization
  const activeTraces = useMemo(() => {
    if (isMobile) {
      // slice to 7 traces on mobile
      return allTraces.slice(0, 7);
    }
    return allTraces;
  }, [allTraces, isMobile]);

  if (disableOnMobile && isMobile) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[-1] pointer-events-none overflow-hidden select-none bg-[#030303] ${
        !isTabActive ? "circuit-paused" : ""
      }`}
    >
      <svg
        className="w-full h-full opacity-60"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes circuit-dash {
            from {
              stroke-dashoffset: var(--path-length);
            }
            to {
              stroke-dashoffset: calc(-1 * var(--path-length));
            }
          }
          @keyframes node-pulse {
            0%, 100% {
              opacity: 0.2;
              r: 3px;
            }
            50% {
              opacity: 0.8;
              r: 4.5px;
            }
          }
          .circuit-path-base {
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
          .circuit-path-pulse {
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 45 1000;
            animation: circuit-dash var(--duration) linear infinite;
            animation-delay: var(--delay);
          }
          .circuit-node-dot {
            animation: node-pulse var(--duration) ease-in-out infinite;
            animation-delay: var(--delay);
          }
          @media (prefers-reduced-motion: reduce) {
            .circuit-path-pulse {
              animation: none !important;
              stroke-dasharray: none !important;
              opacity: 0.15 !important;
            }
            .circuit-node-dot {
              animation: none !important;
              opacity: 0.4 !important;
              r: 3px !important;
            }
          }
          .circuit-paused .circuit-path-pulse,
          .circuit-paused .circuit-node-dot {
            animation-play-state: paused !important;
          }
        `}} />

        {activeTraces.map((trace) => (
          <g key={trace.id}>
            {/* Faint static trace */}
            <path
              d={trace.path}
              className="circuit-path-base"
              stroke={trace.baseColor}
              strokeWidth={1}
            />
            {/* Glowing moving pulse */}
            <path
              d={trace.path}
              className="circuit-path-pulse"
              stroke={trace.pulseColor}
              strokeWidth={1.5}
              style={{
                // Set inline CSS variables for keyframe offsets
                // @ts-ignore
                "--path-length": trace.length,
                "--duration": `${trace.duration}s`,
                "--delay": `${trace.delay}s`,
              }}
            />
            {/* Pulsing Nodes */}
            {trace.nodes.map((node, nodeIdx) => (
              <g key={nodeIdx}>
                {/* Outer halo */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={8}
                  fill={trace.pulseColor}
                  className="opacity-[0.03] blur-[2px]"
                />
                {/* Core dot */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isMobile ? 3 : 3.5}
                  fill={trace.pulseColor}
                  className={isMobile ? "opacity-40" : "circuit-node-dot"}
                  style={{
                    // @ts-ignore
                    "--duration": `${trace.duration * 0.8}s`,
                    "--delay": `${trace.delay}s`,
                  }}
                />
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
