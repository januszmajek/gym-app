import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { List, useTheme } from "react-native-paper";
import { Set, TrainingExercise } from "../../../types";
import TrainingSet from "./TrainingSet";

export interface TrainingUnitItemProps {
  id: string;
  name?: string;
  sets?: Set[];
  setsDone?: number;
  handleCompleteExerciseSet: (set: TrainingExercise) => void;
}

const TrainingUnitItem = ({
  id,
  name,
  sets,
  setsDone,
  handleCompleteExerciseSet,
}: TrainingUnitItemProps) => {
  const { colors } = useTheme();
  const [expanded, setExpanded] = React.useState(true);

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
      description={`${setsDone}/${sets?.length} Done`}
    >
      {sets &&
        sets.map(
          (set, i) =>
            !set.completed && (
              <TrainingSet
                key={i}
                handleCompleteExerciseSet={handleCompleteExerciseSet}
                name={name || ""}
                set={set}
              />
            ),
        )}
    </List.Accordion>
  );
};

export default TrainingUnitItem;
