import { useEffect, useMemo, useRef } from "react";
import vertexShader from "../glsl/audio.vert";
import fragmentShader from "../glsl/audio.frag";
import { Color, PointLight, ShaderMaterial } from "three";
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
  const { speakerMode, volume } = useStore();
  const texture = useTexture("cafe-tiny.jpg");
  
  const viewport = useThree((state) => state.viewport);

  const { gain, context, update, data } = suspend(() => createAudio(url), [url]);

  useEffect(() => {
    gain.connect(context.destination);
    return () => gain.disconnect();
  }, [gain, context]);

  const color1 = "#FFFFFF";

  const color2 = useMemo(() => {
    return speakerMode === "noise canceling" ? "#f0f8ff" : "#00bfff";
  }, [speakerMode]);

  const ambientSound = useMemo(() => {
    // ambient sound: 1.0, normal: 0.5, noisecanceling: 0.0
    switch(speakerMode){
      case "noise canceling":
        return 0.0;
      case "normal":
        return 0.5;
      case "ambient sound":
        return 1.0;
    }
  }, [speakerMode]);

  const shaderMaterial = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uColor1: { value: new Color(color1) },
      uColor2: { value: new Color(color2) },
      uDataLength: { value: data.length },
      uDataArray: { value: Array.from(data).map(d => d/255.) },
      uAvg: { value: 0.0 },
      uAmbientSound: { value: ambientSound },
      uTex: { value: texture },
    }
  });

  useFrame((_state, _delta) => {
    if (!ref.current) return;
    let avg = update();
    if (avg > 0.0) {
      const values = Array.from(data).map(d => d/255.);
      shaderMaterial.uniforms.uDataArray.value = values;
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
          intensity={5} 
          position={[0, 0.5, 0]} 
          color={speakerMode !== "ambient sound" ? color2 : "#FFFFFF"} 
        />
        <mesh receiveShadow position={[0, 0, 0.01]}>
          <planeGeometry args={[viewport.width, viewport.height, 1]} />
          <meshStandardMaterial 
            color={
              speakerMode !== "ambient sound" ? color2 : "#000000"
            } 
            transparent
            opacity={0.25}
            roughness={1.0}
          />
        </mesh>
      </group>
    </>
  )
};

