import { create } from "zustand";
import { WorkoutUnit } from "../../../types";

interface WorkoutUnitsStore {
    workoutUnits: WorkoutUnit[];
    addWorkoutUnit: (workoutUnit: WorkoutUnit) => void;
    removeWorkoutUnit: (workoutUnitId: number) => void;
    updateWorkoutUnit: (
        workoutUnitId: number,
        updatedWorkoutUnit: WorkoutUnit,
    ) => void;
    getWorkoutUnitById: (workoutUnitId: number) => WorkoutUnit | undefined;
    getWorkoutUnitsByWorkoutId: (workoutId: number) => WorkoutUnit[];
    syncWorkoutUnits: (workoutUnits: WorkoutUnit[]) => void;
}

const useWorkoutUnits = create<WorkoutUnitsStore>((set, get) => ({
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
    getWorkoutUnitsByWorkoutId: (workoutId) => {
        const workoutUnits = get().workoutUnits.filter(
            (w) => w.workout_id === workoutId,
        );
        return workoutUnits ? [...workoutUnits] : [];
    },
    syncWorkoutUnits: (workoutUnits) =>
        set(() => ({ workoutUnits: workoutUnits })),
}));

export default useWorkoutUnits;
