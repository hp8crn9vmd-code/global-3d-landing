"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useQualityTier } from "@/lib/useQualityTier";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function SceneCanvasContent({ children }: { children: React.ReactNode }) {
  // ✅ Any R3F hooks must live inside <Canvas> (children scenes do that)
  return <>{children}</>;
}

export default function SceneMount({ children, className }: Props) {
  const q = useQualityTier();

    const dpr: [number, number] =
    q.tier === "high" ? [1, 2] :
    q.tier === "mid"  ? [1, 1.5] :
                      [1, 1];

  return (
    <div className={className}>
      <Canvas
        dpr={dpr}
        shadows={q.tier !== "low"}
        frameloop={q.tier === "low" ? "demand" : "always"}
        gl={{ antialias: q.tier !== "low", alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 5], fov: 42 }}
      >
        <Suspense fallback={null}>
          <SceneCanvasContent>{children}</SceneCanvasContent>
        </Suspense>
      </Canvas>
    </div>
  );
}
