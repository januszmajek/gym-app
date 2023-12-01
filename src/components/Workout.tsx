import * as React from "react";
import useWorkoutStore from "../hooks/stores/useWorkout";
import { View, Text, StyleSheet } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import ExerciseList from "./ExerciseList";
import WorkoutUnitItem from "./WorkoutUnitItem";
import { supabase } from "../../supabase/supabase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { Workout as IWorkout, WorkoutUnit } from "../../types";
import useWorkoutUnits from "../hooks/stores/useWorkoutUnit";

interface WorkoutProps {
  workoutId: string;
  workoutName: string | undefined;
}

const Workout: React.FC<WorkoutProps> = ({ workoutId, workoutName: name }) => {
  const { getWorkoutById, removeWorkout, setActiveWorkoutId } =
    useWorkoutStore();
  const { getWorkoutUnitsByWorkoutId, workoutUnits: workoutUnitsInStore } =
    useWorkoutUnits();
  const [workoutUnits, setWorkoutUnits] = useState<WorkoutUnit[]>([]);
  const [showExerciseList, setShowExerciseList] = useState(false);
  const [workoutName, setWorkoutName] = useState(name);
  const [workout, setWorkout] = useState<IWorkout>();
  const [renaming, setRenaming] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    setWorkout(getWorkoutById(workoutId));
  }, []);

  useEffect(() => {
    setWorkoutUnits(getWorkoutUnitsByWorkoutId(workoutId));
  }, [workoutUnitsInStore]);

  const handleArrowPress = () => {
    setActiveWorkoutId(undefined);
  };

  const startRenaming = () => {
    setRenaming(true);
    console.log("Start renaming...");
  };

  const finishRenaming = async () => {
    setRenaming(false);
    console.log("...Finished renaming");
    if (workout && workoutName != workout.name) {
      const { data, error: supabaseError } = await supabase
        .from("workouts")
        .update({ name: workoutName })
        .eq("id", workoutId)
        .select();
      if (supabaseError) {
        console.log(supabaseError.message);
        return;
      }
      console.log("Renamed workout:", data);
      return;
    }
    console.log("But input was not changed!");
  };

  const showAddExercise = () => {
    setShowExerciseList(true);
  };

  const hideAddExercise = () => {
    setShowExerciseList(false);
  };

  const handleRemoveWorkout = async () => {
    console.log("Removing workout:", workoutId);
    removeWorkout(workoutId);
    setActiveWorkoutId(undefined);
    const { error: supabaseError } = await supabase
      .from("workouts")
      .delete()
      .eq("id", workoutId);
    if (supabaseError) {
      console.log(supabaseError.message);
      return;
    }
    console.log("Deleted workout:", workoutId);
  };

  const styles = StyleSheet.create({
    arrowContainer: {
      borderRadius: 15,
      padding: 7,
    },
    buttonsContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
    dialogContainer: { paddingHorizontal: 10 },
    dialogTitle: { fontSize: 20, textAlign: "center" },
    dialogTitleContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      justifyContent: "flex-start",
      marginBottom: 15,
    },
    noExercisesInfo: {
      fontSize: 18,
      marginTop: 10,
      textAlign: "center",
    },
    removeText: {
      color: colors.error,
    },
    renameButton: {
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 8,
    },
    renameContainer: {
      display: "flex",
      flexDirection: "row",
    },
    renameTextInput: {
      flexGrow: 1,
      height: 40,
      marginRight: 50,
    },
    workoutHeader: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    workoutTitle: {
      borderRadius: 15,
      color: colors.primary,
      fontSize: 24,
    },
  });

  return (
    <View>
      {workout ? (
        <>
          <View style={styles.workoutHeader}>
            <TouchableRipple
              borderless
              onPress={handleArrowPress}
              style={styles.arrowContainer}
            >
              <Icon name="arrow-left" size={32} color={colors.primary} />
            </TouchableRipple>
            {renaming ? (
              <View style={styles.renameContainer}>
                <TextInput
                  mode="outlined"
                  value={workoutName}
                  label="Workout name"
                  onChangeText={(workoutName) => setWorkoutName(workoutName)}
                  style={styles.renameTextInput}
                  onBlur={finishRenaming}
                  autoFocus={true}
                ></TextInput>
                <TouchableRipple>
                  <Icon name="check" size={32} color={colors.primary} />
                </TouchableRipple>
              </View>
            ) : (
              <TouchableRipple
                borderless
                onPress={startRenaming}
                style={styles.renameButton}
              >
                <Text style={styles.workoutTitle}>{workoutName}</Text>
              </TouchableRipple>
            )}
          </View>
          <View style={styles.buttonsContainer}>
            <Button onPress={showAddExercise}>
              <Text>Add exercise</Text>
            </Button>
            <Button onPress={handleRemoveWorkout}>
              <Text style={styles.removeText}>Remove workout</Text>
            </Button>
          </View>
          {workoutUnits.length > 0 ? (
            workoutUnits.map((workoutUnit, i) => (
              <WorkoutUnitItem
                key={i}
                workoutUnitId={workoutUnit.id}
                exercise_id={workoutUnit.exercise_id}
              />
            ))
          ) : (
            <Text style={styles.noExercisesInfo}>No exercises added</Text>
          )}
          <Portal>
            <Dialog
              visible={showExerciseList}
              onDismiss={hideAddExercise}
              style={styles.dialogContainer}
            >
              <View style={styles.dialogTitleContainer}>
                <Icon
                  name="arrow-left"
                  size={32}
                  color={colors.secondary}
                  onPress={hideAddExercise}
                />
                <Text style={styles.dialogTitle}>Add exercise</Text>
              </View>
              <ExerciseList />
            </Dialog>
          </Portal>
        </>
      ) : (
        <Text>Error: Workout not found</Text>
      )}
    </View>
  );
};

export default Workout;
