import { View, StyleSheet, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  TouchableRipple,
  useTheme,
  Text,
} from "react-native-paper";
import useSettings from "../../hooks/stores/useSettings";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Set, Training, TrainingExercise } from "../../../types";
import useTrainingSet from "../../hooks/stores/useTrainingSet";
import useTraining from "../../hooks/stores/useTraining";

export interface TrainingSetProps {
  set: Set;
  name: string;
  handleCompleteExerciseSet: (
    activeTraining: Training | undefined,
    setId: string,
    pause: number,
    set: TrainingExercise,
  ) => void;
  index: number;
  setsLength: number;
}

const TrainingSet: React.FC<TrainingSetProps> = ({
  set: { id: setId, weight, repetitions, pause, type, time },
  handleCompleteExerciseSet,
  name,
  index,
  setsLength,
}) => {
  const weightValues = [
    0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5,
    7, 7.5, 8, 10, 12, 14, 16, 18, 20, 22.5, 25, 27.5, 30, 32.5, 35, 37.5, 40,
    42.5, 45, 47.5, 50, 52.5, 55, 57.5, 60, 65, 70, 75, 80, 85, 90, 95, 100,
    105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175,
    180, 185, 190, 195, 200,
  ];

  const timeValues = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 70, 80, 90, 100, 110, 120,
    135, 150, 165, 180, 210, 240, 270, 300, 360, 420, 480, 600, 720, 900, 1200,
    1800, 2400, 3000, 3600, 4200, 4800,
  ];

  const { updateWeight, updateRepetitions, updateTime } = useTrainingSet();
  const { activeTraining } = useTraining();
  const { colors } = useTheme();
  const { weightUnit } = useSettings();
  const [timeMinutes, setTimeMinutes] = useState("00");
  const [timesSeconds, setTimeSeconds] = useState("00");

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

  const incrementTime = () => {
    const currentIndex = timeValues.indexOf(weight);

    if (currentIndex < timeValues.length) {
      updateTime(setId, timeValues[currentIndex + 1]);
    }
  };

  const decrementTime = () => {
    const currentIndex = timeValues.indexOf(weight);

    if (currentIndex > 0) {
      updateTime(setId, timeValues[currentIndex - 1]);
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

  useEffect(() => {
    const m = String(Math.floor(time / 60)).padStart(2, "0");
    const s = String(time % 60).padStart(2, "0");
    setTimeMinutes(m);
    setTimeSeconds(s);
  }, [time]);

  const styles = StyleSheet.create({
    button: {
      borderRadius: 15,
      paddingHorizontal: 1,
    },
    buttonContainer: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      paddingHorizontal: 4,
    },
    completeText: {
      color: colors.primary,
    },
    dividerContainer: {
      marginLeft: "auto",
      marginRight: "auto",
      width: "100%",
    },
    setContainer: {
      width: "100%",
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 7,
    },
    valueContainer: {
      paddingLeft: 7,
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
    },
    timeValueContainer: {
      // marginLeft: "auto",
      // marginRight: "auto",
    },
  });

  return (
    <>
      <View style={styles.setContainer}>
        {type === "quantity" ? (
          <>
            <View style={styles.valueContainer}>
              <TouchableRipple
                borderless
                style={styles.button}
                onPress={incrementWeight}
              >
                <Icon
                  color={colors.primary}
                  name="plus"
                  size={Platform.OS === "ios" ? 20 : 28}
                />
              </TouchableRipple>
              <View style={styles.buttonContainer}>
                <Text>Weight</Text>
                <Text>
                  {weight} {weightUnit === "Kilogram" ? "kg" : "lbs"}
                </Text>
              </View>
              <TouchableRipple
                borderless
                style={styles.button}
                onPress={decrementWeight}
              >
                <Icon
                  color={colors.primary}
                  name="minus"
                  size={Platform.OS === "ios" ? 20 : 28}
                />
              </TouchableRipple>
            </View>
            <View style={styles.valueContainer}>
              <TouchableRipple
                borderless
                style={styles.button}
                onPress={incrementRepetitions}
              >
                <Icon
                  color={colors.primary}
                  name="plus"
                  size={Platform.OS === "ios" ? 20 : 28}
                />
              </TouchableRipple>
              <View style={styles.buttonContainer}>
                <Text>Reps</Text>
                <Text>{repetitions}</Text>
              </View>
              <TouchableRipple
                borderless
                style={styles.button}
                onPress={decrementRepetitions}
              >
                <Icon
                  color={colors.primary}
                  name="minus"
                  size={Platform.OS === "ios" ? 20 : 28}
                />
              </TouchableRipple>
            </View>
          </>
        ) : (
          <View style={[styles.valueContainer, styles.timeValueContainer]}>
            <TouchableRipple
              borderless
              style={styles.button}
              onPress={incrementTime}
            >
              <Icon
                color={colors.primary}
                name="plus"
                size={Platform.OS === "ios" ? 25 : 28}
              />
            </TouchableRipple>
            <View style={styles.buttonContainer}>
              <Text>Time</Text>
              <Text>
                {timeMinutes}:{timesSeconds}
              </Text>
            </View>
            <TouchableRipple
              borderless
              style={styles.button}
              onPress={decrementTime}
            >
              <Icon
                color={colors.primary}
                name="minus"
                size={Platform.OS === "ios" ? 25 : 28}
              />
            </TouchableRipple>
          </View>
        )}
        <Button
          onPress={() => {
            handleCompleteExerciseSet(activeTraining, setId, pause, {
              weight,
              repetitions,
              name,
              type,
              time,
            });
          }}
        >
          <Text style={styles.completeText}>Complete</Text>
        </Button>
      </View>
      {index + 1 !== setsLength && (
        <View style={styles.dividerContainer}>
          <Divider />
        </View>
      )}
    </>
  );
};
export default TrainingSet;
