import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { supabase } from "../../../supabase/supabase";
import { Exercise } from "../../../types";
import {
  Text,
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
    dialogContainer: {
      height: "80%",
      paddingHorizontal: 0,
    },
    dialogTitleContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      justifyContent: "flex-start",
      marginBottom: 15,
      paddingHorizontal: 15,
    },
    exerciseListContainer: {
      display: "flex",
      flexGrow: 1,
      width: "100%",
    },
    indicatorContainer: {
      paddingVertical: 220,
    },
    searchInput: {
      height: 40,
      marginBottom: 10,
      marginHorizontal: 15,
    },
    outline: {
      borderRadius: 4,
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
            <TouchableRipple>
              <Icon
                name="arrow-left"
                size={28}
                color={colors.secondary}
                onPress={() => setActiveExerciseDescriptionId(undefined)}
              />
            </TouchableRipple>
            <Text variant="titleLarge">{activeExercise.name}</Text>
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
            <TouchableRipple>
              <Icon
                name="arrow-left"
                size={28}
                color={colors.secondary}
                onPress={hideAddExercise}
              />
            </TouchableRipple>
            <Text variant="titleLarge">Add exercise</Text>
          </View>
          <View style={styles.exerciseListContainer}>
            <TextInput
              style={styles.searchInput}
              outlineStyle={styles.outline}
              onChangeText={(text) => setSearchText(text)}
              mode="outlined"
              placeholder="Search by exercise name..."
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
