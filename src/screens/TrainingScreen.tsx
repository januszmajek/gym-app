import { View, StyleSheet } from "react-native";
import WorkoutList from "../components/WorkoutList";
import AddWorkoutButton from "../components/AddWorkoutButton";
import useWorkout from "../hooks/stores/useWorkout";
import Workout from "../components/Workout";
import React from "react";
import { useTheme } from "react-native-paper";

export default function TrainingScreen() {
  const { activeWorkoutId } = useWorkout();
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    screen: { backgroundColor: colors.background, minHeight: "100%" },
  });

  return (
    <View style={styles.screen}>
      {activeWorkoutId ? (
        <Workout id={activeWorkoutId} />
      ) : (
        <>
          <WorkoutList />
          <AddWorkoutButton />
        </>
      )}
    </View>
  );
}
