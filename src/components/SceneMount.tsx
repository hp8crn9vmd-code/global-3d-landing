"use client";

import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";
import * as THREE from "three";
import { useQualityTier } from "@/lib/useQualityTier";

type Props = {
  children: ReactNode;
  className?: string;
  frameloop?: "always" | "demand";
};

export default function SceneMount({ children, className, frameloop }: Props) {
  const q = useQualityTier();

  const effectiveFrameLoop = frameloop ?? (q.tier === "low" ? "demand" : "always");
  const effectiveDpr = q.dpr;

  // Conservative exposure on low tier to reduce harsh highlights
  const exposure = q.tier === "high" ? 1.05 : q.tier === "mid" ? 1.0 : 0.95;

  return (
    <div className={className}>
      <Canvas
        shadows={q.shadows}
        frameloop={effectiveFrameLoop}
        dpr={effectiveDpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        camera={{ position: [0, 0.2, 5], fov: 45, near: 0.1, far: 100 }}
        onCreated={({ gl }) => {
          // Professional color management
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = exposure;

          // Cleaner shadows (only if enabled)
          gl.shadowMap.enabled = q.shadows;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        {children}
      </Canvas>
    </div>
  );
}
