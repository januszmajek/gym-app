import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Dialog, Portal, TouchableRipple } from "react-native-paper";
import Radio from "./Radio";
import useThemeStore from "../../hooks/stores/useThemeStore";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import useSettings from "../../hooks/stores/useSettings";

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
  const {
    distanceUnit,
    changeDistanceUnit,
    weightUnit,
    changeWeightUnit,
    lengthUnit,
    changeLengthUnit,
  } = useSettings();

  const { value: theme, changeValue: changeTheme } = useThemeStore();

  const store: () => [string, (unit: string) => void] = () => {
    if (type === "weight") {
      return [weightUnit, changeWeightUnit];
    } else if (type === "distance") {
      return [distanceUnit, changeDistanceUnit];
    } else if (type === "length") {
      return [lengthUnit, changeLengthUnit];
    } else {
      return [theme, changeTheme];
    }
  };

  const [value, changeValue] = store();

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
      <TouchableRipple onPress={showDialog} style={styles.buttonStyle}>
        <>
          <Icon name={iconName} size={32} color={colors.primary} />
          <View>
            <Text style={styles.bigLabel}>{label}</Text>
            <Text style={styles.smallLabel}>{value}</Text>
          </View>
        </>
      </TouchableRipple>
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
