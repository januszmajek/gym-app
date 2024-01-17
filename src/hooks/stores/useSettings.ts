import { create } from "zustand";

interface SettingsStore {
    weightUnit: string;
    vibrate: boolean;
    keepScreenOn: boolean;
    switchKeepScreenOn: () => void;
    switchVibrate: () => void;
    changeWeightUnit: (unit: string) => void;
}

const useSettings = create<SettingsStore>((set) => ({
    weightUnit: "Kilogram",
    vibrate: true,
    keepScreenOn: true,
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
    changeWeightUnit: (unit: string) => set({ weightUnit: unit }),
}));

export default useSettings;
