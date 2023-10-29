import clsx from "clsx";
import { useStore, getSpeakerModeText, useFingerprintStore } from "../utils/store";
import { MdNoiseAware, MdNoiseControlOff, MdHearing } from "react-icons/md";
import { useEffect } from "react";
import { playTextToSpeech } from "../utils/playTextToSpeech";

export const Controls = () => {

  const { speakerMode, changeSpeakerMode } = useStore();
  const { fingerprint } = useFingerprintStore();

  useEffect(() => {
    if (!fingerprint) return;
    playTextToSpeech({
      text: speakerMode, 
      lang: "en-US",
      volume: 1.5,
    });
  }, [speakerMode]);

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full text-center">
      <div className="w-full text-center mb-3">
        <span className="text-2xl font-bold md:text-4xl select-none text-gray-800">
          {getSpeakerModeText(speakerMode)}
        </span>
      </div>
      <div className="w-full xs:w-4/3 mx-auto px-6 mt-5 sm:px-12 max-w-[450px] md:max-w-[650px]">
        <div className="rounded-full bg-gray-200/90 w-auto justify-between flex shadow-xl">
          <span 
            className={clsx(
              "p-2 rounded-full cursor-pointer",
              speakerMode === "noise canceling" && "bg-white shadow-lg"
            )}
            onClick={() => changeSpeakerMode("noise canceling")}
          >
            <MdNoiseControlOff className="text-6xl md:text-8xl text-gray-400 inline" />
          </span>
          <span 
            className={clsx(
              "p-2 rounded-full cursor-pointer",
              speakerMode === "ambient sound" && "bg-white shadow-lg"
            )}
            onClick={() => changeSpeakerMode("ambient sound")}
          >
            <MdNoiseAware className="text-6xl md:text-8xl text-gray-400 inline" />
          </span>
          <span 
            className={clsx(
              "p-2 rounded-full cursor-pointer",
              speakerMode === "normal" && "bg-white shadow-lg"
            )}
            onClick={() => changeSpeakerMode("normal")}
          >
            <MdHearing className="text-6xl md:text-8xl text-gray-400 inline" />
          </span>
        </div>
      </div>
    </div>
  )
};