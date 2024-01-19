import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WorkoutUnit } from "../../../types";

interface WorkoutUnitsStore {
  workoutUnits: WorkoutUnit[];
  activeWorkoutUnitId: string | undefined;
  setActiveWorkoutUnitId: (workoutUnitId: string | undefined) => void;
  addWorkoutUnit: (workoutUnit: WorkoutUnit) => void;
  removeWorkoutUnit: (workoutUnitId: string) => void;
  removeWorkoutUnitsByWorkoutId: (workoutId: string) => void;
  updateWorkoutUnit: (
    workoutUnitId: string,
    updatedWorkoutUnit: WorkoutUnit,
  ) => void;
  getWorkoutUnitById: (workoutUnitId: string) => WorkoutUnit | undefined;
  getWorkoutUnitsByWorkoutId: (workoutId: string) => WorkoutUnit[];
  syncWorkoutUnits: (workoutUnits: WorkoutUnit[]) => void;
}

const useWorkoutUnits = create<WorkoutUnitsStore>((set, get) => {
  AsyncStorage.getItem("workoutUnits").then((storedUnits) => {
    const parsedUnits = storedUnits ? JSON.parse(storedUnits) : [];
    set({ workoutUnits: parsedUnits });
  });

  return {
    workoutUnits: [],
    activeWorkoutUnitId: undefined,

    setActiveWorkoutUnitId: (workoutUnitId) =>
      set({ activeWorkoutUnitId: workoutUnitId }),

    addWorkoutUnit: (workoutUnit) =>
      set((state) => {
        const updatedUnits = [...state.workoutUnits, workoutUnit];
        AsyncStorage.setItem("workoutUnits", JSON.stringify(updatedUnits));
        return { workoutUnits: updatedUnits };
      }),

    removeWorkoutUnit: (workoutUnitId) =>
      set((state) => {
        const updatedUnits = state.workoutUnits.filter(
          (workoutUnit) => workoutUnit.id !== workoutUnitId,
        );
        AsyncStorage.setItem("workoutUnits", JSON.stringify(updatedUnits));
        return { workoutUnits: updatedUnits };
      }),

    updateWorkoutUnit: (workoutUnitId, updatedWorkoutUnit) =>
      set((state) => {
        const updatedUnits = state.workoutUnits.map((workoutUnit) =>
          workoutUnit.id === workoutUnitId
            ? { ...workoutUnit, ...updatedWorkoutUnit }
            : workoutUnit,
        );
        AsyncStorage.setItem("workoutUnits", JSON.stringify(updatedUnits));
        return { workoutUnits: updatedUnits };
      }),

    getWorkoutUnitById: (workoutUnitId) => {
      const workoutUnit = get().workoutUnits.find(
        (workoutUnit) => workoutUnit.id === workoutUnitId,
      );
      return workoutUnit ? { ...workoutUnit } : undefined;
    },

    getWorkoutUnitsByWorkoutId: (workoutId) => {
      const workoutUnits = get().workoutUnits.filter(
        (workoutUnit) => workoutUnit.workout_id === workoutId,
      );
      return workoutUnits ? [...workoutUnits] : [];
    },

    removeWorkoutUnitsByWorkoutId: (workoutId) =>
      set((state) => ({
        workoutUnits: state.workoutUnits.filter(
          (workoutUnit) => workoutUnit.workout_id !== workoutId,
        ),
      })),

    syncWorkoutUnits: (workoutUnits) => {
      AsyncStorage.setItem("workoutUnits", JSON.stringify(workoutUnits));
      set({ workoutUnits });
    },
  };
});

export default useWorkoutUnits;
