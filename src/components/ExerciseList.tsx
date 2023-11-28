import React, { useState, useEffect } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import { supabase } from "../../supabase/supabase";
import { Exercise, Set } from "../../types";
import useWorkout from "../hooks/stores/useWorkout";
import {
  ActivityIndicator,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useDebounce from "../hooks/useDebounce";
import ExerciseDescription from "./ExerciseDescription";
import useWorkoutUnits from "../hooks/stores/useWorkoutUnit";
import useSession from "../hooks/stores/useSession";
import { Json } from "../../supabase/types_db";

const ExerciseList = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const { session } = useSession();
  const [loading, setLoading] = useState(false);
  const { activeWorkoutId } = useWorkout();
  const { addWorkoutUnit } = useWorkoutUnits();
  const [activeExerciseDescription, setActiveExerciseDescription] =
    useState<string>();
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [searchText, setSearchText] = useState("");
  const debouncedValue = useDebounce(searchText, 250);
  const { colors } = useTheme();
  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("exercises").select("*");
      if (error) console.log("Error fetching data", error);
      else {
        setExercises(data);
        setFilteredExercises(data);
      }
      setLoading(false);
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
    indicatorContainer: {
      paddingVertical: 220,
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

  const handleAddWorkoutUnit = async (exercise_id: string) => {
    if (session) {
      const unit = {
        workout_id: activeWorkoutId,
        exercise_id: exercise_id,
        sets: [] as Set[],
        order: 0,
        user_id: session.user.id,
      };
      console.log(unit);
      const { data, error } = await supabase
        .from("workout_units")
        .insert(unit)
        .select();

      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        const unit = data[0];
        addWorkoutUnit(unit);
      }
    }
  };

  const renderItem = ({ item }: { item: Exercise }) => (
    <TouchableRipple
      id={item.id}
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
      exercise={exercises.find((e) => e.id === activeExerciseDescription)}
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
      {loading ? (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator color={colors.primary} size={128} />
        </View>
      ) : (
        <FlatList
          data={filteredExercises}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};
export default ExerciseList;
