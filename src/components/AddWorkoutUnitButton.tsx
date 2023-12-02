import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Dialog,
  FAB,
  Portal,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { useState } from "react";
import ExerciseList from "./ExerciseList";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
    arrowContainer: {
      backgroundColor: colors.primaryContainer,
      borderRadius: 15,
      padding: 7,
    },
    dialogContainer: { paddingHorizontal: 10 },
    dialogTitle: {
      color: colors.primary,
      fontSize: 21,
    },
    dialogTitleContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      justifyContent: "flex-start",
      marginBottom: 15,
    },
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
      <Portal>
        <Dialog
          visible={showExerciseList}
          onDismiss={hideAddExercise}
          style={styles.dialogContainer}
        >
          <View style={styles.dialogTitleContainer}>
            <TouchableRipple style={styles.arrowContainer}>
              <Icon
                name="arrow-left"
                size={32}
                color={colors.secondary}
                onPress={hideAddExercise}
              />
            </TouchableRipple>
            <Text style={styles.dialogTitle}>Add exercise</Text>
          </View>
          <ExerciseList />
        </Dialog>
      </Portal>
    </>
  );
};

export default AddWorkoutUnitButton;
