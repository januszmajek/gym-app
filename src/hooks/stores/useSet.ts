import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Set } from "../../../types";

interface SetStore {
    sets: Set[];
    activesetId: number;
    addSet: (newSet: Set) => void;
    addSets: (sets: Set[]) => void;
    removeSet: (setId: string) => void;
    clearSetsByWorkoutUnitId: (workoutUnitId: string) => void;
    getSetById: (setId: string) => Set | undefined;
    getSetsByWorkoutUnitId: (workoutUnitId: string) => Set[];
    syncSets: (sets: Set[]) => void;
}

const useSet = create<SetStore>((set, get) => {
    AsyncStorage.getItem("sets").then((storedSets) => {
        const parsedSets = storedSets ? JSON.parse(storedSets) : [];
        set({ sets: parsedSets });
    });

    return {
        sets: [],
        activesetId: 0,

        addSet: (newSet) =>
            set((state) => {
                const updatedSets = [...state.sets, newSet];
                AsyncStorage.setItem("sets", JSON.stringify(updatedSets));
                return { sets: updatedSets };
            }),

        addSets: (sets) =>
            set((state) => {
                const updatedSets = [...state.sets, ...sets];
                AsyncStorage.setItem("sets", JSON.stringify(updatedSets));
                return { sets: updatedSets };
            }),

        removeSet: (setId) =>
            set((state) => {
                const updatedSets = state.sets.filter((set) => set.id !== setId);
                AsyncStorage.setItem("sets", JSON.stringify(updatedSets));
                return { sets: updatedSets };
            }),

        getSetById: (setId) => {
            const set = get().sets.find((w) => w.id === setId);
            return set ? { ...set } : undefined;
        },

        getSetsByWorkoutUnitId: (workoutUnitId) => {
            const sets = get().sets.filter(
                (w) => w.workout_unit_id === workoutUnitId,
            );
            return sets ? [...sets] : ([] as Set[]);
        },

        clearSetsByWorkoutUnitId: (workoutUnitId) =>
            set((state) => {
                const updatedSets = state.sets.filter(
                    (set) => set.workout_unit_id !== workoutUnitId,
                );
                AsyncStorage.setItem("sets", JSON.stringify(updatedSets));
                return { sets: updatedSets };
            }),

        syncSets: (sets) => {
            AsyncStorage.setItem("sets", JSON.stringify(sets));
            set({ sets });
        },
    };
});

export default useSet;
