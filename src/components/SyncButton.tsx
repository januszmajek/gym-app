import { View, Text, StyleSheet } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import useWorkout from "../hooks/stores/useWorkout";
import useWorkoutUnits from "../hooks/stores/useWorkoutUnit";
import useExercise from "../hooks/stores/useExercise";
import { supabase } from "../../supabase/supabase";
import useSession from "../hooks/stores/useSession";
import useSet from "../hooks/stores/useSet";

const SyncButton = () => {
  const { colors } = useTheme();
  const { session } = useSession();
  const { syncWorkouts } = useWorkout();
  const { syncWorkoutUnits } = useWorkoutUnits();
  const { syncSets } = useSet();
  const { syncExercises } = useExercise();

  const styles = StyleSheet.create({
    buttonStyle: {
      alignItems: "center",
      backgroundColor: colors.primaryContainer,
      borderRadius: 0,
      display: "flex",
      flexDirection: "row",
      gap: 15,
      paddingHorizontal: 14,
      paddingVertical: 13,
    },
    label: { color: colors.primary, fontSize: 20 },
  });

  const handleSync = async () => {
    if (session) {
      {
        const { data, error } = await supabase
          .from("workouts")
          .select("*")
          .eq("user_id", session.user.id);
        if (error) console.log("Error fetching data", error);
        else {
          console.log("Syncing workouts:", data);
          syncWorkouts(data);
        }
      }
      {
        const { data, error } = await supabase
          .from("workout_units")
          .select("*")
          .eq("user_id", session.user.id);
        if (error) console.log("Error fetching data", error);
        else {
          console.log("Syncing workout units:", data);
          syncWorkoutUnits(data);
        }
      }
      {
        const { data, error } = await supabase
          .from("sets")
          .select("*")
          .eq("user_id", session.user.id);
        if (error) console.log("Error fetching data", error);
        else {
          console.log("Syncing sets:", data);
          syncSets(data);
        }
      }
      {
        const { data, error } = await supabase.from("exercises").select("*");
        if (error) console.log("Error fetching data", error);
        else {
          console.log("Syncing exercises");
          syncExercises(data);
        }
      }
    }
  };

  return (
    <View>
      <TouchableRipple onPress={handleSync} style={styles.buttonStyle}>
        <>
          <Icon name="download" size={32} color={colors.primary} />
          <Text style={styles.label}>Sync with DB state</Text>
        </>
      </TouchableRipple>
    </View>
  );
};

export default SyncButton;
