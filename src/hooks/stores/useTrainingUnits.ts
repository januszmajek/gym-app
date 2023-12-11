import { create } from "zustand";
import { TrainingUnit } from "../../../types";

interface TrainingUnitStore {
    trainingUnits: TrainingUnit[];
    addTrainingUnits: (trainingUnits: TrainingUnit[]) => void;
    clearTrainingUnits: () => void;
}

const useTrainingUnit = create<TrainingUnitStore>((set) => ({
    trainingUnits: [],
    addTrainingUnits: (trainingUnits) =>
        set((state) => ({
            trainingUnits: [...state.trainingUnits, ...trainingUnits],
        })),
    clearTrainingUnits: () =>
        set(() => ({
            trainingUnits: [],
        })),
}));

export default useTrainingUnit;
