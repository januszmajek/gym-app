import { View } from "react-native";
import AppBar from "../components/AppBar";
import OptionButton from "../components/OptionButton";

export default function SettingsScreen() {
  const distance = {
    type: "Jednostka odległości",
    options: [
      { label: "Kilometr", value: "km" },
      { label: "Mila", value: "mi" },
    ],
    icon: "apple-safari",
  };

  const weight = {
    type: "Jednostka wagi",
    options: [
      { label: "Kilogram", value: "kg" },
      { label: "Funt", value: "lb" },
    ],
    icon: "weight",
  };

  const size = {
    type: "Jednostka długości",
    options: [
      { label: "Centymetr", value: "cm" },
      { label: "Cal", value: "inch" },
    ],
    icon: "ruler",
  };

  const theme = {
    type: "Układ kolorystyczny",
    options: [
      { label: "Zmrożony niebieski", value: "1" },
      { label: "Szary polski", value: "2" },
      { label: "Zielone ziółko", value: "3" },
      { label: "Białe nosy", value: "4" },
    ],
    icon: "palette",
  };

  const buttons = [distance, weight, size, theme];

  return (
    <View style={{ width: "100%" }}>
      <AppBar title="Ustawienia" />
      {buttons.map(({ type, options, icon }) => (
        <OptionButton key={type} type={type} options={options} icon={icon} />
      ))}
    </View>
  );
}
