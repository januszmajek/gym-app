import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AppBar from "../AppBar";
import useWorkout from "../../hooks/stores/useWorkout";
import WorkoutItem from "./WorkoutItem";
import useWorkoutUnits from "../../hooks/stores/useWorkoutUnit";
import useSet from "../../hooks/stores/useSet";

const WorkoutList = () => {
  const { workouts } = useWorkout();
  const { workoutUnits } = useWorkoutUnits();
  const { sets } = useSet();

  useEffect(() => {
    console.log("Workouts:", workouts);
    console.log("WorkoutUnits:", workoutUnits);
    console.log("Sets:", sets);
  });

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
