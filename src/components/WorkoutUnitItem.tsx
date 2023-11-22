import { Text } from "react-native";
import React from "react";

import { WorkoutUnit } from "../../types";
import useWeight from "../hooks/stores/useWeight";

const WorkoutUnitItem = ({ name, sets }: WorkoutUnit) => {
  const { value: unit } = useWeight();
  return (
    <>
      <Text>{name}</Text>
      {sets.map((set) => (
        <Text>
          {set.repetitions} x {set.weight}
          {unit}
          Pause: {set.pause}
        </Text>
      ))}
    </>
  );
};

export default WorkoutUnitItem;
