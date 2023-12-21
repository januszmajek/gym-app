import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { List, useTheme } from "react-native-paper";
import { Exercise } from "../../../types";

interface ExerciseProps {
  exercise: Exercise | undefined;
}

const ExerciseDescription: React.FC<ExerciseProps> = ({ exercise }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    listItem: {
      paddingHorizontal: 5,
    },
    listItemTitle: {
      fontSize: 20,
    },
    listItemDescription: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: "bold",
    },

    listItemInstructionDescription: {
      lineHeight: 20,
    },
    divider: {
      marginHorizontal: 20,
    },
  });

  return exercise ? (
    <ScrollView>
      <List.Section>
        <List.Item
          title="Primary Muscles"
          titleStyle={styles.listItemTitle}
          description={`${exercise.primary_muscles.join(", ")}`}
          descriptionStyle={styles.listItemDescription}
          style={styles.listItem}
        />
        {/*<Divider bold style={styles.divider} />*/}
        <List.Item
          title="Secondary Muscles"
          titleStyle={styles.listItemTitle}
          description={`${
            exercise.secondary_muscles.join(", ") || "Not provided"
          }`}
          descriptionStyle={styles.listItemDescription}
          style={styles.listItem}
        />
        <List.Item
          title="Force"
          titleStyle={styles.listItemTitle}
          description={` ${exercise.force}`}
          descriptionStyle={styles.listItemDescription}
          style={styles.listItem}
        />

        <List.Item
          title="Level"
          titleStyle={styles.listItemTitle}
          description={`${exercise.level}`}
          descriptionStyle={styles.listItemDescription}
          style={styles.listItem}
        />
        <List.Item
          title="Mechanic"
          titleStyle={styles.listItemTitle}
          description={`${exercise.mechanic}`}
          descriptionStyle={styles.listItemDescription}
          style={styles.listItem}
        />
        <List.Item
          title="Equipment"
          titleStyle={styles.listItemTitle}
          description={`${exercise.equipment}`}
          descriptionStyle={styles.listItemDescription}
          style={styles.listItem}
        />
        <List.Item
          title="Category"
          titleStyle={styles.listItemTitle}
          description={`${exercise.category}`}
          descriptionStyle={styles.listItemDescription}
          style={styles.listItem}
        />
        <List.Item
          title="Instrunction"
          titleStyle={styles.listItemTitle}
          description={`${exercise.instructions.map(
            (instruction) => instruction,
          )}`}
          descriptionNumberOfLines={100}
          descriptionStyle={styles.listItemInstructionDescription}
          style={styles.listItem}
        />
      </List.Section>
    </ScrollView>
  ) : (
    <View>
      <Text>Can't find exercise</Text>
    </View>
  );
};

export default ExerciseDescription;
