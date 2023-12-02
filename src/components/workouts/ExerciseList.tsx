import React, { useState, useEffect } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import { supabase } from "../../../supabase/supabase";
import { Exercise } from "../../../types";
import useWorkout from "../../hooks/stores/useWorkout";
import { TextInput, TouchableRipple, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useDebounce from "../../hooks/useDebounce";
import ExerciseDescription from "./ExerciseDescription";
import useWorkoutUnits from "../../hooks/stores/useWorkoutUnit";
import useSession from "../../hooks/stores/useSession";
import useExercise from "../../hooks/stores/useExercise";
import uuid from "react-native-uuid";

const ExerciseList = () => {
  const { exercises } = useExercise();
  const { session } = useSession();
  const { activeWorkoutId } = useWorkout();
  const { addWorkoutUnit } = useWorkoutUnits();
  const [activeExerciseDescription, setActiveExerciseDescription] =
    useState<string>();
  const [filteredExercises, setFilteredExercises] =
    useState<Exercise[]>(exercises);
  const [searchText, setSearchText] = useState("");
  const debouncedValue = useDebounce(searchText, 250);
  const { colors } = useTheme();

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
    const filtered = exercises.filter((exercise: Exercise) =>
      exercise.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredExercises(filtered);
  }, [debouncedValue]);

  const handleAddWorkoutUnit = async (exercise_id: string) => {
    if (session && activeWorkoutId) {
      const newUnit = {
        id: uuid.v4() as string,
        workout_id: activeWorkoutId,
        exercise_id: exercise_id,
        order: 0,
        user_id: session.user.id,
      };
      addWorkoutUnit(newUnit);
      const { data, error: supabaseError } = await supabase
        .from("workout_units")
        .insert(newUnit)
        .select();

      if (supabaseError) {
        console.log(supabaseError);
        return;
      }
      if (data) {
        console.log("Added new workout unit:", data[0]);
      }
    }
  };

  const renderItem = ({ item }: { item: Exercise }) => (
    <TouchableRipple
      key={item.id}
      style={styles.container}
      onPress={() => setActiveExerciseDescription(item.id)}
    >
      <>
        <View style={styles.item}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          <Text style={styles.muscle}>{item.primary_muscles}</Text>
        </View>
        <TouchableRipple
          style={styles.addContainer}
          onPress={() => handleAddWorkoutUnit(item.id)}
        >
          <Icon name={"plus"} size={32} color={colors.primary} />
        </TouchableRipple>
      </>
    </TouchableRipple>
  );

  return activeExerciseDescription ? (
    <ExerciseDescription
      exercise={exercises.find(
        (e: Exercise) => e.id === activeExerciseDescription,
      )}
    />
  ) : (
    <View>
      <TextInput
        style={styles.searchInput}
        contentStyle={styles.searchInputContent}
        placeholderTextColor={colors.primaryContainer}
        placeholder="Search by exercise name..."
        onChangeText={(text) => setSearchText(text)}
      />
      <FlatList
        data={filteredExercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
export default ExerciseList;
