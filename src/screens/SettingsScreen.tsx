import { View, StyleSheet } from "react-native";
import AppBar from "../components/AppBar";
import OptionRadioButton from "../components/OptionRadioButton";
import OptionSwitchButton from "../components/OptionSwitchButton";
import LogoutButton from "../components/LogoutButton";
import { useTheme } from "react-native-paper";
import React from "react";

export default function SettingsScreen() {
  const distance = {
    type: "distance",
    label: "Jednostka dystansu",
    options: [
      { label: "Kilometr", value: "Kilometr" },
      { label: "Mila", value: "Mila" },
    ],
    icon: "apple-safari",
  };

  const weight = {
    type: "weight",
    label: "Jednostka wagi",
    options: [
      { label: "Kilogram", value: "Kilogram" },
      { label: "Funt", value: "Funt" },
    ],
    icon: "weight",
  };

  const size = {
    type: "length",
    label: "Jednostka długości",
    options: [
      { label: "Centymetr", value: "Centymetr" },
      { label: "Cal", value: "Cal" },
    ],
    icon: "ruler",
  };

  const theme = {
    type: "theme",
    label: "Układ kolorystyczny",
    options: [
      { label: "Jasny niebieski", value: "Jasny" },
      { label: "Ciemny polski", value: "Ciemny" },
    ],
    icon: "palette",
  };

  const vibrate = {
    type: "vibrate",
    label: "Wibracje",
    icon: "vibrate",
  };

  const keepScreenOn = {
    type: "keepScreenOn",
    label: "Nie wygaszaj ekranu",
    icon: "cellphone",
  };

  const radioButtons = [distance, weight, size, theme];
  const switchButtons = [vibrate, keepScreenOn];

  const { colors } = useTheme();
  const styles = StyleSheet.create({
    screen: { backgroundColor: colors.background, minHeight: "100%" },
  });

  return (
    <View style={styles.screen}>
      <AppBar title="Ustawienia" />
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
    </View>
  );
}
