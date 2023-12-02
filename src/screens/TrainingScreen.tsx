import { View, StyleSheet, SafeAreaView } from "react-native";
import WorkoutList from "../components/workouts/WorkoutList";
import AddWorkoutButton from "../components/workouts/AddWorkoutButton";
import useWorkout from "../hooks/stores/useWorkout";
import Workout from "../components/workouts/Workout";
import React from "react";
import { useTheme } from "react-native-paper";
import useWorkoutUnits from "../hooks/stores/useWorkoutUnit";
import WorkoutUnit from "../components/workouts/WorkoutUnit";

export default function TrainingScreen() {
  const { activeWorkoutId } = useWorkout();
  const { activeWorkoutUnitId } = useWorkoutUnits();

  const { colors } = useTheme();
  const styles = StyleSheet.create({
    screen: { backgroundColor: colors.background, minHeight: "100%" },
  });
  return (
    <View style={styles.screen}>
      {activeWorkoutUnitId ? (
        <SafeAreaView>
          <WorkoutUnit workoutUnitId={activeWorkoutUnitId} />
        </SafeAreaView>
      ) : activeWorkoutId ? (
        <SafeAreaView>
          <Workout workoutId={activeWorkoutId} />
        </SafeAreaView>
      ) : (
        <>
          <WorkoutList />
          <AddWorkoutButton />
        </>
      )}
    </View>
  );
}
