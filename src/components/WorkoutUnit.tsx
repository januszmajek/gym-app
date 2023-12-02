import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Appbar, Button, TouchableRipple, useTheme } from "react-native-paper";
import useSession from "../hooks/stores/useSession";
import useSet from "../hooks/stores/useSet";
import { supabase } from "../../supabase/supabase";
import useWorkoutUnits from "../hooks/stores/useWorkoutUnit";
import SetItem from "./SetItem";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Set } from "../../types";
import uuid from "react-native-uuid";

interface WorkoutUnitProps {
  workoutUnitId: string;
}

const WorkoutUnit = ({ workoutUnitId }: WorkoutUnitProps) => {
  const { session } = useSession();
  const { colors } = useTheme();
  const { setActiveWorkoutUnitId } = useWorkoutUnits();
  const { addSet } = useSet();
  const { getSetsByWorkoutUnitId } = useSet();
  const [sets, setSets] = useState<Set[]>(
    getSetsByWorkoutUnitId(workoutUnitId),
  );

  const handleAddSet = async () => {
    if (session) {
      const newSet = {
        id: uuid.v4() as string,
        workout_unit_id: workoutUnitId,
        user_id: session.user.id,
        weight: 0.5,
        repetitions: 1,
        pause: 0,
        order: 0,
      };
      addSet(newSet);
      console.log("Adding set:", newSet);

      const { data, error } = await supabase
        .from("sets")
        .insert(newSet)
        .select();

      if (error) {
        console.log(error);
        return;
      }
      console.log("Added set:", data[0]);
    }
  };

  const saveSets = () => {};

  const styles = StyleSheet.create({
    addUnitButton: {
      backgroundColor: colors.primary,
      width: "50%",
    },
    addUnitButtonContainer: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      paddingTop: 10,
    },
    addUnitText: {
      color: colors.primaryContainer,
    },
    arrowContainer: {
      backgroundColor: colors.primaryContainer,
      borderRadius: 15,
      padding: 7,
    },
    dialogTitle: {
      color: colors.primary,
      fontSize: 20,
    },
    dialogTitleContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      marginBottom: 10,
      marginLeft: 20,
    },
    saveContainer: {
      backgroundColor: colors.primaryContainer,
      borderRadius: 15,
      padding: 7,
    },
    setLabel: {
      backgroundColor: colors.primary,
      color: colors.primaryContainer,
      paddingLeft: 20,
      paddingVertical: 2,
    },
  });

  return (
    <View>
      <Appbar.Header style={styles.dialogTitleContainer}>
        <TouchableRipple
          borderless
          onPress={() => setActiveWorkoutUnitId(undefined)}
          style={styles.arrowContainer}
        >
          <Icon name="arrow-left" size={28} color={colors.secondary} />
        </TouchableRipple>
        <Text style={styles.dialogTitle}>Edit workout unit</Text>
        <TouchableRipple
          borderless
          onPress={saveSets}
          style={styles.saveContainer}
        >
          <Icon
            name="content-save-outline"
            size={28}
            color={colors.secondary}
          />
        </TouchableRipple>
      </Appbar.Header>
      <View>
        {sets.map((set: Set, i) => (
          <View key={i}>
            <Text style={styles.setLabel}>
              {i + 1}
              {i === 0 ? "st" : i === 1 ? "nd" : i === 2 ? "rd" : "th"}
              {" set"}
            </Text>
            <SetItem setId={set.id} />
          </View>
        ))}
      </View>
      <View style={styles.addUnitButtonContainer}>
        <Button style={styles.addUnitButton} onPress={handleAddSet}>
          <Text style={styles.addUnitText}>Add set</Text>
        </Button>
      </View>
    </View>
  );
};

export default WorkoutUnit;
