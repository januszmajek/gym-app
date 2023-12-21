import { StyleSheet, View } from "react-native";
import React from "react";
import { Set } from "../../../types";
import { TouchableRipple, useTheme, Card, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { supabase } from "../../../supabase/supabase";
import useWorkoutUnits from "../../hooks/stores/useWorkoutUnit";
import useSet from "../../hooks/stores/useSet";

export interface WorkoutUnitItemProps {
  name?: string;
  workoutUnitId: string;
  sets: Set[];
}

const WorkoutUnitItem = ({
  name,
  workoutUnitId,
  sets,
}: WorkoutUnitItemProps) => {
  const { setActiveWorkoutUnitId } = useWorkoutUnits();
  const { removeWorkoutUnit } = useWorkoutUnits();
  const { clearSetsByWorkoutUnitId } = useSet();
  const { colors } = useTheme();

  const handleDeleteWorkoutUnit = async () => {
    console.log("Removing Workout Unit:", workoutUnitId);
    clearSetsByWorkoutUnitId(workoutUnitId);
    removeWorkoutUnit(workoutUnitId);
    const { error } = await supabase
      .from("workout_units")
      .delete()
      .eq("id", workoutUnitId);
    if (error) {
      console.log(error);
      return;
    }
    console.log("Deleted Workout Unit:", workoutUnitId);
  };

  const styles = StyleSheet.create({
    buttonsContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: 5,
      justifyContent: "center",
    },
    cardStyle: { marginHorizontal: 10, marginVertical: 5 },
    container: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 2,
      paddingHorizontal: 15,
      paddingVertical: 6,
    },
    iconContainer: {
      borderRadius: 15,
      overflow: "hidden",
      padding: 5,
    },
    labelContainer: {
      maxWidth: "80%",
    },
    setsCount: {
      color: colors.primary,
      fontSize: 15,
    },
  });

  return (
    <Card style={styles.cardStyle}>
      <Card.Content style={styles.container}>
        <View style={styles.labelContainer}>
          <Text variant="bodyLarge" numberOfLines={2} ellipsizeMode="tail">
            {name}
          </Text>
          <Text variant="bodyMedium" style={styles.setsCount}>
            {sets.length} sets
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableRipple
            borderless
            style={styles.iconContainer}
            onPress={() => setActiveWorkoutUnitId(workoutUnitId)}
          >
            <Icon name="note-edit-outline" size={28} color={colors.primary} />
          </TouchableRipple>
          <TouchableRipple
            borderless
            style={styles.iconContainer}
            onPress={handleDeleteWorkoutUnit}
          >
            <Icon name="trash-can-outline" size={28} color={colors.primary} />
          </TouchableRipple>
        </View>
      </Card.Content>
    </Card>
  );
};

export default WorkoutUnitItem;
