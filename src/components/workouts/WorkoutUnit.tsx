import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, FAB, useTheme } from "react-native-paper";
import useSession from "../../hooks/stores/useSession";
import useSet from "../../hooks/stores/useSet";
import useWorkoutUnits from "../../hooks/stores/useWorkoutUnit";
import SetItem from "./SetItem";
import uuid from "react-native-uuid";
import WorkoutUnitHeader from "./WorkoutUnitHeader";

interface WorkoutUnitProps {
  workoutUnitId: string;
}

const WorkoutUnit = ({ workoutUnitId }: WorkoutUnitProps) => {
  const { session } = useSession();
  const { colors } = useTheme();
  const { setActiveWorkoutUnitId } = useWorkoutUnits();
  const {
    sets: allSets,
    getSetsByWorkoutUnitId,
    addSets,
    clearSetsByWorkoutUnitId,
  } = useSet();

  const [sets, setSets] = useState(getSetsByWorkoutUnitId(workoutUnitId));

  useEffect(() => {
    const newSets = getSetsByWorkoutUnitId(workoutUnitId);
    console.log("WorkoutUnit useEffect[allSets]:\nsetSets:", newSets);
    setSets(newSets);
  }, [allSets]);

  const saveSets = async () => {
    clearSetsByWorkoutUnitId(workoutUnitId);
    addSets(sets);
    setActiveWorkoutUnitId(undefined);
  };

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
      setSets([...sets, newSet]);
    }
  };
  const styles = StyleSheet.create({
    fab: {
      bottom: 0,
      margin: 16,
      position: "absolute",
      right: 0,
    },
    noSetsInfo: {
      color: colors.primary,
      fontSize: 18,
      marginTop: 10,
      textAlign: "center",
    },
    screen: {
      minHeight: "100%",
    },
    setLabel: {
      backgroundColor: colors.primary,
      color: colors.primaryContainer,
      paddingLeft: 20,
      paddingVertical: 2,
    },
  });

  return (
    <View style={styles.screen}>
      <FAB icon="plus" style={styles.fab} onPress={handleAddSet} />
      <WorkoutUnitHeader workoutUnitId={workoutUnitId} saveSets={saveSets} />
      <View>
        {sets.map((set, i) => (
          <View key={i}>
            <Text style={styles.setLabel}>
              {i + 1}
              {i === 0 ? "st" : i === 1 ? "nd" : i === 2 ? "rd" : "th"}
              {" set"}
            </Text>
            <SetItem key={i} set={set} sets={sets} setSets={setSets} />
          </View>
        ))}
        {sets.length === 0 && (
          <Text style={styles.noSetsInfo}>No sets added</Text>
        )}
      </View>
    </View>
  );
};

export default WorkoutUnit;
