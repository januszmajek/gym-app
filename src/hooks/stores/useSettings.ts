import { create } from "zustand";

interface SettingsStore {
    weightUnit: string;
    vibrate: boolean;
    sound: boolean;
    keepScreenOn: boolean;
    switchKeepScreenOn: () => void;
    switchVibrate: () => void;
    switchSound: () => void;
    changeWeightUnit: (unit: string) => void;
}

const useSettings = create<SettingsStore>((set) => ({
    weightUnit: "Kilogram",
    vibrate: false,
    keepScreenOn: false,
    sound: false,
    switchKeepScreenOn: () =>
        set((state) => ({
            ...state,
            keepScreenOn: !state.keepScreenOn,
        })),
    switchVibrate: () =>
        set((state) => ({
            ...state,
            vibrate: !state.vibrate,
        })),
    switchSound: () =>
        set((state) => ({
            ...state,
            sound: !state.sound,
        })),
    changeWeightUnit: (unit: string) => set({ weightUnit: unit }),
}));

export default useSettings;
