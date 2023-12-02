import { create } from "zustand";
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

const useWorkoutUnits = create<WorkoutUnitsStore>((set, get) => ({
    workoutUnits: [],
    activeWorkoutUnitId: undefined,
    setActiveWorkoutUnitId: (workoutUnitId) =>
        set({ activeWorkoutUnitId: workoutUnitId }),
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
    removeWorkoutUnitsByWorkoutId: (workoutId) => {
        set((state) => ({
            workoutUnits: state.workoutUnits.filter(
                (workoutUnit) => workoutUnit.workout_id !== workoutId,
            ),
        }));
    },
    syncWorkoutUnits: (workoutUnits) =>
        set(() => ({ workoutUnits: workoutUnits })),
}));

export default useWorkoutUnits;
