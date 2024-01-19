import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TrainingSet } from "../../../types";

interface TrainingSetStore {
    trainingSets: TrainingSet[];
    addTrainingSets: (trainingSets: TrainingSet[]) => void;
    getTrainingSets: () => TrainingSet[];
    completeTrainingSet: (setId: string) => void;
    uncompleteTrainingSet: (setId: string) => void;
    getTrainingSetById: (setId: string) => TrainingSet | undefined;
    updateWeight: (setId: string, newWeight: number) => void;
    updateRepetitions: (setId: string, newReps: number) => void;
    updateTime: (setId: string, newTime: number) => void;
    clearTrainingSets: () => void;
    getTrainingSetsByUnitId: (trainingUnitId: string) => TrainingSet[];
}

const usetrainingSet = create<TrainingSetStore>((set, get) => {
    AsyncStorage.getItem("trainingSets").then((storedSets) => {
        const parsedSets = storedSets ? JSON.parse(storedSets) : [];
        set({ trainingSets: parsedSets });
    });

    return {
        trainingSets: [],

        addTrainingSets: (trainingSets) =>
            set((state) => {
                const updatedSets = [...state.trainingSets, ...trainingSets];
                AsyncStorage.setItem("trainingSets", JSON.stringify(updatedSets));
                return { trainingSets: updatedSets };
            }),

        getTrainingSets: () => get().trainingSets,

        completeTrainingSet: (setId) =>
            set((state) => {
                const updatedSets = state.trainingSets.map((trainingSet) =>
                    trainingSet.id === setId
                        ? { ...trainingSet, completed: true }
                        : trainingSet,
                );
                AsyncStorage.setItem("trainingSets", JSON.stringify(updatedSets));
                return { trainingSets: updatedSets };
            }),

        uncompleteTrainingSet: (setId) =>
            set((state) => {
                const updatedSets = state.trainingSets.map((trainingSet) =>
                    trainingSet.id === setId
                        ? { ...trainingSet, completed: false }
                        : trainingSet,
                );
                AsyncStorage.setItem("trainingSets", JSON.stringify(updatedSets));
                return { trainingSets: updatedSets };
            }),

        getTrainingSetById: (setId) => {
            const trainingSet = get().trainingSets.find((set) => set.id === setId);
            return trainingSet ? { ...trainingSet } : undefined;
        },

        getTrainingSetsByUnitId: (trainingUnitId) => {
            const sets = get().trainingSets.filter(
                (w) => w.workout_unit_id === trainingUnitId,
            );
            return sets ? [...sets] : ([] as TrainingSet[]);
        },

        updateWeight: (setId, newWeight) =>
            set((state) => {
                const updatedSets = state.trainingSets.map((trainingSet) =>
                    trainingSet.id === setId
                        ? { ...trainingSet, weight: newWeight }
                        : trainingSet,
                );
                AsyncStorage.setItem("trainingSets", JSON.stringify(updatedSets));
                return { trainingSets: updatedSets };
            }),

        updateRepetitions: (setId, newReps) =>
            set((state) => {
                const updatedSets = state.trainingSets.map((trainingSet) =>
                    trainingSet.id === setId
                        ? { ...trainingSet, repetitions: newReps }
                        : trainingSet,
                );
                AsyncStorage.setItem("trainingSets", JSON.stringify(updatedSets));
                return { trainingSets: updatedSets };
            }),

        updateTime: (setId, newTime) =>
            set((state) => {
                const updatedSets = state.trainingSets.map((trainingSet) =>
                    trainingSet.id === setId
                        ? { ...trainingSet, time: newTime }
                        : trainingSet,
                );
                AsyncStorage.setItem("trainingSets", JSON.stringify(updatedSets));
                return { trainingSets: updatedSets };
            }),

        clearTrainingSets: () => {
            AsyncStorage.removeItem("trainingSets");
            set({ trainingSets: [] });
        },
    };
});

export default usetrainingSet;
