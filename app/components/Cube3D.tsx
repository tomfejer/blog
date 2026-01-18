'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import * as THREE from 'three'

interface FaceConfig {
  position: [number, number, number]
  rotation: [number, number, number]
  label: string
  color: string
  route: string
  normal: THREE.Vector3
}

const faces: FaceConfig[] = [
  {
    position: [0, 0, 1.01],
    rotation: [0, 0, 0],
    label: 'WORK',
    color: '#3b82f6',
    route: '/work',
    normal: new THREE.Vector3(0, 0, 1)
  },
  {
    position: [0, 0, -1.01],
    rotation: [0, Math.PI, 0],
    label: 'WRITING',
    color: '#8b5cf6',
    route: '/writing',
    normal: new THREE.Vector3(0, 0, -1)
  },
  {
    position: [1.01, 0, 0],
    rotation: [0, Math.PI / 2, 0],
    label: 'DESIGN',
    color: '#ec4899',
    route: '/design',
    normal: new THREE.Vector3(1, 0, 0)
  },
  {
    position: [-1.01, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
    label: 'CODE',
    color: '#10b981',
    route: '/code',
    normal: new THREE.Vector3(-1, 0, 0)
  },
  {
    position: [0, 1.01, 0],
    rotation: [-Math.PI / 2, 0, 0],
    label: 'ABOUT',
    color: '#f59e0b',
    route: '/about',
    normal: new THREE.Vector3(0, 1, 0)
  },
  {
    position: [0, -1.01, 0],
    rotation: [Math.PI / 2, 0, 0],
    label: 'CONTACT',
    color: '#ef4444',
    route: '/contact',
    normal: new THREE.Vector3(0, -1, 0)
  },
]

function CubeFace({ position, rotation, color }: any) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  )
}

function Cube({ onFaceChange }: { onFaceChange: (face: FaceConfig) => void }) {
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  const [isUserRotating, setIsUserRotating] = useState(false)
  const [snapTarget, setSnapTarget] = useState<THREE.Euler | null>(null)
  const [snapTimer, setSnapTimer] = useState(0)
  const lastInteractionTime = useRef(Date.now())
  const idleStartTime = useRef<number | null>(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const timeSinceInteraction = Date.now() - lastInteractionTime.current

    // Detect which face is facing camera
    const cameraDirection = new THREE.Vector3()
    camera.getWorldDirection(cameraDirection)
    cameraDirection.negate() // Face towards camera

    let closestFace = faces[0]
    let maxDot = -1

    faces.forEach(face => {
      const faceNormal = face.normal.clone()
      faceNormal.applyQuaternion(groupRef.current!.quaternion)
      const dot = faceNormal.dot(cameraDirection)
      if (dot > maxDot) {
        maxDot = dot
        closestFace = face
      }
    })

    // If user stopped rotating, start snap sequence
    if (!isUserRotating && timeSinceInteraction > 300 && timeSinceInteraction < 400) {
      // Calculate snap target rotation
      const targetRotation = calculateSnapRotation(groupRef.current.rotation, closestFace.normal)
      setSnapTarget(targetRotation)
      onFaceChange(closestFace)
      idleStartTime.current = Date.now()
    }

    // Snap to target
    if (snapTarget && !isUserRotating) {
      const current = groupRef.current.rotation
      current.x += (snapTarget.x - current.x) * 0.1
      current.y += (snapTarget.y - current.y) * 0.1
      current.z += (snapTarget.z - current.z) * 0.1

      const distance = Math.abs(snapTarget.x - current.x) +
                      Math.abs(snapTarget.y - current.y) +
                      Math.abs(snapTarget.z - current.z)

      if (distance < 0.01) {
        setSnapTimer(prev => prev + delta)
      }

      // After 2 seconds of being snapped, start auto-rotate
      if (snapTimer > 2 && idleStartTime.current) {
        const idleTime = Date.now() - idleStartTime.current
        if (idleTime > 2000) {
          groupRef.current.rotation.x += delta * 0.05
          groupRef.current.rotation.y += delta * 0.08
        }
      }
    }
  })

  const calculateSnapRotation = (current: THREE.Euler, targetNormal: THREE.Vector3): THREE.Euler => {
    // Snap to nearest 90-degree increment
    const snapToNearest90 = (angle: number) => Math.round(angle / (Math.PI / 2)) * (Math.PI / 2)

    return new THREE.Euler(
      snapToNearest90(current.x),
      snapToNearest90(current.y),
      snapToNearest90(current.z),
      current.order
    )
  }

  const handleRotationStart = () => {
    setIsUserRotating(true)
    setSnapTarget(null)
    setSnapTimer(0)
    idleStartTime.current = null
    lastInteractionTime.current = Date.now()
  }

  const handleRotationEnd = () => {
    setIsUserRotating(false)
    lastInteractionTime.current = Date.now()
  }

  return (
    <>
      <group ref={groupRef} scale={0.7}>
        {/* Main wireframe cube */}
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
          <CubeFace key={index} {...face} />
        ))}
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={3 * Math.PI / 4}
        enableDamping
        dampingFactor={0.05}
        onStart={handleRotationStart}
        onEnd={handleRotationEnd}
      />
    </>
  )
}

export default function Cube3D() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const [currentFace, setCurrentFace] = useState<FaceConfig>(faces[0])
  const router = useRouter()

  const handleNavigate = () => {
    router.push(currentFace.route)
  }

  return (
    <div className="w-full h-screen relative">
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

        <Cube onFaceChange={setCurrentFace} />
      </Canvas>

      {/* Navigation Button */}
      <div className="fixed bottom-12 left-0 right-0 flex justify-center z-20 pointer-events-none">
        <button
          onClick={handleNavigate}
          className="pointer-events-auto group relative px-8 py-4 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full hover:bg-black transition-all hover:scale-105 active:scale-95"
          style={{
            boxShadow: `0 0 20px ${currentFace.color}40`,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: currentFace.color }}
            />
            <span className="text-white font-medium tracking-wide">
              {currentFace.label}
            </span>
            <svg
              className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}
