import { create } from "zustand";
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

const usetrainingSet = create<TrainingSetStore>((set, get) => ({
    trainingSets: [],
    addTrainingSets: (trainingSets) =>
        set((state) => ({
            trainingSets: [...state.trainingSets, ...trainingSets],
        })),
    getTrainingSets: () => {
        return get().trainingSets;
    },
    completeTrainingSet: (setId) =>
        set((state) => ({
            trainingSets: state.trainingSets.map((trainingSet) =>
                trainingSet.id === setId
                    ? { ...trainingSet, completed: true }
                    : trainingSet,
            ),
        })),
    uncompleteTrainingSet: (setId) =>
        set((state) => ({
            trainingSets: state.trainingSets.map((trainingSet) =>
                trainingSet.id === setId
                    ? { ...trainingSet, completed: false }
                    : trainingSet,
            ),
        })),
    getTrainingSetById: (setId) => {
        const TrainingSet = get().trainingSets.find(
            (TrainingSet) => TrainingSet.id === setId,
        );
        return TrainingSet ? { ...TrainingSet } : undefined;
    },
    getTrainingSetsByUnitId: (trainingUnitId) => {
        const sets = get().trainingSets.filter(
            (w) => w.workout_unit_id === trainingUnitId,
        );
        return sets ? [...sets] : ([] as TrainingSet[]);
    },
    updateWeight: (setId, newWeight) =>
        set((state) => ({
            trainingSets: state.trainingSets.map((trainingSet) =>
                trainingSet.id === setId
                    ? { ...trainingSet, weight: newWeight }
                    : trainingSet,
            ),
        })),
    updateRepetitions: (setId, newReps) =>
        set((state) => ({
            trainingSets: state.trainingSets.map((trainingSet) =>
                trainingSet.id === setId
                    ? { ...trainingSet, repetitions: newReps }
                    : trainingSet,
            ),
        })),
    updateTime: (setId, newTime) =>
        set((state) => ({
            trainingSets: state.trainingSets.map((trainingSet) =>
                trainingSet.id === setId
                    ? { ...trainingSet, time: newTime }
                    : trainingSet,
            ),
        })),
    clearTrainingSets: () =>
        set(() => ({
            trainingSets: [],
        })),
}));

export default usetrainingSet;
