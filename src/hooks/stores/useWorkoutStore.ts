import create from "zustand";
import { Workout } from "../../../types";

interface WorkoutStore {
    workouts: Workout[];
    nextId: number;
    addWorkout: (workout: Workout) => void;
    removeWorkout: (workoutId: number) => void;
}

const useWorkoutStore = create<WorkoutStore>((set) => ({
    workouts: [],
    nextId: 0,
    addWorkout: (workout) =>
        set((state) => ({
            workouts: [...state.workouts, workout],
            nextId: state.nextId + 1,
        })),
    removeWorkout: (workoutId) =>
        set((state) => ({
            workouts: state.workouts.filter((workout) => workout.id !== workoutId),
        })),
}));

export default useWorkoutStore;
