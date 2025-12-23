"use client";

import { useEffect, useMemo, useState } from "react";

export type QualityTier = "low" | "mid" | "high";

export function useQualityTier() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(Boolean(mq?.matches));
    updateMotion();
    mq?.addEventListener?.("change", updateMotion);
    return () => mq?.removeEventListener?.("change", updateMotion);
  }, []);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth || 1024;
      setIsMobile(w < 768);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const tier = useMemo<QualityTier>(() => {
    // Conservative: mobile OR reduced motion => low
    if (reducedMotion || isMobile) return "low";

    const dpr = window.devicePixelRatio || 1;
    if (dpr >= 2) return "high";
    return "mid";
  }, [reducedMotion, isMobile]);

  const settings = useMemo(() => {
    if (tier === "low") {
      return { tier, dpr: 1, frameloop: "demand" as const, shadows: false };
    }
    if (tier === "mid") {
      return { tier, dpr: 1.5, frameloop: "always" as const, shadows: true };
    }
    return { tier, dpr: 1.75, frameloop: "always" as const, shadows: true };
  }, [tier]);

  return { ...settings, reducedMotion, isMobile };
}
