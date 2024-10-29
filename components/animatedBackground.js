import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Particles = () => {
  const pointsRef = useRef();

  // Generate random positions for the dots
  const particles = new Float32Array(5000 * 3).map(() => (Math.random() - 0.5) * 10);

  // Rotate the particles in each frame
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = elapsedTime * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="#ffcc00"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

const AnimatedBackground = () => {
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas>
        <Particles />
      </Canvas>
    </div>
  );
};

export default AnimatedBackground;
