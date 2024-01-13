import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Dialog,
  Portal,
  Text,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
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
  const [visible, setVisible] = useState(false);
  const [newValue, setNewValue] = useState<string>("");
  const statistic = getStatisticById(statistic_id);
  const statisticChart = getStatisticChartByStatisticId(statistic_id);
  const screenWidth = Dimensions.get("window").width;
  const { colors } = useTheme();
  const today = getFormattedDate();

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  function getFormattedDate(): string {
    const today = new Date();

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = today.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const [data, setData] = useState<ChartData>({
    labels: ["05.01", "06.01", "07.01"],
    datasets: [
      {
        data: [85, 86, 87, 85, 86, 83],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: [statistic.name],
  });

  function incrementLastDigit(dateString) {
    const dateArray = dateString.split("");
    let lastDigit = parseInt(dateArray[dateArray.length - 1]);
    lastDigit++;
    const updatedLastDigit = lastDigit.toString();
    dateArray[dateArray.length - 1] = updatedLastDigit;
    return dateArray.join("");
  }

  const addValueWithDate = () => {
    updateStatisticChart(statisticChart.id, {
      ...statisticChart,
      valuesWithDates: {
        ...statisticChart.valuesWithDates,
        [today]: parseInt(newValue, 10), // Convert newValue to a number
      },
    });
  };

  const handleDeleteStatistic = () => {
    removeStatistic(statistic.id);
    removeStatisticChart(statisticChart.id);
    setActiveStatisticId(undefined);
  };

  function formatDate(dateString: string): string {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      legend: [statistic.name],
    };

    return chartData;
  }

  // useEffect(() => {
  //   if (statisticChart) return;
  //   console.log("Statistic chart not found, adding few points...");
  //   addStatisticChart({
  //     id: uuid.v4() as string,
  //     statistic_id: statistic.id,
  //     valuesWithDates: {
  //       "2024-01-12": 67,
  //       "2024-01-07": 69,
  //       "2024-01-04": 68,
  //       "2024-01-02": 70,
  //       "2023-12-28": 71,
  //       "2023-12-23": 68,
  //     },
  //   });
  // }, []);

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
    dialogContainer: { paddingHorizontal: 5 },
    dialogContent: {
      gap: 20,
    },
    dialogTitle: {
      color: colors.primary,
      fontSize: 21,
    },
    disabledButtonStyle: {
      backgroundColor: colors.onSurfaceDisabled,
    },
    inputText: {
      textDecorationLine: "none",
    },
    outline: {
      borderRadius: 4,
    },
  });

  const handleNumericInput = (text: string) => {
    // Use a regular expression to allow only numeric input
    const numericOnly = text.replace(/[^0-9]/g, "");
    setNewValue(numericOnly);
    console.log(text);
    console.log(newValue.length > 0 ? false : true);
  };

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
        <TouchableRipple style={styles.buttonStyle} onPress={showDialog}>
          <Text style={styles.buttonText}>Add current value</Text>
        </TouchableRipple>
      </View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => {
            hideDialog();
            setNewValue("");
          }}
          style={styles.dialogContainer}
        >
          <Dialog.Title style={styles.dialogTitle}>
            <Text>Add current value to chart</Text>
          </Dialog.Title>
          <Dialog.Content style={styles.dialogContent}>
            <TextInput
              value={newValue}
              onChangeText={handleNumericInput}
              mode="outlined"
              label={statistic.name}
              placeholder={`Today's ${statistic.name.toLowerCase()} in ${
                statistic.unit
              }`}
              autoFocus
              style={styles.inputText}
              outlineStyle={styles.outline}
              activeUnderlineColor="rgba(0,0,0,0)"
              keyboardType="numeric"
            />
            <TouchableRipple
              style={[
                styles.buttonStyle,
                !(newValue.length > 0) && styles.disabledButtonStyle,
              ]}
              onPress={addValueWithDate}
              disabled={newValue.length > 0 ? false : true}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableRipple>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

export default Statistic;
