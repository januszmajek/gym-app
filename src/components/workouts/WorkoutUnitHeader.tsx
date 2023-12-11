import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableRipple, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useWorkoutUnits from "../../hooks/stores/useWorkoutUnit";
import useExercise from "../../hooks/stores/useExercise";

interface WorkoutUnitHeaderProps {
  workoutUnitId: string;
  saveSets: () => void;
}

const WorkoutUnitHeader: React.FC<WorkoutUnitHeaderProps> = ({
  workoutUnitId,
  saveSets,
}) => {
  const { getExerciseById } = useExercise();
  const { getWorkoutUnitById } = useWorkoutUnits();
  const unit = getWorkoutUnitById(workoutUnitId);
  const name = (unit && getExerciseById(unit?.exercise_id))?.name || "";
  const { setActiveWorkoutUnitId } = useWorkoutUnits();
  const { colors } = useTheme();
  const handleArrowPress = () => {
    setActiveWorkoutUnitId(undefined);
  };

  const styles = StyleSheet.create({
    arrowContainer: {
      borderRadius: 15,
      padding: 7,
    },
    saveContainer: {
      borderRadius: 15,
      marginLeft: "auto",
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    saveText: {
      color: colors.primary,
    },
    workoutTitle: {
      borderRadius: 15,
      flexGrow: 1,
      fontSize: 24,
    },
    workoutUnitHeader: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    workoutUnitNameContainer: {
      borderRadius: 10,
      flexGrow: 1,
      marginHorizontal: 15,
      maxWidth: "70%",
      paddingHorizontal: 15,
      paddingVertical: 8,
    },
  });

  return (
    <View style={styles.workoutUnitHeader}>
      <TouchableRipple
        borderless
        onPress={handleArrowPress}
        style={styles.arrowContainer}
      >
        <Icon name="arrow-left" size={28} color={colors.secondary} />
      </TouchableRipple>
      <View style={styles.workoutUnitNameContainer}>
        <Text
          style={styles.workoutTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </Text>
      </View>
      <TouchableRipple
        borderless
        onPress={saveSets}
        style={styles.saveContainer}
      >
        <Text variant="bodyLarge" style={styles.saveText}>
          Save
        </Text>
      </TouchableRipple>
    </View>
  );
};

export default WorkoutUnitHeader;
