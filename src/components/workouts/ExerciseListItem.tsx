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
        user_id: session.user.id,
      };
      addWorkoutUnit(newUnit);
      const { error: supabaseError } = await supabase
        .from("workout_units")
        .insert(newUnit)
        .select();

      if (supabaseError) {
        console.log(supabaseError);
        return;
      }
    }
  };

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      overflow: "hidden",
    },
    item: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      width: "75%",
    },
    muscle: {
      color: colors.primary,
      textTransform: "capitalize",
    },
    addButtonText: { color: colors.primary },
    divider: {
      marginHorizontal: 20,
    },
    addButtonContainer: {
      marginRight: 10,
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
            <Text variant="titleLarge">{exercise.name}</Text>
            <Text style={styles.muscle} variant="titleSmall">
              {exercise.primary_muscles}
            </Text>
          </View>
          <Button
            style={styles.addButtonContainer}
            onPress={() => handleAddWorkoutUnit(exercise.id)}
          >
            <Text style={styles.addButtonText} variant="bodyLarge">
              Add
            </Text>
          </Button>
        </>
      </TouchableRipple>
      <Divider bold style={styles.divider} />
    </>
  );
};

export default ExerciseListItem;
