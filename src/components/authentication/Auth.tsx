import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
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

  const emailValidation: () => boolean = () => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  async function signInWithEmail() {
    if (!emailValidation()) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (password.length < 1) {
      Alert.alert("No password", "Please enter a password.");
      return;
    }
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
    if (!emailValidation()) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (password.length < 1) {
      Alert.alert("No password", "Please enter a password.");
      return;
    }
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
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
      <View
        style={[styles.verticallySpaced, styles.mt20, styles.buttonsContainer]}
      >
        <View style={styles.button}>
          <Button
            title="Log in"
            disabled={loading}
            onPress={() => signInWithEmail()}
            style={styles.button}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Sign up"
            disabled={loading}
            onPress={() => signUpWithEmail()}
            style={styles.button}
          />
        </View>
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
    display: "flex",
    flexDirection: "row",
    paddingBottom: 4,
    paddingTop: 4,
  },
  buttonsContainer: {
    padding: 5,
    gap: 25,
  },
  button: {
    flex: 1,
  },
});
