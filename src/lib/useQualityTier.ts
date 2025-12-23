"use client";

import { useEffect, useMemo, useState } from "react";

export type QualityTier = "low" | "mid" | "high";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function computeTierClient(): { tier: QualityTier; reason: string } {
  const nav: any = window.navigator;

  const cores = typeof nav?.hardwareConcurrency === "number" ? nav.hardwareConcurrency : 4;
  const mem = typeof nav?.deviceMemory === "number" ? nav.deviceMemory : 4;
  const dpr = typeof window.devicePixelRatio === "number" ? window.devicePixelRatio : 1;
  const reducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  // Heuristics (stable + conservative)
  // Low: reduced motion OR very low memory/cores OR very high DPR on constrained devices
  if (reducedMotion) return { tier: "low", reason: "prefers-reduced-motion" };
  if (mem <= 2 || cores <= 2) return { tier: "low", reason: "low device memory/cores" };
  if (mem <= 4 && cores <= 4 && dpr >= 2) return { tier: "mid", reason: "balanced constraints" };

  // Mid: typical laptops/phones
  if (mem <= 6 || cores <= 6) return { tier: "mid", reason: "mid device" };

  // High: strong devices
  return { tier: "high", reason: "high device" };
}

export function useQualityTier() {
  // ✅ SSR-safe default. Will be corrected in useEffect on client.
  const [tier, setTier] = useState<QualityTier>("mid");
  const [reason, setReason] = useState<string>("ssr-default");

  useEffect(() => {
    // ✅ window is available here
    const res = computeTierClient();
    setTier(res.tier);
    setReason(res.reason);

    // Update on resize / DPR changes (roughly)
    let raf = 0;
    const onResize = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const r = computeTierClient();
        setTier(r.tier);
        setReason(r.reason);
      });
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return useMemo(() => ({ tier, reason }), [tier, reason]);
}
