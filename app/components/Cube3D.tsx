'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import * as THREE from 'three'

interface FaceConfig {
  position: [number, number, number]
  rotation: [number, number, number]
  targetRotation: [number, number, number]
  label: string
  color: string
  route: string
}

const faces: FaceConfig[] = [
  {
    position: [0, 0, 1.01],
    rotation: [0, 0, 0],
    targetRotation: [0, 0, 0],
    label: 'WORK',
    color: '#3b82f6',
    route: '/work'
  },
  {
    position: [0, 0, -1.01],
    rotation: [0, Math.PI, 0],
    targetRotation: [0, Math.PI, 0],
    label: 'WRITING',
    color: '#8b5cf6',
    route: '/writing'
  },
  {
    position: [1.01, 0, 0],
    rotation: [0, Math.PI / 2, 0],
    targetRotation: [0, -Math.PI / 2, 0],
    label: 'DESIGN',
    color: '#ec4899',
    route: '/design'
  },
  {
    position: [-1.01, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
    targetRotation: [0, Math.PI / 2, 0],
    label: 'CODE',
    color: '#10b981',
    route: '/code'
  },
  {
    position: [0, 1.01, 0],
    rotation: [-Math.PI / 2, 0, 0],
    targetRotation: [Math.PI / 2, 0, 0],
    label: 'ABOUT',
    color: '#f59e0b',
    route: '/about'
  },
  {
    position: [0, -1.01, 0],
    rotation: [Math.PI / 2, 0, 0],
    targetRotation: [-Math.PI / 2, 0, 0],
    label: 'CONTACT',
    color: '#ef4444',
    route: '/contact'
  },
]

function CubeFace({ position, rotation, label, color, onHover, onLeave, onClick, isSnapping }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (meshRef.current) {
      // Pulse animation on hover
      const targetScale = hovered ? 1.02 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.1)
    }
  })

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onPointerOver={(e) => {
          if (!isSnapping) {
            e.stopPropagation()
            setHovered(true)
            onHover()
            document.body.style.cursor = 'pointer'
          }
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
          onLeave()
          document.body.style.cursor = 'default'
        }}
        onClick={(e) => {
          if (!isSnapping) {
            e.stopPropagation()
            onClick()
          }
        }}
      >
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial
          color={hovered ? color : '#1a1a1a'}
          emissive={color}
          emissiveIntensity={hovered ? 0.6 : 0.15}
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  )
}

function Cube() {
  const groupRef = useRef<THREE.Group>(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const [isSnapping, setIsSnapping] = useState(false)
  const [targetRotation, setTargetRotation] = useState<[number, number, number] | null>(null)
  const router = useRouter()

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (isSnapping && targetRotation) {
        // Smooth snap to target rotation
        const current = groupRef.current.rotation
        const target = new THREE.Euler(...targetRotation)

        current.x += (target.x - current.x) * 0.1
        current.y += (target.y - current.y) * 0.1
        current.z += (target.z - current.z) * 0.1

        // Check if close enough to target
        const distance = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) + Math.abs(target.z - current.z)
        if (distance < 0.01) {
          setIsSnapping(false)
        }
      } else if (autoRotate) {
        // Gentle idle rotation
        groupRef.current.rotation.x += delta * 0.08
        groupRef.current.rotation.y += delta * 0.12
      }
    }
  })

  const handleFaceClick = (face: FaceConfig) => {
    setAutoRotate(false)
    setIsSnapping(true)
    setTargetRotation(face.targetRotation)

    // Navigate after snap animation
    setTimeout(() => {
      router.push(face.route)
    }, 800)
  }

  return (
    <group ref={groupRef} scale={0.7}>
      {/* Main cube with shadows */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#222222"
          wireframe
          opacity={0.3}
          transparent
        />
      </mesh>

      {/* Solid inner cube for depth */}
      <mesh scale={0.98}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Faces */}
      {faces.map((face, index) => (
        <CubeFace
          key={index}
          {...face}
          isSnapping={isSnapping}
          onHover={() => !isSnapping && setAutoRotate(false)}
          onLeave={() => !isSnapping && setAutoRotate(true)}
          onClick={() => handleFaceClick(face)}
        />
      ))}
    </group>
  )
}

export default function Cube3D() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <div className="w-full h-screen">
      <Canvas
        shadows
        camera={{
          position: [0, 0, isMobile ? 6 : 5],
          fov: isMobile ? 60 : 50
        }}
      >
        {/* Enhanced lighting setup */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4444ff" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        {/* Environment for reflections */}
        <Environment preset="city" />

        <Cube />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={3 * Math.PI / 4}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  )
}
