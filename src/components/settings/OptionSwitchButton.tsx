import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
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
  const { colors } = useTheme();
  const { vibrate, switchVibrate, keepScreenOn, switchKeepScreenOn } =
    useSettings();

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
      backgroundColor: colors.primaryContainer,
      borderRadius: 0,
      display: "flex",
      flexDirection: "row",
      gap: 15,
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    label: { color: colors.primary, fontSize: 20 },
  });

  return (
    <View>
      <TouchableRipple onPress={onToggleSwitch} style={styles.buttonStyle}>
        <>
          <Icon name={iconName} size={32} color={colors.primary} />
          <Text style={styles.label}>{label}</Text>
          <Switch value={value} onValueChange={onToggleSwitch} />
        </>
      </TouchableRipple>
    </View>
  );
};

export default OptionSwitchButton;
