import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useWorkoutStore from "../hooks/stores/useWorkout";
import AppBar from "./AppBar";
import { TouchableRipple, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const WorkoutList = () => {
  const { workouts, setActiveWorkoutId } = useWorkoutStore();
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
              onPress={() => {}}
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
