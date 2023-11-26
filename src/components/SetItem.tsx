import { View, Text, StyleSheet } from "react-native";
import { Set } from "../../types";
import React, { useEffect, useState } from "react";
import { TouchableRipple } from "react-native-paper";
import useWeight from "../hooks/stores/useWeight";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface SetItemProps {
  set: Set;
}

const SetItem: React.FC<SetItemProps> = ({
  set: { weight, repetitions, pause },
}) => {
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

  const [weightValue, setWeightValue] = useState(weight);
  const [repetitionsValue, setRepetitionsValue] = useState(repetitions);
  const [pauseValue, setPauseValue] = useState(pause);
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

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

  return (
    <View style={styles.setContainer}>
      <View style={styles.viewContainer}>
        <TouchableRipple style={styles.button} onPress={incrementWeight}>
          <Icon name="plus" />
        </TouchableRipple>
        <Text>
          {weightValue} {weightUnit === "Kilogram" ? "kg" : "lbs"}
        </Text>
        <TouchableRipple style={styles.button} onPress={decrementWeight}>
          <Icon name="minus" />
        </TouchableRipple>
      </View>
      <View style={styles.viewContainer}>
        <TouchableRipple style={styles.button} onPress={incrementRepetitions}>
          <Icon name="plus" />
        </TouchableRipple>
        <Text>{repetitionsValue}</Text>
        <TouchableRipple style={styles.button} onPress={decrementRepetitions}>
          <Icon name="minus" />
        </TouchableRipple>
      </View>
      <View style={styles.viewContainer}>
        <TouchableRipple style={styles.button} onPress={incrementPause}>
          <Icon name="plus" />
        </TouchableRipple>
        <Text>
          {minutes}:{seconds}
        </Text>
        <TouchableRipple style={styles.button} onPress={decrementPuase}>
          <Icon name="minus" />
        </TouchableRipple>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    padding: 10,
  },
  setContainer: {
    display: "flex",
    flexDirection: "row",
  },
  viewContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default SetItem;
