import React, { useEffect, useState } from "react";
import TrainingHeader from "./TrainingHeader";
import useTrainingUnits from "../../hooks/stores/useTrainingUnits";
import useSet from "../../hooks/stores/useSet";
import { StyleSheet, View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { TrainingExercise, TrainingUnit } from "../../../types";
import useExercise from "../../hooks/stores/useExercise";
import { useTheme } from "react-native-paper";
import useTraining from "../../hooks/stores/useTraining";
import TrainingUnitItem from "./TrainingUnitItem";
import useWorkout from "../../hooks/stores/useWorkout";
import useWorkoutUnits from "../../hooks/stores/useWorkoutUnit";
import useTrainingSet from "../../hooks/stores/useTrainingSet";
import { Training as ITraining } from "../../../types";
import CountdownModal from "./CountdownModal";
import KeepAwake from "react-native-keep-awake";
import useSettings from "../../hooks/stores/useSettings";
import useSession from "../../hooks/stores/useSession";
import { supabase } from "../../../supabase/supabase";

interface TrainingProps {
  activeTrainingId: string;
  activeWorkoutId: string;
}

const Training: React.FC<TrainingProps> = ({
  activeTrainingId,
  activeWorkoutId,
}) => {
  const { getWorkoutUnitsByWorkoutId } = useWorkoutUnits();
  const { getSetsByWorkoutUnitId } = useSet();
  const { getExerciseById } = useExercise();
  const { activeTraining, setActiveTraining, updateTraining } = useTraining();
  const { setActiveWorkoutId } = useWorkout();
  const { trainingUnits, addTrainingUnits, clearTrainingUnits } =
    useTrainingUnits();
  const { colors } = useTheme();
  const { clearTrainingSets, completeTrainingSet, addTrainingSets } =
    useTrainingSet();
  const [countdownVisibility, setCountdownVisibility] = useState(false);
  const [pauseDuration, setPauseDuration] = useState(0);
  const [countdownSetId, setCountdownSetId] = useState("");
  const { keepScreenOn } = useSettings();
  const { session } = useSession();

  useEffect(() => {
    const units = getWorkoutUnitsByWorkoutId(activeWorkoutId);
    const filledTrainingUnits = units.map(
      (trainingUnit: TrainingUnit) => (
        addTrainingSets(
          getSetsByWorkoutUnitId(trainingUnit.id).map((i) => ({
            ...i,
            completed: false,
          })),
        ),
        {
          ...trainingUnit,
          name: getExerciseById(trainingUnit.exercise_id)?.name,
        }
      ),
    );
    addTrainingUnits(filledTrainingUnits);
  }, []);

  useEffect(() => {
    if (keepScreenOn) {
      KeepAwake.activate();
    }
    if (!keepScreenOn) {
      KeepAwake.deactivate();
    }
    return () => {
      KeepAwake.deactivate();
    };
  }, [keepScreenOn]);

  const handleFinishTraining = async () => {
    if (activeTraining) {
      const training = {
        ...activeTraining,
        date_end: new Date(Date.now()),
      };
      setActiveTraining(training);
      updateTraining(activeTrainingId, training);
      if (session) {
        const supabaseTraining = {
          ...training,
          date_end: training.date_end.toISOString(),
          date_start: training.date_start.toISOString(),
          exercises_done: JSON.stringify(training.exercises_done),
          user_id: session?.user.id,
        };
        const { data, error: supabaseError } = await supabase
          .from("trainings")
          .insert(supabaseTraining)
          .select()
          .single();
        if (supabaseError) console.log(supabaseError);
        if (data) console.log(data);
      }
      clearTrainingUnits();
      clearTrainingSets();
      setActiveWorkoutId(undefined);
    }
  };

  const handleCompleteExerciseSet = async (
    activeTraining: ITraining | undefined,
    setId: string,
    pause: number,
    set: TrainingExercise,
  ) => {
    setCountdownSetId(setId);
    if (pause > 0) {
      setPauseDuration(pause);
      setCountdownVisibility(true);
    }
    if (activeTraining) {
      setActiveTraining({
        ...activeTraining,
        exercises_done: [...activeTraining.exercises_done, set],
      });
      completeTrainingSet(setId);
    }
  };

  const styles = StyleSheet.create({
    noExercisesInfo: {
      color: colors.primary,
      fontSize: 18,
      marginTop: 10,
      textAlign: "center",
    },
    screen: {
      minHeight: "100%",
    },
  });

  const renderItem = ({ item }: { item: TrainingUnit }) => (
    <TrainingUnitItem
      id={item.id}
      name={item.name}
      handleCompleteExerciseSet={handleCompleteExerciseSet}
    />
  );

  return (
    <View style={styles.screen}>
      <TrainingHeader handleFinishTraining={handleFinishTraining} />
      {trainingUnits && trainingUnits.length > 0 ? (
        <FlashList
          data={trainingUnits}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          estimatedItemSize={18}
        />
      ) : (
        <Text style={styles.noExercisesInfo}>No exercises added</Text>
      )}
      {countdownVisibility && (
        <CountdownModal
          id={countdownSetId}
          visible={countdownVisibility}
          duration={pauseDuration}
          onClose={() => {
            setCountdownVisibility(false);
          }}
        />
      )}
    </View>
  );
};
export default Training;
