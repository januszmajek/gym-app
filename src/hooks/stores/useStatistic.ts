import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const useStatistic = create<StatisticStore>((set, get) => {
  AsyncStorage.getItem("statistics").then((storedStatistics) => {
    const parsedStatistics = storedStatistics
      ? JSON.parse(storedStatistics)
      : [];
    set({ statistics: parsedStatistics });
  });

  return {
    statistics: [],
    activeStatisticId: undefined,

    addStatistic: (statistic) =>
      set((state) => {
        const updatedStatistics = [...state.statistics, statistic];
        AsyncStorage.setItem("statistics", JSON.stringify(updatedStatistics));
        return { statistics: updatedStatistics };
      }),

    removeStatistic: (statisticId) =>
      set((state) => {
        const updatedStatistics = state.statistics.filter(
          (statistic) => statistic.id !== statisticId,
        );
        AsyncStorage.setItem("statistics", JSON.stringify(updatedStatistics));
        return { statistics: updatedStatistics };
      }),

    updateStatistic: (statisticId, updatedStatistic) =>
      set((state) => {
        const updatedStatistics = state.statistics.map((statistic) =>
          statistic.id === statisticId
            ? { ...statistic, ...updatedStatistic }
            : statistic,
        );
        AsyncStorage.setItem("statistics", JSON.stringify(updatedStatistics));
        return { statistics: updatedStatistics };
      }),

    getStatisticById: (statisticId) => {
      const statistic = get().statistics.find((w) => w.id === statisticId);
      return statistic ? { ...statistic } : undefined;
    },

    setActiveStatisticId: (statisticId) =>
      set({ activeStatisticId: statisticId }),

    syncStatistics: (statistics) => {
      AsyncStorage.setItem("statistics", JSON.stringify(statistics));
      set({ statistics });
    },
  };
});

export default useStatistic;
