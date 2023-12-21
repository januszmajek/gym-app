import { StyleSheet, View } from "react-native";
import React from "react";
import { Card, Divider, List, useTheme } from "react-native-paper";
import { Training, TrainingExercise } from "../../../types";
import TrainingSet from "./TrainingSet";
import { Text } from "react-native-paper";
import useTrainingSet from "../../hooks/stores/useTrainingSet";

export interface TrainingUnitItemProps {
  id: string;
  name?: string;
  handleCompleteExerciseSet: (
    activeTraining: Training | undefined,
    setId: string,
    pause: number,
    set: TrainingExercise,
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
    cardContainer: {
      marginHorizontal: 12,
      marginVertical: 8,
    },
    cardContent: {
      padding: 0,
    },
    setCompletedContainer: {},
    setCompletedText: {
      paddingVertical: 8,
      textAlign: "center",
    },
    unitTitleContainer: {
      backgroundColor: colors.elevation.level1,
      borderRadius: 5,
    },
    listAccordionDescription: {
      color: colors.primary,
      fontWeight: "bold",
    },
    listAccordionTitle: {
      fontSize: 20,
      color: colors.onSurface,
    },
  });

  return (
    <Card style={styles.cardContainer}>
      <Card.Content style={styles.cardContent}>
        <List.Accordion
          title={name}
          titleNumberOfLines={2}
          titleStyle={styles.listAccordionTitle}
          description={`${
            sets.filter((set) => set.completed === true).length
          }/${sets?.length} Done`}
          descriptionStyle={styles.listAccordionDescription}
          expanded={expanded}
          onPress={handlePress}
          style={styles.unitTitleContainer}
        >
          {sets &&
            sets.map((set, i) =>
              set.completed ? (
                <View key={i} style={styles.setCompletedContainer}>
                  <Text variant="bodyLarge" style={styles.setCompletedText}>
                    Set completed!
                  </Text>
                  {i + 1 !== sets.length && <Divider />}
                </View>
              ) : (
                <TrainingSet
                  set={set}
                  name={name || ""}
                  key={i}
                  index={i}
                  setsLength={sets.length}
                  handleCompleteExerciseSet={handleCompleteExerciseSet}
                />
              ),
            )}
        </List.Accordion>
      </Card.Content>
    </Card>
  );
};

export default TrainingUnitItem;
