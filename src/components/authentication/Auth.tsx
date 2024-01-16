import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { supabase } from "../../../supabase/supabase";
import { Button, Input } from "react-native-elements";
import useSession from "../../hooks/stores/useSession";
import useExercise from "../../hooks/stores/useExercise";
import useSet from "../../hooks/stores/useSet";
import useWorkoutUnits from "../../hooks/stores/useWorkoutUnit";
import useWorkout from "../../hooks/stores/useWorkout";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setSession } = useSession();
  const { syncWorkouts } = useWorkout();
  const { syncWorkoutUnits } = useWorkoutUnits();
  const { syncSets } = useSet();
  const { syncExercises } = useExercise();

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
      // Alert.alert("setting session");
      setSession(session);
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
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
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
