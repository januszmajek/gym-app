import * as React from "react";
import useWorkoutStore from "../hooks/stores/useWorkout";
import { View, Text, StyleSheet } from "react-native";
import AppBar from "./AppBar";
import { Button, Dialog, Portal } from "react-native-paper";
import ExerciseList from "./ExerciseList";
import WorkoutUnitItem from "./WorkoutUnitItem";
import { supabase } from "../../supabase/supabase";

interface WorkoutProps {
  id: number;
}

const Workout = ({ id }: WorkoutProps) => {
  const { getWorkoutById, removeWorkout, setActiveWorkoutId } =
    useWorkoutStore();
  const workout = getWorkoutById(id);
  const [showExerciseList, setShowExerciseList] = React.useState(false);

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
  return (
    <View>
      {workout ? (
        <>
          <AppBar title={workout.name} />
          <Button onPress={handleRemoveWorkout}>
            <Text>Remove workout</Text>
          </Button>
          <Button onPress={showAddExercise}>
            <Text>Add exercise</Text>
          </Button>
          {workout.workoutUnits ? (
            workout.workoutUnits.map((workoutUnit) => (
              <WorkoutUnitItem {...workoutUnit} />
            ))
          ) : (
            <Text>No exercises added</Text>
          )}
          <Portal>
            <Dialog
              visible={showExerciseList}
              onDismiss={hideAddExercise}
              style={styles.dialogContainer}
            >
              <Dialog.Title style={styles.title}>
                <Text>Add exercise</Text>
              </Dialog.Title>
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

const styles = StyleSheet.create({
  dialogContainer: { paddingHorizontal: 10 },
  title: { fontSize: 20, textAlign: "center" },
});
