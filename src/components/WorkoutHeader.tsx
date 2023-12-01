import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, TouchableRipple, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useWorkout from "../hooks/stores/useWorkout";
import { supabase } from "../../supabase/supabase";

interface WorkoutHeaderProps {
  workoutName: string;
  workoutId: string;
  handleRemoveWorkout: () => void;
}

const WorkoutHeader: React.FC<WorkoutHeaderProps> = ({
  workoutId,
  workoutName: name,
  handleRemoveWorkout,
}) => {
  const { setActiveWorkoutId, updateWorkout, getWorkoutById } = useWorkout();
  const { colors } = useTheme();
  const [workoutName, setWorkoutName] = useState(name);
  const [renaming, setRenaming] = useState(false);
  const workout = getWorkoutById(workoutId);

  const handleArrowPress = () => {
    setActiveWorkoutId(undefined);
  };

  const startRenaming = () => {
    setRenaming(true);
    console.log("Start renaming...");
  };

  const finishRenaming = async () => {
    setRenaming(false);
    console.log("...Finished renaming");
    if (workout) {
      if (workoutName) {
        if (workoutName != workout.name) {
          updateWorkout(workoutId, { ...workout, name: workoutName });
          const { data, error: supabaseError } = await supabase
            .from("workouts")
            .update({ name: workoutName })
            .eq("id", workoutId)
            .select();
          if (supabaseError) {
            console.log(supabaseError.message);
            return;
          }
          console.log("Renamed workout:", data);
          return;
        }
      }
    }
    workout && setWorkoutName(name);
    console.log("But input was not changed or null!");
  };

  const styles = StyleSheet.create({
    arrowContainer: {
      backgroundColor: colors.primaryContainer,
      borderRadius: 15,
      padding: 7,
    },
    removeContainer: {
      backgroundColor: colors.primaryContainer,
      borderRadius: 15,
      padding: 7,
    },
    renameContainer: {
      alignItems: "flex-end",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      paddingHorizontal: 10,
      paddingTop: 2,
    },
    renameIconContainer: {
      backgroundColor: colors.primaryContainer,
      borderRadius: 15,
      padding: 5,
    },
    renameInputContainer: {
      flex: 1,
    },
    renameTextInput: {
      flexGrow: 1,
      height: 40,
    },
    renameTouch: {
      borderRadius: 10,
      flexGrow: 1,
      paddingHorizontal: 15,
      paddingVertical: 8,
    },
    workoutHeader: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    workoutTitle: {
      borderRadius: 15,
      color: colors.primary,
      flexGrow: 1,
      fontSize: 24,
    },
  });

  return renaming ? (
    <View style={styles.renameContainer}>
      <View style={styles.renameInputContainer}>
        <TextInput
          mode="outlined"
          label="Workout name"
          autoFocus={true}
          value={workoutName}
          style={styles.renameTextInput}
          onBlur={() => setWorkoutName(name)}
          onChangeText={(workoutName) => setWorkoutName(workoutName)}
        />
      </View>
      <TouchableRipple
        style={styles.renameIconContainer}
        onPress={finishRenaming}
      >
        <Icon name="check" size={32} color={colors.primary} />
      </TouchableRipple>
    </View>
  ) : (
    <View style={styles.workoutHeader}>
      <TouchableRipple
        borderless
        onPress={handleArrowPress}
        style={styles.arrowContainer}
      >
        <Icon name="arrow-left" size={28} color={colors.primary} />
      </TouchableRipple>
      <TouchableRipple
        borderless
        onPress={startRenaming}
        style={styles.renameTouch}
      >
        <Text
          style={styles.workoutTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {workoutName}
        </Text>
      </TouchableRipple>
      <TouchableRipple
        style={styles.removeContainer}
        onPress={handleRemoveWorkout}
      >
        <Icon name="delete" size={28} color={colors.error} />
      </TouchableRipple>
    </View>
  );
};

export default WorkoutHeader;
