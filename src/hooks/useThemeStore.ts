import { create } from "zustand";

interface ThemeStore {
    value: string;
    changeValue: (unit: string) => void;
}

const useThemeStore = create<ThemeStore>((set) => ({
    value: "Jasny",
    changeValue: (newTheme: string) => set({ value: newTheme }),
}));

export default useThemeStore;
