import { useEffect } from "react";
import { useStore } from "../utils/store";
import { Howl } from "howler";

export const VolumeViewer = () => {

  const { volume } = useStore();
  const sound = new Howl({ src: ["/co.mp3"] });

  useEffect(() => {
    sound.play();
  }, [volume]);

  return (
    <div className="absolute top-32 right-12 z-20">
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