import React from "react";
import StatisticsList from "../components/statistics/StatisticsList";
import useStatistic from "../hooks/stores/useStatistic";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import Statistic from "../components/statistics/Statistic";

export default function StatisticsScreen() {
  const { activeStatisticId } = useStatistic();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    screen: { backgroundColor: colors.background, minHeight: "100%" },
  });

  return (
    <View style={styles.screen}>
      {activeStatisticId ? (
        <Statistic statistic_id={activeStatisticId} />
      ) : (
        <StatisticsList />
      )}
    </View>
  );
}
