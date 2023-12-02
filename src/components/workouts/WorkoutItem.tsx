import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import { Workout } from "../../../types";
import { supabase } from "../../../supabase/supabase";
import useWorkout from "../../hooks/stores/useWorkout";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useWorkoutUnits from "../../hooks/stores/useWorkoutUnit";
import useSet from "../../hooks/stores/useSet";

interface WorkoutItemProps {
  workout: Workout;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout }) => {
  const { id, name } = workout;
  const { colors } = useTheme();
  const { removeWorkout, setActiveWorkoutId } = useWorkout();
  const { getWorkoutUnitsByWorkoutId, removeWorkoutUnitsByWorkoutId } =
    useWorkoutUnits();
  const { clearSetsByWorkoutUnitId } = useSet();

  const handleDeleteWorkout = async () => {
    const workoutUnits = getWorkoutUnitsByWorkoutId(id);
    workoutUnits.map((workoutUnit) => {
      clearSetsByWorkoutUnitId(workoutUnit.id);
    });
    removeWorkoutUnitsByWorkoutId(id);
    removeWorkout(id);
    const { error: supabaseError } = await supabase
      .from("workouts")
      .delete()
      .eq("id", id);
    if (supabaseError) {
      console.log(supabaseError.message);
      return;
    }
    console.log("Deleted Workout:", id);
  };

  const handlePressWorkout = () => {
    setActiveWorkoutId(id);
  };

  const styles = StyleSheet.create({
    deleteButton: {
      borderRadius: 12,
      padding: 8,
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
      width: "80%",
    },
  });

  return (
    <TouchableRipple
      style={styles.workoutContainer}
      onPress={handlePressWorkout}
    >
      <View style={styles.workoutContent}>
        <Text style={styles.workoutText} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <TouchableRipple
          borderless
          style={styles.deleteButton}
          onPress={handleDeleteWorkout}
        >
          <Icon name="delete" size={28} color={colors.error} />
        </TouchableRipple>
      </View>
    </TouchableRipple>
  );
};

export default WorkoutItem;
