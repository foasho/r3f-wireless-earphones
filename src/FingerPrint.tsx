import { HiFingerPrint } from "react-icons/hi2";
import { useFingerprintStore } from "./utils/store";
import { useRef } from "react";

export const FingerPrint = () => {

  const { fingerprint, setFingerprint } = useFingerprintStore();

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white/90 z-50 select-none">
      <div className="w-full h-full justify-center items-center flex">
        <div className="text-center items-center">
          <div className="w-full text-center">
            <span>
              Tap to Play
            </span>
          </div>
          <span 
            className="cursor-pointer mt-3 rounded-full select-none text-center mx-auto"
            onPointerDown={(e) => {
              e.preventDefault();
              if (!fingerprint){
                setFingerprint(true);
              }
            }}
          >
            <HiFingerPrint className="w-32 h-32" />
          </span>
        </div>
      </div>
    </div>
  )
};