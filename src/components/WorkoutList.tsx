import React from "react";

import { View, Text, StyleSheet } from "react-native";

import useWorkoutStore from "../hooks/stores/useWorkout";
import AppBar from "./AppBar";
import { TouchableRipple, useTheme } from "react-native-paper";

const WorkoutList = () => {
  const { workouts, setActiveWorkoutId } = useWorkoutStore();
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    view: {
      maxHeight: "100%",
      overflow: "scroll",
    },
    workoutContainer: {
      backgroundColor: colors.background,
      borderBottomWidth: 0,
      borderColor: colors.elevation.level5,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderStyle: "solid",
      borderWidth: 1,
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    workoutText: {
      color: colors.primary,
      fontSize: 17,
    },
  });
  return (
    <View style={styles.view}>
      <AppBar title={"Workout List"} />
      {workouts.map((workout) => (
        <TouchableRipple
          style={styles.workoutContainer}
          key={workout.id}
          onPress={() => setActiveWorkoutId(workout.id)}
        >
          <Text style={styles.workoutText}>{workout.name}</Text>
        </TouchableRipple>
      ))}
    </View>
  );
};
export default WorkoutList;
