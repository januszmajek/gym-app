import React from "react";
import { View, StyleSheet } from "react-native";
import AppBar from "../AppBar";
import useWorkout from "../../hooks/stores/useWorkout";
import WorkoutItem from "./WorkoutItem";
import { Workout } from "../../../types";
import { FlashList } from "@shopify/flash-list";
import AddWorkoutButton from "./AddWorkoutButton";

const WorkoutList = () => {
  const { workouts } = useWorkout();

  const styles = StyleSheet.create({
    listPadding: {
      paddingVertical: 69,
    },
    screen: {
      minHeight: "100%",
    },
  });

  const renderItem = ({ item }: { item: Workout }) => (
    <WorkoutItem key={item.id} workout={item} />
  );

  const listFooter = () => <View style={styles.listPadding} />;

  return (
    <View style={styles.screen}>
      <AppBar title={"Workout List"} />
      <FlashList
        data={workouts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        estimatedItemSize={18}
        ListFooterComponent={listFooter}
      />
      <AddWorkoutButton />
    </View>
  );
};
export default WorkoutList;
