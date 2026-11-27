"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

type Block = {
  x: number;
  z: number;
  rot: number;
  delay: number;
  color: THREE.Color;
};

const CONCRETE = ["#6f6e6a", "#7a7873", "#64635f", "#85837c", "#5c5b57"];
const ACCENTS = ["#d7191f", "#ffc20e"];

/** Basket-weave layout of holland (20×10) paving blocks. */
function buildBlocks(cols: number, rows: number): Block[] {
  const blocks: Block[] = [];
  const rand = mulberry32(7);
  for (let i = -cols; i < cols; i++) {
    for (let j = -rows; j < rows; j++) {
      const vertical = (i + j) % 2 === 0;
      for (let k = 0; k < 2; k++) {
        const off = k === 0 ? -0.5 : 0.5;
        const x = i * 2 + 1 + (vertical ? off : 0);
        const z = j * 2 + 1 + (vertical ? 0 : off);
        const d = Math.hypot(x, z);
        const accent = rand() < 0.035;
        const color = new THREE.Color(
          accent ? ACCENTS[Math.floor(rand() * ACCENTS.length)] : CONCRETE[Math.floor(rand() * CONCRETE.length)],
        );
        blocks.push({ x, z, rot: vertical ? 0 : Math.PI / 2, delay: d * 0.045 + rand() * 0.25, color });
      }
    }
  }
  return blocks;
}

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const easeOutBack = (x: number) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

function Field({ reduced }: { reduced: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const blocks = useMemo(() => buildBlocks(13, 9), []);
  const geometry = useMemo(() => new RoundedBoxGeometry(0.94, 0.7, 1.94, 3, 0.09), []);
  // Scratch objects live in a ref: they are mutated every frame.
  const scratch = useRef({
    dummy: new THREE.Object3D(),
    ray: new THREE.Raycaster(),
    plane: new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    hit: new THREE.Vector3(),
    smooth: new THREE.Vector3(4, 0, 2),
  });
  const start = useRef<number | null>(null);

  useEffect(() => {
    if (!mesh.current) return;
    blocks.forEach((b, i) => mesh.current!.setColorAt(i, b.color));
    mesh.current.instanceColor!.needsUpdate = true;
  }, [blocks]);

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    const { camera, pointer } = state;
    const { dummy, ray, plane, hit, smooth } = scratch.current;
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - start.current;

    ray.setFromCamera(pointer, camera);
    if (ray.ray.intersectPlane(plane, hit)) smooth.lerp(hit, 0.06);

    const pulse = (t % 4.5) * 9; // radius of the periodic "vibro press" ring

    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      let y = 0;
      if (!reduced) {
        const p = Math.min(1, Math.max(0, (t - b.delay) / 0.9));
        y = (1 - easeOutBack(p)) * 9;
        const dm = Math.hypot(b.x - smooth.x, b.z - smooth.z);
        y += Math.sin(t * 9 - dm * 1.1) * 0.16 * Math.exp(-dm * 0.22) + Math.max(0, 0.9 - dm * 0.18) * 0.6;
        const dc = Math.hypot(b.x, b.z);
        y += Math.exp(-Math.pow(dc - pulse, 2) * 0.35) * 0.35 * (p >= 1 ? 1 : 0);
      }
      dummy.position.set(b.x, y, b.z);
      dummy.rotation.set(0, b.rot, 0);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;

    // Portrait screens: look more top-down so the far rows don't vanish into the fog.
    const portrait = state.size.width < state.size.height;
    const k = reduced ? 1 : 0.03;
    const px = reduced ? 0 : pointer.x * 1.6;
    const py = reduced ? 0 : pointer.y * 0.8;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, px, k);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, (portrait ? 24 : 15) + py, k);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, portrait ? 7 : 15, k);
    camera.lookAt(0, 0, portrait ? 0 : 1.5);
  });

  return (
    <instancedMesh ref={mesh} args={[geometry, undefined, blocks.length]} castShadow receiveShadow>
      <meshStandardMaterial roughness={0.92} metalness={0.04} />
    </instancedMesh>
  );
}

export default function PavingField() {
  const wrap = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  // Client-only component (loaded with ssr:false), so window is available here.
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        frameloop={inView ? "always" : "never"}
        camera={{ position: [0, 15, 15], fov: 36, near: 0.1, far: 80 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          scene.background = new THREE.Color("#0b0a09");
          scene.fog = new THREE.Fog("#0b0a09", 14, 34);
        }}
      >
        <ambientLight intensity={0.35} />
        <hemisphereLight args={["#fff4dc", "#1a1010", 0.5]} />
        <directionalLight
          position={[10, 18, 6]}
          intensity={2.4}
          color="#ffe6b8"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-22}
          shadow-camera-right={22}
          shadow-camera-top={22}
          shadow-camera-bottom={-22}
        />
        <pointLight position={[-12, 5, -4]} intensity={60} distance={40} color="#d7191f" />
        <pointLight position={[10, 4, 8]} intensity={30} distance={30} color="#ffc20e" />
        <Field reduced={reduced} />
      </Canvas>
    </div>
  );
}
