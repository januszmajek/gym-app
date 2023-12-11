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
