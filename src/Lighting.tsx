import { Environment, Lightformer, Float } from '@react-three/drei';

export const Lighting = () => {

  return (
    <>
    <color attach="background" args={['#f0f0f0']} />
    <ambientLight intensity={0.5} />
    <directionalLight position={[-10, 10, 5]} shadow-mapSize={[256, 256]} shadow-bias={-0.0001} castShadow>
      <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10]} />
    </directionalLight>
    <Environment resolution={32} frames={Infinity}>
      <Lightformer position={[10, 10, 10]} scale={10} intensity={4} color="#f2f2f2" />
      {/** Animation Lightformers */}
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer position={[-10, -10, -10]} scale={10} intensity={4} />
        <Lightformer 
          position={[10, 0, -10]} 
          scale={10} 
          color="#43D9D9" 
          intensity={6} 
        />

      </Float>
    </Environment>
    </>
  )
}