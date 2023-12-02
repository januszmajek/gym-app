import * as React from "react";
import { StyleSheet, Text } from "react-native";
import {
  Dialog,
  FAB,
  Portal,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { supabase } from "../../../supabase/supabase";
import useSession from "../../hooks/stores/useSession";
import useWorkoutStore from "../../hooks/stores/useWorkout";
import uuid from "react-native-uuid";
import { useState } from "react";

const AddWorkoutButton = () => {
  const [visible, setVisible] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const { session } = useSession();
  const { colors } = useTheme();
  const { setActiveWorkoutId, addWorkout, workouts } = useWorkoutStore();

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const handleCreateWorkout = async () => {
    if (session) {
      const newWorkout = {
        id: uuid.v4() as string,
        user_id: session?.user.id,
        name: workoutName,
        order: workouts.length,
      };
      console.log("Adding workout:", newWorkout);
      addWorkout(newWorkout);
      setActiveWorkoutId(newWorkout.id);

      const { data, error: supabaseError } = await supabase
        .from("workouts")
        .insert(newWorkout)
        .select()
        .single();

      if (supabaseError) {
        console.log(supabaseError.message);
        return;
      }
      if (data) {
        console.log("Added workout:", data);
      }
    }
  };

  const styles = StyleSheet.create({
    buttonStyle: {
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: 10,
      color: colors.primaryContainer,
      paddingVertical: 12,
    },
    buttonText: {
      color: colors.primaryContainer,
    },
    dialogContainer: { paddingHorizontal: 5 },
    dialogContent: {
      gap: 20,
    },
    dialogTitle: {
      color: colors.primary,
      fontSize: 21,
    },
    fab: {
      bottom: 0,
      margin: 16,
      position: "absolute",
      right: 0,
    },
    inputText: {
      textDecorationLine: "none",
    },
    outline: {
      borderRadius: 4,
    },
  });

  return (
    <>
      <FAB icon="plus" style={styles.fab} onPress={showDialog} />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => {
            hideDialog();
            setWorkoutName("");
          }}
          style={styles.dialogContainer}
        >
          <Dialog.Title style={styles.dialogTitle}>
            <Text>Create workout</Text>
          </Dialog.Title>
          <Dialog.Content style={styles.dialogContent}>
            <TextInput
              value={workoutName}
              onChangeText={(workoutName) => setWorkoutName(workoutName)}
              mode="outlined"
              label="Workout name"
              placeholder="Monday chest..."
              style={styles.inputText}
              outlineStyle={styles.outline}
              activeUnderlineColor="rgba(0,0,0,0)"
            />
            <TouchableRipple
              style={styles.buttonStyle}
              onPress={handleCreateWorkout}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableRipple>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};

export default AddWorkoutButton;
