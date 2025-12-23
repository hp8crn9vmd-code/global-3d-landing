"use client";

import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";

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
      >
        {children}
      </Canvas>
    </div>
  );
}
