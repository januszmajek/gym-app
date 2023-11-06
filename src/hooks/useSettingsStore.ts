import { create } from "zustand";

interface SettingsStore {
    theme: string;
    distanceUnit: string;
    weightUnit: string;
    lengthUnit: string;
    changeTheme: (unit: string) => void;
    changeDistanceUnit: (unit: string) => void;
    changeWeightUnit: (unit: string) => void;
    changeLengthUnit: (unit: string) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
    theme: "Jasny",
    changeTheme: (newTheme: string) => set({ theme: newTheme }),
    distanceUnit: "Kilometr",
    changeDistanceUnit: (unit: string) => set({ distanceUnit: unit }),
    weightUnit: "Kilogram",
    changeWeightUnit: (unit: string) => set({ weightUnit: unit }),
    lengthUnit: "Centymetr",
    changeLengthUnit: (unit: string) => set({ lengthUnit: unit }),
}));
