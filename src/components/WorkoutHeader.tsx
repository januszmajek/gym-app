import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, TouchableRipple, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useWorkout from "../hooks/stores/useWorkout";
import { supabase } from "../../supabase/supabase";

interface WorkoutHeaderProps {
  workoutName: string;
  workoutId: string;
}

const WorkoutHeader: React.FC<WorkoutHeaderProps> = ({
  workoutId,
  workoutName: name,
}) => {
  const { colors } = useTheme();
  const { setActiveWorkoutId, updateWorkout, getWorkoutById } = useWorkout();
  const [renaming, setRenaming] = useState(false);
  const [workoutName, setWorkoutName] = useState(name);
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
    renameButton: {
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 8,
    },
    renameContainer: {
      alignItems: "flex-end",
      display: "flex",
      flexDirection: "row",
      flexGrow: 1,
      gap: 10,
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
      fontSize: 24,
    },
  });

  return (
    <View style={styles.workoutHeader}>
      {!renaming && (
        <TouchableRipple
          borderless
          onPress={handleArrowPress}
          style={styles.arrowContainer}
        >
          <Icon name="arrow-left" size={28} color={colors.primary} />
        </TouchableRipple>
      )}
      {renaming ? (
        <View style={styles.renameContainer}>
          <View style={styles.renameInputContainer}>
            <TextInput
              mode="outlined"
              label="Workout name"
              autoFocus={true}
              value={workoutName}
              style={styles.renameTextInput}
              onBlur={finishRenaming}
              onChangeText={(workoutName) => setWorkoutName(workoutName)}
            ></TextInput>
          </View>
          <TouchableRipple
            style={styles.renameIconContainer}
            onPress={finishRenaming}
          >
            <Icon name="check" size={32} color={colors.primary} />
          </TouchableRipple>
        </View>
      ) : (
        <TouchableRipple
          borderless
          onPress={startRenaming}
          style={styles.renameButton}
        >
          <Text
            style={styles.workoutTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {workoutName}
          </Text>
        </TouchableRipple>
      )}
    </View>
  );
};

export default WorkoutHeader;
