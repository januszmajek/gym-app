import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Training } from "../../../types";

interface HistoryStore {
    activeTraining: Training | undefined;
    activeTrainingHistoryId: string | undefined;
    setActiveTraining: (training: Training | undefined) => void;
    setActiveTrainingHistoryId: (trainingId: string | undefined) => void;
}

const useHistory = create<HistoryStore>((set) => {
    AsyncStorage.getItem("history").then((storedHistory) => {
        const parsedHistory = storedHistory ? JSON.parse(storedHistory) : {};
        set(parsedHistory);
    });

    return {
        activeTraining: undefined,
        activeTrainingHistoryId: undefined,

        setActiveTraining: (training) => {
            AsyncStorage.setItem(
                "history",
                JSON.stringify({ activeTraining: training }),
            );
            set({ activeTraining: training });
        },

        setActiveTrainingHistoryId: (trainingId) => {
            AsyncStorage.setItem(
                "history",
                JSON.stringify({ activeTrainingHistoryId: trainingId }),
            );
            set({ activeTrainingHistoryId: trainingId });
        },
    };
});

export default useHistory;
