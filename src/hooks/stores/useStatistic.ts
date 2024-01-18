import { create } from "zustand";
import { Statistic } from "../../../types";

interface StatisticStore {
  statistics: Statistic[];
  activeStatisticId: string | undefined;
  addStatistic: (statistic: Statistic) => void;
  removeStatistic: (statisticId: string) => void;
  updateStatistic: (statisticId: string, updatedStatistic: Statistic) => void;
  getStatisticById: (statisticId: string) => Statistic | undefined;
  setActiveStatisticId: (statisticId: string | undefined) => void;
  syncStatistics: (statistics: Statistic[]) => void;
}

const useStatistic = create<StatisticStore>((set, get) => ({
  statistics: [],
  activeStatisticId: undefined,

  addStatistic: (statistic) =>
    set((state) => ({
      statistics: [...state.statistics, statistic],
    })),

  removeStatistic: (statisticId) =>
    set((state) => ({
      statistics: state.statistics.filter(
        (statistic) => statistic.id !== statisticId,
      ),
    })),

  updateStatistic: (statisticId, updatedStatistic) =>
    set((state) => ({
      statistics: state.statistics.map((statistic) =>
        statistic.id === statisticId
          ? { ...statistic, ...updatedStatistic }
          : statistic,
      ),
    })),

  getStatisticById: (statisticId) => {
    const statistic = get().statistics.find((w) => w.id === statisticId);
    return statistic ? { ...statistic } : undefined;
  },
  setActiveStatisticId: (statisticId) =>
    set({ activeStatisticId: statisticId }),

  syncStatistics: (statistics) => set(() => ({ statistics: statistics })),
}));

export default useStatistic;
