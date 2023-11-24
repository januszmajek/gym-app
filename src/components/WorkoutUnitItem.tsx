import { Text, StyleSheet, View } from "react-native";
import React from "react";

import { WorkoutUnit } from "../../types";
import useWeight from "../hooks/stores/useWeight";
import { useTheme } from "react-native-paper";

const WorkoutUnitItem = ({ name, sets }: WorkoutUnit) => {
  const { value: unit } = useWeight();
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {},
    name: {
      color: colors.tertiaryContainer,
      fontSize: 18,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      {sets.map((set) => (
        <Text>
          {set.repetitions} x {set.weight}
          {unit}
          Pause: {set.pause}
        </Text>
      ))}
    </View>
  );
};

export default WorkoutUnitItem;
