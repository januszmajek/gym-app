import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeStore {
    value: string;
    changeValue: (newTheme: string) => void;
}

const useThemeStore = create<ThemeStore>((set) => {
    AsyncStorage.getItem("theme").then((storedTheme) => {
        const parsedTheme = storedTheme ? JSON.parse(storedTheme) : {};
        set(parsedTheme);
    });

    return {
        value: "Light",

        changeValue: (newTheme: string) =>
            set((state) => {
                const updatedTheme = { value: newTheme };
                AsyncStorage.setItem("theme", JSON.stringify(updatedTheme));
                return updatedTheme;
            }),
    };
});

export default useThemeStore;
