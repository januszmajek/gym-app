import { View, StyleSheet, SafeAreaView } from "react-native";
import WorkoutList from "../components/WorkoutList";
import AddWorkoutButton from "../components/AddWorkoutButton";
import useWorkout from "../hooks/stores/useWorkout";
import Workout from "../components/Workout";
import React, { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import useWorkoutUnits from "../hooks/stores/useWorkoutUnit";
import WorkoutUnit from "../components/WorkoutUnit";

export default function TrainingScreen() {
  const { activeWorkoutId, getWorkoutById } = useWorkout();
  const { activeWorkoutUnitId } = useWorkoutUnits();
  const [workoutName, setworkoutName] = useState<string>();

  const { colors } = useTheme();
  const styles = StyleSheet.create({
    screen: { backgroundColor: colors.background, minHeight: "100%" },
  });

  useEffect(() => {
    if (activeWorkoutId) setworkoutName(getWorkoutById(activeWorkoutId)?.name);
  }, [activeWorkoutId]);

  return (
    <View style={styles.screen}>
      {activeWorkoutUnitId ? (
        <SafeAreaView>
          <WorkoutUnit workoutUnitId={activeWorkoutUnitId} />
        </SafeAreaView>
      ) : activeWorkoutId ? (
        <SafeAreaView>
          <Workout workoutId={activeWorkoutId} workoutName={workoutName} />
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
