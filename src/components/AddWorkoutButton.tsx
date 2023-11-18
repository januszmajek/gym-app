import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import useWorkoutStore from "../hooks/stores/useWorkout";

const AddWorkoutButton = () => {
  const { nextId, addWorkout } = useWorkoutStore();
  const emptyWorkout = {
    id: nextId,
    name: "New workout",
    workoutUnits: [],
  };

  return (
    <FAB
      icon="plus"
      style={styles.fab}
      onPress={() => addWorkout(emptyWorkout)}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    bottom: 0,
    margin: 16,
    position: "absolute",
    right: 0,
  },
});

export default AddWorkoutButton;
