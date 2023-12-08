import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  Button,
  Divider,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { Exercise } from "../../../types";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useSession from "../../hooks/stores/useSession";
import useWorkout from "../../hooks/stores/useWorkout";
import useWorkoutUnits from "../../hooks/stores/useWorkoutUnit";
import uuid from "react-native-uuid";
import { supabase } from "../../../supabase/supabase";

interface ExerciseListItemProps {
  exercise: Exercise;
  setActiveExerciseDescriptionId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}
const ExerciseListItem: React.FC<ExerciseListItemProps> = ({
  exercise,
  setActiveExerciseDescriptionId,
}) => {
  const { colors } = useTheme();
  const { session } = useSession();
  const { activeWorkoutId } = useWorkout();
  const { addWorkoutUnit } = useWorkoutUnits();

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

  const styles = StyleSheet.create({
    // addContainer: {
    //   // backgroundColor: colors.inversePrimary,
    // borderRadius: 5,
    //   padding: 5,
    // },
    container: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      overflow: "hidden",
    },
    exerciseName: {
      fontSize: 20,
    },
    item: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      width: "75%",
    },
    muscle: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: "bold",
      textTransform: "capitalize",
    },
    addButtonText: { color: colors.primary, fontSize: 16 },
    divider: {
      marginHorizontal: 20,
    },
  });

  return (
    <>
      <TouchableRipple
        key={exercise.id}
        style={styles.container}
        onPress={() => setActiveExerciseDescriptionId(exercise.id)}
      >
        <>
          <View style={styles.item}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.muscle}>{exercise.primary_muscles}</Text>
          </View>
          <Button onPress={() => handleAddWorkoutUnit(exercise.id)}>
            <Text style={styles.addButtonText} variant="bodyMedium">
              Add
            </Text>
          </Button>
          {/*<TouchableRipple*/}
          {/*  style={styles.addContainer}*/}
          {/*  onPress={() => handleAddWorkoutUnit(exercise.id)}*/}
          {/*>*/}
          {/*  <Icon name={"plus"} size={32} color={colors.primary} />*/}
          {/*</TouchableRipple>*/}
        </>
      </TouchableRipple>
      <Divider bold style={styles.divider} />
    </>
  );
};

export default ExerciseListItem;
