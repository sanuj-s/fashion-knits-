'use client';

import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles } from '@react-three/drei';
import {
  YarnGeometry,
  KnittingGeometry,
  DyeingGeometry,
  ProcessingGeometry,
  FinishingGeometry,
  GarmentGeometry,
  QualityGeometry,
  PackingGeometry,
  ExportGeometry,
} from './JourneyGeometries';

interface JourneySceneProps {
  progress: number; // 0 to 1
}

function SceneContent({ progress }: JourneySceneProps) {
  const totalStages = 9;

  // Seamless, continuous interpolation across all stages
  // Sum of opacities is ALWAYS 1.0 across the entire scroll range
  const opacities = useMemo(() => {
    const p = Math.max(0, Math.min(progress, 1));
    const scaled = p * (totalStages - 1); // 0 to 8
    const curr = Math.floor(scaled);
    const next = Math.min(curr + 1, totalStages - 1);
    const blend = scaled - curr; // 0 to 1

    // Smoothstep transition curve for natural cinematic fade
    const t = blend * blend * (3 - 2 * blend);

    const arr = new Array(totalStages).fill(0);
    if (curr === next) {
      arr[curr] = 1;
    } else {
      arr[curr] = 1 - t;
      arr[next] = t;
    }
    return arr;
  }, [progress, totalStages]);

  return (
    <>
      {/* Studio Lighting Hierarchy */}
      <ambientLight intensity={1.1} color="#fffcf5" />
      <directionalLight position={[6, 8, 6]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[-6, -4, -4]} intensity={1.2} color="#d4af37" />
      <directionalLight position={[0, -5, 5]} intensity={0.9} color="#e6caa0" />
      <pointLight position={[0, 0, 4.5]} intensity={0.9} color="#fff9ee" />
      <pointLight position={[0, 3, -3]} intensity={0.5} color="#d4af37" />

      {/* Floating Golden Micro-Fiber Particle Field */}
      <Sparkles
        count={50}
        scale={7}
        size={2.4}
        speed={0.35}
        color="#d4af37"
        opacity={0.65}
      />

      {/* Center 3D Stage Object with Gentle Floating Motion */}
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.25}>
        <group position={[0, 0, 0]}>
          <YarnGeometry opacity={opacities[0]} visible={opacities[0] > 0.001} />
          <KnittingGeometry opacity={opacities[1]} visible={opacities[1] > 0.001} />
          <DyeingGeometry opacity={opacities[2]} visible={opacities[2] > 0.001} />
          <ProcessingGeometry opacity={opacities[3]} visible={opacities[3] > 0.001} />
          <FinishingGeometry opacity={opacities[4]} visible={opacities[4] > 0.001} />
          <GarmentGeometry opacity={opacities[5]} visible={opacities[5] > 0.001} />
          <QualityGeometry opacity={opacities[6]} visible={opacities[6] > 0.001} />
          <PackingGeometry opacity={opacities[7]} visible={opacities[7] > 0.001} />
          <ExportGeometry opacity={opacities[8]} visible={opacities[8] > 0.001} />
        </group>
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={Math.PI / 2.4}
      />
    </>
  );
}

export function JourneyScene({ progress }: JourneySceneProps) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing three-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneContent progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
