import React from "react";
import { View, Text } from "react-native";
import { List } from "react-native-paper";
import { Exercise } from "../../../types";

interface ExerciseProps {
  exercise: Exercise | undefined;
}

//TODO: Design

const ExerciseDescription: React.FC<ExerciseProps> = ({ exercise }) => {
  return exercise ? (
    <View>
      <Text>{exercise.name}</Text>
      <List.Section>
        <List.Item
          title={`Primary Muscles: ${exercise.primary_muscles.join(", ")}`}
        />
        <List.Item
          title={`Secondary Muscles: ${exercise.secondary_muscles.join(", ")}`}
        />
        <List.Item title={`Force: ${exercise.force}`} />
        <List.Item title={`Level: ${exercise.level}`} />
        <List.Item title={`Mechanic: ${exercise.mechanic}`} />
        <List.Item title={`Equipment: ${exercise.equipment}`} />
        <List.Item title={`Category: ${exercise.category}`} />
      </List.Section>
      <View>
        <Text>Instructions</Text>
        {exercise.instructions.map((instruction, index) => (
          <Text key={index}>{instruction}</Text>
        ))}
      </View>
    </View>
  ) : (
    <View>
      <Text>Can't find exercise</Text>
    </View>
  );
};

export default ExerciseDescription;
