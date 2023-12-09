import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button, TouchableRipple, useTheme } from "react-native-paper";
import useSettings from "../../hooks/stores/useSettings";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Set, TrainingExercise } from "../../../types";
import useTrainingSet from "../../hooks/stores/useTrainingSet";

interface TrainingSetProps {
  set: Set;
  name: string;
  handleCompleteExerciseSet: (setId: string, set: TrainingExercise) => void;
}

const TrainingSet: React.FC<TrainingSetProps> = ({
  set: { id: setId, weight, repetitions },
  handleCompleteExerciseSet,
  name,
}) => {
  const weightValues = [
    0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5,
    7, 7.5, 8, 10, 12, 14, 16, 18, 20, 22.5, 25, 27.5, 30, 32.5, 35, 37.5, 40,
    42.5, 45, 47.5, 50, 52.5, 55, 57.5, 60, 65, 70, 75, 80, 85, 90, 95, 100,
    105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175,
    180, 185, 190, 195, 200,
  ];
  const { updateWeight, updateRepetitions } = useTrainingSet();

  const { colors } = useTheme();
  const { weightUnit } = useSettings();

  const incrementWeight = () => {
    const currentIndex = weightValues.indexOf(weight);

    if (currentIndex < weightValues.length) {
      updateWeight(setId, weightValues[currentIndex + 1]);
    }
  };

  const decrementWeight = () => {
    const currentIndex = weightValues.indexOf(weight);

    if (currentIndex > 0) {
      updateWeight(setId, weightValues[currentIndex - 1]);
    }
  };

  const incrementRepetitions = () => {
    updateRepetitions(setId, repetitions + 1);
  };

  const decrementRepetitions = () => {
    if (repetitions > 0) {
      updateRepetitions(setId, repetitions - 1);
    }
  };
  const styles = StyleSheet.create({
    button: {
      borderRadius: 15,
      padding: 6,
    },
    buttonContainer: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      width: 60,
    },
    buttonLabel: {
      color: colors.primary,
    },
    buttonValue: {},
    buttonsContainer: {
      display: "flex",
      width: "80%",
    },
    firstRowContainer: {
      display: "flex",
      flexDirection: "row",
      paddingBottom: 4,
    },
    setContainer: {
      backgroundColor: colors.primaryContainer,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 2,
      padding: 5,
    },
    valueContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
    },
  });

  return (
    <View style={styles.setContainer}>
      <View style={styles.buttonsContainer}>
        <View style={styles.firstRowContainer}>
          <View style={styles.valueContainer}>
            <TouchableRipple
              borderless
              style={styles.button}
              onPress={incrementWeight}
            >
              <Icon color={colors.primary} name="plus" size={28} />
            </TouchableRipple>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonLabel}>Weight</Text>
              <Text style={styles.buttonValue}>
                {weight} {weightUnit === "Kilogram" ? "kg" : "lbs"}
              </Text>
            </View>
            <TouchableRipple
              borderless
              style={styles.button}
              onPress={decrementWeight}
            >
              <Icon color={colors.primary} name="minus" size={28} />
            </TouchableRipple>
          </View>
          <View style={styles.valueContainer}>
            <TouchableRipple
              borderless
              style={styles.button}
              onPress={incrementRepetitions}
            >
              <Icon color={colors.primary} name="plus" size={28} />
            </TouchableRipple>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonLabel}>Reps</Text>
              <Text style={styles.buttonValue}>{repetitions}</Text>
            </View>
            <TouchableRipple
              borderless
              style={styles.button}
              onPress={decrementRepetitions}
            >
              <Icon color={colors.primary} name="minus" size={28} />
            </TouchableRipple>
          </View>
        </View>
      </View>
      <Button
        onPress={() =>
          handleCompleteExerciseSet(setId, {
            weight,
            repetitions,
            name,
          })
        }
      >
        <Text>Complete</Text>
      </Button>
    </View>
  );
};
export default TrainingSet;
