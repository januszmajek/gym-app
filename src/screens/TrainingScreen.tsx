import { View, StyleSheet } from "react-native";
import WorkoutList from "../components/WorkoutList";
import AddWorkoutButton from "../components/AddWorkoutButton";
import useWorkout from "../hooks/stores/useWorkout";
import Workout from "../components/Workout";
import React from "react";

export default function TrainingScreen() {
  const { activeWorkoutId } = useWorkout();

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

const styles = StyleSheet.create({
  screen: { minHeight: "100%" },
});
