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

interface WorkoutUnitProps {
  workoutUnitId: number;
}

const WorkoutUnit = ({ workoutUnitId }: WorkoutUnitProps) => {
  const { session } = useSession();
  const { colors } = useTheme();
  const { setActiveWorkoutUnitId } = useWorkoutUnits();
  const { addSet } = useSet();
  const { sets: allSets, getSetsByWorkoutUnitId } = useSet();
  const [sets, setSets] = useState<Set[]>([]);

  useEffect(() => {
    console.log(getSetsByWorkoutUnitId(workoutUnitId));
    setSets(getSetsByWorkoutUnitId(workoutUnitId));
  }, [allSets]);

  const handleAddSet = async () => {
    if (session) {
      const { data, error } = await supabase
        .from("sets")
        .insert({
          user_id: session.user.id,
          unit_id: workoutUnitId,
          weight: 0,
          repetitions: 0,
          pause: 0,
          order: 0,
        })
        .select();

      if (error) {
        console.log(error);
      }
      console.log("add set", data);
      if (data) {
        addSet(data[0]);
      }
    }
  };

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
    hidePortalButton: {
      borderRadius: 15,
      padding: 5,
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
          onPress={() => setActiveWorkoutUnitId(0)}
          style={styles.hidePortalButton}
        >
          <Icon name="arrow-left" size={28} color={colors.secondary} />
        </TouchableRipple>
        <Text style={styles.dialogTitle}>Edit workout unit</Text>
      </Appbar.Header>
      <View>
        {sets.map((set: Set, i) => (
          <View key={i}>
            <Text style={styles.setLabel}>
              {i + 1}
              {i === 0 ? "st" : i === 1 ? "nd" : i === 2 ? "rd" : "th"}
              {" set"}
            </Text>
            <SetItem key={i} setId={set.id} />
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
