import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron, Octahedron, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedShapeProps {
  position: [number, number, number];
  color: string;
  shape: 'icosahedron' | 'octahedron' | 'torus' | 'box';
  scale?: number;
  speed?: number;
}

function AnimatedShape({ position, color, shape, scale = 1, speed = 1 }: AnimatedShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  const ShapeComponent = {
    icosahedron: Icosahedron,
    octahedron: Octahedron,
    torus: Torus,
    box: Box,
  }[shape];

  const args = shape === 'torus' ? [1, 0.4, 16, 32] : shape === 'box' ? [1, 1, 1] : [1, 0];

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <ShapeComponent ref={meshRef} args={args as any} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </ShapeComponent>
    </Float>
  );
}

interface FloatingShapeProps {
  className?: string;
}

export function FloatingShape({ className }: FloatingShapeProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
        <spotLight position={[0, 5, 5]} intensity={0.8} color="#00f0ff" angle={0.3} />
        
        <AnimatedShape 
          position={[0, 0, 0]} 
          color="#00f0ff" 
          shape="icosahedron" 
          scale={1.5}
          speed={0.5}
        />
        <AnimatedShape 
          position={[-3, 1.5, -2]} 
          color="#a855f7" 
          shape="octahedron" 
          scale={0.6}
          speed={0.8}
        />
        <AnimatedShape 
          position={[3, -1, -1]} 
          color="#00f0ff" 
          shape="torus" 
          scale={0.5}
          speed={0.6}
        />
        <AnimatedShape 
          position={[-2, -2, 1]} 
          color="#a855f7" 
          shape="box" 
          scale={0.4}
          speed={1.2}
        />
      </Canvas>
    </div>
  );
}

export function SmallFloatingShape({ className }: FloatingShapeProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00f0ff" />
        
        <AnimatedShape 
          position={[0, 0, 0]} 
          color="#00f0ff" 
          shape="octahedron" 
          scale={1}
          speed={0.4}
        />
      </Canvas>
    </div>
  );
}
