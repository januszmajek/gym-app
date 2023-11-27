import { Text, StyleSheet, View } from "react-native";
import React, { useState } from "react";

import { WorkoutUnit } from "../../types";
import {
  Button,
  Dialog,
  Portal,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import SetItem from "./SetItem";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const WorkoutUnitItem = ({ name, sets }: WorkoutUnit) => {
  const { colors } = useTheme();

  const [showEdit, setShowEdit] = useState(false);

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
          onPress={() => {}}
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
              <View>
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
            <Button style={styles.addUnitButton} onPress={() => {}}>
              <Text style={styles.addUnitText}>Add set</Text>
            </Button>
          </View>
        </Dialog>
      </Portal>
    </View>
  );
};

export default WorkoutUnitItem;
