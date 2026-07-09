"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function SiliconCrystal() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.18;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }
    if (inner.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.04;
      inner.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      {/* Inner glowing core */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial
          color="#0b3cb4"
          emissive="#1e6bff"
          emissiveIntensity={0.9}
          roughness={0.15}
          metalness={0.6}
          transparent
          opacity={0.55}
        />
      </mesh>
      {/* Wireframe shell */}
      <mesh scale={1.5}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#63acff" wireframe transparent opacity={0.35} />
      </mesh>
      {/* Outer faint shell */}
      <mesh scale={1.95}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.12} />
      </mesh>
      {/* Lattice atom nodes */}
      <LatticeNodes radius={1.72} />
    </group>
  );
}

function LatticeNodes({ radius }: { radius: number }) {
  const geo = useMemo(() => new THREE.IcosahedronGeometry(radius, 1), [radius]);
  const positions = useMemo(() => {
    const pos = geo.attributes.position;
    const arr: THREE.Vector3[] = [];
    const seen = new Set<string>();
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(pos, i);
      const key = `${v.x.toFixed(2)},${v.y.toFixed(2)},${v.z.toFixed(2)}`;
      if (!seen.has(key)) {
        seen.add(key);
        arr.push(v);
      }
    }
    return arr;
  }, [geo]);

  return (
    <>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#9cccff" />
        </mesh>
      ))}
    </>
  );
}

function Electrons({ count = 3 }: { count?: number }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const config = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        radius: 2.5 + i * 0.55,
        speed: 0.8 + i * 0.35,
        tilt: (i * Math.PI) / count,
        phase: i * 2.1,
      })),
    [count],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    config.forEach((c, i) => {
      const m = refs.current[i];
      if (!m) return;
      const a = t * c.speed + c.phase;
      const x = Math.cos(a) * c.radius;
      const z = Math.sin(a) * c.radius;
      const y = Math.sin(a) * Math.sin(c.tilt) * c.radius * 0.5;
      m.position.set(x, y * 0.6, z * Math.cos(c.tilt));
    });
  });

  return (
    <>
      {config.map((c, i) => (
        <group key={i} rotation={[c.tilt, 0, c.tilt * 0.6]}>
          {/* orbit ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[c.radius, 0.006, 8, 100]} />
            <meshBasicMaterial color="#3b8cff" transparent opacity={0.18} />
          </mesh>
        </group>
      ))}
      {config.map((_, i) => (
        <mesh key={`e-${i}`} ref={(el) => { refs.current[i] = el; }}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color="#7dd3fc" />
        </mesh>
      ))}
    </>
  );
}

function Photons({ count = 90 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = Math.random() * 12 + 3;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      speeds[i] = 0.02 + Math.random() * 0.05;
    }
    return { positions, speeds };
  }, [count]);

  useFrame(() => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= speeds[i] * 6;
      arr[i * 3] -= speeds[i] * 2;
      if (arr[i * 3 + 1] < -6) {
        arr[i * 3 + 1] = Math.random() * 6 + 6;
        arr[i * 3] = (Math.random() - 0.5) * 14;
      }
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7dd3fc"
        size={0.08}
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function ParallaxRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 1.4 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.9 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function CrystalScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2.2} color="#63acff" />
      <pointLight position={[-5, -3, -4]} intensity={1.4} color="#7c3aed" />
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.7}>
        <SiliconCrystal />
      </Float>
      <Electrons count={3} />
      <Photons count={90} />
      <ParallaxRig />
    </Canvas>
  );
}
