import { create } from "zustand";
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

const useStatisticChart = create<StatisticChartStore>((set, get) => ({
    statisticCharts: [],
    addStatisticChart: (statisticChart) =>
        set((state) => ({
            statisticCharts: [...state.statisticCharts, statisticChart],
        })),

    removeStatisticChart: (statisticChartId) =>
        set((state) => ({
            statisticCharts: state.statisticCharts.filter(
                (statisticChart) => statisticChart.id !== statisticChartId,
            ),
        })),

    updateStatisticChart: (statisticChartId, updatedStatisticChart) =>
        set((state) => ({
            statisticCharts: state.statisticCharts.map((statisticChart) =>
                statisticChart.id === statisticChartId
                    ? { ...statisticChart, ...updatedStatisticChart }
                    : statisticChart,
            ),
        })),

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
    syncStatisticCharts: (statisticCharts) =>
        set(() => ({ statisticCharts: statisticCharts })),
}));

export default useStatisticChart;
