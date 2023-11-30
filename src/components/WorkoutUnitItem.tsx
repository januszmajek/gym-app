import { Text, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Set } from "../../types";
import {
  Button,
  Dialog,
  Portal,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import SetItem from "./SetItem";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { supabase } from "../../supabase/supabase";
import useWorkoutUnits from "../hooks/stores/useWorkoutUnit";
import useSet from "../hooks/stores/useSet";
import useSession from "../hooks/stores/useSession";

interface WorkoutUnitProps {
  workoutUnitId: number;
  exercise_id: string;
}

const WorkoutUnitItem = ({ exercise_id, workoutUnitId }: WorkoutUnitProps) => {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const { removeWorkoutUnit } = useWorkoutUnits();
  const { sets: allSets, addSet, getSetsByWorkoutUnitId } = useSet();
  const [sets, setSets] = useState<Set[]>([]);
  const { session } = useSession();

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
    buttonsContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: 5,
      justifyContent: "center",
    },
    container: {
      alignItems: "center",
      backgroundColor: colors.primaryContainer,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 2,
      paddingHorizontal: 15,
      paddingVertical: 5,
    },
    dialogStyle: {
      height: "75%",
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
    exerciseName: {
      color: colors.tertiary,
      fontSize: 18,
    },
    hidePortalButton: {
      borderRadius: 15,
      padding: 5,
    },
    iconContainer: {
      borderRadius: 15,
      overflow: "hidden",
      padding: 5,
    },
    setLabel: {
      backgroundColor: colors.primary,
      color: colors.primaryContainer,
      paddingLeft: 20,
      paddingVertical: 2,
    },
    setsCount: {
      color: colors.primary,
      fontSize: 15,
    },
  });

  const showEditWorkoutUnit = () => {
    setShowEdit(true);
  };

  const hideEditWorkoutUnit = () => {
    setShowEdit(false);
  };

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

  const handleDeleteWorkoutUnit = async () => {
    const { error } = await supabase
      .from("workout_units")
      .delete()
      .eq("id", workoutUnitId);
    if (error) {
      console.log(error);
      return;
    }
    removeWorkoutUnit(workoutUnitId);
  };

  useEffect(() => {
    const getWorkoutUnitName = async (exercise_id: string) => {
      const { data, error } = await supabase
        .from("exercises")
        .select("name")
        .eq("id", exercise_id);

      if (error) {
        console.log(error);
      }
      console.log(data);
      data && setName(data[0].name);
    };

    getWorkoutUnitName(exercise_id);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.exerciseName}>{name}</Text>
        <Text style={styles.setsCount}>{sets.length} sets</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableRipple
          borderless
          style={styles.iconContainer}
          onPress={showEditWorkoutUnit}
        >
          <Icon name="lead-pencil" size={28} color={colors.primary} />
        </TouchableRipple>
        <TouchableRipple
          borderless
          style={styles.iconContainer}
          onPress={handleDeleteWorkoutUnit}
        >
          <Icon name="delete" size={28} color={colors.error} />
        </TouchableRipple>
      </View>
      <Portal>
        <Dialog
          style={styles.dialogStyle}
          visible={showEdit}
          onDismiss={hideEditWorkoutUnit}
        >
          <View style={styles.dialogTitleContainer}>
            <TouchableRipple
              borderless
              onPress={hideEditWorkoutUnit}
              style={styles.hidePortalButton}
            >
              <Icon name="arrow-left" size={28} color={colors.secondary} />
            </TouchableRipple>
            <Text style={styles.dialogTitle}>Edit workout unit</Text>
          </View>
          <View>
            {sets.map((set, i) => (
              <View key={i}>
                <Text style={styles.setLabel}>
                  {i + 1}
                  {i === 0 ? "st" : i === 1 ? "nd" : i === 2 ? "rd" : "th"}
                  {" set"}
                </Text>
                <SetItem key={i} set={set} />
              </View>
            ))}
          </View>
          <View style={styles.addUnitButtonContainer}>
            <Button style={styles.addUnitButton} onPress={handleAddSet}>
              <Text style={styles.addUnitText}>Add set</Text>
            </Button>
          </View>
        </Dialog>
      </Portal>
    </View>
  );
};

export default WorkoutUnitItem;
