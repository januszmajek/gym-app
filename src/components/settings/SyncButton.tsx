import { StyleSheet } from "react-native";
import { TouchableRipple, useTheme, Card, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import useWorkout from "../../hooks/stores/useWorkout";
import useWorkoutUnits from "../../hooks/stores/useWorkoutUnit";
import useExercise from "../../hooks/stores/useExercise";
import { supabase } from "../../../supabase/supabase";
import useSession from "../../hooks/stores/useSession";
import useSet from "../../hooks/stores/useSet";
import useTraining from "../../hooks/stores/useTraining";
import { Training, TrainingExercise } from "../../../types";

const SyncButton = () => {
  const { colors } = useTheme();
  const { session } = useSession();
  const { syncWorkouts } = useWorkout();
  const { syncWorkoutUnits } = useWorkoutUnits();
  const { syncSets } = useSet();
  const { syncExercises } = useExercise();
  const { addTraining, clearTrainings } = useTraining();

  const styles = StyleSheet.create({
    buttonStyle: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: 15,
      paddingHorizontal: 10,
      paddingVertical: 15,
    },
    cardStyle: { marginHorizontal: 10, marginVertical: 8 },
    ripple: {
      borderRadius: 10,
    },
  });

  const handleSync = async () => {
    if (session) {
      {
        const { data, error: supabaseError } = await supabase
          .from("workouts")
          .select("*")
          .eq("user_id", session.user.id);
        if (supabaseError) console.log("Error fetching data", supabaseError);
        else {
          console.log("Syncing workouts:", data);
          syncWorkouts(data);
        }
      }
      {
        const { data, error: supabaseError } = await supabase
          .from("workout_units")
          .select("*")
          .eq("user_id", session.user.id);
        if (supabaseError) console.log("Error fetching data", supabaseError);
        else {
          console.log("Syncing workout units:", data);
          syncWorkoutUnits(data);
        }
      }
      {
        const { data, error: supabaseError } = await supabase
          .from("sets")
          .select("*")
          .eq("user_id", session.user.id);
        if (supabaseError) console.log("Error fetching data", supabaseError);
        else {
          console.log("Syncing sets:", data);
          syncSets(data);
        }
      }
      {
        const { data, error: supabaseError } = await supabase
          .from("exercises")
          .select("*");
        if (supabaseError) console.log("Error fetching data", supabaseError);
        else {
          console.log("Syncing exercises");
          syncExercises(data);
        }
      }
      {
        const { data, error: supabaseError } = await supabase
          .from("trainings")
          .select("*")
          .eq("user_id", session.user.id);
        if (supabaseError) console.log("Error fetching data", supabaseError);
        else {
          clearTrainings();
          console.log("Syncing trainings");
          data.map((training) => {
            const jsonArray = JSON.parse(training.exercises_done);
            const trainingExercises: TrainingExercise[] = jsonArray.map(
              (exercise: TrainingExercise) => {
                return {
                  name: exercise.name,
                  type: exercise.type,
                  repetitions: exercise.repetitions,
                  weight: exercise.weight,
                  time: exercise.time,
                };
              },
            );
            console.log("TRAINING EXERCISES:", trainingExercises);
            const newTraining = {
              ...training,
              date_start: new Date(training.date_start),
              date_end: new Date(training.date_end),
              exercises_done: trainingExercises,
            };
            console.log(newTraining);
            addTraining(newTraining);
          });
        }
      }
    }
  };

  return (
    <Card style={styles.cardStyle}>
      <TouchableRipple onPress={handleSync} style={styles.ripple}>
        <Card.Content style={styles.buttonStyle}>
          <Icon name="download" size={32} color={colors.primary} />
          <Text variant="bodyLarge">Sync with DB state</Text>
        </Card.Content>
      </TouchableRipple>
    </Card>
  );
};

export default SyncButton;
