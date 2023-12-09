import React, { useEffect, useState } from "react";
import TrainingHeader from "./TrainingHeader";
import useTrainingUnits from "../../hooks/stores/useTrainingUnits";
import useSet from "../../hooks/stores/useSet";
import { StyleSheet, View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { TrainingExercise, TrainingUnit } from "../../../types";
import useExercise from "../../hooks/stores/useExercise";
import { useTheme } from "react-native-paper";
import useTraining from "../../hooks/stores/useTraining";
import TrainingUnitItem from "./TrainingUnitItem";
import useWorkout from "../../hooks/stores/useWorkout";
import useWorkoutUnits from "../../hooks/stores/useWorkoutUnit";
import useTrainingSet from "../../hooks/stores/useTrainingSet";

interface TrainingProps {
  activeTrainingId: string;
  activeWorkoutId: string;
}

const Training: React.FC<TrainingProps> = ({
  activeTrainingId,
  activeWorkoutId,
}) => {
  const { getWorkoutUnitsByWorkoutId } = useWorkoutUnits();
  const { getSetsByWorkoutUnitId } = useSet();
  const { getExerciseById } = useExercise();
  const {
    activeTraining,
    setActiveTraining,
    setActiveTrainingId,
    updateTraining,
  } = useTraining();
  const { setActiveWorkoutId } = useWorkout();
  const { trainingUnits, addTrainingUnits, clearTrainingUnits } =
    useTrainingUnits();
  const { colors } = useTheme();
  const { clearTrainingSets, completeTrainingSet, addTrainingSets } =
    useTrainingSet();

  useEffect(() => {
    const units = getWorkoutUnitsByWorkoutId(activeWorkoutId);
    const filledTrainingUnits = units.map(
      (trainingUnit: TrainingUnit) => (
        addTrainingSets(
          getSetsByWorkoutUnitId(trainingUnit.id).map((i) => ({
            ...i,
            completed: false,
          })),
        ),
        {
          ...trainingUnit,
          name: getExerciseById(trainingUnit.exercise_id)?.name,
        }
      ),
    );
    addTrainingUnits(filledTrainingUnits);
  }, []);

  const handleFinishTraining = async () => {
    if (activeTraining) {
      console.log("Finish training:", activeTraining);
      updateTraining(activeTrainingId, {
        ...activeTraining,
        date_end: new Date(Date.now()),
      });
      clearTrainingUnits();
      clearTrainingSets();
      setActiveTraining(undefined);
      setActiveTrainingId(undefined);
      setActiveWorkoutId(undefined);
    }
  };

  const handleCompleteExerciseSet = async (
    setId: string,
    set: TrainingExercise,
  ) => {
    if (activeTraining) {
      console.log(set);
      setActiveTraining({
        ...activeTraining,
        exercises_done: [...activeTraining.exercises_done, set],
      });
      console.log(activeTraining);
      completeTrainingSet(setId);
    }
  };

  const styles = StyleSheet.create({
    noExercisesInfo: {
      color: colors.primary,
      fontSize: 18,
      marginTop: 10,
      textAlign: "center",
    },
    screen: {
      minHeight: "100%",
    },
  });

  const renderItem = ({ item }: { item: TrainingUnit }) => (
    <TrainingUnitItem
      id={item.id}
      name={item.name}
      handleCompleteExerciseSet={handleCompleteExerciseSet}
    />
  );

  return (
    <View style={styles.screen}>
      <Text>
        {activeTraining?.exercises_done.map((exercise) => (
          <>
            <Text>{exercise.name} </Text>
            <Text>{exercise.weight}kg x</Text>
            <Text>{exercise.repetitions}</Text>
          </>
        ))}
      </Text>
      <TrainingHeader handleFinishTraining={handleFinishTraining} />
      {trainingUnits && trainingUnits.length > 0 ? (
        <FlashList
          data={trainingUnits}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          estimatedItemSize={18}
        />
      ) : (
        <Text style={styles.noExercisesInfo}>No exercises added</Text>
      )}
    </View>
  );
};
export default Training;
