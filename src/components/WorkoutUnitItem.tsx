import { Text, StyleSheet, View } from "react-native";
import React from "react";

import { WorkoutUnit } from "../../types";
import { useTheme } from "react-native-paper";
import SetItem from "./SetItem";

const WorkoutUnitItem = ({ name, sets }: WorkoutUnit) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 15,
    },
    name: {
      color: colors.tertiary,
      fontSize: 18,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      {sets.map((set) => (
        <SetItem set={set} />
      ))}
    </View>
  );
};

export default WorkoutUnitItem;
