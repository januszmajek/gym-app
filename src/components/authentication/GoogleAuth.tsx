import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { supabase } from "../../../supabase/supabase";
import React from "react";
import { TrainingExercise } from "../../../types";
import useExercise from "../../hooks/stores/useExercise";
import useSet from "../../hooks/stores/useSet";
import useStatistic from "../../hooks/stores/useStatistic";
import useStatisticChart from "../../hooks/stores/useStatisticChart";
import useTraining from "../../hooks/stores/useTraining";
import useWorkout from "../../hooks/stores/useWorkout";
import useWorkoutUnits from "../../hooks/stores/useWorkoutUnit";
import { StyleSheet } from "react-native";

export default function () {
  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    webClientId:
      "878398367561-1b9gg3juiliq7ut1somsv7kvbmn89qb9.apps.googleusercontent.com",
  });

  const { syncWorkouts } = useWorkout();
  const { syncWorkoutUnits } = useWorkoutUnits();
  const { syncSets } = useSet();
  const { syncExercises } = useExercise();
  const { addTraining, clearTrainings } = useTraining();
  const { syncStatistics } = useStatistic();
  const { syncStatisticCharts } = useStatisticChart();

  const handleSync = async (userId) => {
    {
      const { data, error: supabaseError } = await supabase
        .from("workouts")
        .select("*")
        .eq("user_id", userId);
      if (supabaseError) console.log("Error fetching data", supabaseError);
      else {
        syncWorkouts(data);
      }
    }
    {
      const { data, error: supabaseError } = await supabase
        .from("workout_units")
        .select("*")
        .eq("user_id", userId);
      if (supabaseError) console.log("Error fetching data", supabaseError);
      else {
        syncWorkoutUnits(data);
      }
    }
    {
      const { data, error: supabaseError } = await supabase
        .from("sets")
        .select("*")
        .eq("user_id", userId);
      if (supabaseError) console.log("Error fetching data", supabaseError);
      else {
        syncSets(data);
      }
    }
    {
      const { data, error: supabaseError } = await supabase
        .from("exercises")
        .select("*");
      if (supabaseError) console.log("Error fetching data", supabaseError);
      else {
        syncExercises(data);
      }
    }
    {
      const { data, error: supabaseError } = await supabase
        .from("trainings")
        .select("*")
        .eq("user_id", userId);
      if (supabaseError) console.log("Error fetching data", supabaseError);
      else {
        clearTrainings();
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
          const newTraining = {
            ...training,
            date_start: new Date(training.date_start),
            date_end: new Date(training.date_end),
            exercises_done: trainingExercises,
          };
          addTraining(newTraining);
        });
      }
    }
    {
      const { data, error: supabaseError } = await supabase
        .from("chart_values")
        .select("*")
        .eq("user_id", userId);
      if (supabaseError) console.log("Error fetching data", supabaseError);
      else {
        syncStatisticCharts(data);
      }
    }
    {
      const { data, error: supabaseError } = await supabase
        .from("statistics")
        .select("*")
        .eq("user_id", userId);
      if (supabaseError) console.log("Error fetching data", supabaseError);
      else {
        syncStatistics(data);
      }
    }
  };

  const styles = StyleSheet.create({
    googleSignIn: {
      width: "100%",
    },
  });

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      style={styles.googleSignIn}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          if (userInfo.idToken) {
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: "google",
              token: userInfo.idToken,
            });
            if (error) {
              console.log(error);
            }
            handleSync(data.user.id);
          } else {
            throw new Error("no ID token present!");
          }
        } catch (error) {
          return;
        }
      }}
    />
  );
}
