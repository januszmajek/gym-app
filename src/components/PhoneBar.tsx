import { StatusBar } from "react-native";
import React, { useState } from "react";
import type { StatusBarStyle } from "react-native";
import { useTheme } from "react-native-paper";
import useThemeStore from "../hooks/stores/useThemeStore";

const STYLES = ["default", "dark-content", "light-content"] as const;
const TRANSITIONS = ["fade", "slide", "none"] as const;

const PhoneBar = () => {
  const { colors } = useTheme();
  const { value: theme } = useThemeStore();
  const [hidden, setHidden] = useState(false);
  const [statusBarTransition, setStatusBarTransition] = useState<
    "fade" | "slide" | "none"
  >(TRANSITIONS[0]);
  const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
    STYLES[0],
  );
  const [bgColor, setBgColor] = useState(colors.background);

  React.useEffect(() => {
    theme === "Light"
      ? setStatusBarStyle(STYLES[1])
      : setStatusBarStyle(STYLES[2]);
    setBgColor(colors.background);
  }, [theme]);

  return (
    <StatusBar
      animated={true}
      backgroundColor={bgColor}
      barStyle={statusBarStyle}
      showHideTransition={statusBarTransition}
      hidden={hidden}
    />
  );
};
export default PhoneBar;
