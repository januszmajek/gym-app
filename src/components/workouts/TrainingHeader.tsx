import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import TimerComponent from "./TimerComponent";
import useWorkout from "../../hooks/stores/useWorkout";
import useTraining from "../../hooks/stores/useTraining";
import useTrainingSet from "../../hooks/stores/useTrainingSet";
import useTrainingUnit from "../../hooks/stores/useTrainingUnits";

interface TrainingHeaderProps {
  handleFinishTraining: () => void;
}

const TrainingHeader: React.FC<TrainingHeaderProps> = ({
  handleFinishTraining,
}) => {
  const { colors } = useTheme();
  const { clearTrainingSets } = useTrainingSet();
  const { clearTrainingUnits } = useTrainingUnit();
  const { setActiveWorkoutId } = useWorkout();
  const { setActiveTrainingId, removeTraining, activeTrainingId } =
    useTraining();

  const handleStopTraining = () => {
    if (activeTrainingId) {
      removeTraining(activeTrainingId);
    }
    clearTrainingUnits();
    clearTrainingSets();
    setActiveTrainingId(undefined);
    setActiveWorkoutId(undefined);
  };

  const styles = StyleSheet.create({
    buttonText: {
      color: colors.primary,
    },
    saveContainer: {
      borderRadius: 15,
      marginLeft: "auto",
      paddingHorizontal: 15,
      paddingVertical: 8,
    },
    stopContainer: {
      borderRadius: 15,
      paddingHorizontal: 15,
      paddingVertical: 8,
    },
    trainingHeaderContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
  });

  return (
    <SafeAreaView>
      <View style={styles.trainingHeaderContainer}>
        <TouchableRipple
          borderless
          onPress={handleStopTraining}
          style={styles.stopContainer}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableRipple>
        <TimerComponent />
        <TouchableRipple
          borderless
          onPress={handleFinishTraining}
          style={styles.saveContainer}
        >
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default TrainingHeader;
