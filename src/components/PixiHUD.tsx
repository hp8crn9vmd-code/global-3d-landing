"use client";

import { useEffect, useRef } from "react";
import { useQualityTier } from "@/lib/useQualityTier";

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export default function PixiHUD() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const q = useQualityTier();

  useEffect(() => {
    if (q.tier === "low") return; // احترام الأداء
    const host = hostRef.current;
    if (!host) return;

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      try {
        const PIXI: any = await import("pixi.js");
        const Application = PIXI.Application;
        const Graphics = PIXI.Graphics;

        if (!Application || !Graphics) return;

        // --- Create app safely (works across Pixi variants) ---
        let app: any;

        // Pixi v8 style: new Application(); await app.init(...)
        try {
          app = new Application();
          if (typeof app.init === "function") {
            await app.init({
              backgroundAlpha: 0,
              antialias: false,
              autoDensity: true,
              // Avoid resizeTo crashes; we'll resize via ResizeObserver
              width: 1,
              height: 1,
            });
          }
        } catch {
          app = null;
        }

        // Pixi v7/v6 style: new Application(options)
        if (!app || !app.renderer) {
          app = new Application({
            width: 1,
            height: 1,
            backgroundAlpha: 0,
            antialias: false,
            autoDensity: true,
          });
        }

        if (cancelled) {
          try { app.destroy?.(true); } catch {}
          return;
        }

        const canvas =
          app?.canvas ||
          app?.view ||
          app?.renderer?.view ||
          null;

        // If renderer/canvas didn't init (common on iOS WebGL failures), exit gracefully.
        if (!canvas) {
          try { app.destroy?.(true); } catch {}
          return;
        }

        // attach canvas
        host.appendChild(canvas);

        // --- Resize observer (stable on iOS) ---
        const resize = () => {
          const w = Math.max(1, host.clientWidth || 1);
          const h = Math.max(1, host.clientHeight || 1);
          try { app.renderer?.resize?.(w, h); } catch {}
        };

        const ro = new ResizeObserver(() => resize());
        ro.observe(host);
        resize();

        // --- GRID ---
        const grid = new Graphics();
        // SCREEN blend mode numeric (cast avoids TS enum mismatch)
        (grid as any).blendMode = 3;
        const drawGrid = () => {
          grid.clear();
          grid.lineStyle(1, 0xffffff, 0.035);

          const step = 80;
          const w = app.renderer?.width ?? host.clientWidth ?? 1;
          const h = app.renderer?.height ?? host.clientHeight ?? 1;

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

        // --- PARTICLES ---
        const particles: any[] = [];
        for (let i = 0; i < 24; i++) {
          const p = new Graphics();
          p.beginFill(0xffffff, 0.14);
          p.drawCircle(0, 0, Math.random() * 2 + 1);
          p.endFill();
          (p as any).blendMode = 1; // ADD

          (p as any).vx = (Math.random() - 0.5) * 0.3;
          (p as any).vy = (Math.random() - 0.5) * 0.3;

          p.x = Math.random() * (app.renderer?.width ?? 1);
          p.y = Math.random() * (app.renderer?.height ?? 1);

          particles.push(p);
          app.stage.addChild(p);
        }

        // pointer + scroll choreography
        let mx = (app.renderer?.width ?? 1) * 0.5;
        let my = (app.renderer?.height ?? 1) * 0.5;
        let px = mx, py = my;

        const onMove = (e: PointerEvent) => {
          mx = e.clientX;
          my = e.clientY;
        };
        window.addEventListener("pointermove", onMove, { passive: true });

        let scrollStrength = 1;
        let rafId = 0;

        const updateScroll = () => {
          rafId = 0;
          const vh = Math.max(1, window.innerHeight || 1);
          const y = window.scrollY || 0;
          const t = clamp01(y / (vh * 0.9));
          scrollStrength = 1 - t;
        };

        const onScroll = () => {
          if (rafId) return;
          rafId = window.requestAnimationFrame(updateScroll);
        };

        updateScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        // ticker (guarded)
        const tick = () => {
          const r = app.renderer;
          if (!r) return;

          px += (mx - px) * 0.02;
          py += (my - py) * 0.02;

          const s = scrollStrength;
          grid.alpha = 0.9 * s;

          const driftX = (px - r.width / 2) * 0.002;
          const driftY = (py - r.height / 2) * 0.002;
          app.stage.x = driftX;
          app.stage.y = driftY;

          const baseScale = 1 + (1 - s) * 0.01;
          app.stage.scale.set(baseScale);

          for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;

            const dx = px - p.x;
            const dy = py - p.y;
            p.x += dx * 0.000015;
            p.y += dy * 0.000015;

            if (p.x < 0) p.x = r.width;
            if (p.x > r.width) p.x = 0;
            if (p.y < 0) p.y = r.height;
            if (p.y > r.height) p.y = 0;

            p.alpha = 0.95 * Math.max(0, Math.min(1, s * 1.15));
          }
        };

        // Pixi ticker across versions
        if (app.ticker?.add) app.ticker.add(tick);
        else if (app.renderer?.plugins?.ticker?.add) app.renderer.plugins.ticker.add(tick);

        cleanup = () => {
          try { ro.disconnect(); } catch {}
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("scroll", onScroll);
          if (rafId) window.cancelAnimationFrame(rafId);

          try {
            if (canvas && canvas.parentElement === host) host.removeChild(canvas);
          } catch {}

          try { app.destroy?.(true, { children: true }); } catch {
            try { app.destroy?.(true); } catch {}
          }
        };
      } catch (e) {
        // ✅ Fail-safe: never crash the page
        console.warn("PixiHUD disabled due to init failure:", e);
      }
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [q.tier]);

  return <div ref={hostRef} className="pointer-events-none absolute inset-0 z-10" aria-hidden />;
}
