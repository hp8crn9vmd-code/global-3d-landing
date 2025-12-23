"use client";

import dynamic from "next/dynamic";

const SceneMount = dynamic(() => import("@/components/SceneMount"), { ssr: false });
const LazyScene = dynamic(() => import("@/components/LazyScene"), { ssr: false });

const AetherCore = dynamic(() => import("@/components/scenes/AetherCore"), { ssr: false });
const NexusEngine = dynamic(() => import("@/components/scenes/NexusEngine"), { ssr: false });
const OrbitalChamber = dynamic(() => import("@/components/scenes/OrbitalChamber"), { ssr: false });

export default function HomeClient() {
  return (
<main className="min-h-screen bg-black text-white">

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-white/90" />
            <span className="text-sm font-medium tracking-wide">GLOBAL•3D</span>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a className="hover:text-white" href="#nexus">Nexus</a>
            <a className="hover:text-white" href="#orbital">Orbital</a>
            <a className="hover:text-white" href="#contact">Contact</a>
          </nav>

          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:opacity-90"
          >
            Request a demo
          </a>
        </div>
      </header>
      {/* HERO: AETHER CORE */}
      <section className="relative min-h-[92vh] overflow-hidden border-b border-white/10">
        {/* Subtle grid overlay (enterprise feel) */}
        <div className="pointer-events-none absolute inset-0 hero-grid-overlay" />
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-16">
          <p className="text-xs tracking-[0.28em] text-white/70">
            GLOBAL 3D LANDING • ENGINEERED DESIGN
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
            A single-page 3D experience built for global brands.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
            Three distinct 3D narratives — AETHER CORE, NEXUS ENGINE, ORBITAL CHAMBER —
            unified in one precise, performance-first landing.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#nexus"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
            >
              Explore the 3D system
            </a>
            <a
              href="#orbital"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/90 transition hover:border-white/40"
            >
              See architecture
            </a>
          </div>
        </div>

        {/* 3D Mount Point (Hero) */}
        <div className="pointer-events-none absolute inset-0">
          <SceneMount className="h-full w-full">
            <AetherCore />
          </SceneMount>
        </div>
      </section>

      {/* SECTION 2: NEXUS ENGINE */}
      <section id="nexus" className="relative overflow-hidden border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs tracking-[0.28em] text-white/70">SECTION 02</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">NEXUS ENGINE</h2>
              <p className="mt-4 text-white/70 leading-7">
                Product-like geometry, disciplined lighting, and subtle interaction —
                engineered to communicate strength and reliability.
              </p>
            </div>

            {/* 3D Mount Point (Nexus) */}
            <div className="relative h-[380px] rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              <LazyScene className="absolute inset-0">
                <NexusEngine />
              </LazyScene>
            </div>
          </div>
        </div>
      </section>


      {/* LIBRARIES STACK */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-xs tracking-[0.28em] text-white/70">LIBRARIES STACK</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                Modern 2D + 3D libraries, reflected in real UI & real rendering.
              </h2>
              <p className="mt-4 max-w-3xl text-white/70 leading-7">
                This landing is not a “list of tools”. It demonstrates practical rendering decisions:
                lighting, materials, color management, lazy scene mounting, and performance discipline.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* 3D */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">3D Stack</h3>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                    WebGL • PBR • Tone Mapping
                  </span>
                </div>

                <div className="mt-6 grid gap-4">
                  <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Three.js</p>
                      <span className="text-xs text-white/60">Core renderer</span>
                    </div>
                    <p className="mt-2 text-sm text-white/70 leading-6">
                      Low-level control over cameras, lights, materials, and render pipeline.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">React Three Fiber</p>
                      <span className="text-xs text-white/60">Declarative scene graph</span>
                    </div>
                    <p className="mt-2 text-sm text-white/70 leading-6">
                      React-first workflow for reliable composition, state-driven scenes, and maintainability.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">@react-three/drei</p>
                      <span className="text-xs text-white/60">Production helpers</span>
                    </div>
                    <p className="mt-2 text-sm text-white/70 leading-6">
                      Environment lighting, shadows, materials, and utilities used for real-world polish.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 text-xs text-white/60">
                    <span className="rounded-full border border-white/10 px-3 py-1">ACES tone mapping</span>
                    <span className="rounded-full border border-white/10 px-3 py-1">sRGB output</span>
                    <span className="rounded-full border border-white/10 px-3 py-1">Lazy-mount scenes</span>
                    <span className="rounded-full border border-white/10 px-3 py-1">Soft shadows</span>
                  </div>

                  <div className="pt-3">
                    <a
                      href="#nexus"
                      className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:opacity-90"
                    >
                      See product realism (Nexus)
                    </a>
                  </div>
                </div>
              </div>

              {/* 2D */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">2D Stack</h3>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                    Canvas • WebGL • Motion UI
                  </span>
                </div>

                <div className="mt-6 grid gap-4">
                  <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">PixiJS</p>
                      <span className="text-xs text-white/60">2D WebGL renderer</span>
                    </div>
                    <p className="mt-2 text-sm text-white/70 leading-6">
                      High-performance 2D rendering for interactive UI overlays, particles, and effects.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Phaser</p>
                      <span className="text-xs text-white/60">2D game framework</span>
                    </div>
                    <p className="mt-2 text-sm text-white/70 leading-6">
                      Scene systems, input, and timing — useful for mini-interactions & gamified sections.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Canvas API</p>
                      <span className="text-xs text-white/60">Native drawing</span>
                    </div>
                    <p className="mt-2 text-sm text-white/70 leading-6">
                      Lightweight 2D primitives for charts, HUD layers, and controlled micro-animations.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 text-xs text-white/60">
                    <span className="rounded-full border border-white/10 px-3 py-1">HUD overlays</span>
                    <span className="rounded-full border border-white/10 px-3 py-1">Particles</span>
                    <span className="rounded-full border border-white/10 px-3 py-1">Interactive states</span>
                    <span className="rounded-full border border-white/10 px-3 py-1">Low CPU cost</span>
                  </div>

                  <div className="pt-3">
                    <a
                      href="#orbital"
                      className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white/90 transition hover:border-white/40"
                    >
                      See architectural depth (Orbital)
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical proof line */}
            <div className="rounded-2xl border border-white/10 bg-black/30 p-7">
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <p className="text-sm font-medium">Proof of craft</p>
                  <p className="mt-2 text-sm text-white/70 leading-6">
                    Real-time lighting choices, material discipline, and proper color management.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Performance-first</p>
                  <p className="mt-2 text-sm text-white/70 leading-6">
                    Scenes mount only when visible. No heavy assets or wasteful render loops.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Production-ready</p>
                  <p className="mt-2 text-sm text-white/70 leading-6">
                    Static export, GitHub Pages-ready, predictable routing, and clean repository hygiene.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ORBITAL CHAMBER */}
      <section id="orbital" className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            {/* 3D Mount Point (Orbital) */}
            <div className="order-2 relative h-[420px] rounded-2xl border border-white/10 bg-white/5 overflow-hidden md:order-1">
              <LazyScene className="absolute inset-0">
                <OrbitalChamber />
              </LazyScene>
            </div>

            <div className="order-1 md:order-2">
              <p className="text-xs tracking-[0.28em] text-white/70">SECTION 03</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">ORBITAL CHAMBER</h2>
              <p className="mt-4 text-white/70 leading-7">
                Spatial composition with cinematic restraint — architectural depth that
                signals enterprise-grade design.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/70">
                <span className="rounded-full border border-white/15 px-4 py-2">Performance-first</span>
                <span className="rounded-full border border-white/15 px-4 py-2">Lazy-loaded scenes</span>
                <span className="rounded-full border border-white/15 px-4 py-2">Global typography</span>
              </div>
            </div>
          </div>

          <div id="contact" className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-semibold">Contact</h3>
            <p className="mt-3 max-w-2xl text-white/70 leading-7">
              A global-grade 3D landing, built with discipline: performance, clarity, and craft.
              Replace this block with your real form or endpoint.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:opacity-90" href="#nexus">View sections</a>
              <a className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/90 hover:border-white/40" href="#orbital">View chamber</a>
            </div>
          </div>

          <footer className="mt-10 border-t border-white/10 pt-8 text-sm text-white/50">
            © {new Date().getFullYear()} Global 3D Landing. All rights reserved.
          </footer>
        </div>
      </section>
    
      <style>{`
        /* hero-grid-overlay */
        .hero-grid-overlay {
          background-image:
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 64px 64px;
          opacity: 0.08;
          mask-image: radial-gradient(60% 55% at 50% 35%, black 35%, transparent 70%);
          -webkit-mask-image: radial-gradient(60% 55% at 50% 35%, black 35%, transparent 70%);
        }
      `}</style>
    </main>
  
  );
}
