"use client";

import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh, Group } from "three";

function Core() {
  const group = useRef<Group>(null);
  const shell = useRef<Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (group.current) group.current.rotation.y = t * 0.18;
    if (shell.current) shell.current.rotation.x += delta * 0.08;
  });

  return (
    <group ref={group} position={[0, 0.1, 0]}>
      <Float speed={1.15} rotationIntensity={0.6} floatIntensity={0.8}>
        {/* Inner core */}
        <mesh>
          <icosahedronGeometry args={[0.95, 3]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.2}
            metalness={0.85}
            emissive="#0a0a0a"
          />
        </mesh>

        {/* Glass shell */}
        <mesh ref={shell} scale={1.25}>
          <icosahedronGeometry args={[1.0, 2]} />
          <MeshTransmissionMaterial
            thickness={0.6}
            roughness={0.15}
            transmission={1}
            ior={1.4}
            chromaticAberration={0.03}
            anisotropy={0.2}
            distortion={0.15}
            distortionScale={0.25}
            temporalDistortion={0.06}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function AetherCore() {
  return (
    <>
      {/* Lighting: disciplined, premium */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 5, 2]} intensity={1.2} />
      <directionalLight position={[-4, -2, -2]} intensity={0.35} />

      {/* Back plate glow (subtle) */}
      <mesh position={[0, 0, -3.5]}>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial color="#0b0b0b" roughness={1} metalness={0} />
      </mesh>

      <Core />
    </>
  );
}
