import * as React from "react";
import useWorkout from "../../hooks/stores/useWorkout";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";
import WorkoutUnitItem from "./WorkoutUnitItem";
import { supabase } from "../../../supabase/supabase";
import { useEffect, useState } from "react";
import { WorkoutUnit } from "../../../types";
import useWorkoutUnits from "../../hooks/stores/useWorkoutUnit";
import WorkoutHeader from "./WorkoutHeader";
import AddWorkoutUnitButton from "./AddWorkoutUnitButton";
import useSet from "../../hooks/stores/useSet";
import useExercise from "../../hooks/stores/useExercise";
import { FlashList } from "@shopify/flash-list";

interface WorkoutProps {
  workoutId: string;
}

const Workout: React.FC<WorkoutProps> = ({ workoutId }) => {
  const { removeWorkout, setActiveWorkoutId, getWorkoutById } = useWorkout();
  const {
    getWorkoutUnitsByWorkoutId,
    removeWorkoutUnitsByWorkoutId,
    workoutUnits: workoutUnitsInStore,
  } = useWorkoutUnits();
  const { clearSetsByWorkoutUnitId } = useSet();
  const { getSetsByWorkoutUnitId } = useSet();
  const { getExerciseById } = useExercise();
  const { colors } = useTheme();
  const [workoutUnits, setWorkoutUnits] = useState<WorkoutUnit[]>(
    getWorkoutUnitsByWorkoutId(workoutId),
  );
  const name = getWorkoutById(workoutId)?.name;

  useEffect(() => {
    setWorkoutUnits(getWorkoutUnitsByWorkoutId(workoutId));
  }, [workoutUnitsInStore]);

  const handleDeleteWorkout = async () => {
    const workoutUnits = getWorkoutUnitsByWorkoutId(workoutId);
    workoutUnits.map((workoutUnit) => {
      clearSetsByWorkoutUnitId(workoutUnit.id);
    });
    removeWorkoutUnitsByWorkoutId(workoutId);
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
    console.log("Deleted Workout:", workoutId);
  };

  const styles = StyleSheet.create({
    listPadding: {
      paddingVertical: 69,
    },
    noExercisesInfo: {
      color: colors.primary,
      fontSize: 18,
      marginTop: 10,
      textAlign: "center",
    },
    screen: {
      backgroundColor: colors.background,
      minHeight: "100%",
    },
    workoutError: {
      color: colors.error,
    },
  });

  const renderItem = ({ item }: { item: WorkoutUnit }) => (
    <WorkoutUnitItem
      key={item.id}
      workoutUnitId={item.id}
      sets={getSetsByWorkoutUnitId(item.id)}
      name={getExerciseById(item.exercise_id)?.name}
    />
  );

  const listFooter = () => <View style={styles.listPadding} />;

  return name ? (
    <SafeAreaView>
      <View style={styles.screen}>
        <WorkoutHeader
          workoutId={workoutId}
          workoutName={name}
          handleRemoveWorkout={handleDeleteWorkout}
        />
        {workoutUnits.length > 0 ? (
          <FlashList
            data={workoutUnits}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            estimatedItemSize={18}
            ListFooterComponent={listFooter}
          />
        ) : (
          <Text style={styles.noExercisesInfo}>No exercises added</Text>
        )}
        <AddWorkoutUnitButton />
      </View>
    </SafeAreaView>
  ) : (
    <Text style={styles.workoutError}>Error: Workout not found</Text>
  );
};

export default Workout;
