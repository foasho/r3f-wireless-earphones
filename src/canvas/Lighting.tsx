import { Environment, Lightformer, Float } from '@react-three/drei';

export const Lighting = () => {

  return (
    <>
      <color attach="background" args={['#f0f0f0']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-3, 5, -1]} intensity={1.2} castShadow>
      </directionalLight>
      <Environment resolution={32}>
        <Lightformer position={[10, 10, 10]} scale={10} intensity={4} color="#f2f2f2" />
        {/** Animation Lightformers */}
        <Float speed={5} floatIntensity={2} rotationIntensity={2}>
          <Lightformer position={[-10, -10, -10]} scale={10} intensity={4} />
          <Lightformer 
            position={[10, 0, -10]} 
            scale={10} 
            color="#b7cfff" 
            intensity={6} 
          />
          <Lightformer
            position={[0, 10, -10]}
            scale={5}
            color="#f5deb3"
            intensity={3}
          />
        </Float>
      </Environment>
    </>
  )
}