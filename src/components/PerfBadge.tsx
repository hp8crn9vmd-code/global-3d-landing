"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQualityTier } from "@/lib/useQualityTier";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

export default function PerfBadge() {
  const q = useQualityTier();
  const reducedMotion = useReducedMotion();

  const [fps, setFps] = useState<number>(0);
  const frames = useRef(0);
  const last = useRef(performance.now());

  useEffect(() => {
    let raf = 0;

    const loop = (t: number) => {
      frames.current += 1;
      const dt = t - last.current;

      if (dt >= 500) {
        const currentFps = Math.round((frames.current * 1000) / dt);
        setFps(currentFps);
        frames.current = 0;
        last.current = t;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const tierLabel = useMemo(() => {
    if (q.tier === "high") return "HIGH";
    if (q.tier === "mid") return "MID";
    return "LOW";
  }, [q.tier]);

  return (
    <div className="pointer-events-none absolute left-4 top-4 z-30">
      <div className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-[11px] text-white/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            <span className="tracking-[0.22em]">RUNTIME</span>
          </span>
          <span className="text-white/30">•</span>
          <span className="font-semibold text-white/85">{fps} FPS</span>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] tracking-[0.18em]">
            {tierLabel} TIER
          </span>
          <span className="text-white/30">•</span>
          <span className="text-[10px] text-white/60">
            Motion: {reducedMotion ? "Reduced" : "Normal"}
          </span>
        </div>
      </div>
    </div>
  );
}
