import { Canvas } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei'
import { Suspense } from 'react'

function GlassOrb({ position, scale = 1, speed = 1 }) {
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh position={position} scale={scale} rotation={[0.4, 0.2, 0]}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          resolution={256}
          transmission={0.95}
          roughness={0.12}
          thickness={0.7}
          ior={1.2}
          chromaticAberration={0.025}
          color="#D6D6D6"
          attenuationColor="#898A8C"
          attenuationDistance={2}
        />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 4, 5]} intensity={3} />
      <pointLight position={[-4, -2, 2]} intensity={18} color="#D6D6D6" />
      <GlassOrb position={[0.8, 0.15, 0]} scale={1.25} speed={0.8} />
      <GlassOrb position={[-1.25, -0.9, -1]} scale={0.42} speed={1.2} />
      <GlassOrb position={[1.9, 1.1, -1.5]} scale={0.25} speed={1.5} />
      <Environment preset="city" />
    </>
  )
}

export default function HeroScene() {
  return (
    <div className="hero-scene" aria-label="Floating translucent 3D forms" role="img">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}><Scene /></Suspense>
      </Canvas>
      <div className="scene-orbit scene-orbit--one" />
      <div className="scene-orbit scene-orbit--two" />
      <span className="scene-label">DIGITAL CRAFT · 01</span>
    </div>
  )
}