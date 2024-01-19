import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Workout } from "../../../types";

interface WorkoutStore {
  workouts: Workout[];
  activeWorkoutId: string | undefined;
  addWorkout: (workout: Workout) => void;
  removeWorkout: (workoutId: string) => void;
  updateWorkout: (workoutId: string, updatedWorkout: Workout) => void;
  getWorkoutById: (workoutId: string) => Workout | undefined;
  setActiveWorkoutId: (workoutId: string | undefined) => void;
  syncWorkouts: (workouts: Workout[]) => void;
}

const useWorkout = create<WorkoutStore>((set, get) => {
  AsyncStorage.getItem("workouts").then((storedWorkouts) => {
    const workouts = storedWorkouts ? JSON.parse(storedWorkouts) : [];
    set({ workouts });
  });

  return {
    workouts: [],
    activeWorkoutId: undefined,

    addWorkout: (workout) =>
      set((state) => {
        const updatedWorkouts = [...state.workouts, workout];
        AsyncStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
        return { workouts: updatedWorkouts };
      }),

    removeWorkout: (workoutId) =>
      set((state) => {
        const updatedWorkouts = state.workouts.filter(
          (workout) => workout.id !== workoutId,
        );
        AsyncStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
        return { workouts: updatedWorkouts };
      }),

    updateWorkout: (workoutId, updatedWorkout) =>
      set((state) => {
        const updatedWorkouts = state.workouts.map((workout) =>
          workout.id === workoutId
            ? { ...workout, ...updatedWorkout }
            : workout,
        );
        AsyncStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
        return { workouts: updatedWorkouts };
      }),

    getWorkoutById: (workoutId) => {
      const workout = get().workouts.find((w) => w.id === workoutId);
      return workout ? { ...workout } : undefined;
    },

    setActiveWorkoutId: (workoutId) => set({ activeWorkoutId: workoutId }),

    syncWorkouts: (workouts) => {
      AsyncStorage.setItem("workouts", JSON.stringify(workouts));
      set({ workouts });
    },
  };
});

export default useWorkout;
