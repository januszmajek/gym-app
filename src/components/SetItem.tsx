import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableRipple, useTheme } from "react-native-paper";
import useWeight from "../hooks/stores/useWeight";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useSet from "../hooks/stores/useSet";

interface SetItemProps {
  setId: string;
}

const SetItem: React.FC<SetItemProps> = ({ setId }) => {
  const weightValues = [
    0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5,
    7, 7.5, 8, 10, 12, 14, 16, 18, 20, 22.5, 25, 27.5, 30, 32.5, 35, 37.5, 40,
    42.5, 45, 47.5, 50, 52.5, 55, 57.5, 60, 65, 70, 75, 80, 85, 90, 95, 100,
    105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175,
    180, 185, 190, 195, 200,
  ];

  const pauseValues = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 70, 80, 90, 100, 110, 120,
    135, 150, 165, 180, 210, 240, 270, 300,
  ];

  const { colors } = useTheme();
  const { sets: allSets, getSetById, removeSet, addSet } = useSet();
  const [set, setSet] = useState(getSetById(setId));
  const [weightValue, setWeightValue] = useState(
    set ? set.weight : weightValues[0],
  );
  const [repetitionsValue, setRepetitionsValue] = useState(
    set ? set.repetitions : 1,
  );
  const [pauseValue, setPauseValue] = useState(
    set ? set.pause : pauseValues[0],
  );
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  useEffect(() => {
    console.log(getSetById(setId));
    setSet(getSetById(setId));
  }, [allSets]);

  useEffect(() => {
    if (set) {
      setWeightValue(set.weight);
      setPauseValue(set.pause);
      setRepetitionsValue(set.repetitions);
    }
  }, [set]);

  const { value: weightUnit } = useWeight();

  const incrementWeight = () => {
    const currentIndex = weightValues.indexOf(weightValue);
    if (currentIndex < weightValues.length - 1) {
      setWeightValue(weightValues[currentIndex + 1]);
    }
  };

  const decrementWeight = () => {
    const currentIndex = weightValues.indexOf(weightValue);
    if (currentIndex > 0) {
      setWeightValue(weightValues[currentIndex - 1]);
    }
  };

  const incrementRepetitions = () => {
    setRepetitionsValue(repetitionsValue + 1);
  };

  const decrementRepetitions = () => {
    if (repetitionsValue <= 1) return;
    setRepetitionsValue(repetitionsValue - 1);
  };

  const incrementPause = () => {
    const currentIndex = pauseValues.indexOf(pauseValue);
    if (currentIndex < pauseValues.length - 1) {
      setPauseValue(pauseValues[currentIndex + 1]);
    }
  };

  const decrementPuase = () => {
    const currentIndex = pauseValues.indexOf(pauseValue);
    if (currentIndex > 0) {
      setPauseValue(pauseValues[currentIndex - 1]);
    }
  };

  useEffect(() => {
    const m = String(Math.floor(pauseValue / 60)).padStart(2, "0");
    const s = String(pauseValue % 60).padStart(2, "0");
    setMinutes(m);
    setSeconds(s);
  }, [pauseValue]);

  const handleDeleteSet = () => {
    if (set) {
      removeSet(set.id);
    }
  };

  const handleCopySet = () => {
    if (set) addSet({ ...set });
  };

  const styles = StyleSheet.create({
    actionsContainer: {
      alignItems: "center",
      borderLeftColor: colors.elevation.level1,
      borderLeftWidth: 1,
      borderStyle: "dashed",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "15%",
    },
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
    secondRowContainer: {
      alignItems: "center",
      borderStyle: "dashed",
      borderTopColor: colors.elevation.level1,
      borderTopWidth: 1,
      display: "flex",
      paddingTop: 3,
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

  return set ? (
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
                {weightValue} {weightUnit === "Kilogram" ? "kg" : "lbs"}
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
              <Text style={styles.buttonValue}>{repetitionsValue}</Text>
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
        <View style={styles.secondRowContainer}>
          <View style={styles.valueContainer}>
            <TouchableRipple
              borderless
              style={styles.button}
              onPress={incrementPause}
            >
              <Icon color={colors.primary} name="plus" size={28} />
            </TouchableRipple>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonLabel}>Pause</Text>
              <Text style={styles.buttonValue}>
                {minutes}:{seconds}
              </Text>
            </View>
            <TouchableRipple
              borderless
              style={styles.button}
              onPress={decrementPuase}
            >
              <Icon color={colors.primary} name="minus" size={28} />
            </TouchableRipple>
          </View>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableRipple
          borderless
          onPress={handleCopySet}
          style={styles.button}
        >
          <Icon color={colors.primary} name="content-copy" size={28} />
        </TouchableRipple>
        <TouchableRipple
          borderless
          onPress={handleDeleteSet}
          style={styles.button}
        >
          <Icon color={colors.error} name="delete" size={28} />
        </TouchableRipple>
      </View>
    </View>
  ) : (
    <Text>Error: set not found</Text>
  );
};
export default SetItem;
