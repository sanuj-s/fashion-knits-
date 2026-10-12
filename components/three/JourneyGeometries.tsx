'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GeometryProps {
  opacity: number;
  visible: boolean;
}

// 01 — YARN: Animated Thread / Coiled Spinning Spool
export const YarnGeometry = React.memo(function YarnGeometry({ opacity, visible }: GeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!visible) return;
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.25;
      meshRef.current.rotation.y += delta * 0.4;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x -= delta * 0.18;
      wireRef.current.rotation.y -= delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} visible={visible}>
      {/* Primary continuous spun yarn coil */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.36, 128, 32, 2, 3]} />
        <meshStandardMaterial
          color="#faf8f5"
          roughness={0.3}
          metalness={0.15}
          transparent
          opacity={Math.max(0, opacity)}
        />
      </mesh>
      {/* Outer gilded thread spiral */}
      <mesh ref={wireRef}>
        <torusKnotGeometry args={[1.25, 0.38, 64, 16, 2, 3]} />
        <meshStandardMaterial
          color="#d4af37"
          wireframe
          transparent
          opacity={Math.max(0, opacity * 0.75)}
        />
      </mesh>
    </group>
  );
});

// 02 — KNITTING: Interlocking Grid / Textile Lattice
export const KnittingGeometry = React.memo(function KnittingGeometry({ opacity, visible }: GeometryProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!visible) return;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.2) * 0.12;
    }
  });

  const gridItems = React.useMemo(() => {
    const items = [];
    const size = 5;
    const step = 0.55;
    for (let x = -size / 2; x <= size / 2; x++) {
      for (let y = -size / 2; y <= size / 2; y++) {
        const isOffset = (Math.abs(x) + Math.abs(y)) % 2 === 0;
        items.push({
          pos: [x * step, y * step, isOffset ? 0.12 : -0.12] as [number, number, number],
          rot: [0, 0, isOffset ? Math.PI / 4 : 0] as [number, number, number],
          isAccent: isOffset,
        });
      }
    }
    return items;
  }, []);

  return (
    <group ref={groupRef} visible={visible}>
      {gridItems.map((item, idx) => (
        <mesh key={idx} position={item.pos} rotation={item.rot}>
          <torusGeometry args={[0.22, 0.045, 16, 24]} />
          <meshStandardMaterial
            color={item.isAccent ? '#d4af37' : '#faf8f5'}
            roughness={0.25}
            metalness={0.2}
            transparent
            opacity={Math.max(0, opacity * (item.isAccent ? 0.95 : 0.8))}
          />
        </mesh>
      ))}
    </group>
  );
});

// 03 — DYEING: Luminous Fluid Sphere & Color Infusion
export const DyeingGeometry = React.memo(function DyeingGeometry({ opacity, visible }: GeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!visible) return;
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.45;
      meshRef.current.rotation.x = Math.sin(time * 0.6) * 0.25;
      const s = 1.0 + Math.sin(time * 2.2) * 0.06;
      meshRef.current.scale.set(s, s, s);
    }
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.6;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.3;
      ringRef.current.rotation.x = Math.sin(time * 0.8) * 0.4;
    }
  });

  return (
    <group visible={visible}>
      {/* Dynamic Luminous Fluid Sphere with golden sheen */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 48, 48]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.15}
          metalness={0.35}
          emissive="#3d2a08"
          emissiveIntensity={0.35}
          transparent
          opacity={Math.max(0, opacity * 0.9)}
        />
      </mesh>
      {/* Interior crystal lattice */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.95, 2]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={Math.max(0, opacity * 0.65)}
        />
      </mesh>
      {/* Fluid meniscus ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[1.85, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#f5e6c8"
          transparent
          opacity={Math.max(0, opacity * 0.75)}
        />
      </mesh>
    </group>
  );
});

// 04 — PROCESSING: Stenter Textile Wave Plane
export const ProcessingGeometry = React.memo(function ProcessingGeometry({ opacity, visible }: GeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.PlaneGeometry>(null);

  useFrame((state, delta) => {
    if (!visible) return;
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 4.5 + Math.sin(time * 0.5) * 0.12;
      meshRef.current.rotation.z += delta * 0.12;
    }

    if (geomRef.current) {
      const pos = geomRef.current.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        const z = Math.sin(u * 2.2 + time * 2.5) * 0.22 + Math.cos(v * 2.2 + time * 2.5) * 0.22;
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <group visible={visible}>
      <mesh ref={meshRef}>
        <planeGeometry ref={geomRef} args={[3.6, 3.6, 28, 28]} />
        <meshStandardMaterial
          color="#faf8f5"
          side={THREE.DoubleSide}
          roughness={0.35}
          metalness={0.15}
          transparent
          opacity={Math.max(0, opacity * 0.92)}
        />
      </mesh>
    </group>
  );
});

// 05 — FINISHING: Polished Calender Cylinder & Luster Rings
export const FinishingGeometry = React.memo(function FinishingGeometry({ opacity, visible }: GeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!visible) return;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35;
      meshRef.current.rotation.x += delta * 0.18;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.45;
      ringRef.current.rotation.x += delta * 0.25;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group visible={visible}>
      {/* Polished textile calendar cylinder */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[1.45, 1.45, 0.45, 48]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.5}
          roughness={0.2}
          emissive="#2b1e06"
          emissiveIntensity={0.25}
          transparent
          opacity={Math.max(0, opacity * 0.95)}
        />
      </mesh>
      {/* Floating high-luster chrome ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.0, 0.05, 16, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.7}
          transparent
          opacity={Math.max(0, opacity * 0.85)}
        />
      </mesh>
      {/* Secondary accent ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.2, 0.025, 16, 64]} />
        <meshStandardMaterial
          color="#d4af37"
          transparent
          opacity={Math.max(0, opacity * 0.65)}
        />
      </mesh>
    </group>
  );
});

// 06 — GARMENT MFG: Tailored Architectural Silhouette
export const GarmentGeometry = React.memo(function GarmentGeometry({ opacity, visible }: GeometryProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!visible) return;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.15, 0]} visible={visible}>
      {/* Torso */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.75, 2.1, 0.55]} />
        <meshStandardMaterial
          color="#faf8f5"
          roughness={0.35}
          metalness={0.12}
          transparent
          opacity={Math.max(0, opacity * 0.92)}
        />
      </mesh>
      {/* Left Sleeve */}
      <mesh position={[-1.22, 0.6, 0]} rotation={[0, 0, 0.32]}>
        <boxGeometry args={[0.75, 0.88, 0.52]} />
        <meshStandardMaterial
          color="#faf8f5"
          roughness={0.35}
          metalness={0.12}
          transparent
          opacity={Math.max(0, opacity * 0.88)}
        />
      </mesh>
      {/* Right Sleeve */}
      <mesh position={[1.22, 0.6, 0]} rotation={[0, 0, -0.32]}>
        <boxGeometry args={[0.75, 0.88, 0.52]} />
        <meshStandardMaterial
          color="#faf8f5"
          roughness={0.35}
          metalness={0.12}
          transparent
          opacity={Math.max(0, opacity * 0.88)}
        />
      </mesh>
      {/* Collar accent band */}
      <mesh position={[0, 1.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.075, 16, 32]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.4}
          roughness={0.2}
          transparent
          opacity={Math.max(0, opacity * 0.95)}
        />
      </mesh>
    </group>
  );
});

