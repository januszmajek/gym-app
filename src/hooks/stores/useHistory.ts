import { create } from "zustand";
import { Training } from "../../../types";

interface HistoryStore {
    activeTraining: Training | undefined;
    activeTrainingHistoryId: string | undefined;
    setActiveTraining: (training: Training | undefined) => void;
    setActiveTrainingHistoryId: (trainingId: string | undefined) => void;
}

const useHistory = create<HistoryStore>((set) => ({
    activeTraining: undefined,
    activeTrainingHistoryId: undefined,
    setActiveTraining: (training) => {
        set(() => ({
            activeTraining: training,
        }));
    },
    setActiveTrainingHistoryId: (trainingId) =>
        set({ activeTrainingHistoryId: trainingId }),
}));

export default useHistory;
