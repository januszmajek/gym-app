import { create } from "zustand";
import { Training } from "../../../types";

interface TrainingStore {
  trainings: Training[];
  activeTraining: Training | undefined;
  setActiveTraining: (training: Training | undefined) => void;
  activeTrainingId: string | undefined;
  addTraining: (training: Training) => void;
  removeTraining: (trainingId: string) => void;
  updateTraining: (trainingId: string, updatedTraining: Training) => void;
  getTrainingById: (trainingId: string) => Training | undefined;
  setActiveTrainingId: (trainingId: string | undefined) => void;
  syncTrainings: (trainings: Training[]) => void;
  clearTrainings: () => void;
}

const useTraining = create<TrainingStore>((set, get) => ({
  trainings: [],
  activeTraining: undefined,
  activeTrainingId: undefined,
  setActiveTraining: (training) => {
    set(() => ({
      activeTraining: training,
    }));
  },
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
  clearTrainings: () => set(() => ({ trainings: [] })),
}));

export default useTraining;
