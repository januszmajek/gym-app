import { Text, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Set } from "../../types";
import { TouchableRipple, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { supabase } from "../../supabase/supabase";
import useWorkoutUnits from "../hooks/stores/useWorkoutUnit";
import useSet from "../hooks/stores/useSet";

interface WorkoutUnitProps {
  workoutUnitId: string;
  exerciseId: string;
}

const WorkoutUnitItem = ({ exerciseId, workoutUnitId }: WorkoutUnitProps) => {
  const { sets: allSets, getSetsByWorkoutUnitId } = useSet();
  const { setActiveWorkoutUnitId } = useWorkoutUnits();
  const { removeWorkoutUnit } = useWorkoutUnits();
  const { colors } = useTheme();
  const [sets, setSets] = useState<Set[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    console.log(getSetsByWorkoutUnitId(workoutUnitId));
    setSets(getSetsByWorkoutUnitId(workoutUnitId));
  }, [allSets]);

  const handleDeleteWorkoutUnit = async () => {
    console.log("Removing Workout Unit:", workoutUnitId);
    removeWorkoutUnit(workoutUnitId);
    const { error } = await supabase
      .from("workout_units")
      .delete()
      .eq("id", workoutUnitId);
    if (error) {
      console.log(error);
      return;
    }
    console.log("Deleted Workout Unit:", workoutUnitId);
  };

  useEffect(() => {
    const getWorkoutUnitName = async (exerciseId: string) => {
      const { data, error } = await supabase
        .from("exercises")
        .select("name")
        .eq("id", exerciseId);

      if (error) {
        console.log(error);
      }
      console.log(data);
      data && setName(data[0].name);
    };

    getWorkoutUnitName(exerciseId);
  }, []);

  const styles = StyleSheet.create({
    buttonsContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: 5,
      justifyContent: "center",
    },
    container: {
      alignItems: "center",
      backgroundColor: colors.primaryContainer,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 2,
      paddingHorizontal: 15,
      paddingVertical: 5,
    },
    exerciseName: {
      color: colors.tertiary,
      fontSize: 18,
    },
    iconContainer: {
      borderRadius: 15,
      overflow: "hidden",
      padding: 5,
    },
    labelContainer: {
      maxWidth: "80%",
    },
    setsCount: {
      color: colors.primary,
      fontSize: 15,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text
          style={styles.exerciseName}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {name}
        </Text>
        <Text style={styles.setsCount}>{sets.length} sets</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableRipple
          borderless
          style={styles.iconContainer}
          onPress={() => setActiveWorkoutUnitId(workoutUnitId)}
        >
          <Icon name="lead-pencil" size={28} color={colors.primary} />
        </TouchableRipple>
        <TouchableRipple
          borderless
          style={styles.iconContainer}
          onPress={handleDeleteWorkoutUnit}
        >
          <Icon name="delete" size={28} color={colors.error} />
        </TouchableRipple>
      </View>
    </View>
  );
};

export default WorkoutUnitItem;
