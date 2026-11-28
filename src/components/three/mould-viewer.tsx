"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

export type MouldKey = "holland" | "hexagon" | "cacing" | "kanstin";
export type FinishKey = "abu" | "merah" | "emas";

/** Pigment tints multiplied over the grey concrete texture. */
export const FINISH: Record<FinishKey, string> = { abu: "#e4ded3", merah: "#e8483f", emas: "#f0cf5c" };

/** Outlines of the paving shapes, in decimetres (1 unit = 10 cm). */
function shapeFor(key: MouldKey): { shape: THREE.Shape; depth: number } {
  const s = new THREE.Shape();
  if (key === "holland") {
    const w = 2, h = 1;
    s.moveTo(-w / 2, -h / 2).lineTo(w / 2, -h / 2).lineTo(w / 2, h / 2).lineTo(-w / 2, h / 2).closePath();
    return { shape: s, depth: 0.8 };
  }
  if (key === "hexagon") {
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      const x = Math.cos(a) * 1.15, y = Math.sin(a) * 1.15;
      if (i === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    }
    s.closePath();
    return { shape: s, depth: 0.8 };
  }
  if (key === "cacing") {
    // "Uni"/cacing: long block with a waist on both long sides and rounded ends.
    const L = 1.12, H = 0.56, waist = 0.16;
    s.moveTo(-L, -H + 0.12);
    s.quadraticCurveTo(-L, -H, -L + 0.14, -H);
    s.lineTo(-0.42, -H);
    s.quadraticCurveTo(-0.22, -H + waist, 0, -H + waist);
    s.quadraticCurveTo(0.22, -H + waist, 0.42, -H);
    s.lineTo(L - 0.14, -H);
    s.quadraticCurveTo(L, -H, L, -H + 0.12);
    s.lineTo(L, H - 0.12);
    s.quadraticCurveTo(L, H, L - 0.14, H);
    s.lineTo(0.42, H);
    s.quadraticCurveTo(0.22, H - waist, 0, H - waist);
    s.quadraticCurveTo(-0.22, H - waist, -0.42, H);
    s.lineTo(-L + 0.14, H);
    s.quadraticCurveTo(-L, H, -L, H - 0.12);
    s.closePath();
    return { shape: s, depth: 0.8 };
  }
  // kanstin: curb profile (cross-section), extruded long
  s.moveTo(-0.5, 0).lineTo(0.5, 0).lineTo(0.5, 1.6).lineTo(0.15, 2).lineTo(-0.5, 2).closePath();
  return { shape: s, depth: 3.2 };
}

function Piece({ mould, finish }: { mould: MouldKey; finish: FinishKey }) {
  const group = useRef<THREE.Group>(null);
  const appear = useRef(0);
  const geometry = useMemo(() => {
    const { shape, depth } = shapeFor(mould);
    const g = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.07,
      bevelSize: 0.06,
      bevelSegments: 4,
      curveSegments: 24,
    });
    g.center();
    return g;
  }, [mould]);
  // Real concrete surface: photographed aggregate as colour map + the same image as bump map.
  const tex = useTexture("/tex/concrete.jpg");
  const material = useMemo(() => {
    const map = tex.clone();
    map.colorSpace = THREE.SRGBColorSpace;
    const bump = tex.clone();
    for (const t of [map, bump]) {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(0.9, 0.9);
      t.anisotropy = 8;
      t.needsUpdate = true;
    }
    return new THREE.MeshStandardMaterial({ map, bumpMap: bump, bumpScale: 2.2, roughness: 0.96, metalness: 0 });
  }, [tex]);

  useEffect(() => {
    material.color.set(FINISH[finish]);
  }, [finish, material]);
  useEffect(() => {
    appear.current = 0;
  }, [mould]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, dt) => {
    if (!group.current) return;
    appear.current = Math.min(1, appear.current + dt * 1.6);
    const t = 1 - Math.pow(1 - appear.current, 3);
    group.current.scale.setScalar(0.6 + 0.4 * t);
    group.current.rotation.y += dt * 0.25 * (1.6 - t);
  });

  const isCurb = mould === "kanstin";
  return (
    <group ref={group}>
      <mesh
        geometry={geometry}
        material={material}
        castShadow
        rotation={isCurb ? [0, Math.PI / 2, 0] : [-Math.PI / 2 + 0.55, 0, 0.35]}
        scale={isCurb ? 0.5 : 0.78}
      />
    </group>
  );
}

export default function MouldViewer({ mould, finish }: { mould: MouldKey; finish: FinishKey }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "100px" });
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="mould-viewer absolute inset-0" aria-hidden>
      <Canvas
        shadows
        dpr={[1, 1.8]}
        frameloop={inView ? "always" : "never"}
        camera={{ position: [0, 1.4, 6], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
        }}
      >
        <ambientLight intensity={0.7} />
        <hemisphereLight args={["#fff6e6", "#d9cdb8", 0.6]} />
        <directionalLight position={[4, 6, 3]} intensity={2.6} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[0, 1, 6]} intensity={0.5} />
        <directionalLight position={[-5, 2, -3]} intensity={0.6} color="#ffd9a8" />
        <Suspense fallback={null}>
          <Float speed={reduced ? 0 : 1.6} rotationIntensity={reduced ? 0 : 0.35} floatIntensity={reduced ? 0 : 0.8}>
            <Piece mould={mould} finish={finish} />
          </Float>
        </Suspense>
        <ContactShadows position={[0, -1.25, 0]} opacity={0.35} scale={8} blur={2.6} far={3} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduced} autoRotateSpeed={0.8} minPolarAngle={0.6} maxPolarAngle={1.7} />
      </Canvas>
    </div>
  );
}
