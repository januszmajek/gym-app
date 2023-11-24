import React, { useState, useEffect } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import { supabase } from "../../supabase/supabase";
import { Exercise } from "../../types";
import useWorkout from "../hooks/stores/useWorkout";
import { TextInput, TouchableRipple, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useDebounce from "../hooks/useDebounce";

const ExerciseList = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const { activeWorkoutId, addWorkoutUnit } = useWorkout();
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [searchText, setSearchText] = useState("");
  const debouncedValue = useDebounce(searchText, 250);
  const { colors } = useTheme();
  useEffect(() => {
    const fetchExercises = async () => {
      const { data, error } = await supabase.from("exercises").select("*");
      if (error) console.log("Error fetching data", error);
      else {
        setExercises(data);
        setFilteredExercises(data);
      }
    };

    fetchExercises();
  }, []);
  const styles = StyleSheet.create({
    addContainer: {
      backgroundColor: colors.inversePrimary,
      borderRadius: 5,
      padding: 5,
    },
    container: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      overflow: "hidden",
      paddingRight: 15,
    },
    exerciseName: {
      color: colors.tertiary,
      fontSize: 16,
    },
    item: {
      paddingHorizontal: 10,
      paddingVertical: 20,
      width: "75%",
    },
    muscle: {
      color: colors.primary,
      fontSize: 14,
      textTransform: "capitalize",
    },
    searchInput: {
      backgroundColor: colors.primary,
      borderColor: colors.secondary,
      borderRadius: 5,
      borderWidth: 1,
      color: colors.primaryContainer,
      height: 40,
      marginBottom: 10,
      paddingLeft: 10,
    },
    searchInputContent: {
      color: colors.primaryContainer,
    },
  });

  useEffect(() => {
    const filtered = exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredExercises(filtered);
  }, [debouncedValue]);

  const renderItem = ({ item }: { item: Exercise }) => (
    <TouchableRipple id={item.id} style={styles.container}>
      <>
        <View style={styles.item}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          <Text style={styles.muscle}>{item.primary_muscles}</Text>
        </View>
        <TouchableRipple
          style={styles.addContainer}
          onPress={() =>
            addWorkoutUnit(activeWorkoutId, {
              ...item,
              sets: [
                { weight: 25, repetitions: 10, pause: 60 },
                { weight: 40, repetitions: 5, pause: 90 },
              ],
            })
          }
        >
          <Icon name={"plus"} size={32} color={colors.primary} />
        </TouchableRipple>
      </>
    </TouchableRipple>
  );

  return (
    <View>
      <TextInput
        style={styles.searchInput}
        contentStyle={styles.searchInputContent}
        placeholderTextColor={colors.primaryContainer}
        placeholder="Search by exercise name..."
        onChangeText={(text) => setSearchText(text)}
      />
      <FlatList
        style={styles.flatlist}
        data={filteredExercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
export default ExerciseList;
