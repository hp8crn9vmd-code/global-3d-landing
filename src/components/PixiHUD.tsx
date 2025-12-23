"use client";

import { useEffect, useRef } from "react";
import { Application, Graphics } from "pixi.js";
import { useQualityTier } from "@/lib/useQualityTier";

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export default function PixiHUD() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);
  const q = useQualityTier();

  useEffect(() => {
    // 🚫 Disable on low-end devices
    if (q.tier === "low") return;
    if (!hostRef.current) return;

    const app = new Application({
      resizeTo: hostRef.current,
      backgroundAlpha: 0,
      antialias: false,
      autoDensity: true,
    });

    appRef.current = app;
    hostRef.current.appendChild(app.view as HTMLCanvasElement);

    // --- GRID (screen blend) ---
    const grid = new Graphics();
    grid.blendMode = 3 as any;

    const drawGrid = () => {
      grid.clear();
      grid.lineStyle(1, 0xffffff, 0.035);

      const step = 80;
      const w = app.renderer.width;
      const h = app.renderer.height;

      for (let x = 0; x < w; x += step) {
        grid.moveTo(x, 0);
        grid.lineTo(x, h);
      }
      for (let y = 0; y < h; y += step) {
        grid.moveTo(0, y);
        grid.lineTo(w, y);
      }
    };

    drawGrid();
    app.stage.addChild(grid);

    // --- PARTICLES (add blend) ---
    const particles: Graphics[] = [];
    for (let i = 0; i < 24; i++) {
      const p = new Graphics();
      p.beginFill(0xffffff, 0.14);
      p.drawCircle(0, 0, Math.random() * 2 + 1);
      p.endFill();
      p.blendMode = 1 as any;

      (p as any).vx = (Math.random() - 0.5) * 0.3;
      (p as any).vy = (Math.random() - 0.5) * 0.3;

      p.x = Math.random() * app.renderer.width;
      p.y = Math.random() * app.renderer.height;

      particles.push(p);
      app.stage.addChild(p);
    }

    // --- Pointer parallax (smooth) ---
    let mx = app.renderer.width * 0.5,
      my = app.renderer.height * 0.5;
    let px = mx,
      py = my;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // --- Scroll choreography (fade + depth) ---
    let scrollStrength = 1; // 1 at top, fades down
    let rafId = 0;

    const updateScroll = () => {
      rafId = 0;
      const vh = Math.max(1, window.innerHeight || 1);
      const y = window.scrollY || 0;

      // Fade out over ~0.9 viewport heights (subtle)
      const t = clamp01(y / (vh * 0.9));
      scrollStrength = 1 - t; // 1 → 0
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // --- Ticker ---
    app.ticker.add(() => {
      // smooth pointer
      px += (mx - px) * 0.02;
      py += (my - py) * 0.02;

      // Fade choreography
      const s = scrollStrength;

      // grid fades first, particles linger a bit (more premium feel)
      grid.alpha = 0.9 * s;

      // subtle depth: stage drifts slightly with scroll/pointer
      const driftX = (px - app.renderer.width / 2) * 0.002;
      const driftY = (py - app.renderer.height / 2) * 0.002;

      app.stage.x = driftX;
      app.stage.y = driftY;

      // tiny scale shift to imply depth (kept safe)
      const baseScale = 1 + (1 - s) * 0.01;
      app.stage.scale.set(baseScale);

      particles.forEach((p: any) => {
        p.x += p.vx;
        p.y += p.vy;

        // subtle attraction to pointer
        const dx = px - p.x;
        const dy = py - p.y;
        p.x += dx * 0.000015;
        p.y += dy * 0.000015;

        // wrap
        if (p.x < 0) p.x = app.renderer.width;
        if (p.x > app.renderer.width) p.x = 0;
        if (p.y < 0) p.y = app.renderer.height;
        if (p.y > app.renderer.height) p.y = 0;

        // particles fade slower than grid
        p.alpha = 0.95 * Math.max(0, Math.min(1, s * 1.15));
      });
    });

    const onResize = () => drawGrid();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId) window.cancelAnimationFrame(rafId);
      app.destroy(true, { children: true });
    };
  }, [q.tier]);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 z-10"
      aria-hidden
    />
  );
}
