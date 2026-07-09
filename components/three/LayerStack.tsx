"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { cellLayers } from "@/data/layers";

// Visual (not-to-scale) heights so nanometre films are still visible
const visualHeight: Record<string, number> = {
  "front-metal": 0.16,
  "sinx-front": 0.12,
  al2o3: 0.09,
  emitter: 0.14,
  wafer: 0.7,
  "tunnel-oxide": 0.07,
  poly: 0.16,
  "sinx-rear": 0.11,
  "rear-metal": 0.15,
};

const GAP = 0.04;

function Slab({
  index,
  y,
  height,
  color,
  emissive,
  selected,
  dimmed,
  explode,
  onSelect,
}: {
  index: number;
  y: number;
  height: number;
  color: string;
  emissive: string;
  selected: boolean;
  dimmed: boolean;
  explode: number;
  onSelect: () => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const targetY = y * (1 + explode * 1.7);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      targetY,
      6,
      delta,
    );
    const targetX = selected ? 0.35 : 0;
    ref.current.position.x = THREE.MathUtils.damp(
      ref.current.position.x,
      targetX,
      6,
      delta,
    );
  });

  return (
    <group
      ref={ref}
      position={[0, y, 0]}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <RoundedBox args={[3, height, 3]} radius={0.02} smoothness={2}>
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={selected ? 1.1 : 0.35}
          roughness={0.35}
          metalness={0.5}
          transparent
          opacity={dimmed ? 0.25 : 0.94}
        />
      </RoundedBox>
      {/* edge highlight when selected */}
      {selected && (
        <RoundedBox args={[3.06, height + 0.03, 3.06]} radius={0.02} smoothness={2}>
          <meshBasicMaterial color={emissive} wireframe transparent opacity={0.6} />
        </RoundedBox>
      )}
    </group>
  );
}

function Stack({
  selectedId,
  explode,
  onSelect,
  autoRotate,
}: {
  selectedId: string | null;
  explode: number;
  onSelect: (id: string) => void;
  autoRotate: boolean;
}) {
  const layout = useMemo(() => {
    const heights = cellLayers.map((l) => visualHeight[l.id] ?? 0.12);
    const total = heights.reduce((a, b) => a + b + GAP, 0);
    let cursor = total / 2;
    return cellLayers.map((l, i) => {
      const h = heights[i];
      cursor -= h / 2;
      const y = cursor;
      cursor -= h / 2 + GAP;
      return { layer: l, y, height: h };
    });
  }, []);

  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (autoRotate && group.current) group.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={group} rotation={[0.15, 0.6, 0]}>
      {layout.map(({ layer, y, height }, i) => (
        <Slab
          key={layer.id}
          index={i}
          y={y}
          height={height}
          color={layer.color}
          emissive={layer.emissive}
          selected={selectedId === layer.id}
          dimmed={selectedId !== null && selectedId !== layer.id}
          explode={explode}
          onSelect={() => onSelect(layer.id)}
        />
      ))}
    </group>
  );
}

export default function LayerStack({
  selectedId,
  explode,
  onSelect,
  autoRotate,
}: {
  selectedId: string | null;
  explode: number;
  onSelect: (id: string) => void;
  autoRotate: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [4.5, 2, 5.5], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      onPointerMissed={() => onSelect("")}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 5]} intensity={1.6} color="#cbe4ff" />
      <pointLight position={[-4, -2, -3]} intensity={1.2} color="#7c3aed" />
      <pointLight position={[3, 0, 4]} intensity={0.8} color="#38bdf8" />
      <Stack
        selectedId={selectedId || null}
        explode={explode}
        onSelect={onSelect}
        autoRotate={autoRotate}
      />
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={4}
        maxDistance={11}
        minPolarAngle={Math.PI * 0.15}
        maxPolarAngle={Math.PI * 0.78}
        autoRotate={false}
      />
    </Canvas>
  );
}
