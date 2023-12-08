import { create } from "zustand";
import { Statistic } from "../../../types";

interface StatisticStore {
  statistics: Statistic[];
  activeStatisticId: string | undefined;
  addStatistic: (workout: Statistic) => void;
  removeStatistic: (statisticId: string) => void;
  updateStatistic: (statisticId: string, updatedStatistic: Statistic) => void;
  getStatisticById: (statisticId: string) => Statistic | undefined;
  setActiveStatisticId: (statisticId: string | undefined) => void;
  syncStatistics: (statistics: Statistic[]) => void;
}

const useStatistic = create<StatisticStore>((set, get) => ({
  statistics: [],
  activeStatisticId: undefined,

  addStatistic: (workout) =>
    set((state) => ({
      statistics: [...state.statistics, workout],
    })),

  removeStatistic: (statisticId) =>
    set((state) => ({
      statistics: state.statistics.filter(
        (workout) => workout.id !== statisticId,
      ),
    })),

  updateStatistic: (statisticId, updatedStatistic) =>
    set((state) => ({
      statistics: state.statistics.map((workout) =>
        workout.id === statisticId
          ? { ...workout, ...updatedStatistic }
          : workout,
      ),
    })),

  getStatisticById: (statisticId) => {
    const workout = get().statistics.find((w) => w.id === statisticId);
    return workout ? { ...workout } : undefined;
  },
  setActiveStatisticId: (statisticId) =>
    set({ activeStatisticId: statisticId }),

  syncStatistics: (statistics) => set(() => ({ statistics: statistics })),
}));

export default useStatistic;
