import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import useInViewport from './useInViewport';
import useMediaQuery from '../../hooks/useMediaQuery';

const ALL_TECH_ITEMS = [
  { name: 'Python', color: '#38bdf8' },
  { name: 'FastAPI', color: '#10b981' },
  { name: 'PostgreSQL', color: '#60a5fa' },
  { name: 'React', color: '#00bfff' },
  { name: 'TypeScript', color: '#3b82f6' },
  { name: 'Docker', color: '#38bdf8' },
  { name: 'React Native', color: '#67e8f9' },
  { name: 'SQLAlchemy', color: '#fbbf24' },
  { name: 'Laravel', color: '#f87171' },
  { name: 'Node.js', color: '#4ade80' },
  { name: 'OpenCV', color: '#22d3ee' },
  { name: 'YOLOv11', color: '#a78bfa' },
  { name: 'Tailwind', color: '#38bdf8' },
  { name: 'Pytest', color: '#34d399' },
  { name: 'Flutter', color: '#60a5fa' },
  { name: 'Git', color: '#fb923c' },
];

function GlobeNodes({ activeNode, setActiveNode, isMobile }) {
  const groupRef = useRef(null);

  const items = useMemo(
    () => (isMobile ? ALL_TECH_ITEMS.slice(0, 10) : ALL_TECH_ITEMS),
    [isMobile]
  );

  const nodes = useMemo(() => {
    const count = items.length;
    const radius = isMobile ? 1.95 : 2.15;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    return items.map((tech, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      return {
        ...tech,
        position: [
          Math.cos(theta) * r * radius,
          y * radius * 0.9,
          Math.sin(theta) * r * radius,
        ],
      };
    });
  }, [items, isMobile]);

  const spokeGeometry = useMemo(() => {
    const pts = [];
    nodes.forEach((n) => {
      pts.push(0, 0, 0, n.position[0], n.position[1], n.position[2]);
    });
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return geom;
  }, [nodes]);

  useFrame((_, delta) => {
    if (!groupRef.current || activeNode !== null) return;
    groupRef.current.rotation.y += Math.min(delta, 0.05) * 0.24;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[isMobile ? 1.45 : 1.62, 1]} />
        <meshBasicMaterial color="#00bfff" wireframe transparent opacity={0.14} />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.34, 18, 18]} />
        <meshStandardMaterial
          color="#071829"
          emissive="#00bfff"
          emissiveIntensity={0.7}
          roughness={0.25}
          metalness={0.75}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[isMobile ? 1.95 : 2.15, 0.008, 10, 64]} />
        <meshBasicMaterial color="#00bfff" transparent opacity={0.26} />
      </mesh>

      <lineSegments geometry={spokeGeometry}>
        <lineBasicMaterial color="#00bfff" transparent opacity={0.14} />
      </lineSegments>

      {nodes.map((node, idx) => {
        const isActive = activeNode === idx;
        return (
          <group key={node.name} position={node.position}>
            <mesh>
              <sphereGeometry args={[isActive ? 0.08 : 0.05, 10, 10]} />
              <meshBasicMaterial color={isActive ? '#ffffff' : node.color} />
            </mesh>
            <Html center distanceFactor={isMobile ? 7.4 : 6.8} zIndexRange={[15, 0]}>
              <button
                type="button"
                onClick={() => setActiveNode(isActive ? null : idx)}
                onMouseEnter={() => !isMobile && setActiveNode(idx)}
                onMouseLeave={() => !isMobile && setActiveNode(null)}
                className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-bold tracking-wide whitespace-nowrap border backdrop-blur-md transition-transform duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#00bfff] text-black border-[#00bfff] scale-110 shadow-[0_0_16px_rgba(0,191,255,0.65)]'
                    : 'bg-[#0b1019]/85 text-gray-200 border-white/15 hover:border-[#00bfff]/60'
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: isActive ? '#050505' : node.color }}
                />
                <span>{node.name}</span>
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

/**
 * 3D Interactive Tech Stack Globe (Option #3).
 * Lazy-mounted below the fold; touch-scroll friendly on mobile phones.
 */
export default function TechGlobe3D() {
  const containerRef = useRef(null);
  const { inView, hasEntered } = useInViewport(containerRef, {
    defaultVisible: false,
    rootMargin: '260px',
  });
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [activeNode, setActiveNode] = useState(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[280px] sm:h-[360px] md:h-[400px] rounded-2xl sm:rounded-3xl glass-card border border-white/10 overflow-hidden select-none touch-pan-y"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.11)_0%,transparent_68%)]" />

      <div className="absolute top-3.5 left-4 sm:left-5 z-20 pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00bfff] animate-pulse" />
        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#00bfff]">
          {isMobile ? '3D Tech Stack // Tap Node' : '3D Interactive Stack // Drag to Orbit'}
        </span>
      </div>

      {hasEntered && (
        <Canvas
          frameloop={inView ? 'always' : 'never'}
          dpr={isMobile ? [1, 1.2] : [1, 1.45]}
          camera={{ position: [0, 0, isMobile ? 6.1 : 5.8], fov: 44 }}
          style={{ background: 'transparent', touchAction: 'pan-y' }}
          gl={{ alpha: true, antialias: !isMobile, powerPreference: 'default' }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <ambientLight intensity={0.9} />
          <pointLight position={[5, 5, 5]} intensity={1.8} color="#00bfff" />
          <GlobeNodes activeNode={activeNode} setActiveNode={setActiveNode} isMobile={isMobile} />
          {!isMobile && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.65}
              dampingFactor={0.08}
              enableDamping
            />
          )}
        </Canvas>
      )}
    </div>
  );
}
