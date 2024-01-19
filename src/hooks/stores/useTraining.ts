import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Training } from "../../../types";

interface TrainingStore {
  trainings: Training[];
  activeTraining: Training | undefined;
  activeTrainingId: string | undefined;
  setActiveTraining: (training: Training | undefined) => void;
  addTraining: (training: Training) => void;
  removeTraining: (trainingId: string) => void;
  updateTraining: (trainingId: string, updatedTraining: Training) => void;
  getTrainingById: (trainingId: string) => Training | undefined;
  setActiveTrainingId: (trainingId: string | undefined) => void;
  syncTrainings: (trainings: Training[]) => void;
  clearTrainings: () => void;
}

const useTraining = create<TrainingStore>((set, get) => {
  AsyncStorage.getItem("trainings").then((storedTrainings) => {
    const parsedTrainings = storedTrainings ? JSON.parse(storedTrainings) : [];
    set({ trainings: parsedTrainings });
  });

  return {
    trainings: [],
    activeTraining: undefined,
    activeTrainingId: undefined,

    setActiveTraining: (training) => {
      AsyncStorage.setItem(
        "activeTraining",
        JSON.stringify({ activeTraining: training }),
      );
      set({ activeTraining: training });
    },

    addTraining: (training) =>
      set((state) => {
        const updatedTrainings = [...state.trainings, training];
        AsyncStorage.setItem("trainings", JSON.stringify(updatedTrainings));
        return { trainings: updatedTrainings };
      }),

    removeTraining: (trainingId) =>
      set((state) => {
        const updatedTrainings = state.trainings.filter(
          (training) => training.id !== trainingId,
        );
        AsyncStorage.setItem("trainings", JSON.stringify(updatedTrainings));
        return { trainings: updatedTrainings };
      }),

    updateTraining: (trainingId, updatedTraining) =>
      set((state) => {
        const updatedTrainings = state.trainings.map((training) =>
          training.id === trainingId
            ? { ...training, ...updatedTraining }
            : training,
        );
        AsyncStorage.setItem("trainings", JSON.stringify(updatedTrainings));
        return { trainings: updatedTrainings };
      }),

    getTrainingById: (trainingId) => {
      const training = get().trainings.find((w) => w.id === trainingId);
      return training ? { ...training } : undefined;
    },

    setActiveTrainingId: (trainingId) => {
      AsyncStorage.setItem(
        "activeTrainingId",
        JSON.stringify({ activeTrainingId: trainingId }),
      );
      set({ activeTrainingId: trainingId });
    },

    syncTrainings: (trainings) => {
      AsyncStorage.setItem("trainings", JSON.stringify(trainings));
      set({ trainings });
    },

    clearTrainings: () => {
      AsyncStorage.removeItem("trainings");
      set({ trainings: [] });
    },
  };
});

export default useTraining;
