import { useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Group, Mesh } from "three";

const fract = (x: number) => {
  return x - Math.floor(x);
};

// 値と値の間を取得する
const lerp = (a: number, b: number, t: number) => {
  return (1 - t) * a + t * b;
};

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
    hoverColor = "#FFA500",
    onClick = () => {}
  }: PointerProps
) => {

  const grp = useRef<Group>(null);
  const ringRef = useRef<Mesh>(null);
  const [onHovered, setOnHovered] = useState(false);

  useCursor(onHovered);

  useFrame((state, _delta) => {
    const time = state.clock.getElapsedTime();
    if (ringRef.current){
      ringRef.current.scale.set(
        0.8 + fract(time/2) * 0.35,
        0.8 + fract(time/2) * 0.35,
        0.8,
      );
    }
    if (grp.current){
      // childrenのopacityを変更する
      grp.current.children.forEach((child) => {
        if (child instanceof Mesh) {
          // 0~1の間でsin波を生成
          const t = Math.sin(time * 2) * 0.5 + 0.5;
          child.material.opacity = lerp(0.4, 0.8, t);
        }
      });
    }
  });

  return (
    <group
      ref={grp}
      position={position}
      onClick={onClick}
    >
      <mesh
        onPointerOver={() => setOnHovered(true)}
        onPointerOut={() => setOnHovered(false)}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color={onHovered ? hoverColor : color} 
          transparent 
        />
      </mesh>
      <mesh
        ref={ringRef}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.8}
      >
        <ringGeometry args={[0.4, 0.425, 32]} />
        <meshStandardMaterial 
          color={onHovered ? hoverColor : color} 
          roughness={0.75} 
          transparent 
        />
      </mesh>
    </group>
  )
}