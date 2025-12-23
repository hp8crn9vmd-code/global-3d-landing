"use client";

import { ContactShadows } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function Engine() {
  const g = useRef<Group>(null);
  const ring = useRef<Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (g.current) g.current.rotation.y = t * 0.22;
    if (ring.current) ring.current.rotation.z -= delta * 0.18;
  });

  return (
    <group ref={g} position={[0, -0.05, 0]}>
      {/* Base body */}
      <mesh castShadow receiveShadow>
        <roundedBoxGeometry args={[2.2, 0.65, 1.25, 6, 0.14]} />
        <meshStandardMaterial color="#0f0f10" roughness={0.35} metalness={0.75} />
      </mesh>

      {/* Top plate */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <roundedBoxGeometry args={[1.85, 0.18, 0.95, 6, 0.12]} />
        <meshStandardMaterial color="#151518" roughness={0.25} metalness={0.85} />
      </mesh>

      {/* Accent ring */}
      <mesh ref={ring} position={[0, 0.48, 0]}>
        <torusGeometry args={[0.42, 0.05, 24, 120]} />
        <meshStandardMaterial color="#ffffff" roughness={0.35} metalness={0.15} emissive="#101010" />
      </mesh>

      {/* Core pin */}
      <mesh position={[0, 0.48, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.28, 24]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.4} />
      </mesh>
    </group>
  );
}

export default function NexusEngine() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 3]} intensity={1.25} castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={0.35} />
      <pointLight position={[0, 1.2, 1.2]} intensity={0.5} />

      <Engine />

      <ContactShadows
        position={[0, -0.65, 0]}
        opacity={0.35}
        scale={6}
        blur={2.6}
        far={3}
      />
    </>
  );
}
