"use client";

import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";
import * as THREE from "three";

type Props = {
  children: ReactNode;
  className?: string;
  frameloop?: "always" | "demand";
};

export default function SceneMount({ children, className, frameloop = "always" }: Props) {
  return (
    <div className={className}>
      <Canvas
        shadows
        frameloop={frameloop}
        dpr={[1, 1.75]}
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
          gl.toneMappingExposure = 1.05;

          // Cleaner shadows
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        {children}
      </Canvas>
    </div>
  );
}
