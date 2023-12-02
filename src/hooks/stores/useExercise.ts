import { Exercise } from "../../../types";
import { create } from "zustand";

interface ExerciseStore {
    exercises: Exercise[];
    syncExercises: (exercise: Exercise[]) => void;
    getExerciseById: (exerciseId: string) => Exercise | undefined;
}

const useExercise = create<ExerciseStore>((set, get) => ({
    exercises: [],
    syncExercises: (exerciseList) => set(() => ({ exercises: exerciseList })),
    getExerciseById: (exerciseId) => {
        const exercise = get().exercises.find((e) => e.id === exerciseId);
        return exercise ? { ...exercise } : undefined;
    },
}));

export default useExercise;
