"use client";

import { Environment } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Mesh } from "three";

function Chamber() {
  const floor = useRef<Mesh>(null);
  const ring = useRef<Mesh>(null);
  const pillars = useMemo(() => {
    // Four pillars, minimalist architecture
    return [
      [-1.6, 0.6, -0.8],
      [ 1.6, 0.6, -0.8],
      [-1.6, 0.6,  0.8],
      [ 1.6, 0.6,  0.8],
    ] as const;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (ring.current) ring.current.rotation.y = t * 0.12;
    if (floor.current) floor.current.rotation.z += delta * 0.01; // almost imperceptible
  });

  return (
    <group position={[0, -0.35, 0]}>
      {/* Floor */}
      <mesh ref={floor} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.2, 96]} />
        <meshStandardMaterial color="#0f0f10" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Central platform */}
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.25, 0.12, 64]} />
        <meshStandardMaterial color="#141416" roughness={0.4} metalness={0.65} />
      </mesh>

      {/* Orbital ring */}
      <mesh ref={ring} position={[0, 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.15, 0.04, 28, 180]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.2} emissive="#0d0d0d" />
      </mesh>

      {/* Pillars */}
      {pillars.map((p, i) => (
        <mesh key={i} position={p} castShadow receiveShadow>
          <boxGeometry args={[0.14, 1.25, 0.14]} />
          <meshStandardMaterial color="#0b0b0c" roughness={0.55} metalness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

export default function OrbitalChamber() {
  const { camera } = useThree();

  // Gentle, cinematic camera drift (not flashy)
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.15) * 0.35;
    camera.position.y = 0.35 + Math.sin(t * 0.12) * 0.08;
    camera.position.z = 4.7;
    camera.lookAt(0, 0.2, 0);
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={1.15} castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={0.25} />
      <pointLight position={[0, 1.4, 1.4]} intensity={0.4} />

      <Environment preset="city" />

      <Chamber />
    </>
  );
}
