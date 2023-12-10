import * as React from "react";
import { View, StyleSheet } from "react-native";
import {
  Card,
  Text,
  Dialog,
  Portal,
  TouchableRipple,
} from "react-native-paper";
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
    buttonStyle: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: 15,
      paddingHorizontal: 10,
      paddingVertical: 12,
    },
    cardStyle: { marginHorizontal: 10, marginVertical: 5 },
    dialogContainer: { paddingHorizontal: 10 },
    ripple: {
      borderRadius: 10,
    },
    title: { fontSize: 20, textAlign: "center" },
  });

  return (
    <Card style={styles.cardStyle}>
      <TouchableRipple borderless style={styles.ripple} onPress={showDialog}>
        <Card.Content style={styles.buttonStyle}>
          <Icon name={iconName} size={32} />
          <View>
            <Text variant="bodyLarge">{label}</Text>
            <Text variant="bodyMedium">{value}</Text>
          </View>
        </Card.Content>
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
    </Card>
  );
};

export default OptionRadioButton;
