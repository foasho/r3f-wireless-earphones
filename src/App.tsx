import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Airpods } from "./canvas/Airpods";
import { Lighting } from "./canvas/Lighting";
import { Effects } from "./canvas/Effects";
import { Footer } from "./dom/Footer";
import { ResizeProvider, useResize } from "./dom/ResizeProvider";
import { useEffect } from "react";
import { PerspectiveCamera } from "three";
import { Controls } from "./dom/Controls";
import { FingerPrint } from "./dom/FingerPrint";
import { useFingerprintStore, useStore } from "./utils/store";
import { ShaderAudioAnalyzer } from "./canvas/ShaderAudioAnalyzer";
import { NoiseMusicPlayer } from "./dom/NoiseMusicPlayer";
import { useControls } from "leva";
import { Header } from "./dom/Hearder";
import { Pointer } from "./canvas/Pointer";
import { VolumeViewer } from "./dom/VolumeViewer";

function App() {

  const { fingerprint } = useFingerprintStore();

  return (
    <div className="relative" style={{ height: "100dvh", width: "100dvw" }}>
      <Header />
      <VolumeViewer/>
      {!fingerprint && <FingerPrint />}
      <ResizeProvider>
        <Scene />
        <Controls />
        <NoiseMusicPlayer url="/noise.mp3" />
        <Footer />
      </ResizeProvider>
    </div>
  )
}

const Scene = () => {

  const { downVolume, upVolume } = useStore();
  const { fingerprint } = useFingerprintStore();

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
      <Airpods scale={0.1} position={[0, 0, -1]} />
      <Pointer position={[1.2, 0.8, 1]} onClick={upVolume} />
      <Pointer position={[-1.2, 0.8, -0.2]} onClick={downVolume} />
      <Lighting />
      <Effects />
      {fingerprint && 
        <ShaderAudioAnalyzer
          url="music-light.mp3"
          position={[
            0,
            0,
            -2.5
          ]}
          rotation={[-Math.PI/2, 0, 0]}
        />
      }
      <Monitor />
      {/* <Debug /> */}
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

const Debug = () => {
  const { orbit, gizmo } = useControls({
    orbit: false,
    gizmo: false
  });
  return (
    <>
      {orbit && <OrbitControls/>}
      {gizmo && 
        <GizmoHelper alignment="top-left" margin={[75, 75]}>
          <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
      }
    </>
  )
};

export default App