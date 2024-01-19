import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatisticChart } from "../../../types";

interface StatisticChartStore {
    statisticCharts: StatisticChart[];
    addStatisticChart: (statisticChart: StatisticChart) => void;
    removeStatisticChart: (statisticChartId: string) => void;
    updateStatisticChart: (
        statisticChartId: string,
        updatedStatisticChart: StatisticChart,
    ) => void;
    getStatisticChartById: (
        statisticChartId: string,
    ) => StatisticChart | undefined;
    syncStatisticCharts: (statisticCharts: StatisticChart[]) => void;
    getStatisticChartsByStatisticId: (statisticId: string) => StatisticChart[];
}

const useStatisticChart = create<StatisticChartStore>((set, get) => {
    AsyncStorage.getItem("statisticCharts").then((storedCharts) => {
        const parsedCharts = storedCharts ? JSON.parse(storedCharts) : [];
        set({ statisticCharts: parsedCharts });
    });

    return {
        statisticCharts: [],

        addStatisticChart: (statisticChart) =>
            set((state) => {
                const updatedCharts = [...state.statisticCharts, statisticChart];
                AsyncStorage.setItem("statisticCharts", JSON.stringify(updatedCharts));
                return { statisticCharts: updatedCharts };
            }),

        removeStatisticChart: (statisticChartId) =>
            set((state) => {
                const updatedCharts = state.statisticCharts.filter(
                    (statisticChart) => statisticChart.id !== statisticChartId,
                );
                AsyncStorage.setItem("statisticCharts", JSON.stringify(updatedCharts));
                return { statisticCharts: updatedCharts };
            }),

        updateStatisticChart: (statisticChartId, updatedStatisticChart) =>
            set((state) => {
                const updatedCharts = state.statisticCharts.map((statisticChart) =>
                    statisticChart.id === statisticChartId
                        ? { ...statisticChart, ...updatedStatisticChart }
                        : statisticChart,
                );
                AsyncStorage.setItem("statisticCharts", JSON.stringify(updatedCharts));
                return { statisticCharts: updatedCharts };
            }),

        getStatisticChartById: (statisticChartId) => {
            const statisticChart = get().statisticCharts.find(
                (w) => w.id === statisticChartId,
            );
            return statisticChart ? { ...statisticChart } : undefined;
        },

        getStatisticChartsByStatisticId: (statisticId) => {
            const statisticCharts = get().statisticCharts.filter(
                (statisticChart) => statisticChart.statistic_id === statisticId,
            );
            return statisticCharts ? [...statisticCharts] : [];
        },

        syncStatisticCharts: (statisticCharts) => {
            AsyncStorage.setItem("statisticCharts", JSON.stringify(statisticCharts));
            set({ statisticCharts });
        },
    };
});

export default useStatisticChart;
