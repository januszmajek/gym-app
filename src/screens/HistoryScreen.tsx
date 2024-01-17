import { useTheme } from "react-native-paper";
import AppBar from "../components/AppBar";
import React from "react";
import { View, StyleSheet } from "react-native";
import HistoryCalendar from "../components/history/HistoryCalendar";
import TrainingSummary from "../components/workouts/TrainingSummary";
import useHistory from "../hooks/stores/useHistory";

export default function HistoryScreen() {
  const { activeTrainingHistoryId } = useHistory();

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    screen: { backgroundColor: colors.background, minHeight: "100%" },
  });

  return (
    <View style={styles.screen}>
      {!activeTrainingHistoryId ? (
        <>
          <AppBar title="Historia" />
          <HistoryCalendar />
        </>
      ) : (
        <TrainingSummary type="history" />
      )}
    </View>
  );
}
