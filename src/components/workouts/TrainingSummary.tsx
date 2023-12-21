import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Text, useTheme } from "react-native-paper";
import useTraining from "../../hooks/stores/useTraining";
import { TrainingExercise } from "../../../types";
import { Card } from "react-native-paper";
import SummaryHeader from "./SummaryHeader";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useSettings from "../../hooks/stores/useSettings";

const TrainingSummary = () => {
  const { activeTraining } = useTraining();
  const [duration, setDuration] = useState<string>();
  const [weightSum, setWeightSum] = useState<number>();
  const [setsSum, setSetsSum] = useState<number>();
  const [groupedExercises, setGroupedExercises] =
    useState<Record<string, TrainingExercise[]>>();
  const { colors } = useTheme();
  const { weightUnit } = useSettings();

  const durationCalc = (
    start: Date | undefined,
    end: Date | undefined,
  ): string => {
    if (start && end) {
      const durationInMilliseconds = end.getTime() - start.getTime();

      const seconds = Math.floor(durationInMilliseconds / 1000);

      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    return "";
  };

  const weightCalc = (exercises: TrainingExercise[]): number => {
    let weightSum = 0;
    exercises.forEach((exercises) => {
      weightSum = weightSum + exercises.weight * exercises.repetitions;
    });
    return weightSum;
  };

  const setsCalc = (exercises: TrainingExercise[]): number => {
    let setsSum = 0;
    exercises.forEach(() => {
      setsSum = setsSum + 1;
    });
    return setsSum;
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
      setWeightSum(weightCalc(activeTraining.exercises_done));
      setSetsSum(setsCalc(activeTraining.exercises_done));
      setDuration(
        durationCalc(activeTraining?.date_start, activeTraining?.date_end),
      );
    }
  }, [activeTraining]);

  const styles = StyleSheet.create({
    cardContainer: {
      flex: 1,
    },
    cardContent: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      padding: 10,
    },
    groupExerciseCard: {
      marginBottom: 12,
      marginHorizontal: 12,
    },
    indexContainer: {
      marginRight: 15,
    },
    setRow: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
    },
    setsContainer: {
      display: "flex",
      gap: 8,
      marginTop: 8,
    },
    summaryCards: {
      display: "flex",
      flexDirection: "row",
      gap: 15,
      marginBottom: 20,
      marginHorizontal: 12,
    },
  });

  return (
    <SafeAreaView>
      <ScrollView stickyHeaderIndices={[0]}>
        {activeTraining && <SummaryHeader name={activeTraining.name} />}
        <View style={styles.summaryCards}>
          <Card style={styles.cardContainer}>
            <Card.Content style={styles.cardContent}>
              <Icon name="weight-lifter" size={32} color={colors.primary} />
              <Text variant="labelLarge">Sets</Text>
              <Text>{setsSum}</Text>
            </Card.Content>
          </Card>
          <Card style={styles.cardContainer}>
            <Card.Content style={styles.cardContent}>
              <Icon
                name={
                  weightUnit === "Kilogram" ? "weight-kilogram" : "weight-pound"
                }
                size={32}
                color={colors.primary}
              />
              <Text variant="labelLarge">Weight</Text>
              <Text>{weightSum}</Text>
            </Card.Content>
          </Card>
          <Card style={styles.cardContainer}>
            <Card.Content style={styles.cardContent}>
              <Icon
                name="timer-settings-outline"
                size={32}
                color={colors.primary}
              />
              <Text variant="labelLarge">Duration</Text>
              <Text>{duration}</Text>
            </Card.Content>
          </Card>
        </View>
        <View>
          {groupedExercises &&
            Object.entries(groupedExercises).map(([groupName, exercises]) => (
              <Card key={groupName} style={styles.groupExerciseCard}>
                <Card.Content>
                  <Text variant="headlineSmall">{groupName}</Text>
                  <View style={styles.setsContainer}>
                    {exercises.map((exercise, index) => (
                      <View style={styles.setRow} key={index}>
                        <View style={styles.indexContainer}>
                          <Text variant="bodyLarge">Set {index + 1}</Text>
                        </View>
                        <Text variant="bodyLarge">
                          {exercise.weight}{" "}
                          {weightUnit === "Kilogram" ? "kg" : "lbs"} x{" "}
                          {exercise.repetitions}
                        </Text>
                      </View>
                    ))}
                  </View>
                </Card.Content>
              </Card>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrainingSummary;