// 07 — QUALITY CONTROL: Laser Scanning Inspection Reticle
export const QualityGeometry = React.memo(function QualityGeometry({ opacity, visible }: GeometryProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!visible) return;
    const time = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.18;
    }
    if (ringRef.current) {
      ringRef.current.position.y = Math.sin(time * 2.2) * 1.35;
    }
  });

  return (
    <group ref={groupRef} visible={visible}>
      {/* Inspection wireframe icosahedron */}
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#d4af37"
          wireframe
          transparent
          opacity={Math.max(0, opacity * 0.85)}
        />
      </mesh>
      {/* Center specimen */}
      <mesh>
        <octahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.3}
          roughness={0.2}
          emissive="#1a1a1a"
          transparent
          opacity={Math.max(0, opacity * 0.95)}
        />
      </mesh>
      {/* Active laser scan ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.65, 1.72, 64]} />
        <meshBasicMaterial
          color="#d4af37"
          side={THREE.DoubleSide}
          transparent
          opacity={Math.max(0, opacity * 0.95)}
        />
      </mesh>
    </group>
  );
});

// 08 — PACKING: Modular Precision Packaging Units
export const PackingGeometry = React.memo(function PackingGeometry({ opacity, visible }: GeometryProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!visible) return;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} visible={visible}>
      {/* Base Master Carton */}
      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[2.1, 0.95, 2.1]} />
        <meshStandardMaterial
          color="#faf8f5"
          roughness={0.4}
          metalness={0.1}
          transparent
          opacity={Math.max(0, opacity * 0.92)}
        />
      </mesh>
      {/* Gold unit carton */}
      <mesh position={[-0.42, 0.38, -0.42]}>
        <boxGeometry args={[0.9, 0.75, 0.9]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.3}
          metalness={0.25}
          transparent
          opacity={Math.max(0, opacity * 0.9)}
        />
      </mesh>
      {/* White unit carton */}
      <mesh position={[0.42, 0.38, 0.42]}>
        <boxGeometry args={[0.9, 0.75, 0.9]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.3}
          metalness={0.15}
          transparent
          opacity={Math.max(0, opacity * 0.9)}
        />
      </mesh>
      {/* Gold security strapping */}
      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[2.14, 0.08, 2.14]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.5}
          roughness={0.2}
          transparent
          opacity={Math.max(0, opacity)}
        />
      </mesh>
    </group>
  );
});

// 09 — GLOBAL EXPORT: Planetary Orbit & Logistics Network
export const ExportGeometry = React.memo(function ExportGeometry({ opacity, visible }: GeometryProps) {
  const globeRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!visible) return;
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.3;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.35;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x -= delta * 0.25;
    }
  });

  const dots = React.useMemo(() => {
    const pts = [];
    const count = 44;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 1.45;
      pts.push([
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      ] as [number, number, number]);
    }
    return pts;
  }, []);

  return (
    <group ref={globeRef} visible={visible}>
      {/* Translucent slate core sphere with gold wireframe */}
      <mesh>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.25}
          metalness={0.3}
          wireframe
          transparent
          opacity={Math.max(0, opacity * 0.75)}
        />
      </mesh>
      {/* Inner solid sphere for depth */}
      <mesh>
        <sphereGeometry args={[1.36, 24, 24]} />
        <meshStandardMaterial
          color="#22201e"
          roughness={0.6}
          metalness={0.1}
          transparent
          opacity={Math.max(0, opacity * 0.75)}
        />
      </mesh>

      {/* Network hub nodes */}
      {dots.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial
            color={idx % 3 === 0 ? '#d4af37' : '#faf8f5'}
            transparent
            opacity={Math.max(0, opacity * 0.95)}
          />
        </mesh>
      ))}

      {/* Orbital shipping corridors */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.05, 0.025, 16, 64]} />
        <meshStandardMaterial
          color="#d4af37"
          transparent
          opacity={Math.max(0, opacity * 0.85)}
        />
      </mesh>
      <mesh ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[2.25, 0.018, 16, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={Math.max(0, opacity * 0.65)}
        />
      </mesh>
    </group>
  );
});
