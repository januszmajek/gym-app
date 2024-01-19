import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const useSettings = create<SettingsStore>((set) => {
    AsyncStorage.getItem("settings").then((storedSettings) => {
        const parsedSettings = storedSettings ? JSON.parse(storedSettings) : {};
        set(parsedSettings);
    });

    return {
        weightUnit: "Kilogram",
        vibrate: false,
        keepScreenOn: false,
        sound: false,

        switchKeepScreenOn: () =>
            set((state) => {
                const updatedState = { ...state, keepScreenOn: !state.keepScreenOn };
                AsyncStorage.setItem("settings", JSON.stringify(updatedState));
                return updatedState;
            }),

        switchVibrate: () =>
            set((state) => {
                const updatedState = { ...state, vibrate: !state.vibrate };
                AsyncStorage.setItem("settings", JSON.stringify(updatedState));
                return updatedState;
            }),

        switchSound: () =>
            set((state) => {
                const updatedState = { ...state, sound: !state.sound };
                AsyncStorage.setItem("settings", JSON.stringify(updatedState));
                return updatedState;
            }),

        changeWeightUnit: (unit: string) =>
            set((state) => {
                const updatedState = { ...state, weightUnit: unit };
                AsyncStorage.setItem("settings", JSON.stringify(updatedState));
                return updatedState;
            }),
    };
});

export default useSettings;
