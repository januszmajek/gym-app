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
import { StatisticChart } from "../../../types";
import { supabase } from "../../../supabase/supabase";
import useSession from "../../hooks/stores/useSession";

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
    getStatisticChartsByStatisticId,
    removeStatisticChart,
    addStatisticChart,
  } = useStatisticChart();
  const {
    removeStatistic,
    getStatisticById,
    setActiveStatisticId,
    updateStatistic,
  } = useStatistic();
  const [visible, setVisible] = useState(false);
  const [newValue, setNewValue] = useState<string>("");
  const [chartData, setChartData] = useState<ChartData>();
  const statistic = getStatisticById(statistic_id);
  const [statisticCharts, setStatisticCharts] = useState(
    sortByDateAscending(getStatisticChartsByStatisticId(statistic_id)),
  );
  const screenWidth = Dimensions.get("window").width;
  const { colors } = useTheme();
  const today = getFormattedDate();
  const { session } = useSession();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    if (!statisticCharts || statisticCharts.length < 1) return;
    const temp = transformStatisticCharts(statisticCharts);
    setChartData(temp);
  }, [statisticCharts]);

  function getFormattedDate(): string {
    const today = new Date();

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = today.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function sortByDateAscending(
    chartArray: StatisticChart[] | undefined,
  ): StatisticChart[] | undefined {
    if (chartArray === undefined) return undefined;
    return chartArray.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateA.getTime() - dateB.getTime();
    });
  }

  const addValueWithDate = async () => {
    const value = parseInt(newValue, 10);
    if (statisticCharts.length > 0) {
      if (statisticCharts[statisticCharts.length - 1].date === today) {
        console.log("SAME DAY - UPDATING...");
        const newChartValue = {
          ...statisticCharts[statisticCharts.length - 1],
          value: value,
        };
        console.log(newChartValue);
        updateStatisticChart(
          statisticCharts[statisticCharts.length - 1].id,
          newChartValue,
        );
        const { data, error: supabaseError } = await supabase
          .from("chart_values")
          .update({ ...newChartValue, user_id: session.user.id })
          .eq("id", newChartValue.id)
          .select();

        if (supabaseError) {
          console.log(supabaseError.message);
        }
        if (data) {
          console.log("Updated chart value", data);
        }
      } else {
        const newChartValue = {
          id: uuid.v4() as string,
          statistic_id: statistic_id,
          date: today,
          value: value,
        };
        addStatisticChart(newChartValue);
        const { data, error: supabaseError } = await supabase
          .from("chart_values")
          .insert({ ...newChartValue, user_id: session.user.id })
          .select()
          .single();

        if (supabaseError) {
          console.log(supabaseError.message);
        }
        if (data) {
          console.log("Added chart value", data);
        }
      }
    } else {
      const newChartValue = {
        id: uuid.v4() as string,
        statistic_id: statistic_id,
        date: today,
        value: value,
      };
      addStatisticChart(newChartValue);
      const { data, error: supabaseError } = await supabase
        .from("chart_values")
        .insert({ ...newChartValue, user_id: session.user.id })
        .select()
        .single();

      if (supabaseError) {
        console.log(supabaseError.message);
      }
      if (data) {
        console.log("Added chart value", data);
      }
    }
    updateStatistic(statistic_id, {
      ...statistic,
      currentValue: value,
    });
    const { data, error: supabaseError } = await supabase
      .from("statistics")
      .update({ ...statistic, currentValue: value })
      .eq("id", statistic_id)
      .select();
    if (supabaseError) {
      console.log(supabaseError.message);
    }
    if (data) {
      console.log("Updated statistic", data);
    }

    hideDialog();
    setStatisticCharts(getStatisticChartsByStatisticId(statistic_id));
    setNewValue("");
  };

  const handleDeleteStatistic = async () => {
    setActiveStatisticId(undefined);
    removeStatistic(statistic.id);
    statisticCharts.map((statisticChart) => {
      removeStatisticChart(statisticChart.id);
    });
    const { error: supabaseError } = await supabase
      .from("statistics")
      .delete()
      .eq("id", statistic_id);
    if (supabaseError) {
      console.log(supabaseError.message);
    }
    console.log("Deleted Statistic:", statistic_id);
  };

  // function formatDate(dateString: string): string {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const [year, month, day] = dateString.split("-");
  //   return `${day}.${month}`;
  // }

  function transformStatisticCharts(
    statisticCharts: StatisticChart[],
  ): ChartData {
    const labels = statisticCharts.map((chart) => chart.date);
    const data = statisticCharts.map((chart) => chart.value);

    const chartData: ChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2,
        },
      ],
      legend: [statistic.name],
    };

    return chartData;
  }

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0,
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
      {chartData && (
        <LineChart
          data={chartData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          yAxisSuffix={statistic.unit}
        />
      )}
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
