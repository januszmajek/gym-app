import { View } from "react-native";
import AppBar from "../components/AppBar";
import OptionRadioButton from "../components/OptionRadioButton";
import OptionSwitchButton from "../components/OptionSwitchButton";
import LogoutButton from "../components/LogoutButton";

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

  return (
    <View>
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
