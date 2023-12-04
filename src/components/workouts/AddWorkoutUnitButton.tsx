import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB, Portal } from "react-native-paper";
import { useState } from "react";
import ExerciseListDialog from "./ExerciseListDialog";

const AddWorkoutUnitButton = () => {
  const [showExerciseList, setShowExerciseList] = useState(false);

  const showAddExercise = () => {
    setShowExerciseList(true);
  };

  const hideAddExercise = () => {
    setShowExerciseList(false);
  };

  const styles = StyleSheet.create({
    fab: {
      bottom: 0,
      margin: 16,
      position: "absolute",
      right: 0,
    },
  });

  return (
    <>
      <FAB icon="plus" style={styles.fab} onPress={showAddExercise} />
      {showExerciseList && (
        <Portal>
          <ExerciseListDialog hideAddExercise={hideAddExercise} />
        </Portal>
      )}
    </>
  );
};

export default AddWorkoutUnitButton;
