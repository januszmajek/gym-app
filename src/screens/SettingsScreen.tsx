import { StyleSheet, ScrollView } from "react-native";
import AppBar from "../components/AppBar";
import OptionRadioButton from "../components/settings/OptionRadioButton";
import OptionSwitchButton from "../components/settings/OptionSwitchButton";
import LogoutButton from "../components/settings/LogoutButton";
import { useTheme } from "react-native-paper";
import React from "react";

export default function SettingsScreen() {

  const weight = {
    type: "weight",
    label: "Weight unit",
    options: [
      { label: "Kilogram", value: "Kilogram" },
      { label: "Pound", value: "Pound" },
    ],
    icon: "weight",
  };

  const theme = {
    type: "theme",
    label: "Application theme",
    options: [
      { label: "Light", value: "Light" },
      { label: "Dark", value: "Dark" },
    ],
    icon: "palette",
  };

  const vibrate = {
    type: "vibrate",
    label: "Vibrations after pause",
    icon: "vibrate",
  };

  const keepScreenOn = {
    type: "keepScreenOn",
    label: "Keep screen on",
    icon: "cellphone",
  };

  const sound = {
    type: "sound",
    label: "Timer sound signal",
    icon: "volume-high",
  }

  const radioButtons = [weight, theme];
  const switchButtons = [vibrate, keepScreenOn, sound];

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    screen: { backgroundColor: colors.background, minHeight: "100%" },
  });

  return (
    <ScrollView style={styles.screen}>
      <AppBar title="Settings" />
      {radioButtons.map(({ type, label, options, icon }, key) => (
        <OptionRadioButton
          key={key}
          type={type}
          label={label}
          options={options}
          iconName={icon}
        />
      ))}
      {switchButtons.map(({ type, label, icon }, key) => (
        <OptionSwitchButton
          key={key}
          type={type}
          label={label}
          iconName={icon}
        />
      ))}
      <LogoutButton />
    </ScrollView>
  );
}
