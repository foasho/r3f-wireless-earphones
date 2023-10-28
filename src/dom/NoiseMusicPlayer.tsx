import { useStore } from "../utils/store";
import { useEffect, useRef} from "react";

type NoiseMusicPlayerProps = {
  url : string;
};
export const NoiseMusicPlayer = (
  { url }: NoiseMusicPlayerProps
) => {

  const ref = useRef<HTMLAudioElement>(null);
  const { speakerMode } = useStore();

  useEffect(() => {
    if (!ref.current) return;
    if (speakerMode === "ambient sound" || speakerMode === "normal") {
      ref.current.play();
      if (speakerMode === "ambient sound") {
        ref.current.volume = 1.0;
      }
      else if (speakerMode === "normal") {
        ref.current.volume = 0.5;
      }
    }
    else {
      ref.current.pause();
    }
    return () => ref.current?.pause();
  }, [speakerMode]);

  return (
    <div>
      <audio
        ref={ref}
        autoPlay
        loop
        src={url}
      />
    </div>
  )
}