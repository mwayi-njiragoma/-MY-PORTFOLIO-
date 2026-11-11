import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import { useRef, useEffect, useMemo } from 'react'

const scrollState = { value: 0 }

function useWindowScrollProgress() {
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollState.value = max > 0 ? window.scrollY / max : 0
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
}

function Scene() {
  const group = useRef()
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useWindowScrollProgress()

  useFrame((state) => {
    if (reduceMotion || !group.current) return
    const t = state.clock.elapsedTime
    const s = scrollState.value

    group.current.rotation.y = t * 0.06 + s * Math.PI * 0.65
    group.current.rotation.x = Math.sin(t * 0.22) * 0.1 + s * 0.25
    group.current.position.y = (0.5 - s) * 1.9
    group.current.position.x = Math.sin(t * 0.15) * 0.12
  })

  const objects = useMemo(
    () => [
      { position: [-2.5, 1.3, -1.2], rotation: [0.2, 0.4, 0], scale: 1 },
      { position: [2.1, -0.4, -0.8], rotation: [-0.15, -0.35, 0.1], scale: 0.9 },
      { position: [-1.3, -1.6, -0.2], rotation: [0.35, 0.1, -0.2], scale: 1.05 },
      { position: [1.6, 1.7, -1.8], rotation: [-0.25, 0.2, 0.15], scale: 0.8 },
    ],
    [],
  )

  return (
    <group ref={group}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 4, 5]} intensity={2.4} />
      <pointLight position={[-3, -2, 2]} intensity={14} color="#D6D6D6" />

      <Float speed={1.1} rotationIntensity={0.45} floatIntensity={0.9}>
        <mesh position={[-2.25, 1.15, -1.1]} rotation={[0.25, 0.4, 0]}>
          <boxGeometry args={[1.15, 0.72, 0.16]} />
          <meshStandardMaterial
            color="#D6D6D6"
            wireframe
            transparent
            opacity={0.32}
          />
        </mesh>
      </Float>

      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.7}>
        <mesh position={[2.05, -0.55, -1]} rotation={[-0.2, -0.45, 0.15]}>
          <octahedronGeometry args={[0.78, 0]} />
          <meshStandardMaterial
            color="#898A8C"
            wireframe
            transparent
            opacity={0.45}
          />
        </mesh>
      </Float>

      <Float speed={0.9} rotationIntensity={0.35} floatIntensity={1.1}>
        <mesh position={[-1.1, -1.55, -0.1]} rotation={[0.5, 0.2, -0.3]}>
          <icosahedronGeometry args={[0.72, 1]} />
          <meshStandardMaterial
            color="#D6D6D6"
            wireframe
            transparent
            opacity={0.28}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh position={[1.5, 1.85, -1.9]} rotation={[0.35, -0.25, 0.2]}>
          <torusGeometry args={[0.72, 0.045, 18, 120]} />
          <meshStandardMaterial color="#898A8C" transparent opacity={0.42} />
        </mesh>
      </Float>

      <Text
        position={[-2.9, -0.2, 0.2]}
        fontSize={0.58}
        color="#D6D6D6"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.24}
      >
        {'</>'}
      </Text>
      <Text
        position={[2.7, 0.95, -0.4]}
        fontSize={0.62}
        color="#898A8C"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.24}
      >
        {'{}'}
      </Text>
      <Text
        position={[0.2, -2.0, 0.1]}
        fontSize={0.42}
        color="#D6D6D6"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.18}
      >
        0101
      </Text>

      {objects.map((object, index) => (
        <Float
          key={index}
          speed={0.8 + index * 0.18}
          rotationIntensity={0.25}
          floatIntensity={0.45}
        >
          <mesh position={object.position} rotation={object.rotation} scale={object.scale}>
            <boxGeometry args={[0.08, 0.08, 0.08]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? '#D6D6D6' : '#898A8C'}
              transparent
              opacity={0.35}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function ScrollingCsScene() {
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion) return null

  return (
    <div
      className="scrolling-cs-scene"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.72,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 46 }}
        dpr={[1, 1.4]}
        style={{ pointerEvents: 'none' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}