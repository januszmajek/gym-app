import { create } from "zustand";
import { Workout } from "../../../types";

interface WorkoutStore {
    workouts: Workout[];
    activeWorkoutId: number;
    addWorkout: (workout: Workout) => void;
    removeWorkout: (workoutId: number) => void;
    updateWorkout: (workoutId: number, updatedWorkout: Workout) => void;
    getWorkoutById: (workoutId: number) => Workout | undefined;
    setActiveWorkoutId: (workoutId: number) => void;
    syncWorkouts: (workouts: Workout[]) => void;
}

const useWorkout = create<WorkoutStore>((set, get) => ({
    workouts: [],
    activeWorkoutId: 0,
    addWorkout: (workout) =>
        set((state) => ({
            workouts: [...state.workouts, workout],
        })),
    removeWorkout: (workoutId) =>
        set((state) => ({
            workouts: state.workouts.filter((workout) => workout.id !== workoutId),
        })),
    updateWorkout: (workoutId, updatedWorkout) =>
        set((state) => ({
            workouts: state.workouts.map((workout) =>
                workout.id === workoutId ? { ...workout, ...updatedWorkout } : workout,
            ),
        })),
    getWorkoutById: (workoutId) => {
        const workout = get().workouts.find((w) => w.id === workoutId);
        return workout ? { ...workout } : undefined;
    },
    setActiveWorkoutId: (workoutId) => set({ activeWorkoutId: workoutId }),
    syncWorkouts: (workouts) => set(() => ({ workouts: workouts })),
}));

export default useWorkout;
