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

  const handlePressEditWorkout = () => {
    setActiveWorkoutId(id);
  };

  const styles = StyleSheet.create({
    iconContainer: {
      backgroundColor: colors.inversePrimary,
      borderRadius: 15,
      overflow: "hidden",
      padding: 5,
    },
    workoutContainer: {
      backgroundColor: colors.primaryContainer,
      marginBottom: 5,
      paddingHorizontal: 20,
      paddingVertical: 8,
    },
    workoutContent: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: 5,
      justifyContent: "space-between",
    },
    workoutText: {
      color: colors.primary,
      flex: 1,
      fontSize: 18,
      marginRight: 10,
    },
  });

  return (
    <TouchableRipple style={styles.workoutContainer}>
      <View style={styles.workoutContent}>
        <Text style={styles.workoutText} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <TouchableRipple
          borderless
          style={styles.iconContainer}
          onPress={handlePressEditWorkout}
        >
          <Icon name="play" size={28} color={colors.primary} />
        </TouchableRipple>
        <TouchableRipple
          borderless
          style={styles.iconContainer}
          onPress={handlePressEditWorkout}
        >
          <Icon name="lead-pencil" size={28} color={colors.primary} />
        </TouchableRipple>
      </View>
    </TouchableRipple>
  );
};

export default WorkoutItem;
