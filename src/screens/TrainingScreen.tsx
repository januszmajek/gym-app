import { View, StyleSheet, SafeAreaView } from "react-native";
import WorkoutList from "../components/workouts/WorkoutList";
import useWorkout from "../hooks/stores/useWorkout";
import Workout from "../components/workouts/Workout";
import React from "react";
import { useTheme } from "react-native-paper";
import useWorkoutUnits from "../hooks/stores/useWorkoutUnit";
import WorkoutUnit from "../components/workouts/WorkoutUnit";
import useTraining from "../hooks/stores/useTraining";
import Training from "../components/workouts/Training";

export default function TrainingScreen() {
  const { activeWorkoutId } = useWorkout();
  const { activeWorkoutUnitId } = useWorkoutUnits();
  const { activeTrainingId } = useTraining();

  const { colors } = useTheme();
  const styles = StyleSheet.create({
    screen: { backgroundColor: colors.background, minHeight: "100%" },
  });
  return (
    <View style={styles.screen}>
      {activeTrainingId ? (
        <Training />
      ) : activeWorkoutUnitId ? (
        <SafeAreaView>
          <WorkoutUnit workoutUnitId={activeWorkoutUnitId} />
        </SafeAreaView>
      ) : activeWorkoutId ? (
        <SafeAreaView>
          <Workout workoutId={activeWorkoutId} />
        </SafeAreaView>
      ) : (
        <WorkoutList />
      )}
    </View>
  );
}
