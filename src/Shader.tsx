import { useRef } from "react";
import vertexShader from "./glsl/hello.vert";
import fragmentShader from "./glsl/hello.frag";
import { ShaderMaterial } from "three";
import { useControls } from "leva";

export const ShaderComponent = () => {
  const ref = useRef<ShaderMaterial>(null);
  const { progress } = useControls({
    progress: {
      step: 0.01,
      value: 0.5,
      max: 1.0,
      min: 0.0,
    }
  });

  const shaderMaterial = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uProgress: { value: progress }
    }
  });

  return (
    <mesh scale={3}>
      <planeGeometry args={[1, 1, 1]}/>
      <primitive object={shaderMaterial} ref={ref} attach="material"/>
    </mesh>
  )
}