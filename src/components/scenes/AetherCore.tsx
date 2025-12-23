"use client";

import {
  AccumulativeShadows,
  Environment,
  Float,
  MeshTransmissionMaterial,
  RandomizedLight,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

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
      <Float speed={1.05} rotationIntensity={0.55} floatIntensity={0.75}>
        {/* Inner core (metal) */}
        <mesh castShadow>
          <icosahedronGeometry args={[0.95, 4]} />
          <meshStandardMaterial
            color="#f5f5f5"
            roughness={0.18}
            metalness={0.9}
            envMapIntensity={1.0}
          />
        </mesh>

        {/* Glass shell */}
        <mesh ref={shell} scale={1.26} castShadow>
          <icosahedronGeometry args={[1.0, 3]} />
          <MeshTransmissionMaterial
            thickness={0.8}
            roughness={0.12}
            transmission={1}
            ior={1.45}
            chromaticAberration={0.035}
            anisotropy={0.25}
            distortion={0.18}
            distortionScale={0.28}
            temporalDistortion={0.08}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function AetherCore() {
  return (
    <>
      {/* Cinematic environment for reflections */}
      <Environment preset="city" />

      {/* Controlled lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[4, 6, 3]} intensity={1.15} />
      <directionalLight position={[-4, 2, -2]} intensity={0.25} />

      {/* Soft cinematic shadows */}
      <AccumulativeShadows
        temporal
        frames={40}
        alphaTest={0.85}
        opacity={0.55}
        scale={12}
        position={[0, -1.05, 0]}
      >
        <RandomizedLight amount={6} radius={8} ambient={0.5} intensity={0.75} position={[5, 8, -4]} />
      </AccumulativeShadows>

      {/* Back plate to deepen contrast */}
      <mesh position={[0, 0, -3.6]}>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial color="#070708" roughness={1} metalness={0} />
      </mesh>

      <Core />
    </>
  );
}
