import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TrainingUnit } from "../../../types";

interface TrainingUnitStore {
    trainingUnits: TrainingUnit[];
    addTrainingUnits: (trainingUnits: TrainingUnit[]) => void;
    clearTrainingUnits: () => void;
}

const useTrainingUnit = create<TrainingUnitStore>((set, get) => {
    AsyncStorage.getItem("trainingUnits").then((storedUnits) => {
        const parsedUnits = storedUnits ? JSON.parse(storedUnits) : [];
        set({ trainingUnits: parsedUnits });
    });

    return {
        trainingUnits: [],

        addTrainingUnits: (trainingUnits) =>
            set((state) => {
                const updatedUnits = [...state.trainingUnits, ...trainingUnits];
                AsyncStorage.setItem("trainingUnits", JSON.stringify(updatedUnits));
                return { trainingUnits: updatedUnits };
            }),

        clearTrainingUnits: () => {
            AsyncStorage.removeItem("trainingUnits");
            set({ trainingUnits: [] });
        },
    };
});

export default useTrainingUnit;
