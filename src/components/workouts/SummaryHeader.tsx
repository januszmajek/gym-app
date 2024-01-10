import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableRipple, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useTraining from "../../hooks/stores/useTraining";
import useHistory from "../../hooks/stores/useHistory";

interface SummaryHeaderProps {
  name: string;
  type: "training" | "history";
}

const SummaryHeader: React.FC<SummaryHeaderProps> = ({ name, type }) => {
  const { setActiveTrainingId } = useTraining();
  const { setActiveTraining } =
    type === "training" ? useTraining() : useHistory();
  const { setActiveTrainingHistoryId } = useHistory();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    checkContainer: {
      borderRadius: 15,
      marginRight: 12,
      padding: 7,
    },
    summaryHeader: {
      alignItems: "center",
      backgroundColor: colors.background,
      display: "flex",
      flexDirection: "row",
      paddingVertical: 5,
    },
    summaryNameContainer: {
      flexGrow: 1,
      marginHorizontal: 15,
      paddingVertical: 8,
    },
    workoutTitle: {
      borderRadius: 15,
      flexGrow: 1,
      fontSize: 24,
      maxWidth: "92%",
    },
  });

  return (
    <View style={styles.summaryHeader}>
      <View style={styles.summaryNameContainer}>
        <Text
          style={styles.workoutTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Summary: {name}
        </Text>
      </View>
      {type === "training" ? (
        <TouchableRipple
          borderless
          onPress={() => {
            setActiveTraining(undefined);
            setActiveTrainingId(undefined);
          }}
          style={styles.checkContainer}
        >
          <Icon name="check" size={32} color={colors.primary} />
        </TouchableRipple>
      ) : (
        <TouchableRipple
          borderless
          onPress={() => {
            setActiveTrainingHistoryId(undefined);
            setActiveTraining(undefined);
          }}
          style={styles.checkContainer}
        >
          <Text>Back</Text>
        </TouchableRipple>
      )}
    </View>
  );
};

export default SummaryHeader;
