'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useRef } from 'react';

function FloatingPlane() {
  const meshRef = useRef<any>();
  const texture = useLoader(THREE.TextureLoader, '/step4_apk_output.png');

  useFrame(() => {
    meshRef.current.rotation.y += 0.0015;
  });

  return (
    <mesh ref={meshRef} rotation={[0.2, 0.5, 0]}>
      <planeGeometry args={[10, 10, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default function Terrain3D() {
  return (
    <div className="w-full h-[600px] my-20">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls />
        <FloatingPlane />
      </Canvas>
      <p className="text-center mt-4 text-sm text-gray-400">🔁 Orbit view of APK Model Clustering</p>
    </div>
  );
}
