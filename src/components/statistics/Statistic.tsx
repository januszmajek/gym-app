import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import useStatisticChart from "../../hooks/stores/useStatisticChart";
import StatisticHeader from "./StatisticHeader";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import useStatistic from "../../hooks/stores/useStatistic";
import uuid from "react-native-uuid";

interface StatisticProps {
  statistic_id: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color?: (opacity: number) => string; // optional
    strokeWidth?: number; // optional
  }[];
  legend?: string[]; // optional
}

const Statistic: React.FC<StatisticProps> = ({ statistic_id }) => {
  const {
    updateStatisticChart,
    addStatisticChart,
    getStatisticChartByStatisticId,
    removeStatisticChart,
  } = useStatisticChart();
  const { removeStatistic, getStatisticById, setActiveStatisticId } =
    useStatistic();
  const statistic = getStatisticById(statistic_id);
  const statisticChart = getStatisticChartByStatisticId(statistic_id);
  const screenWidth = Dimensions.get("window").width;
  const { colors } = useTheme();
  const [data, setData] = useState<ChartData>({
    labels: ["05.01", "06.01", "07.01", "08.01", "09.01", "10.01"],
    datasets: [
      {
        data: [85, 86, 87, 85, 86, 83],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 5, // optional
      },
    ],
    legend: ["Weight"], // optional
  });
  const [nextDay, setNextDay] = useState("2024-01-13");

  const getRandomNumber = () => {
    const min = 65;
    const max = 73;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  function incrementLastDigit(dateString) {
    const dateArray = dateString.split("");
    let lastDigit = parseInt(dateArray[dateArray.length - 1]);
    lastDigit++;
    const updatedLastDigit = lastDigit.toString();
    dateArray[dateArray.length - 1] = updatedLastDigit;
    return dateArray.join("");
  }

  const addValueWithDate = () => {
    const temp = nextDay;
    setNextDay(incrementLastDigit(temp));
    console.log("adding new value:", {
      ...statisticChart,
      valuesWithDates: {
        ...statisticChart.valuesWithDates,
        [nextDay]: getRandomNumber(),
      },
    });
    updateStatisticChart(statisticChart.id, {
      ...statisticChart,
      valuesWithDates: {
        ...statisticChart.valuesWithDates,
        [nextDay]: getRandomNumber(),
      },
    });
  };

  const handleDeleteStatistic = () => {
    removeStatistic(statistic.id);
    removeStatisticChart(statisticChart.id);
    setActiveStatisticId(undefined);
  };

  function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}`;
  }

  function transformData(valuesWithDates: {
    [date: string]: number;
  }): ChartData {
    const sortedPairs = Object.entries(valuesWithDates).sort(
      ([dateA], [dateB]) =>
        new Date(dateA).getTime() - new Date(dateB).getTime(),
    );

    const labels = sortedPairs.map(([date]) => date);
    const data = sortedPairs.map(([, value]) => value);

    const chartData: ChartData = {
      labels: labels.map(formatDate),
      datasets: [
        {
          data,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2,
        },
      ],
      legend: ["Weight"],
    };

    return chartData;
  }

  useEffect(() => {
    if (statisticChart) return;
    console.log("Statistic chart not found, adding few points...");
    addStatisticChart({
      id: uuid.v4() as string,
      statistic_id: statistic.id,
      valuesWithDates: {
        "2024-01-12": 67,
        "2024-01-07": 69,
        "2024-01-04": 68,
        "2024-01-02": 70,
        "2023-12-28": 71,
        "2023-12-23": 68,
      },
    });
  }, []);

  useEffect(() => {
    if (!statisticChart) return;
    const temp = transformData(statisticChart.valuesWithDates);
    setData(temp);
  }, [statisticChart]);

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const styles = StyleSheet.create({
    buttonStyle: {
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: 10,
      color: colors.primaryContainer,
      paddingVertical: 12,
      marginHorizontal: 20,
      marginTop: 30,
    },
    buttonText: {
      color: colors.primaryContainer,
    },
  });

  return (
    <View>
      <StatisticHeader
        statisticId={statistic_id}
        handleDeleteStatistic={handleDeleteStatistic}
      />
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        yAxisSuffix={statistic.unit}
      />
      <View>
        <TouchableRipple style={styles.buttonStyle} onPress={addValueWithDate}>
          <Text style={styles.buttonText}>Add chart value</Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

export default Statistic;
