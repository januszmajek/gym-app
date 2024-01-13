import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { FAB, useTheme } from "react-native-paper";
import { Set } from "../../../types";
import useSession from "../../hooks/stores/useSession";
import useSet from "../../hooks/stores/useSet";
import useWorkoutUnits from "../../hooks/stores/useWorkoutUnit";
import SetItem from "./SetItem";
import uuid from "react-native-uuid";
import WorkoutUnitHeader from "./WorkoutUnitHeader";
import { FlashList } from "@shopify/flash-list";
import { supabase } from "../../../supabase/supabase";

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

  const addSetToDB = async (set: Set) => {
    if (session) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { completed, ...restOfSet } = set;
      const { data, error: supabaseError } = await supabase
        .from("sets")
        .insert({ ...restOfSet, user_id: session.user.id })
        .select();
      if (supabaseError) console.log(supabaseError);
      console.log(data);
    }
  };

  const saveSets = async () => {
    clearSetsByWorkoutUnitId(workoutUnitId);
    addSets(sets);
    setActiveWorkoutUnitId(undefined);
    const { error: supabaseError } = await supabase
      .from("sets")
      .delete()
      .eq("workout_unit_id", workoutUnitId);
    if (supabaseError) console.log(supabaseError);
    sets.map((set) => {
      addSetToDB(set);
    });
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
        time: 0,
        type: "quantity",
      };
      setSets([...sets, newSet]);
    }
    console.log("Deleted Workout Unit:", workoutUnitId);
  };

  const styles = StyleSheet.create({
    fab: {
      bottom: 0,
      margin: 16,
      position: "absolute",
      right: 0,
    },
    listPadding: {
      paddingVertical: 69,
    },
    screen: {
      minHeight: "100%",
    },
    setLabel: {
      color: colors.primary,
      paddingLeft: 20,
      paddingVertical: 2,
    },
  });

  const renderItem = ({ item, index: i }: { item: Set; index: number }) => (
    <View>
      <Text style={styles.setLabel}>
        {i + 1}
        {i === 0 ? "st" : i === 1 ? "nd" : i === 2 ? "rd" : "th"}
        {" set"}
      </Text>
      <SetItem set={item} sets={sets} setSets={setSets} />
    </View>
  );
  const listFooter = () => <View style={styles.listPadding} />;

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <WorkoutUnitHeader workoutUnitId={workoutUnitId} saveSets={saveSets} />
        {sets.length > 0 && (
          <FlashList
            data={sets}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            estimatedItemSize={116}
            ListFooterComponent={listFooter}
          />
        )}
        <FAB icon="plus" style={styles.fab} onPress={handleAddSet} />
      </View>
    </SafeAreaView>
  );
};

export default WorkoutUnit;
