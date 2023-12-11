import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, TouchableRipple, useTheme } from "react-native-paper";
import { Workout } from "../../../types";
import useWorkout from "../../hooks/stores/useWorkout";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useTraining from "../../hooks/stores/useTraining";
import { Training } from "../../../types";
import uuid from "react-native-uuid";

interface WorkoutItemProps {
  workout: Workout;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout }) => {
  const { id, name } = workout;
  const { colors } = useTheme();
  const { setActiveWorkoutId } = useWorkout();
  const { addTraining, setActiveTrainingId, setActiveTraining } = useTraining();

  const handlePressEditWorkout = () => {
    setActiveWorkoutId(id);
  };

  const handlePressStartTraining = () => {
    const newTraining: Training = {
      id: uuid.v4() as string,
      date_start: new Date(Date.now()),
      name: name,
      exercises_done: [],
    };
    addTraining(newTraining);
    setActiveTraining(newTraining);
    setActiveTrainingId(newTraining.id);
    setActiveWorkoutId(workout.id);
    console.log("active training:", newTraining);
  };

  const styles = StyleSheet.create({
    cardStyle: { marginHorizontal: 10, marginVertical: 5 },
    iconContainer: {
      borderRadius: 15,
      overflow: "hidden",
      padding: 5,
    },
    workoutContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: 5,
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    workoutText: {
      flex: 1,
      fontSize: 18,
      marginRight: 10,
    },
  });

  return (
    <Card style={styles.cardStyle}>
      <Card.Content style={styles.workoutContainer}>
        <Text
          style={styles.workoutText}
          numberOfLines={1}
          ellipsizeMode="tail"
          variant="bodyLarge"
        >
          {name}
        </Text>
        <TouchableRipple
          borderless
          style={styles.iconContainer}
          onPress={handlePressEditWorkout}
        >
          <Icon name="lead-pencil" size={28} />
        </TouchableRipple>
        <TouchableRipple
          borderless
          style={styles.iconContainer}
          onPress={handlePressStartTraining}
        >
          <Icon name="play" size={28} />
        </TouchableRipple>
      </Card.Content>
    </Card>
  );
};

export default WorkoutItem;
