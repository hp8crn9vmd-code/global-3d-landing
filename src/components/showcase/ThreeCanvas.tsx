"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type Tier = "low" | "mid" | "high";

function computeTier(): { tier: Tier; dpr: number; shadows: boolean } {
  // SSR-safe guard (this file only loads in client via dynamic import)
  const dpr0 = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  const dpr = Math.max(1, Math.min(2, dpr0));

  const nav: any = typeof navigator !== "undefined" ? navigator : {};
  const cores = typeof nav.hardwareConcurrency === "number" ? nav.hardwareConcurrency : 4;
  const mem = typeof nav.deviceMemory === "number" ? nav.deviceMemory : 4;

  const reduced =
    typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
      : false;

  // Conservative tiers (production-friendly)
  if (reduced || mem <= 2 || cores <= 2) return { tier: "low", dpr: 1, shadows: false };
  if (mem <= 4 || cores <= 4) return { tier: "mid", dpr: Math.min(1.5, dpr), shadows: true };
  return { tier: "high", dpr: Math.min(2, dpr), shadows: true };
}

function BackgroundStars({ count = 800, radius = 18 }: { count?: number; radius?: number }) {
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // random in sphere shell
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = radius * (0.65 + Math.random() * 0.35);

      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count, radius]);

  return (
    <points geometry={geom}>
      <pointsMaterial
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        color={new THREE.Color("#cfe0ff")}
      />
    </points>
  );
}

function SceneCore({ tier }: { tier: Tier }) {
  const group = useRef<THREE.Group>(null!);
  const ring = useRef<THREE.Mesh>(null!);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;

    // Cinematic idle motion (subtle)
    group.current.rotation.y += dt * 0.18;
    group.current.rotation.x = Math.sin(t * 0.35) * 0.10;

    if (ring.current) {
      ring.current.rotation.z += dt * 0.35;
      ring.current.rotation.x = Math.sin(t * 0.25) * 0.15;
    }
  });

  const detail = tier === "high" ? 2 : tier === "mid" ? 1 : 0;
  const geoMain = useMemo(() => new THREE.IcosahedronGeometry(1.05, detail), [detail]);
  const geoRing = useMemo(() => new THREE.TorusGeometry(1.55, 0.08, 24, tier === "high" ? 220 : 140), [tier]);

  return (
    <group ref={group} position={[0, 0.15, 0]}>
      {/* Glass shell */}
      <mesh geometry={geoMain} castShadow>
        <meshPhysicalMaterial
          roughness={0.12}
          metalness={0.0}
          transmission={1}
          thickness={0.9}
          ior={1.35}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.0}
          color={new THREE.Color("#dbe7ff")}
        />
      </mesh>

      {/* Inner metal core */}
      <mesh scale={0.62} castShadow>
        <sphereGeometry args={[1, tier === "high" ? 64 : 40, tier === "high" ? 64 : 40]} />
        <meshStandardMaterial
          color={new THREE.Color("#0f1118")}
          roughness={0.35}
          metalness={0.9}
        />
      </mesh>

      {/* Emissive ring */}
      <mesh ref={ring} geometry={geoRing} position={[0, 0.05, 0]} castShadow>
        <meshStandardMaterial
          color={new THREE.Color("#7fb0ff")}
          emissive={new THREE.Color("#7fb0ff")}
          emissiveIntensity={1.25}
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>

      {/* Floating accent shards */}
      {Array.from({ length: tier === "low" ? 6 : 10 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * 0.9) * 2.0,
            Math.cos(i * 0.8) * 0.55,
            Math.cos(i * 0.7) * 1.6,
          ]}
          rotation={[i * 0.4, i * 0.6, i * 0.2]}
          castShadow
        >
          <boxGeometry args={[0.22, 0.06, 0.18]} />
          <meshStandardMaterial color={new THREE.Color("#0b0d12")} roughness={0.45} metalness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function Ground({ shadows }: { shadows: boolean }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]} receiveShadow={shadows}>
      <circleGeometry args={[7, 64]} />
      <shadowMaterial transparent opacity={shadows ? 0.30 : 0} />
    </mesh>
  );
}

export default function ThreeCanvas() {
  const [tier, setTier] = useState<Tier>("mid");
  const [dpr, setDpr] = useState<number>(1.5);
  const [shadows, setShadows] = useState<boolean>(true);

  useEffect(() => {
    const apply = () => {
      const r = computeTier();
      setTier(r.tier);
      setDpr(r.dpr);
      setShadows(r.shadows);
    };
    apply();

    let raf = 0;
    const onResize = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        apply();
      });
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Canvas
        dpr={dpr}
        shadows={shadows}
        camera={{ position: [0, 0.6, 4.6], fov: 42, near: 0.1, far: 80 }}
        gl={{ antialias: tier !== "low", alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          // Transparent background to match page
          gl.setClearColor(0x000000, 0);
        }}
      >
        {/* Lighting rig (clean + cinematic) */}
        <ambientLight intensity={0.45} />

        {/* Key */}
        <directionalLight
          position={[4.5, 6, 3]}
          intensity={1.15}
          color={new THREE.Color("#ffffff")}
          castShadow={shadows}
          shadow-mapSize-width={tier === "high" ? 2048 : 1024}
          shadow-mapSize-height={tier === "high" ? 2048 : 1024}
          shadow-camera-near={0.5}
          shadow-camera-far={18}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
        />

        {/* Fill */}
        <pointLight position={[-4, 2.2, 3]} intensity={0.75} color={new THREE.Color("#8fb8ff")} />

        {/* Rim */}
        <pointLight position={[0, 2.8, -4]} intensity={0.65} color={new THREE.Color("#ffffff")} />

        <fog attach="fog" args={["#07080b", 7, 16]} />

        <BackgroundStars count={tier === "low" ? 420 : 900} radius={18} />
        <SceneCore tier={tier} />
        <Ground shadows={shadows} />

        {/* Controls: subtle, professional */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          rotateSpeed={0.55}
          dampingFactor={0.08}
          enableDamping
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.85}
        />
      </Canvas>

      {/* Non-library UI overlay (no names) */}
      <div style={{
        position:"absolute",
        right:12,
        bottom:12,
        padding:"10px 12px",
        borderRadius:14,
        border:"1px solid rgba(255,255,255,.10)",
        background:"rgba(0,0,0,.35)",
        color:"rgba(255,255,255,.70)",
        fontSize:11,
        letterSpacing:"0.14em",
        textTransform:"uppercase",
        backdropFilter:"blur(10px)"
      }}>
        3D mode: {tier}
      </div>
    </div>
  );
}
