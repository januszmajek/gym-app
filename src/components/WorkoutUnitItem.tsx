import { View, Text } from "react-native";
import React from "react";

import { WorkoutUnit } from "../../types";
import useWeight from "../hooks/stores/useWeight";

const WorkoutUnitItem = ({ name, sets, pause }: WorkoutUnit) => {
  const { value: unit } = useWeight();
  return (
    <>
      <Text>{name}</Text>
      {sets.map((set) => (
        <Text>
          {set.repetitions} x {set.weight}
          {unit}
        </Text>
      ))}
      <Text>Pause: {pause}</Text>
    </>
  );
};

export default WorkoutUnitItem;
