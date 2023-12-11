import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, TouchableRipple, useTheme, Card } from "react-native-paper";
import useSettings from "../../hooks/stores/useSettings";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Set } from "../../../types";
import uuid from "react-native-uuid";

interface SetItemProps {
  set: Set;
  sets: Set[];
  setSets: React.Dispatch<React.SetStateAction<Set[]>>;
}

const SetItem: React.FC<SetItemProps> = ({
  set: { id, workout_unit_id, weight, repetitions, pause },
  sets,
  setSets,
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

  const { colors } = useTheme();
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const { weightUnit } = useSettings();

  const handleDeleteSet = () => {
    console.log("Removing set:", id);
    const newSets = sets.filter((set) => set.id !== id);
    console.log("New sets:", newSets);
    setSets([...newSets]);
    return;
  };

  const handleCopySet = () => {
    const newSet: Set = {
      id: uuid.v4() as string,
      weight: weight,
      repetitions: repetitions,
      pause: pause,
      workout_unit_id: workout_unit_id,
      order: 0,
    };
    console.log("Copying set:", newSet);
    setSets([...sets, newSet]);
    return;
  };

  const incrementWeight = () => {
    const currentIndex = weightValues.indexOf(weight);

    if (currentIndex < weightValues.length - 1) {
      const setIndex = sets.findIndex((set) => set.id === id);

      if (setIndex !== -1) {
        const updatedSets = [...sets];
        updatedSets[setIndex] = {
          ...sets[setIndex],
          weight: weightValues[currentIndex + 1],
        };

        setSets(updatedSets);
      }
    }
  };

  const decrementWeight = () => {
    const currentIndex = weightValues.indexOf(weight);

    if (currentIndex > 0) {
      const setIndex = sets.findIndex((set) => set.id === id);

      if (setIndex !== -1) {
        const updatedSets = [...sets];
        updatedSets[setIndex] = {
          ...sets[setIndex],
          weight: weightValues[currentIndex - 1],
        };

        setSets(updatedSets);
      }
    }
  };

  const incrementRepetitions = () => {
    const setIndex = sets.findIndex((set) => set.id === id);
    if (setIndex !== -1) {
      const updatedSets = [...sets];
      updatedSets[setIndex] = {
        ...sets[setIndex],
        repetitions: repetitions + 1,
      };

      setSets(updatedSets);
    }
  };

  const decrementRepetitions = () => {
    const setIndex = sets.findIndex((set) => set.id === id);

    if (setIndex !== -1 && repetitions > 1) {
      const updatedSets = [...sets];
      updatedSets[setIndex] = {
        ...sets[setIndex],
        repetitions: repetitions - 1,
      };

      setSets(updatedSets);
    }
  };

  const incrementPause = () => {
    const currentIndex = pauseValues.indexOf(pause);

    if (currentIndex < pauseValues.length - 1) {
      const setIndex = sets.findIndex((set) => set.id === id);

      if (setIndex !== -1) {
        const updatedSets = [...sets];
        updatedSets[setIndex] = {
          ...sets[setIndex],
          pause: pauseValues[currentIndex + 1],
        };

        setSets(updatedSets);
      }
    }
  };

  const decrementPuase = () => {
    const currentIndex = pauseValues.indexOf(pause);

    if (currentIndex > 0) {
      const setIndex = sets.findIndex((set) => set.id === id);

      if (setIndex !== -1) {
        const updatedSets = [...sets];
        updatedSets[setIndex] = {
          ...sets[setIndex],
          pause: pauseValues[currentIndex - 1],
        };

        setSets(updatedSets);
      }
    }
  };

  useEffect(() => {
    const m = String(Math.floor(pause / 60)).padStart(2, "0");
    const s = String(pause % 60).padStart(2, "0");
    setMinutes(m);
    setSeconds(s);
  }, [pause]);

  const styles = StyleSheet.create({
    actionsContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      justifyContent: "center",
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
    buttonValue: {},
    card: {
      marginBottom: 10,
      marginHorizontal: 10,
      marginTop: 5,
    },
    setContainer: {
      display: "flex",
      flexDirection: "row",
    },
    valueContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
    },
    valueRowContainer: {
      // backgroundColor: colors.error,
      display: "flex",
      flexDirection: "row",
      gap: 5,
      // paddingBottom: 4,
    },
    valuesContainer: {
      alignItems: "center",
      // backgroundColor: colors.errorContainer,
      display: "flex",
      flexGrow: 1,
      justifyContent: "space-between",
    },
  });

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.setContainer}>
        <View style={styles.valuesContainer}>
          <View style={styles.valueRowContainer}>
            <View style={styles.valueContainer}>
              <TouchableRipple
                borderless
                style={styles.button}
                onPress={incrementWeight}
              >
                <Icon color={colors.primary} name="plus" size={28} />
              </TouchableRipple>
              <View style={styles.buttonContainer}>
                <Text>Weight</Text>
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
                <Text>Reps</Text>
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
          <View style={styles.valueRowContainer}>
            <View style={styles.valueContainer}>
              <TouchableRipple
                borderless
                style={styles.button}
                onPress={incrementPause}
              >
                <Icon color={colors.primary} name="plus" size={28} />
              </TouchableRipple>
              <View style={styles.buttonContainer}>
                <Text>Pause</Text>
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
            <Icon color={colors.primary} name="content-copy" size={32} />
          </TouchableRipple>
          <TouchableRipple
            borderless
            onPress={handleDeleteSet}
            style={styles.button}
          >
            <Icon color={colors.primary} name="delete" size={32} />
          </TouchableRipple>
        </View>
      </Card.Content>
    </Card>
  );
};
export default SetItem;
