import { create } from "zustand";
import { StatisticChart } from "../../../types";

interface StatisticChartStore {
    statisticCharts: StatisticChart[];
    activeStatisticChartId: string | undefined;
    addStatisticChart: (statisticChart: StatisticChart) => void;
    removeStatisticChart: (statisticChartId: string) => void;
    updateStatisticChart: (
        statisticChartId: string,
        updatedStatisticChart: StatisticChart,
    ) => void;
    getStatisticChartById: (
        statisticChartId: string,
    ) => StatisticChart | undefined;
    setActiveStatisticChartId: (statisticId: string | undefined) => void;
    syncStatisticCharts: (statisticCharts: StatisticChart[]) => void;
    getStatisticChartByStatisticId: (
        statisticId: string,
    ) => StatisticChart | undefined;
}

const useStatisticChart = create<StatisticChartStore>((set, get) => ({
    statisticCharts: [],
    activeStatisticChartId: undefined,

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
    setActiveStatisticChartId: (statisticChartId) =>
        set({ activeStatisticChartId: statisticChartId }),
    getStatisticChartByStatisticId: (statisticId) => {
        const statisticChart = get().statisticCharts.find(
            (statisticChart) => statisticChart.statistic_id === statisticId,
        );
        return statisticChart ? statisticChart : undefined;
    },
    syncStatisticCharts: (statisticCharts) =>
        set(() => ({ statisticCharts: statisticCharts })),
}));

export default useStatisticChart;
