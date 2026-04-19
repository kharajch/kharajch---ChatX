'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingShape({ position, geometry, speed, rotationAxis }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime * speed

    meshRef.current.position.y = position[1] + Math.sin(t) * 0.5
    meshRef.current.position.x = position[0] + Math.cos(t * 0.7) * 0.3

    meshRef.current.rotation.x += rotationAxis[0] * 0.003
    meshRef.current.rotation.y += rotationAxis[1] * 0.003
    meshRef.current.rotation.z += rotationAxis[2] * 0.003
  })

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0.06}
        wireframe
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function Particles({ count = 50 }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [count])

  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.02
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.03}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={0.15} color="#c6c6c6" />

      <FloatingShape
        position={[-4, 2, -3]}
        geometry={<icosahedronGeometry args={[1.2, 1]} />}
        speed={0.4}
        rotationAxis={[1, 0.5, 0.3]}
      />
      <FloatingShape
        position={[4, -1, -4]}
        geometry={<torusGeometry args={[0.8, 0.3, 16, 32]} />}
        speed={0.3}
        rotationAxis={[0.3, 1, 0.5]}
      />
      <FloatingShape
        position={[-2, -3, -2]}
        geometry={<octahedronGeometry args={[0.7, 0]} />}
        speed={0.5}
        rotationAxis={[0.5, 0.3, 1]}
      />
      <FloatingShape
        position={[3, 3, -5]}
        geometry={<dodecahedronGeometry args={[0.6, 0]} />}
        speed={0.35}
        rotationAxis={[1, 1, 0.5]}
      />
      <FloatingShape
        position={[0, -2, -6]}
        geometry={<torusKnotGeometry args={[0.5, 0.15, 64, 16]} />}
        speed={0.25}
        rotationAxis={[0.2, 0.8, 0.4]}
      />

      <Particles count={80} />
    </>
  )
}

export default function Scene3D({ className }) {
  return (
    <div className={className} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
