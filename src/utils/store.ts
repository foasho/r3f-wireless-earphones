import { create } from 'zustand';

interface State {
  speakerMode: "noise canceling" | "ambient sound" | "normal";
  changeSpeakerMode: (mode: "noise canceling" | "ambient sound" | "normal") => void;
};

export const useStore = create<State>((set) => ({
  speakerMode: "noise canceling",
  changeSpeakerMode: (mode) => set({ speakerMode: mode }),
}));

export const getSpeakerModeText = (mode: "noise canceling" | "ambient sound" | "normal") => {
  switch (mode) {
    case "noise canceling":
      return "Noise Canceling";
    case "ambient sound":
      return "Ambient Sound";
    case "normal":
      return "Normal Mode";
  }
}

interface IFingerprintState {
  fingerprint: boolean;
  setFingerprint: (fingerprint: boolean) => void;
};

export const useFingerprintStore = create<IFingerprintState>((set) => ({
  fingerprint: false,
  setFingerprint: (fingerprint) => set({ fingerprint: fingerprint }),
}));