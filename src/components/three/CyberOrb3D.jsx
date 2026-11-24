import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useInViewport from './useInViewport';

function OrbScene({ hovered }) {
  const rootRef = useRef(null);
  const wireOuterRef = useRef(null);
  const coreRef = useRef(null);
  const ringARef = useRef(null);
  const ringBRef = useRef(null);
  const particlesRef = useRef(null);

  const particlePositions = useMemo(() => {
    const count = 48;
    const arr = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const shell = 1.85 + 0.4 * Math.sin(i * 7.13);
      arr[i * 3] = Math.cos(theta) * radiusAtY * shell;
      arr[i * 3 + 1] = y * shell;
      arr[i * 3 + 2] = Math.sin(theta) * radiusAtY * shell;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const speed = hovered ? 1.7 : 1;
    const dt = Math.min(delta, 0.05) * speed;

    if (wireOuterRef.current) {
      wireOuterRef.current.rotation.y += dt * 0.4;
      wireOuterRef.current.rotation.x += dt * 0.16;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y -= dt * 0.6;
      coreRef.current.rotation.z += dt * 0.22;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.045;
      coreRef.current.scale.setScalar(hovered ? pulse * 1.07 : pulse);
    }
    if (ringARef.current) {
      ringARef.current.rotation.z += dt * 0.7;
    }
    if (ringBRef.current) {
      ringBRef.current.rotation.x -= dt * 0.55;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += dt * 0.18;
    }
    if (rootRef.current) {
      const targetX = state.pointer.y * 0.3;
      const targetY = state.pointer.x * 0.4;
      rootRef.current.rotation.x = THREE.MathUtils.lerp(rootRef.current.rotation.x, targetX, 0.08);
      rootRef.current.rotation.y = THREE.MathUtils.lerp(rootRef.current.rotation.y, targetY, 0.08);
    }
  });

  return (
    <group ref={rootRef}>
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.78, 0]} />
        <meshStandardMaterial
          color="#071525"
          emissive="#00bfff"
          emissiveIntensity={hovered ? 0.65 : 0.38}
          metalness={0.8}
          roughness={0.22}
        />
      </mesh>

      <mesh ref={wireOuterRef}>
        <icosahedronGeometry args={[1.38, 1]} />
        <meshBasicMaterial color="#00bfff" wireframe transparent opacity={hovered ? 0.52 : 0.32} />
      </mesh>

      <mesh ref={ringARef} rotation={[Math.PI / 2.6, 0.3, 0]}>
        <torusGeometry args={[1.68, 0.016, 10, 56]} />
        <meshBasicMaterial color="#52d7ff" transparent opacity={0.62} />
      </mesh>

      <mesh ref={ringBRef} rotation={[0.4, Math.PI / 3, Math.PI / 5]}>
        <torusGeometry args={[1.92, 0.012, 10, 56]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
      </mesh>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#7ce2ff" size={0.045} transparent opacity={0.78} sizeAttenuation />
      </points>
    </group>
  );
}

/**
 * Interactive 3D Abstract Cyber Core (Option #2).
 * Lazy-mounts its WebGL context only when scrolled near viewport.
 */
export default function CyberOrb3D({ compact = false, eager = false, className = '' }) {
  const wrapRef = useRef(null);
  const { inView, hasEntered } = useInViewport(wrapRef, {
    defaultVisible: eager,
    rootMargin: '200px',
  });
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={wrapRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={`relative select-none ${compact ? 'w-full h-full' : 'w-full h-[240px] sm:h-[280px]'} ${className}`}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-6 rounded-full bg-[#00bfff]/10 blur-2xl" />
      {hasEntered && (
        <Canvas
          frameloop={inView ? 'always' : 'never'}
          dpr={[1, 1.35]}
          camera={{ position: [0, 0, 4.9], fov: 42 }}
          style={{ background: 'transparent', pointerEvents: 'none' }}
          gl={{ alpha: true, antialias: true, powerPreference: 'default' }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <ambientLight intensity={0.8} />
          <pointLight position={[4, 4, 4]} intensity={2} color="#00bfff" />
          <pointLight position={[-4, -3, 2]} intensity={1.1} color="#3b82f6" />
          <OrbScene hovered={hovered} />
        </Canvas>
      )}
    </div>
  );
}
