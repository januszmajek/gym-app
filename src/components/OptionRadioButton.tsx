import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import Radio from "./Radio";
import useWeightStore from "../hooks/useWeightStore";
import useDistanceStore from "../hooks/useDistanceStore";
import useThemeStore from "../hooks/useThemeStore";
import useLengthStore from "../hooks/useLengthStore";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useTheme } from "react-native-paper";

interface Option {
  label: string;
  value: string;
}

interface OptionRadioButtonProps {
  type: string;
  label: string;
  options: Option[];
  iconName: string;
}
const OptionRadioButton = ({
  type,
  label,
  options,
  iconName,
}: OptionRadioButtonProps) => {
  const [visible, setVisible] = React.useState(false);
  const { colors } = useTheme();

  const store = () => {
    if (type === "weight") {
      return useWeightStore();
    } else if (type === "distance") {
      return useDistanceStore();
    } else if (type === "length") {
      return useLengthStore();
    } else {
      return useThemeStore();
    }
  };

  const { value, changeValue } = store();

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const styles = StyleSheet.create({
    bigLabel: { color: colors.primary, fontSize: 20 },
    buttonStyle: {
      alignItems: "center",
      backgroundColor: colors.primaryContainer,
      borderRadius: 0,
      display: "flex",
      flexDirection: "row",
      gap: 15,
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    dialogContainer: { paddingHorizontal: 10 },
    smallLabel: { color: colors.primary, fontSize: 16 },
    title: { fontSize: 20, textAlign: "center" },
  });

  return (
    <View>
      <TouchableOpacity
        onPress={showDialog}
        style={styles.buttonStyle}
        activeOpacity={0.65}
      >
        <Icon name={iconName} size={32} color={colors.primary}></Icon>
        <View>
          <Text style={styles.bigLabel}>{label}</Text>
          <Text style={styles.smallLabel}>{value}</Text>
        </View>
      </TouchableOpacity>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={styles.dialogContainer}
        >
          <Dialog.Title style={styles.title}>{label}</Dialog.Title>
          <Radio
            options={options}
            initValue={value}
            changeValue={changeValue}
            hideDialog={hideDialog}
          />
        </Dialog>
      </Portal>
    </View>
  );
};

export default OptionRadioButton;
