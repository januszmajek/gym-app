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
  id: number;
}

const Workout = ({ id }: WorkoutProps) => {
  const { getWorkoutById, removeWorkout, setActiveWorkoutId } =
    useWorkoutStore();
  const { getWorkoutUnitsByWorkoutId, workoutUnits: workoutUnitsInStore } =
    useWorkoutUnits();
  const [showExerciseList, setShowExerciseList] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [workout, setWorkout] = useState<IWorkout>();
  const [workoutUnits, setWorkoutUnits] = useState<WorkoutUnit[]>([]);
  const [workoutName, setWorkoutName] = useState("");
  const { colors } = useTheme();

  useEffect(() => {
    setWorkout(getWorkoutById(id));
  }, [id]);

  useEffect(() => {
    setWorkoutUnits(getWorkoutUnitsByWorkoutId(id));
  }, [id, workoutUnitsInStore]);

  useEffect(() => {
    workout && setWorkoutName(workout.name);
  }, [workout]);

  const handleRemoveWorkout = async () => {
    const { error: supabaseError } = await supabase
      .from("workouts")
      .delete()
      .eq("id", id);
    if (supabaseError) {
      console.log(supabaseError.message);
      return;
    }
    removeWorkout(id);
    setActiveWorkoutId(0);
  };

  const showAddExercise = () => {
    setShowExerciseList(true);
  };

  const hideAddExercise = () => {
    setShowExerciseList(false);
  };

  const handleArrowPress = () => {
    setActiveWorkoutId(0);
  };

  const startRename = () => {
    setRenaming(true);
  };

  const endRename = async () => {
    setRenaming(false);
    if (workout && workoutName != workout.name) {
      const { data, error: supabaseError } = await supabase
        .from("workouts")
        .update({ name: workoutName })
        .eq("id", id)
        .select();
      if (supabaseError) {
        console.log(supabaseError.message);
        return;
      }
      console.log(data);
    }
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
                  onBlur={endRename}
                  autoFocus={true}
                ></TextInput>
                <TouchableRipple>
                  <Icon name="check" size={32} color={colors.primary} />
                </TouchableRipple>
              </View>
            ) : (
              <TouchableRipple
                borderless
                onPress={startRename}
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
                sets={workoutUnit.sets}
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
