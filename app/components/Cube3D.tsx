'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import * as THREE from 'three'

interface FaceConfig {
  position: [number, number, number]
  rotation: [number, number, number]
  label: string
  color: string
  route: string
}

const faces: FaceConfig[] = [
  { position: [0, 0, 1.01], rotation: [0, 0, 0], label: 'WORK', color: '#3b82f6', route: '/work' },
  { position: [0, 0, -1.01], rotation: [0, Math.PI, 0], label: 'WRITING', color: '#8b5cf6', route: '/writing' },
  { position: [1.01, 0, 0], rotation: [0, Math.PI / 2, 0], label: 'DESIGN', color: '#ec4899', route: '/design' },
  { position: [-1.01, 0, 0], rotation: [0, -Math.PI / 2, 0], label: 'CODE', color: '#10b981', route: '/code' },
  { position: [0, 1.01, 0], rotation: [-Math.PI / 2, 0, 0], label: 'ABOUT', color: '#f59e0b', route: '/about' },
  { position: [0, -1.01, 0], rotation: [Math.PI / 2, 0, 0], label: 'CONTACT', color: '#ef4444', route: '/contact' },
]

function CubeFace({ position, rotation, label, color, onHover, onLeave, onClick }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          onHover()
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
          onLeave()
        }}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial
          color={hovered ? color : '#1a1a1a'}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.25}
        color={hovered ? '#ffffff' : '#888888'}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  )
}

function Cube() {
  const groupRef = useRef<THREE.Group>(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const router = useRouter()

  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.x += delta * 0.1
      groupRef.current.rotation.y += delta * 0.15
    }
  })

  const handleFaceClick = (route: string) => {
    setAutoRotate(false)
    setTimeout(() => {
      router.push(route)
    }, 300)
  }

  return (
    <group ref={groupRef}>
      {/* Wireframe cube */}
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="#333333" wireframe />
      </mesh>

      {/* Faces */}
      {faces.map((face, index) => (
        <CubeFace
          key={index}
          {...face}
          onHover={() => setAutoRotate(false)}
          onLeave={() => setAutoRotate(true)}
          onClick={() => handleFaceClick(face.route)}
        />
      ))}
    </group>
  )
}

export default function Cube3D() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Cube />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={3 * Math.PI / 4}
        />
      </Canvas>
    </div>
  )
}
