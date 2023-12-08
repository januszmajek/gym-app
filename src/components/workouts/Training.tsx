import React, { useEffect, useState } from "react";
import TrainingHeader from "./TrainingHeader";
import useWorkoutUnits from "../../hooks/stores/useWorkoutUnit";
import useSet from "../../hooks/stores/useSet";
import { StyleSheet, View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { TrainingExercise, TrainingUnit } from "../../../types";
import useExercise from "../../hooks/stores/useExercise";
import { useTheme } from "react-native-paper";
import useTraining from "../../hooks/stores/useTraining";
import TrainingUnitItem from "./TrainingUnitItem";
import useWorkout from "../../hooks/stores/useWorkout";

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
  const { getTrainingById, setActiveTrainingId } = useTraining();
  const { setActiveWorkoutId } = useWorkout();
  const { colors } = useTheme();
  const [trainingUnits, setTrainingUnits] = useState<TrainingUnit[]>(
    getWorkoutUnitsByWorkoutId(activeWorkoutId),
  );
  const [training, setTraining] = useState(getTrainingById(activeTrainingId));

  useEffect(() => {
    const updatedTrainingUnits = trainingUnits.map((trainingUnit) => ({
      ...trainingUnit,
      sets: getSetsByWorkoutUnitId(trainingUnit.id).map((set) => ({
        ...set,
        completed: false,
      })),
      completedSets: 0,
      name: getExerciseById(trainingUnit.exercise_id)?.name,
    }));
    setTrainingUnits(updatedTrainingUnits);
  }, []);

  const handleFinishTraining = () => {
    console.log("Finish training:", training);
    setActiveTrainingId(undefined);
    setActiveWorkoutId(undefined);
  };

  const handleCompleteExerciseSet = (setId: string, set: TrainingExercise) => {
    if (training) {
      setTraining({
        ...training,
        exercises_done: [...training.exercises_done, set],
      });
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
      setsDone={item.completedSets}
      sets={item.sets}
      handleCompleteExerciseSet={handleCompleteExerciseSet}
    />
  );

  return (
    <View style={styles.screen}>
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
