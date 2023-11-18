import { create } from "zustand";
import { Workout, WorkoutUnit } from "../../../types";

interface WorkoutStore {
    workouts: Workout[];
    nextId: number;
    activeWorkoutId: number;
    addWorkout: (workout: Workout) => void;
    removeWorkout: (workoutId: number) => void;
    updateWorkout: (workoutId: number, updatedWorkout: Workout) => void;
    getWorkoutById: (workoutId: number) => Workout | undefined;
    setActiveWorkoutId: (workoutId: number) => void;
    addWorkoutUnit: (workoutId: number, workoutUnit: WorkoutUnit) => void;
    //   removeWorkoutUnit: (WorkoutId: number, workoutUnitId: number) => void;
    //   updateWorkoutUnit: (
    //     workoutId: number,
    //     updatedWorkoutUnit: WorkoutUnit,
    //   ) => void;
}

const useWorkout = create<WorkoutStore>((set, get) => ({
    workouts: [],
    nextId: 1,
    activeWorkoutId: 0,
    addWorkout: (workout) =>
        set((state) => ({
            workouts: [...state.workouts, workout],
            nextId: state.nextId + 1,
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
    addWorkoutUnit: (workoutId, workoutUnit) =>
        set((state) => ({
            workouts: state.workouts.map((workout) =>
                workout.id === workoutId
                    ? {
                        ...workout,
                        workoutUnits: [...workout.workoutUnits, workoutUnit],
                    }
                    : workout,
            ),
        })),
    //   removeWorkoutUnit: (workoutId, workoutUnitId) =>
    //     set((state) => ({
    //       workouts: state.workouts.workoutUnits.map((workoutUnit) =>
    //         state.workouts.filter((workout) => workout.id !== workoutId),
    //       ),
    //     })),
    //   updateWorkoutUnit: (workoutId, updatedWorkout) =>
    //     set((state) => ({
    //       workouts: state.workouts.map((workout) =>
    //         workout.id === workoutId ? { ...workout, ...updatedWorkout } : workout,
    //       ),
    //     })),
}));

export default useWorkout;
