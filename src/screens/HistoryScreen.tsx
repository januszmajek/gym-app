import { useTheme } from "react-native-paper";
import AppBar from "../components/AppBar";
import React from "react";
import { View, StyleSheet } from "react-native";
import HistoryCalendar from "../components/history/HistoryCalendar";
import TrainingSummary from "../components/workouts/TrainingSummary";
import useHistory from "../hooks/stores/useHistory";

export default function HistoryScreen() {
  const { activeTrainingHistoryId } = useHistory();
  // interface historyItem {
  //   time: Date;
  //   date: Date;
  //   workoutName: string;
  // }

  // const historyItem = () => (
  //   <View style={styles.historyItem}>
  //     <Text variant="labelLarge" style={styles.workoutText}>
  //       Pierdolony trening numer xyz
  //     </Text>
  //     <View style={styles.textWrapper}>
  //       <Text variant="bodySmall" style={styles.text}>
  //         23:02
  //       </Text>
  //       <Text variant="bodySmall" style={styles.text}>
  //         01.12.2023
  //       </Text>
  //     </View>
  //     <Divider />
  //   </View>
  // );

  const { colors } = useTheme();
  // const styles = StyleSheet.create({
  //   screen: { backgroundColor: colors.background, minHeight: "100%" },
  //   text: { fontSize: 30, textAlign: "center" },
  // });

  const styles = StyleSheet.create({
    screen: { backgroundColor: colors.background, minHeight: "100%" },
    // flatList: {
    //   paddingBottom: 50,
    // },
    // historyItem: {
    //   borderLeftColor: "#6edf3f", //make it different depend on the training
    //   borderLeftWidth: 4,
    //   marginLeft: 20,
    // },
    // text: {
    //   // fontSize: 10,
    // },
    // textWrapper: {
    //   display: "flex",
    //   flexDirection: "row",
    //   paddingBottom: 20,
    //   paddingLeft: 5,
    //   paddingTop: 5,
    // },
    // workoutText: {
    //   fontSize: 15,
    //   paddingLeft: 5,
    //   paddingTop: 5,
    // },
  });

  // const other = { key: "other", color: "blue" };
  // const today = { key: "today", color: "green" };
  // const marked = {
  //   "2023-12-01": {
  //     dots: [other],
  //   },
  //   "2023-12-02": {
  //     dots: [today],
  //   },
  // };

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
