import React, { useState, useEffect } from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import { supabase } from "../../supabase/supabase";

interface Exercise {
  id: string;
  name: string;
  primary_muscles: string[];
  secondary_muscles: string[];
  force: string;
  level: string;
  mechanic: string;
  equipment: string;
  category: string;
  instructions: string[];
}

const ExerciseList = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const { data, error } = await supabase.from("exercises").select("*");
      if (error) console.log("Error fetching data", error);
      else setExercises(data);
    };

    fetchExercises();
  }, []);

  const renderItem = ({ item }: { item: Exercise }) => (
    <Text style={styles.item}>{item.name}</Text>
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
