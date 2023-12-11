import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableRipple, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useTraining from "../../hooks/stores/useTraining";

interface SummaryHeaderProps {
  name: string;
}

const SummaryHeader: React.FC<SummaryHeaderProps> = ({ name }) => {
  const { setActiveTrainingId, setActiveTraining } = useTraining();
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
    </View>
  );
};

export default SummaryHeader;
