import React, { useState, useEffect } from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import { supabase } from "../../supabase/supabase";
import { Exercise } from "../../types";
import useWorkout from "../hooks/stores/useWorkout";
import { TouchableRipple } from "react-native-paper";

const ExerciseList = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const { activeWorkoutId, addWorkoutUnit } = useWorkout();

  useEffect(() => {
    const fetchExercises = async () => {
      const { data, error } = await supabase.from("exercises").select("*");
      if (error) console.log("Error fetching data", error);
      else setExercises(data);
    };

    fetchExercises();
  }, []);

  const renderItem = ({ item }: { item: Exercise }) => (
    <TouchableRipple
      onPress={() =>
        addWorkoutUnit(activeWorkoutId, {
          ...item,
          sets: [{ weight: 0, repetitions: 0 }],
          pause: 0,
        })
      }
    >
      <Text style={styles.item}>{item.name}</Text>
    </TouchableRipple>
  );

  return (
    <FlatList
      data={exercises}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
  },
});

export default ExerciseList;
