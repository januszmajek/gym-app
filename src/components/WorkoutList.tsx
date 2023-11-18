import React from "react";

import { View, Text } from "react-native";

import useWorkoutStore from "../hooks/stores/useWorkout";
import AppBar from "./AppBar";
import { TouchableRipple } from "react-native-paper";

const WorkoutList = () => {
  const { workouts, setActiveWorkoutId } = useWorkoutStore();

  return (
    <View>
      <AppBar title={"Workout List"} />
      {workouts.map((workout) => (
        <TouchableRipple
          key={workout.id}
          onPress={() => setActiveWorkoutId(workout.id)}
        >
          <Text>{workout.name}</Text>
        </TouchableRipple>
      ))}
    </View>
  );
};

export default WorkoutList;
