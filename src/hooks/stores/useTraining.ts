import { create } from "zustand";
import { Training } from "../../../types";

interface TrainingStore {
    trainings: Training[];
    activeTrainingId: string | undefined;
    addTraining: (Training: Training) => void;
    removeTraining: (TrainingId: string) => void;
    updateTraining: (TrainingId: string, updatedTraining: Training) => void;
    getTrainingById: (TrainingId: string) => Training | undefined;
    setActiveTrainingId: (TrainingId: string | undefined) => void;
    syncTrainings: (Trainings: Training[]) => void;
}

const useTraining = create<TrainingStore>((set, get) => ({
    trainings: [],
    activeTrainingId: undefined,
    addTraining: (training) =>
        set((state) => ({
            trainings: [...state.trainings, training],
        })),
    removeTraining: (trainingId) =>
        set((state) => ({
            trainings: state.trainings.filter(
                (training) => training.id !== trainingId,
            ),
        })),
    updateTraining: (trainingId, updatedTraining) =>
        set((state) => ({
            trainings: state.trainings.map((training) =>
                training.id === trainingId
                    ? { ...training, ...updatedTraining }
                    : training,
            ),
        })),
    getTrainingById: (trainingId) => {
        const training = get().trainings.find((w) => w.id === trainingId);
        return training ? { ...training } : undefined;
    },
    setActiveTrainingId: (trainingId) => set({ activeTrainingId: trainingId }),
    syncTrainings: (trainings) => set(() => ({ trainings: trainings })),
}));

export default useTraining;
