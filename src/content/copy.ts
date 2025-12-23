export const COPY = {
  brand: {
    name: "GLOBAL•3D",
    tagline: "Cinematic 3D. Enterprise discipline.",
  },

  hero: {
    eyebrow: "GLOBAL 3D LANDING • ENGINEERED DESIGN",
    headline: "A single-page 3D experience built for global brands.",
    subheadline:
      "Not a demo. A production-ready landing that proves craft: lighting, materials, color management, lazy-mounted scenes, and performance discipline.",
    primaryCta: "Explore the system",
    secondaryCta: "See architecture",
  },

  outcomes: {
    title: "Designed to convert — engineered to perform.",
    items: [
      {
        title: "Cinematic quality, real constraints",
        body: "ACES tone mapping, correct color space, soft shadows, and controlled lighting — without wasting GPU budget.",
      },
      {
        title: "Performance-first by default",
        body: "Scenes mount only when visible. Stable layout, minimal overdraw, and a clean render pipeline.",
      },
      {
        title: "Maintainable and shippable",
        body: "Clear structure, predictable routing, static export, and GitHub Pages-ready deployment practices.",
      },
    ],
  },

  socialProof: {
    eyebrow: "TRUST SIGNALS",
    metrics: [
      { label: "Lazy-mounted 3D scenes", value: "3" },
      { label: "Static export deployment", value: "100%" },
      { label: "Color-managed pipeline", value: "ACES / sRGB" },
    ],
    note:
      "Replace metrics with real numbers (clients, uptime, Lighthouse scores) when available.",
  },

  nexus: {
    eyebrow: "SECTION 02",
    title: "NEXUS ENGINE",
    body:
      "Product-like geometry with studio reflections and restrained motion — built to communicate strength, reliability, and engineering discipline.",
  },

  libraries: {
    eyebrow: "LIBRARIES STACK",
    title: "Modern 2D + 3D libraries, reflected in real UI & real rendering.",
    body:
      "This page is a practical proof, not a tool list: rendering decisions are visible in lighting, materials, color management, and lazy scene mounting.",
    threeD: {
      title: "3D Stack",
      chips: ["WebGL", "PBR", "Tone Mapping"],
      cards: [
        { name: "Three.js", note: "Core renderer — cameras, lights, materials, pipeline." },
        { name: "React Three Fiber", note: "Declarative scene graph — maintainable composition." },
        { name: "@react-three/drei", note: "Production helpers — env lighting, shadows, utilities." },
      ],
      tags: ["ACES tone mapping", "sRGB output", "Lazy-mount scenes", "Soft shadows"],
      cta: "See product realism (Nexus)",
    },
    twoD: {
      title: "2D Stack",
      chips: ["Canvas", "WebGL", "Motion UI"],
      cards: [
        { name: "PixiJS", note: "High-performance 2D WebGL renderer — overlays & effects." },
        { name: "Phaser", note: "Scenes/input/timing — useful for interactive sections." },
        { name: "Canvas API", note: "Lightweight primitives — charts, HUD, micro-animations." },
      ],
      tags: ["HUD overlays", "Particles", "Interactive states", "Low CPU cost"],
      cta: "See architectural depth (Orbital)",
    },
  },

  orbital: {
    eyebrow: "SECTION 03",
    title: "ORBITAL CHAMBER",
    body:
      "Architectural depth with cinematic restraint — subtle camera choreography and spatial composition that reads enterprise-grade.",
  },

  technical: {
    eyebrow: "TECHNICAL DECISIONS",
    title: "Why this implementation is production-grade",
    bullets: [
      "Color management (sRGB) + ACES tone mapping for consistent, cinematic output across devices.",
      "Lazy-mounted 3D scenes to protect performance budgets and avoid unnecessary GPU work.",
      "GitHub Pages-ready static export (.nojekyll + basePath) to prevent broken assets in real deployments.",
    ],
  },

  contact: {
    title: "Contact",
    body:
      "A global-grade 3D landing, built with discipline: performance, clarity, and craft. Replace this block with your real form or endpoint.",
    primaryCta: "Request a demo",
    secondaryCta: "View sections",
  },

  footer: {
    copyright: "© {year} Global 3D Landing. All rights reserved.",
  },
} as const;
