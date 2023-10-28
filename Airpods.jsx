/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.14 public/airpods.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/airpods.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[-11.308, 5.52, -5.535]} rotation={[0.427, 0.155, 2.453]}>
        <mesh geometry={nodes.airpods.geometry} material={materials['Paint_-_Enamel_Glossy_(White)']} />
        <mesh geometry={nodes.airpods_1.geometry} material={materials['Steel_-_Satin']} />
        <mesh geometry={nodes.airpods_2.geometry} material={materials.Chrome} />
      </group>
      <group position={[14.864, 5.489, 7.139]} rotation={[0.468, -0.354, 0.897]}>
        <mesh geometry={nodes.airpods001.geometry} material={materials['Paint_-_Enamel_Glossy_(White)']} />
        <mesh geometry={nodes.airpods001_1.geometry} material={materials['Steel_-_Satin']} />
        <mesh geometry={nodes.airpods001_2.geometry} material={materials.Chrome} />
      </group>
    </group>
  )
}

useGLTF.preload('/airpods.glb')
