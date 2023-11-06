import { View } from "react-native";
import AppBar from "../components/AppBar";
import OptionButton from "../components/OptionButton";

export default function SettingsScreen() {
  const distance = {
    type: "distance",
    label: "Jednostka dystansu",
    options: [
      { label: "Kilometr", value: "km" },
      { label: "Mila", value: "mi" },
    ],
    icon: "apple-safari",
  };

  const weight = {
    type: "weight",
    label: "Jednostka wagi",
    options: [
      { label: "Kilogram", value: "kg" },
      { label: "Funt", value: "lb" },
    ],
    icon: "weight",
  };

  const size = {
    type: "length",
    label: "Jednostka długości",
    options: [
      { label: "Centymetr", value: "cm" },
      { label: "Cal", value: "inch" },
    ],
    icon: "ruler",
  };

  const theme = {
    type: "theme",
    label: "Układ kolorystyczny",
    options: [
      { label: "Jasny niebieski", value: "light" },
      { label: "Ciemny polski", value: "dark" },
      { label: "Zielone ziółko", value: "3" },
      { label: "Białe nosy", value: "4" },
    ],
    icon: "palette",
  };

  const buttons = [distance, weight, size, theme];

  return (
    <View>
      <AppBar title="Ustawienia" />
      {buttons.map(({ type, label, options, icon }) => (
        <OptionButton
          key={type}
          type={type}
          label={label}
          options={options}
          icon={icon}
        />
      ))}
    </View>
  );
}
