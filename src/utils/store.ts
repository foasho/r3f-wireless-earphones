import { create } from 'zustand';

interface State {
  volume: number;
  downVolume: () => void;
  upVolume: () => void;
  speakerMode: "noise canceling" | "ambient sound" | "normal";
  changeSpeakerMode: (mode: "noise canceling" | "ambient sound" | "normal") => void;
};

export const useStore = create<State>((set) => ({
  volume: 0.5,
  downVolume: () => set((state) => ({ volume: (state.volume - 0.1) < 0 ? 0 : state.volume - 0.1 })),
  upVolume: () => set((state) => ({ volume: (state.volume + 0.1) > 1 ? 1 : state.volume + 0.1 })),
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