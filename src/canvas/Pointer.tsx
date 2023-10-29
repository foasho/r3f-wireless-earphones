import { Html, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Mesh } from "three";

type PointerProps = {
  position: [number, number, number];
  color?: string;
  hoverColor?: string;
  onClick?: () => void;
};
export const Pointer = (
  { 
    position,
    color = "#f0f8ff",
    hoverColor = "#00bfff",
    onClick = () => {}
  }: PointerProps
) => {

  const ringRef = useRef<Mesh>(null);
  const [onHovered, setOnHovered] = useState(false);

  useCursor(onHovered);

  const fract = (x: number) => {
    return x - Math.floor(x);
  };

  useFrame((state, delta) => {
    if (ringRef.current){
      const time = state.clock.getElapsedTime();
      ringRef.current.scale.set(
        0.8 + fract(time/2) * 0.75,
        0.8 + fract(time/2) * 0.75,
        0.8,
      );
    }
  });

  return (
    <group
      position={position}
      onClick={onClick}
    >
      <mesh
        onPointerOver={() => setOnHovered(true)}
        onPointerOut={() => setOnHovered(false)}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={onHovered ? hoverColor : color} />
      </mesh>
      <mesh
        ref={ringRef}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.8}
      >
        <ringGeometry args={[0.4, 0.45, 32]} />
        <meshStandardMaterial color={onHovered ? hoverColor : color} roughness={0.75} transparent />
      </mesh>
    </group>
  )
}