import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { List, useTheme } from "react-native-paper";
import { Training, TrainingExercise } from "../../../types";
import TrainingSet from "./TrainingSet";
import { Text } from "react-native-paper";
import useTrainingSet from "../../hooks/stores/useTrainingSet";

export interface TrainingUnitItemProps {
  id: string;
  name?: string;
  handleCompleteExerciseSet: (
    setId: string,
    set: TrainingExercise,
    activeTraining: Training | undefined,
  ) => void;
}

const TrainingUnitItem = ({
  id,
  name,
  handleCompleteExerciseSet,
}: TrainingUnitItemProps) => {
  const { colors } = useTheme();
  const [expanded, setExpanded] = React.useState(false);
  const { getTrainingSetsByUnitId } = useTrainingSet();
  const sets = getTrainingSetsByUnitId(id);

  const handlePress = () => setExpanded(!expanded);
  const styles = StyleSheet.create({
    unitTitle: {
      padding: 0,
    },
    unitTitleContainer: {
      backgroundColor: colors.inversePrimary,
    },
  });

  return (
    <List.Accordion
      style={styles.unitTitleContainer}
      titleStyle={styles.unitTitle}
      title={name}
      expanded={expanded}
      onPress={handlePress}
      description={`${
        sets.filter((set) => set.completed === true).length
      }/${sets?.length} Done`}
    >
      {sets &&
        sets.map((set, i) =>
          set.completed ? (
            <Text key={i}>Set completed!</Text>
          ) : (
            <TrainingSet
              set={set}
              name={name || ""}
              key={i}
              handleCompleteExerciseSet={handleCompleteExerciseSet}
            />
          ),
        )}
    </List.Accordion>
  );
};

export default TrainingUnitItem;
