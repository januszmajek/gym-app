import * as React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, TouchableRipple, useTheme } from "react-native-paper";
import { Switch } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useSettings from "../../hooks/stores/useSettings";

interface OptionSwitchButtonProps {
  type: string;
  label: string;
  iconName: string;
}

const OptionSwitchButton = ({
  type,
  label,
  iconName,
}: OptionSwitchButtonProps) => {
  const { vibrate, switchVibrate, keepScreenOn, switchKeepScreenOn } =
    useSettings();

  const { colors } = useTheme();
  const store: () => [boolean, () => void] = () => {
    if (type === "vibrate") {
      return [vibrate, switchVibrate];
    } else {
      return [keepScreenOn, switchKeepScreenOn];
    }
  };

  const [value, switchValue] = store();
  const onToggleSwitch = () => switchValue();

  const styles = StyleSheet.create({
    buttonStyle: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: 15,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    cardStyle: { marginHorizontal: 10, marginVertical: 5 },
    ripple: {
      borderRadius: 10,
    },
    switch: { marginLeft: "auto", marginRight: 15 },
  });

  return (
    <Card style={styles.cardStyle}>
      <TouchableRipple style={styles.ripple} onPress={onToggleSwitch}>
        <Card.Content style={styles.buttonStyle}>
          <>
            <Icon name={iconName} size={32} color={colors.primary} />
            <Text variant="bodyLarge">{label}</Text>
            <Switch
              value={value}
              onValueChange={onToggleSwitch}
              style={styles.switch}
            />
          </>
        </Card.Content>
      </TouchableRipple>
    </Card>
  );
};

export default OptionSwitchButton;
