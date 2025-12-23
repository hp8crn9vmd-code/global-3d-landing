"use client";

import { Environment } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Mesh } from "three";
import { Fog } from "three";

function Chamber() {
  const ring = useRef<Mesh>(null);

  const pillars = useMemo(() => {
    return [
      [-1.7, 0.62, -0.9],
      [ 1.7, 0.62, -0.9],
      [-1.7, 0.62,  0.9],
      [ 1.7, 0.62,  0.9],
    ] as const;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring.current) ring.current.rotation.y = t * 0.12;
  });

  return (
    <group position={[0, -0.35, 0]}>
      {/* Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.3, 120]} />
        <meshStandardMaterial color="#09090a" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Central platform */}
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.22, 1.28, 0.12, 96]} />
        <meshStandardMaterial color="#131315" roughness={0.35} metalness={0.7} envMapIntensity={0.9} />
      </mesh>

      {/* Orbital ring */}
      <mesh ref={ring} position={[0, 0.56, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[1.18, 0.038, 28, 220]} />
        <meshStandardMaterial color="#eaeaea" roughness={0.5} metalness={0.2} emissive="#0d0d0d" envMapIntensity={0.8} />
      </mesh>

      {/* Pillars */}
      {pillars.map((p, i) => (
        <mesh key={i} position={p} castShadow receiveShadow>
          <boxGeometry args={[0.14, 1.3, 0.14]} />
          <meshStandardMaterial color="#0b0b0c" roughness={0.52} metalness={0.35} />
        </mesh>
      ))}

      {/* Depth wall */}
      <mesh position={[0, 0.85, -2.6]} receiveShadow>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#070708" roughness={1} metalness={0} />
      </mesh>
    </group>
  );
}

export default function OrbitalChamber() {
  const { camera, scene } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.14) * 0.38;
    camera.position.y = 0.34 + Math.sin(t * 0.11) * 0.08;
    camera.position.z = 4.75;
    camera.lookAt(0, 0.22, 0);

    // subtle atmospheric depth (no require; safe in ESM)
    if (!scene.fog) scene.fog = new Fog("#000000", 6, 12);
  });

  return (
    <>
      <Environment preset="city" />

      <ambientLight intensity={0.16} />
      <directionalLight position={[5, 7, 3]} intensity={1.15} castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={0.22} />
      <pointLight position={[0, 1.6, 1.6]} intensity={0.42} />

      <Chamber />
    </>
  );
}
