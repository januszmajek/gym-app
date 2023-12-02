import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useWorkoutUnits from "../hooks/stores/useWorkoutUnit";
import useExercise from "../hooks/stores/useExercise";

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
      backgroundColor: colors.primaryContainer,
      borderRadius: 15,
      padding: 7,
    },
    saveContainer: {
      backgroundColor: colors.primaryContainer,
      borderRadius: 15,
      marginLeft: "auto",
      padding: 7,
    },
    workoutTitle: {
      borderRadius: 15,
      color: colors.primary,
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
        <Icon name="content-save-outline" size={28} color={colors.secondary} />
      </TouchableRipple>
    </View>
  );
};

export default WorkoutUnitHeader;
