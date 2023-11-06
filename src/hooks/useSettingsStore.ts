import { create } from "zustand";

export const useSettingsStore = create(() => ({
    theme: "Jasny",
    changeTheme: (newTheme: string) => set(() => ({ theme: newTheme })),
    distanceUnit: "Kilometr",
    changeDistanceUnit: (unit: string) => set(() => ({ distanceUnit: unit })),
    weightUnit: "Kilogram",
    changeWeightUnit: (unit: string) => set(() => ({ weightUnit: unit })),
    lengthUnit: "Centymetr",
    changeLengthUnit: (unit: string) => set(() => ({ lengthUnit: unit })),
}));
