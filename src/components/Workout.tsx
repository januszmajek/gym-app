import * as React from "react";
import useWorkout from "../hooks/stores/useWorkout";
import { View, Text, StyleSheet } from "react-native";
import { Button, Dialog, Portal, useTheme } from "react-native-paper";
import ExerciseList from "./ExerciseList";
import WorkoutUnitItem from "./WorkoutUnitItem";
import { supabase } from "../../supabase/supabase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { WorkoutUnit } from "../../types";
import useWorkoutUnits from "../hooks/stores/useWorkoutUnit";
import WorkoutHeader from "./WorkoutHeader";

interface WorkoutProps {
  workoutId: string;
}

const Workout: React.FC<WorkoutProps> = ({ workoutId }) => {
  const { removeWorkout, setActiveWorkoutId, getWorkoutById } = useWorkout();
  const { getWorkoutUnitsByWorkoutId, workoutUnits: workoutUnitsInStore } =
    useWorkoutUnits();
  const [workoutUnits, setWorkoutUnits] = useState<WorkoutUnit[]>([]);
  const [showExerciseList, setShowExerciseList] = useState(false);
  const name = getWorkoutById(workoutId)?.name;
  const { colors } = useTheme();

  useEffect(() => {
    setWorkoutUnits(getWorkoutUnitsByWorkoutId(workoutId));
  }, [workoutUnitsInStore]);

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
  });

  return (
    <View>
      {name ? (
        <>
          <WorkoutHeader workoutId={workoutId} workoutName={name} />
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
