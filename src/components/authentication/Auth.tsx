import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { supabase } from "../../../supabase/supabase";
import { Button, Input } from "react-native-elements";
import useSession from "../../hooks/stores/useSession";
import useExercise from "../../hooks/stores/useExercise";
import useSet from "../../hooks/stores/useSet";
import useWorkoutUnits from "../../hooks/stores/useWorkoutUnit";
import useWorkout from "../../hooks/stores/useWorkout";
import useStatistic from "../../hooks/stores/useStatistic";
import useStatisticChart from "../../hooks/stores/useStatisticChart";
import useTraining from "../../hooks/stores/useTraining";
import { TrainingExercise } from "../../../types";
import GoogleAuth from "./GoogleAuth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setSession } = useSession();
  const { syncWorkouts } = useWorkout();
  const { syncWorkoutUnits } = useWorkoutUnits();
  const { syncSets } = useSet();
  const { syncExercises } = useExercise();
  const { addTraining, clearTrainings } = useTraining();
  const { syncStatistics } = useStatistic();
  const { syncStatisticCharts } = useStatisticChart();

  const handleSync = async (session) => {
    if (session) {
      {
        const { data, error: supabaseError } = await supabase
          .from("workouts")
          .select("*")
          .eq("user_id", session.user.id);
        if (supabaseError) console.log("Error fetching data", supabaseError);
        else {
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
            console.log(newTraining);
            addTraining(newTraining);
          });
        }
      }
      {
        const { data, error: supabaseError } = await supabase
          .from("chart_values")
          .select("*")
          .eq("user_id", session.user.id);
        if (supabaseError) console.log("Error fetching data", supabaseError);
        else {
          syncStatisticCharts(data);
        }
      }
      {
        const { data, error: supabaseError } = await supabase
          .from("statistics")
          .select("*")
          .eq("user_id", session.user.id);
        if (supabaseError) console.log("Error fetching data", supabaseError);
        else {
          syncStatistics(data);
        }
      }
    }
  };

  async function signInWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (session) {
      setSession(session);
      handleSync(session);
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (user) {
      {
        const newStatistic = {
          user_id: user.id,
          name: "Weight",
          icon: "scale-bathroom",
          unit: "kg",
          currentValue: 0,
        };
        const { error: supabaseError } = await supabase
          .from("statistics")
          .insert(newStatistic)
          .select()
          .single();
        if (supabaseError) {
          console.log(supabaseError.message);
          return;
        }
      }
      {
        const newStatistic = {
          user_id: user.id,
          name: "Body fat",
          icon: "water-percent",
          unit: "%",
          currentValue: 0,
        };
        const { error: supabaseError } = await supabase
          .from("statistics")
          .insert(newStatistic)
          .select()
          .single();
        if (supabaseError) {
          console.log(supabaseError.message);
          return;
        }
      }
      {
        const newStatistic = {
          user_id: user.id,
          name: "Belly waist",
          icon: "ruler",
          unit: "cm",
          currentValue: 0,
        };
        const { error: supabaseError } = await supabase
          .from("statistics")
          .insert(newStatistic)
          .select()
          .single();
        if (supabaseError) {
          console.log(supabaseError.message);
          return;
        }
      }
    }
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <GoogleAuth />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  mt20: {
    marginTop: 20,
  },
  verticallySpaced: {
    alignSelf: "stretch",
    paddingBottom: 4,
    paddingTop: 4,
  },
});
