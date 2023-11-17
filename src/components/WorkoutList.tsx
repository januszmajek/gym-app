import React from "react";

import { View, Text, Button } from "react-native";

import useWorkoutStore from "../hooks/stores/useWorkoutStore";

const WorkoutList = () => {
  const { workouts, removeWorkout } = useWorkoutStore();

  return (
    <View>
      <Text>Workout List</Text>

      {workouts.map((workout) => (
        <View key={workout.id}>
          <Text>{workout.name}</Text>

          <Button title="Remove" onPress={() => removeWorkout(workout.id)} />
        </View>
      ))}
    </View>
  );
};

export default WorkoutList;
