import { useRef } from "react";
import vertexShader from "./glsl/hello.vert";
import fragmentShader from "./glsl/hello.frag";
import { ShaderMaterial } from "three";
import { useControls } from "leva";

type ShaderAudioAnalyzerProps = {
  position? : [number, number, number];
  rotation? : [number, number, number];
  scale? : number;
};
export const ShaderAudioAnalyzer = (
  { position = [0, 0, 0], rotation = [0, 0, 0], scale = 3.0 }: ShaderAudioAnalyzerProps
) => {
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
    <mesh
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <planeGeometry args={[1, 1, 1]}/>
      <primitive object={shaderMaterial} ref={ref} attach="material"/>
    </mesh>
  )
};