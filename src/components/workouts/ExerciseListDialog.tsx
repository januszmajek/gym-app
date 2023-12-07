import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { supabase } from "../../../supabase/supabase";
import { Exercise } from "../../../types";
import {
  ActivityIndicator,
  Dialog,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import useDebounce from "../../hooks/useDebounce";
import ExerciseDescription from "./ExerciseDescription";
import useExercise from "../../hooks/stores/useExercise";
import { FlashList } from "@shopify/flash-list";
import ExerciseListItem from "./ExerciseListItem";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface ExerciseListDialogProps {
  hideAddExercise: () => void;
}

const ExerciseListDialog: React.FC<ExerciseListDialogProps> = ({
  hideAddExercise,
}) => {
  const { exercises, getExerciseById } = useExercise();
  const [activeExerciseDescriptionId, setActiveExerciseDescriptionId] =
    useState<string>();
  const [filteredExercises, setFilteredExercises] =
    useState<Exercise[]>(exercises);
  const [searchText, setSearchText] = useState("");
  const debouncedValue = useDebounce(searchText, 333);
  const { syncExercises } = useExercise();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [activeExercise, setActiveExercise] = useState<Exercise>();

  useEffect(() => {
    if (exercises.length < 1) {
      setLoading(true);
      const fetchExercises = async () => {
        const { data, error: supabaseError } = await supabase
          .from("exercises")
          .select("*");

        if (supabaseError) return;
        syncExercises(data);
      };
      fetchExercises();
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (activeExerciseDescriptionId) {
      setActiveExercise(getExerciseById(activeExerciseDescriptionId));
      return;
    }
    setActiveExercise(undefined);
  }, [activeExerciseDescriptionId]);

  useEffect(() => {
    const filtered = exercises.filter((exercise: Exercise) =>
      exercise.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredExercises(filtered);
  }, [debouncedValue]);

  const styles = StyleSheet.create({
    arrowContainer: {
      backgroundColor: colors.primaryContainer,
      borderRadius: 15,
      padding: 7,
    },
    dialogContainer: {
      display: "flex",
      flexGrow: 1,
      overflow: "hidden",
      paddingHorizontal: 10,
    },
    dialogTitle: {
      color: colors.primary,
      fontSize: 21,
    },
    dialogTitleContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      justifyContent: "flex-start",
      marginBottom: 15,
    },
    exerciseListContainer: {
      display: "flex",
      flexGrow: 1,
      overflow: "hidden",
    },
    indicatorContainer: {
      paddingVertical: 220,
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

  const renderItem = ({ item }: { item: Exercise }) => (
    <ExerciseListItem
      exercise={item}
      setActiveExerciseDescriptionId={setActiveExerciseDescriptionId}
    />
  );

  return (
    <>
      {activeExercise ? (
        <Dialog
          visible
          onDismiss={() => {
            setActiveExerciseDescriptionId(undefined);
            hideAddExercise();
          }}
          style={styles.dialogContainer}
        >
          <View style={styles.dialogTitleContainer}>
            <TouchableRipple style={styles.arrowContainer}>
              <Icon
                name="arrow-left"
                size={32}
                color={colors.secondary}
                onPress={() => setActiveExerciseDescriptionId(undefined)}
              />
            </TouchableRipple>
            <Text style={styles.dialogTitle}>{activeExercise.name}</Text>
          </View>
          <ExerciseDescription exercise={activeExercise} />
        </Dialog>
      ) : (
        <Dialog
          visible
          onDismiss={hideAddExercise}
          style={styles.dialogContainer}
        >
          <View style={styles.dialogTitleContainer}>
            <TouchableRipple style={styles.arrowContainer}>
              <Icon
                name="arrow-left"
                size={32}
                color={colors.secondary}
                onPress={hideAddExercise}
              />
            </TouchableRipple>
            <Text style={styles.dialogTitle}>Add exercise</Text>
          </View>
          <View style={styles.exerciseListContainer}>
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
              <FlashList
                data={filteredExercises}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                estimatedItemSize={18}
              />
            )}
          </View>
        </Dialog>
      )}
    </>
  );
};
export default ExerciseListDialog;
