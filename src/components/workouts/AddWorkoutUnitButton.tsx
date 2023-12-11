import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB, Portal, useTheme } from "react-native-paper";
import { useState } from "react";
import ExerciseListDialog from "./ExerciseListDialog";

const AddWorkoutUnitButton = () => {
  const [showExerciseList, setShowExerciseList] = useState(false);
  const { colors } = useTheme();
  const showAddExercise = () => {
    setShowExerciseList(true);
  };

  const hideAddExercise = () => {
    setShowExerciseList(false);
  };

  const styles = StyleSheet.create({
    fab: {
      backgroundColor: colors.tertiaryContainer,
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
