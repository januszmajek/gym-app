import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import useTraining from "../../hooks/stores/useTraining";
import { TrainingExercise } from "../../../types";
import { Button } from "react-native-paper";

const TrainingSummary = () => {
  const { activeTraining } = useTraining();
  const [duration, setDuration] = useState<string>();
  const { setActiveTrainingId, setActiveTraining } = useTraining();
  const [groupedExercises, setGroupedExercises] =
    useState<Record<string, TrainingExercise[]>>();

  const durationCalc = (start: Date | undefined, end: Date | undefined) => {
    if (start && end) {
      return new Date(end.getTime() - start.getTime()).toString();
    }
    return new Date(Date.now()).toString();
  };

  const groupExercisesByName = (
    exercises: TrainingExercise[],
  ): Record<string, TrainingExercise[]> => {
    const groupedExercises: Record<string, TrainingExercise[]> = {};

    exercises.forEach((exercise) => {
      const { name } = exercise;

      if (!groupedExercises[name]) {
        groupedExercises[name] = [exercise];
      } else {
        groupedExercises[name].push(exercise);
      }
    });
    console.log(groupedExercises);
    return groupedExercises;
  };

  useEffect(() => {
    if (activeTraining) {
      const groupedExercises = groupExercisesByName(
        activeTraining.exercises_done,
      );
      setGroupedExercises(groupedExercises);
      setDuration(
        durationCalc(activeTraining?.date_start, activeTraining?.date_end),
      );
    }
  }, [activeTraining]);

  return (
    <View>
      <Button
        onPress={() => {
          setActiveTraining(undefined);
          setActiveTrainingId(undefined);
        }}
      >
        <Text>CLOSE</Text>
      </Button>
      <Text>SUMMARKA</Text>
      <Text>Czas: {duration} </Text>
      {groupedExercises &&
        Object.entries(groupedExercises).map(([groupName, exercises]) => (
          <View key={groupName}>
            <Text>{groupName}</Text>
            {exercises.map((exercise, index) => (
              <Text key={index}>
                {exercise.name} - Repetitions: {exercise.repetitions}, Weight:{" "}
                {exercise.weight}
              </Text>
            ))}
          </View>
        ))}
    </View>
  );
};

export default TrainingSummary;
