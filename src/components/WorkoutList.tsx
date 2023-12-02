import React from "react";
import { View, StyleSheet } from "react-native";
import AppBar from "./AppBar";
import useWorkoutStore from "../hooks/stores/useWorkout";
import WorkoutItem from "./WorkoutItem";

const WorkoutList = () => {
  const { workouts } = useWorkoutStore();

  const styles = StyleSheet.create({
    view: {
      maxHeight: "100%",
      overflow: "scroll",
    },
  });

  return (
    <View style={styles.view}>
      <AppBar title={"Workout List"} />
      {workouts.map((workout) => (
        <WorkoutItem key={workout.id} workout={workout} />
      ))}
    </View>
  );
};
export default WorkoutList;
