import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { supabase } from "../../supabase/supabase";
import AppBar from "./AppBar";
import useSession from "../hooks/stores/useSession";
import useWorkoutUnits from "../hooks/stores/useWorkoutUnit";
import useWorkoutStore from "../hooks/stores/useWorkout";
import useSet from "../hooks/stores/useSet";
import WorkoutItem from "./WorkoutItem";

const WorkoutList = () => {
  const { workouts, syncWorkouts } = useWorkoutStore();
  const { syncWorkoutUnits } = useWorkoutUnits();
  const { syncSets } = useSet();
  const { session } = useSession();

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (session) {
        {
          const { data, error } = await supabase
            .from("workouts")
            .select("*")
            .eq("user_id", session.user.id);
          if (error) return;
          console.log("Syncing workouts:", data);
          syncWorkouts(data);
        }
        {
          const { data, error } = await supabase
            .from("workout_units")
            .select("*")
            .eq("user_id", session.user.id);
          if (error) return;
          console.log("Syncing workout units:", data);
          syncWorkoutUnits(data);
        }
        {
          const { data, error } = await supabase
            .from("sets")
            .select("*")
            .eq("user_id", session.user.id);
          if (error) return;
          console.log("Syncing sets:", data);
          syncSets(data);
        }
      }
    };

    setTimeout(() => fetchWorkouts(), 5000);
  }, []);

  const styles = StyleSheet.create({
    view: {
      maxHeight: "100%",
      overflow: "scroll",
    },
  });

  return (
    <View style={styles.view}>
      <AppBar title={"Workout List"} />
      {workouts.map((workout) => (
        <WorkoutItem key={workout.id} workout={workout} />
      ))}
    </View>
  );
};
export default WorkoutList;
