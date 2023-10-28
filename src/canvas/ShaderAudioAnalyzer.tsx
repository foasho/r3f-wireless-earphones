import { useEffect, useRef } from "react";
import vertexShader from "../glsl/audio.vert";
import fragmentShader from "../glsl/audio.frag";
import { Color, PointLight, ShaderMaterial } from "three";
import { useControls } from "leva";
import { suspend } from "suspend-react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useStore } from "../utils/store";
import { createAudio } from "../utils/audio";

type ShaderAudioAnalyzerProps = {
  url : string;
  position? : [number, number, number];
  rotation? : [number, number, number];
  scale? : number | [number, number, number];
};
export const ShaderAudioAnalyzer = (
  { url, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1.5 }: ShaderAudioAnalyzerProps
) => {
  const ref = useRef<ShaderMaterial>(null);
  const pointRef = useRef<PointLight>(null);
  const { speakerMode } = useStore();
  const texture = useTexture("cafe-tiny.jpg");
  
  const viewport = useThree((state) => state.viewport);

  const { gain, context, update, data } = suspend(() => createAudio(url), [url]);

  useEffect(() => {
    gain.connect(context.destination);
    return () => gain.disconnect();
  }, [gain, context]);

  const { color1, color2, volume } = useControls({
    color1: "#FFFFFF",
    color2: "#1E2D4A",
    volume: {
      value: 0.5,
      min: 0.0,
      max: 1.0,
      step: 0.01
    },
  });

  const shaderMaterial = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uColor1: { value: new Color(color1) },
      uColor2: { value: new Color(color2) },
      uDataLength: { value: data.length / 4 },
      uAvg: { value: 0.0 },
      uAmbientSound: { value: speakerMode === "ambient sound" ? 1.0 : 0.0},
      uTex: { value: texture },
    }
  });

  useFrame((state, delta) => {
    if (!ref.current) return;
    let avg = update();
    if (avg > 0.0) {
      gain.gain.value = volume;
      const _a = avg / 225 > 1.0 ? 1.0 : avg / 225;
      shaderMaterial.uniforms.uAvg.value = _a;
      if (pointRef.current){
        pointRef.current.intensity = _a * 10;
      }
    }
  });

  return (
    <>
      <group
        position={position}
        rotation={rotation}
        scale={scale}
      >
        <mesh>
          <planeGeometry args={[viewport.width, viewport.height, 1]}/>
          <primitive object={shaderMaterial} ref={ref} attach="material"/>
        </mesh>
        <pointLight 
          ref={pointRef}
          castShadow 
          intensity={3} 
          position={[0.1, -1.5, 1.5]} 
          color={color1} 
        />
        <mesh receiveShadow position={[0, 0, 0.01]}>
          <planeGeometry args={[viewport.width, viewport.height, 1]} />
          <meshStandardMaterial 
            color={color1} 
            transparent
            opacity={0.2}
          />
        </mesh>
      </group>
    </>
  )
};

