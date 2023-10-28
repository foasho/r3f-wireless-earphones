import { Canvas, CanvasProps, useThree } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { ShaderComponent } from "./Shader";
import { Airpods } from "./Airpods";
import { Lighting } from "./Lighting";
import { Effects } from "./Effects";
import { Footer } from "./Footer";
import { ResizeProvider, useResize } from "./ResizeProvider";
import { useEffect, useRef } from "react";
import { PerspectiveCamera } from "three";
import { Controls } from "./Controls";
import { FingerPrint } from "./FingerPrint";
import { useFingerprintStore } from "./utils/store";
import { ShaderAudioAnalyzer } from "./ShaderAudioAnalyzer";

function App() {

  const { fingerprint } = useFingerprintStore();

  return (
    <div className="relative" style={{ height: "100dvh", width: "100dvw" }}>
      {!fingerprint && <FingerPrint />}
      <ResizeProvider>
        <Scene />
        <Controls />
        <Footer />
      </ResizeProvider>
    </div>
  )
}

const Scene = () => {

  return (
    <Canvas 
      shadows 
      camera={{ 
        position: [0, 8, 2]
      }}
    >
      <ambientLight intensity={1}/>
      <pointLight position={[3, 3, 3]}/>
      <directionalLight position={[-2, 3, 5]}/>
      <OrbitControls/>
      <Airpods scale={0.1} position={[0, 0, -1]} />
      <Lighting />
      <Effects />
      <ShaderAudioAnalyzer
        rotation={[-Math.PI/2, 0, 0]}
        scale={30}
      />
      <GizmoHelper alignment="top-right" margin={[75, 75]}>
        <GizmoViewport labelColor="white" axisHeadScale={1} />
      </GizmoHelper>
      <Monitor />
    </Canvas>
  )
}

const Monitor = () => {

  const { camera } = useThree();
  const { isMd } = useResize();

  useEffect(() => {
    if (camera instanceof PerspectiveCamera) {
      camera.fov = isMd ? 60 : 75;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
  }, [isMd]);

  return <></>
}

export default App