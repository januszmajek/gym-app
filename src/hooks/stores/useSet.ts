import { create } from "zustand";
import { Set } from "../../../types";

interface SetStore {
    sets: Set[];
    addSet: (newSet: Set) => void;
    addSets: (sets: Set[]) => void;
    removeSet: (setId: string) => void;
    clearSetsByWorkoutUnitId: (workoutUnitId: string) => void;
    getSetById: (setId: string) => Set | undefined;
    syncSets: (sets: Set[]) => void;
    getSetsByWorkoutUnitId: (workoutUnitId: string) => Set[];
}

const useSet = create<SetStore>((set, get) => ({
    sets: [],
    activesetId: 0,
    addSet: (newSet) =>
        set((state) => ({
            sets: [...state.sets, newSet],
        })),
    addSets: (sets) =>
        set((state) => ({
            sets: [...state.sets, ...sets],
        })),
    removeSet: (setId) =>
        set((state) => ({
            sets: state.sets.filter((set) => set.id !== setId),
        })),
    getSetById: (setId) => {
        const set = get().sets.find((w) => w.id === setId);
        return set ? { ...set } : undefined;
    },
    getSetsByWorkoutUnitId: (workoutUnitId) => {
        const sets = get().sets.filter((w) => w.workout_unit_id === workoutUnitId);
        return sets ? [...sets] : ([] as Set[]);
    },
    clearSetsByWorkoutUnitId: (workoutUnitId) => {
        set((state) => ({
            sets: state.sets.filter((set) => set.workout_unit_id !== workoutUnitId),
        }));
    },
    syncSets: (sets) => set(() => ({ sets: sets })),
}));

export default useSet;
