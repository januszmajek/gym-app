import * as React from "react";
import useWorkout from "../hooks/stores/useWorkout";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import WorkoutUnitItem from "./WorkoutUnitItem";
import { supabase } from "../../supabase/supabase";
import { useEffect, useState } from "react";
import { WorkoutUnit } from "../../types";
import useWorkoutUnits from "../hooks/stores/useWorkoutUnit";
import WorkoutHeader from "./WorkoutHeader";
import AddWorkoutUnitButton from "./AddWorkoutUnitButton";

interface WorkoutProps {
  workoutId: string;
}

const Workout: React.FC<WorkoutProps> = ({ workoutId }) => {
  const { getWorkoutUnitsByWorkoutId, workoutUnits: workoutUnitsInStore } =
    useWorkoutUnits();
  const { removeWorkout, setActiveWorkoutId, getWorkoutById } = useWorkout();
  const { colors } = useTheme();
  const [workoutUnits, setWorkoutUnits] = useState<WorkoutUnit[]>([]);
  const name = getWorkoutById(workoutId)?.name;

  useEffect(() => {
    setWorkoutUnits(getWorkoutUnitsByWorkoutId(workoutId));
  }, [workoutUnitsInStore]);

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
      color: colors.primary,
      fontSize: 18,
      marginTop: 10,
      textAlign: "center",
    },
    screen: { backgroundColor: colors.background, minHeight: "100%" },
    workoutError: {
      color: colors.error,
    },
  });

  return name ? (
    <View style={styles.screen}>
      <AddWorkoutUnitButton />
      <WorkoutHeader
        workoutId={workoutId}
        workoutName={name}
        handleRemoveWorkout={handleRemoveWorkout}
      />
      {workoutUnits.length > 0 ? (
        workoutUnits.map((workoutUnit, i) => (
          <WorkoutUnitItem
            key={i}
            workoutUnitId={workoutUnit.id}
            exerciseId={workoutUnit.exercise_id}
          />
        ))
      ) : (
        <Text style={styles.noExercisesInfo}>No exercises added</Text>
      )}
    </View>
  ) : (
    <Text style={styles.workoutError}>Error: Workout not found</Text>
  );
};

export default Workout;
