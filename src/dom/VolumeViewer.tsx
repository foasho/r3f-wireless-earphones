import { useEffect, useRef, useState } from "react";
import { useStore } from "../utils/store";
import { Howl } from "howler";

export const VolumeViewer = () => {

  const timer = useRef<any>(null);
  const [opacity, setOpacity] = useState(1);
  const { volume } = useStore();
  const sound = new Howl({ src: ["/co.mp3"] });

  const downOpacity = () => {
    setOpacity((prev) => {
      if (prev <= 0.0) return prev;
      return prev - 0.05;
    })
  };

  useEffect(() => {
    sound.play();
    // opacityを1に戻す
    setOpacity(1);
    if (timer.current) clearTimeout(timer.current);
    // 3秒後にopacityを下げる
    timer.current = setTimeout(() => {
      // 0.5秒事にopacityを下げる
      for (let i = 0; i < 20; i++) {
        setTimeout(downOpacity, i * 100);
      }
    }, 3000);
      
    // return () => clearInterval(interval);
  }, [volume]);

  return (
    <div 
      className="absolute top-32 right-12 z-20 px-6 py-8 bg-gray-400/50 rounded-2xl"
      style={{
        opacity: opacity
      }}
    >
      <div className="flex flex-col flex-nowrap justify-end w-2 h-32 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
        <div 
          className="bg-blue-500 overflow-hidden" 
          role="progressbar" 
          style={{
            height: `${volume * 100}%`
          }}
        ></div>
      </div>
    </div>
  )
};