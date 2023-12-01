import { create } from "zustand";
import { Set } from "../../../types";

interface SetStore {
    sets: Set[];
    addSet: (newSet: Set) => void;
    removeSet: (setId: string) => void;
    updateSet: (setId: string, updatedSet: Set) => void;
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
    removeSet: (setId) =>
        set((state) => ({
            sets: state.sets.filter((set) => set.id !== setId),
        })),
    updateSet: (setId, updatedset) =>
        set((state) => ({
            sets: state.sets.map((set) =>
                set.id === setId ? { ...set, ...updatedset } : set,
            ),
        })),
    getSetById: (setId) => {
        const set = get().sets.find((w) => w.id === setId);
        return set ? { ...set } : undefined;
    },
    getSetsByWorkoutUnitId: (workoutUnitId) => {
        const sets = get().sets.filter((w) => w.workout_unit_id === workoutUnitId);
        return sets ? [...sets] : ([] as Set[]);
    },
    syncSets: (sets) => set(() => ({ sets: sets })),
}));

export default useSet;
