
"use client";

import { ContactShadows, Environment, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function Engine() {
  const g = useRef<Group>(null);
  const ring = useRef<Mesh>(null);
  const glow = useRef<Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (g.current) g.current.rotation.y = t * 0.22;
    if (ring.current) ring.current.rotation.z -= delta * 0.18;

    if (glow.current) {
      glow.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.01);
      const mat = glow.current.material as any;
      if (mat) mat.emissiveIntensity = 0.35 + (Math.sin(t * 1.2) * 0.08);
    }
  });

  return (
    <group ref={g} position={[0, -0.05, 0]}>
      <RoundedBox args={[2.25, 0.66, 1.28]} radius={0.16} smoothness={8} castShadow receiveShadow>
        <meshStandardMaterial color="#0b0b0c" roughness={0.28} metalness={0.78} envMapIntensity={1.0} />
      </RoundedBox>

      <RoundedBox
        args={[1.9, 0.18, 0.98]}
        radius={0.14}
        smoothness={10}
        position={[0, 0.43, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#141416" roughness={0.22} metalness={0.9} envMapIntensity={1.1} />
      </RoundedBox>

      <mesh ref={ring} position={[0, 0.49, 0]} castShadow>
        <torusGeometry args={[0.46, 0.045, 28, 160]} />
        <meshStandardMaterial color="#eaeaea" roughness={0.35} metalness={0.15} emissive="#101010" />
      </mesh>

      <mesh position={[0, 0.49, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.30, 28]} />
        <meshStandardMaterial color="#f2f2f2" roughness={0.18} metalness={0.45} />
      </mesh>

      <mesh ref={glow} position={[0, 0.52, 0]}>
        <circleGeometry args={[0.18, 48]} />
        <meshStandardMaterial color="#111111" emissive="#ffffff" emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}

export default function NexusEngine() {
  return (
    <>
      <Environment preset="warehouse" />
      <ambientLight intensity={0.22} />
      <directionalLight position={[5, 6, 3]} intensity={1.25} castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={0.25} />
      <pointLight position={[0.8, 1.1, 1.2]} intensity={0.45} />
      <Engine />
      <ContactShadows position={[0, -0.68, 0]} opacity={0.35} scale={6} blur={2.8} far={3} />
    </>
  );
}
