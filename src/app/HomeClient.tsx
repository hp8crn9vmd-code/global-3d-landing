"use client";
import PixiHUD from "@/components/PixiHUD";
import PerfBadge from "@/components/PerfBadge";

import dynamic from "next/dynamic";
import { COPY } from "@/content/copy";

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
            <span className="text-sm font-medium tracking-wide">{COPY.brand.name}</span>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a className="hover:text-white" href="#nexus">Nexus</a>
            <a className="hover:text-white" href="#orbital">Orbital</a>
            <a className="hover:text-white" href="#contact">Contact</a>
          </nav>

          <a
            href="#contact"
            className="btn btn-primary"
          >
            {COPY.contact.primaryCta}
          </a>
        </div>
      </header>
      {/* HERO: AETHER CORE */}
      <section className="relative min-h-[92vh] overflow-hidden border-b border-white/10">
        {/* Subtle grid overlay (enterprise feel) */}
        <div className="pointer-events-none absolute inset-0 hero-grid-overlay" />
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-16">
          <p className="eyebrow">
            {COPY.hero.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
            {COPY.hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
            {COPY.hero.subheadline}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#nexus"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
            >
              {COPY.hero.primaryCta}
            </a>
            <a
              href="#orbital"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/90 transition hover:border-white/40"
            >
              {COPY.hero.secondaryCta}
            </a>
          </div>
        </div>

        {/* 3D Mount Point (Hero) */}
        <div className="absolute inset-0">
          <PixiHUD />
          <div className="absolute inset-0">
          <div className="pointer-events-none absolute inset-0">
          <SceneMount className="h-full w-full">
            <AetherCore />
          </SceneMount>
          
        </div>
        <div className="hidden md:block">
          <PerfBadge />
        </div>
        </div>
        </div>
      </section>

      
      {/* OUTCOMES + SOCIAL PROOF */}
      <section className="relative border-b border-white/10">
        <div className="container-enterprise section-pad">
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            {/* Outcomes */}
            <div>
              <p className="eyebrow">OUTCOMES</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                {COPY.outcomes.title}
              </h2>

              <div className="mt-8 grid gap-4">
                {COPY.outcomes.items.map((it) => (
                  <div key={it.title} className="card card-pad">
                    <p className="text-base font-semibold">{it.title}</p>
                    <p className="mt-2 text-sm text-white/70 leading-6">{it.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social proof */}
            <div className="card-soft card-pad">
              <p className="eyebrow">{COPY.socialProof.eyebrow}</p>
              <div className="mt-4 grid gap-4">
                {COPY.socialProof.metrics.map((m) => (
                  <div key={m.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                    <p className="text-sm text-white/70">{m.label}</p>
                    <p className="text-sm font-semibold">{m.value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-white/60 leading-6">
                {COPY.socialProof.note}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#nexus"
                  className="btn btn-primary"
                >
                  {COPY.hero.primaryCta}
                </a>
                <a
                  href="#orbital"
                  className="btn btn-secondary"
                >
                  {COPY.hero.secondaryCta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* SECTION 2: NEXUS ENGINE */}
      <section id="nexus" className="relative overflow-hidden border-b border-white/10">
        <div className="container-enterprise section-pad">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="eyebrow">{COPY.nexus.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{COPY.nexus.title}</h2>
              <p className="mt-4 text-white/70 leading-7">
                {COPY.nexus.body}
              </p>
            </div>

            {/* 3D Mount Point (Nexus) */}
            <div className="relative h-[380px] rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              <LazyScene className="absolute inset-0">
                <SceneMount className="absolute inset-0">
                  <NexusEngine />
                </SceneMount>
              </LazyScene>
            </div>
          </div>
        </div>
      </section>


      {/* {COPY.libraries.eyebrow} */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="container-enterprise section-pad">
          <div className="flex flex-col gap-10">
            <div>
              <p className="eyebrow">{COPY.libraries.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                {COPY.libraries.title}
              </h2>
              <p className="mt-4 max-w-3xl text-white/70 leading-7">
                {COPY.libraries.body}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* 3D */}
              <div className="card card-pad">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{COPY.libraries.threeD.title}</h3>
                  <span className="chip">
                    {COPY.libraries.threeD.chips.join(" • ")}
                  </span>
                </div>

                <div className="mt-6 grid gap-4">
                  <div className="card-soft card-pad">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{COPY.libraries.threeD.cards[0].name}</p>
                      <span className="text-xs text-white/60">Core renderer</span>
                    </div>
                    <p className="mt-2 text-sm text-white/70 leading-6">
                      {COPY.libraries.threeD.cards[0].note}
                    </p>
                  </div>

                  <div className="card-soft card-pad">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{COPY.libraries.threeD.cards[1].name}</p>
                      <span className="text-xs text-white/60">Declarative scene graph</span>
                    </div>
                    <p className="mt-2 text-sm text-white/70 leading-6">
                      {COPY.libraries.threeD.cards[1].note}
                    </p>
                  </div>

                  <div className="card-soft card-pad">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{COPY.libraries.threeD.cards[2].name}</p>
                      <span className="text-xs text-white/60">Production helpers</span>
                    </div>
                    <p className="mt-2 text-sm text-white/70 leading-6">
                      {COPY.libraries.threeD.cards[2].note}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 text-xs text-white/60">
                    {COPY.libraries.twoD.tags.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>

                  <div className="pt-3">
                    <a
                      href="#nexus"
                      className="btn btn-primary"
                    >
                      See product realism (Nexus)
                    </a>
                  </div>
                </div>
              </div>

              {/* 2D */}
              <div className="card card-pad">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{COPY.libraries.twoD.title}</h3>
                  <span className="chip">
                    {COPY.libraries.twoD.chips.join(" • ")}
                  </span>
                </div>

                <div className="mt-6 grid gap-4">
                  <div className="card-soft card-pad">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{COPY.libraries.twoD.cards[0].name}</p>
                      <span className="text-xs text-white/60">2D WebGL renderer</span>
                    </div>
                    <p className="mt-2 text-sm text-white/70 leading-6">
                      {COPY.libraries.twoD.cards[0].note}
                    </p>
                  </div>

                  <div className="card-soft card-pad">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{COPY.libraries.twoD.cards[1].name}</p>
                      <span className="text-xs text-white/60">2D game framework</span>
                    </div>
                    <p className="mt-2 text-sm text-white/70 leading-6">
                      {COPY.libraries.twoD.cards[1].note}
                    </p>
                  </div>

                  <div className="card-soft card-pad">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{COPY.libraries.twoD.cards[2].name}</p>
                      <span className="text-xs text-white/60">Native drawing</span>
                    </div>
                    <p className="mt-2 text-sm text-white/70 leading-6">
                      {COPY.libraries.twoD.cards[2].note}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 text-xs text-white/60">
                    {COPY.libraries.threeD.tags.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>

                  <div className="pt-3">
                    <a
                      href="#orbital"
                      className="btn btn-secondary"
                    >
                      See architectural depth (Orbital)
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical proof line */}
            <div className="card-soft card-pad">
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
        <div className="container-enterprise section-pad">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            {/* 3D Mount Point (Orbital) */}
            <div className="order-2 relative h-[420px] rounded-2xl border border-white/10 bg-white/5 overflow-hidden md:order-1">
              <LazyScene className="absolute inset-0">
                <SceneMount className="absolute inset-0">
                  <OrbitalChamber />
                </SceneMount>
              </LazyScene>
            </div>

            <div className="order-1 md:order-2">
              <p className="eyebrow">{COPY.orbital.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{COPY.orbital.title}</h2>
              <p className="mt-4 text-white/70 leading-7">
                {COPY.orbital.body}
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/70">
                <span className="rounded-full border border-white/15 px-4 py-2">Performance-first</span>
                <span className="rounded-full border border-white/15 px-4 py-2">Lazy-loaded scenes</span>
                <span className="rounded-full border border-white/15 px-4 py-2">Global typography</span>
              </div>
            </div>
          </div>

          
      {/* TECHNICAL DECISIONS */}
      <section className="relative border-t border-white/10">
        <div className="container-enterprise section-pad">
          <p className="eyebrow">{COPY.technical.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{COPY.technical.title}</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {COPY.technical.bullets.map((b, i) => (
              <div key={i} className="card card-pad">
                <p className="text-sm text-white/70 leading-6">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

<div id="contact" className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-semibold">{COPY.contact.title}</h3>
            <p className="mt-3 max-w-2xl text-white/70 leading-7">
              {COPY.contact.body}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:opacity-90" href="#nexus">{COPY.contact.secondaryCta}</a>
              <a className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/90 hover:border-white/40" href="#orbital">View chamber</a>
            </div>
          </div>

          <footer className="mt-10 border-t border-white/10 pt-8 text-sm text-white/50">
            © {new Date().getFullYear()} {COPY.brand.name.replace('•',' ')}. All rights reserved.
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