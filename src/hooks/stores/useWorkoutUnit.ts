import { create } from "zustand";
import { WorkoutUnit } from "../../../types";

interface WorkoutUnitStore {
    workoutUnits: WorkoutUnit[];
    addWorkoutUnit: (workoutUnit: WorkoutUnit) => void;
    removeWorkoutUnit: (workoutUnitId: number) => void;
    updateWorkoutUnit: (
        workoutUnitId: number,
        updatedWorkoutUnit: WorkoutUnit,
    ) => void;
    getWorkoutUnitById: (workoutUnitId: number) => WorkoutUnit | undefined;
    syncWorkoutUnits: (workoutUnits: WorkoutUnit[]) => void;
}

const useWorkout = create<WorkoutUnitStore>((set, get) => ({
    workoutUnits: [],
    addWorkoutUnit: (workoutUnit) =>
        set((state) => ({
            workoutUnits: [...state.workoutUnits, workoutUnit],
        })),
    removeWorkoutUnit: (workoutUnitId) =>
        set((state) => ({
            workoutUnits: state.workoutUnits.filter(
                (workoutUnit) => workoutUnit.id !== workoutUnitId,
            ),
        })),
    updateWorkoutUnit: (workoutUnitId, updatedWorkoutUnit) =>
        set((state) => ({
            workoutUnits: state.workoutUnits.map((workoutUnit) =>
                workoutUnit.id === workoutUnitId
                    ? { ...workoutUnit, ...updatedWorkoutUnit }
                    : workoutUnit,
            ),
        })),
    getWorkoutUnitById: (workoutUnitId) => {
        const workoutUnit = get().workoutUnits.find((w) => w.id === workoutUnitId);
        return workoutUnit ? { ...workoutUnit } : undefined;
    },
    syncWorkoutUnits: (workoutUnits) =>
        set(() => ({ workoutUnits: workoutUnits })),
}));

export default useWorkout;
