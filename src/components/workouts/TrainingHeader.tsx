import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
    saveContainer: {
      backgroundColor: colors.primaryContainer,
      borderRadius: 15,
      marginLeft: "auto",
      padding: 7,
    },
    stopContainer: {
      backgroundColor: colors.primaryContainer,
      borderRadius: 15,
      padding: 7,
    },
    trainingHeaderContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
  });

  return (
    <View style={styles.trainingHeaderContainer}>
      <TouchableRipple
        borderless
        onPress={handleStopTraining}
        style={styles.stopContainer}
      >
        <Icon name="stop" size={28} color={colors.error} />
      </TouchableRipple>
      <TimerComponent />
      <TouchableRipple
        borderless
        onPress={handleFinishTraining}
        style={styles.saveContainer}
      >
        <Icon name="check" size={28} color={colors.secondary} />
      </TouchableRipple>
    </View>
  );
};

export default TrainingHeader;
