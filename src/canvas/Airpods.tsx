import { useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

type AirpodsProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number] | number;
};
export const Airpods = (
  { 
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1] 
  }: AirpodsProps
) => {
  const { nodes, materials } = useGLTF('/Airpods.glb') as any;
  return (
    <Suspense fallback={null}>
      <group
        position={position}
        rotation={rotation}
        scale={scale}
      >
        <group position={[-11.308, 5.52, -5.535]} rotation={[0.427, 0.155, 2.453]}>
          <mesh geometry={nodes.airpods.geometry} material={materials['Paint_-_Enamel_Glossy_(White)']} castShadow />
          <mesh geometry={nodes.airpods_1.geometry} material={materials['Steel_-_Satin']} castShadow />
          <mesh geometry={nodes.airpods_2.geometry} material={materials.Chrome} castShadow />
        </group>
        <group position={[14.864, 5.489, 7.139]} rotation={[0.468, -0.354, 0.897]}>
          <mesh geometry={nodes.airpods001.geometry} material={materials['Paint_-_Enamel_Glossy_(White)']} castShadow/>
          <mesh geometry={nodes.airpods001_1.geometry} material={materials['Steel_-_Satin']} castShadow />
          <mesh geometry={nodes.airpods001_2.geometry} material={materials.Chrome} castShadow />
        </group>
      </group>
    </Suspense>
  )
}

useGLTF.preload('/Airpods.glb');