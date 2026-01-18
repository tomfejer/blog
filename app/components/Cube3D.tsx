'use client'

import { useRef, useState } from 'react'
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

// More subtle colors
const faces: FaceConfig[] = [
  {
    position: [0, 0, 1.01],
    rotation: [0, 0, 0],
    label: 'WORK',
    color: '#2d3748',
    route: '/work',
    normal: new THREE.Vector3(0, 0, 1)
  },
  {
    position: [0, 0, -1.01],
    rotation: [0, Math.PI, 0],
    label: 'WRITING',
    color: '#3a3052',
    route: '/writing',
    normal: new THREE.Vector3(0, 0, -1)
  },
  {
    position: [1.01, 0, 0],
    rotation: [0, Math.PI / 2, 0],
    label: 'DESIGN',
    color: '#3d2942',
    route: '/design',
    normal: new THREE.Vector3(1, 0, 0)
  },
  {
    position: [-1.01, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
    label: 'CODE',
    color: '#1e4d3f',
    route: '/code',
    normal: new THREE.Vector3(-1, 0, 0)
  },
  {
    position: [0, 1.01, 0],
    rotation: [-Math.PI / 2, 0, 0],
    label: 'ABOUT',
    color: '#3d3226',
    route: '/about',
    normal: new THREE.Vector3(0, 1, 0)
  },
  {
    position: [0, -1.01, 0],
    rotation: [Math.PI / 2, 0, 0],
    label: 'CONTACT',
    color: '#3f2832',
    route: '/contact',
    normal: new THREE.Vector3(0, -1, 0)
  },
]

function Ground() {
  return (
    <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -2, 0]}>
      <planeGeometry args={[50, 50]} />
      <shadowMaterial opacity={0.3} />
    </mesh>
  )
}

function CubeFace({ position, rotation, color }: any) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.1}
          metalness={0.2}
          roughness={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  )
}

function Cube({ onFaceChange }: { onFaceChange: (face: FaceConfig) => void }) {
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  const [isUserRotating, setIsUserRotating] = useState(false)
  const [targetQuaternion, setTargetQuaternion] = useState<THREE.Quaternion | null>(null)
  const [snapTimer, setSnapTimer] = useState(0)
  const lastInteractionTime = useRef(Date.now())
  const currentFaceRef = useRef<FaceConfig>(faces[0])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const timeSinceInteraction = Date.now() - lastInteractionTime.current

    // Detect which face is facing camera
    const cameraDirection = new THREE.Vector3()
    camera.getWorldDirection(cameraDirection)
    cameraDirection.negate()

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

    // Update face if changed
    if (closestFace !== currentFaceRef.current) {
      currentFaceRef.current = closestFace
      onFaceChange(closestFace)
    }

    // Snapping logic when user stops rotating
    if (!isUserRotating && timeSinceInteraction > 200 && timeSinceInteraction < 300) {
      // Calculate target quaternion to face the closest face toward camera
      const targetQuat = calculateFaceQuaternion(closestFace.normal, cameraDirection)
      setTargetQuaternion(targetQuat)
      setSnapTimer(0)
    }

    // Smooth snap to target
    if (targetQuaternion && !isUserRotating) {
      groupRef.current.quaternion.slerp(targetQuaternion, 0.1)

      const angleDiff = groupRef.current.quaternion.angleTo(targetQuaternion)

      if (angleDiff < 0.01) {
        setSnapTimer(prev => prev + delta)

        // After 2 seconds, start gentle rotation
        if (snapTimer > 2) {
          const euler = new THREE.Euler().setFromQuaternion(groupRef.current.quaternion)
          euler.x += delta * 0.03
          euler.y += delta * 0.05
          groupRef.current.quaternion.setFromEuler(euler)
        }
      }
    }
  })

  const calculateFaceQuaternion = (faceNormal: THREE.Vector3, cameraDir: THREE.Vector3): THREE.Quaternion => {
    // Create a quaternion that rotates the face normal to align with camera direction
    const targetDir = cameraDir.clone().normalize()
    const currentNormal = faceNormal.clone().normalize()

    const quaternion = new THREE.Quaternion()
    quaternion.setFromUnitVectors(currentNormal, targetDir)

    // Apply to current rotation
    return quaternion.multiply(groupRef.current!.quaternion)
  }

  const handleRotationStart = () => {
    setIsUserRotating(true)
    setTargetQuaternion(null)
    setSnapTimer(0)
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
            color="#1a1a1a"
            wireframe
            opacity={0.2}
            transparent
          />
        </mesh>

        {/* Solid inner cube for depth */}
        <mesh castShadow scale={0.98}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.6}
            roughness={0.4}
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
        {/* Enhanced lighting with softer shadows */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-bias={-0.0001}
        />
        <pointLight position={[10, 10, 10]} intensity={0.3} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} color="#6666ff" />

        {/* Subtle environment */}
        <Environment preset="city" />

        {/* Ground plane for shadows */}
        <Ground />

        <Cube onFaceChange={setCurrentFace} />
      </Canvas>

      {/* Navigation Button */}
      <div className="fixed bottom-12 left-0 right-0 flex justify-center z-20 pointer-events-none">
        <button
          onClick={handleNavigate}
          className="pointer-events-auto group relative px-8 py-4 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full hover:bg-black transition-all hover:scale-105 active:scale-95"
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
