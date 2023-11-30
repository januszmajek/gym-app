import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import useWorkoutStore from "../hooks/stores/useWorkout";
import AppBar from "./AppBar";
import { TouchableRipple, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { supabase } from "../../supabase/supabase";
import useSession from "../hooks/stores/useSession";
import useWorkoutUnits from "../hooks/stores/useWorkoutUnit";
import useSet from "../hooks/stores/useSet";

const WorkoutList = () => {
  const { workouts, syncWorkouts, removeWorkout, setActiveWorkoutId } =
    useWorkoutStore();
  const { syncWorkoutUnits } = useWorkoutUnits();
  const { syncSets } = useSet();

  const { session } = useSession();
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    deleteButton: {
      borderRadius: 12,
      padding: 8,
    },
    view: {
      maxHeight: "100%",
      overflow: "scroll",
    },
    workoutContainer: {
      backgroundColor: colors.primaryContainer,
      marginBottom: 5,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    workoutContent: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    workoutText: {
      color: colors.primary,
      fontSize: 18,
    },
  });

  const handleDeleteWorkout = async (workoutId: number) => {
    const { error: supabaseError } = await supabase
      .from("workouts")
      .delete()
      .eq("id", workoutId);
    if (supabaseError) {
      console.log(supabaseError.message);
      return;
    }
    console.log("removing workout:", workoutId);
    removeWorkout(workoutId);
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (session) {
        const { data, error } = await supabase
          .from("workouts")
          .select("*")
          .eq("user_id", session.user.id);
        if (error) return;
        console.log("syncing workouts:", data);
        syncWorkouts(data);

        {
          const { data, error } = await supabase
            .from("workout_units")
            .select("*")
            .eq("user_id", session.user.id);
          if (error) return;
          console.log("syncing workout units:", data);
          syncWorkoutUnits(data);
        }

        {
          const { data, error } = await supabase
            .from("sets")
            .select("*")
            .eq("user_id", session.user.id);
          if (error) return;
          console.log("syncing sets:", data);
          syncSets(data);
        }
      }
    };

    fetchWorkouts();
  }, [session]);

  return (
    <View style={styles.view}>
      <AppBar title={"Workout List"} />
      {workouts.map((workout) => (
        <TouchableRipple
          style={styles.workoutContainer}
          key={workout.id}
          onPress={() => setActiveWorkoutId(workout.id)}
        >
          <View style={styles.workoutContent}>
            <Text style={styles.workoutText}>{workout.name}</Text>
            <TouchableRipple
              borderless
              style={styles.deleteButton}
              onPress={() => handleDeleteWorkout(workout.id)}
            >
              <Icon name="delete" size={28} color={colors.error} />
            </TouchableRipple>
          </View>
        </TouchableRipple>
      ))}
    </View>
  );
};
export default WorkoutList;
