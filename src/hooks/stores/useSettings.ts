import { create } from "zustand";

interface SettingsStore {
    distanceUnit: string;
    weightUnit: string;
    lengthUnit: string;
    vibrate: boolean;
    keepScreenOn: boolean;
    switchKeepScreenOn: () => void;
    switchVibrate: () => void;
    changeLengthUnit: (unit: string) => void;
    changeWeightUnit: (unit: string) => void;
    changeDistanceUnit: (unit: string) => void;
}

const useSettings = create<SettingsStore>((set) => ({
    distanceUnit: "Kilometr",
    weightUnit: "Kilogram",
    vibrate: true,
    lengthUnit: "Centymetr",
    keepScreenOn: true,
    switchKeepScreenOn: () =>
        set((state) => ({
            ...state,
            keepScreenOn: !state.keepScreenOn,
        })),
    changeLengthUnit: (unit: string) => set({ lengthUnit: unit }),
    switchVibrate: () =>
        set((state) => ({
            ...state,
            vibrate: !state.vibrate,
        })),
    changeWeightUnit: (unit: string) => set({ weightUnit: unit }),
    changeDistanceUnit: (unit: string) => set({ distanceUnit: unit }),
}));

export default useSettings;
