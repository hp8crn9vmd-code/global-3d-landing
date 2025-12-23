"use client";

import dynamic from "next/dynamic";

const ThreeCanvas = dynamic(() => import("./ThreeCanvas"), {
  ssr: false,
  loading: () => (
    <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
      <div style={{ color: "rgba(255,255,255,.60)", fontSize: 13 }}>
        Loading 3D surface…
      </div>
    </div>
  ),
});

export default function ThreeDShowcase() {
  return <ThreeCanvas />;
}
