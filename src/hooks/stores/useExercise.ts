import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Exercise } from "../../../types";

interface ExerciseStore {
    exercises: Exercise[];
    syncExercises: (exerciseList: Exercise[]) => void;
    getExerciseById: (exerciseId: string) => Exercise | undefined;
}

const useExercise = create<ExerciseStore>((set, get) => {
    AsyncStorage.getItem("exercises").then((storedExercises) => {
        const exercises = storedExercises ? JSON.parse(storedExercises) : [];
        set({ exercises });
    });

    return {
        exercises: [],
        syncExercises: (exerciseList) => {
            AsyncStorage.setItem("exercises", JSON.stringify(exerciseList));
            set({ exercises: exerciseList });
        },

        getExerciseById: (exerciseId) => {
            const exercise = get().exercises.find((e) => e.id === exerciseId);
            return exercise ? { ...exercise } : undefined;
        },
    };
});

export default useExercise;
