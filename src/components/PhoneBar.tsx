//TODO: prawdopodobnie do wyrzucenia ale na razie zakomentowane
import React from "react";
import { StatusBar } from "react-native";
// import React, { useState } from "react";
// import type { StatusBarStyle } from "react-native";
// import { useTheme } from "react-native-paper";
// import useThemeStore from "../hooks/stores/useThemeStore";

// const STYLES = ["default", "dark-content", "light-content"] as const;
// const TRANSITIONS = ["fade", "slide", "none"] as const;

const PhoneBar = () => {
  // const { colors } = useTheme();
  // const { value: theme } = useThemeStore();
  // UKRYWANIE STATUS BARU - KIEDYŚ MOŻE SIĘ PRZYDAĆ
  // const [hidden, setHidden] = useState(false);
  // const [statusBarTransition, setStatusBarTransition] = useState<"fade" | "slide" | "none">(TRANSITIONS[0]);
  // const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
  //   STYLES[0],
  // );

  // React.useEffect(() => {
  //   theme === "Jasny"
  //     ? setStatusBarStyle(STYLES[1])
  //     : setStatusBarStyle(STYLES[2]);
  // }, [theme]);

  return (
    <StatusBar
      animated={true}
      // backgroundColor={colors.primaryContainer}
      // barStyle={statusBarStyle}
      // showHideTransition={statusBarTransition}
      // hidden={hidden}
    />
  );
};
export default PhoneBar;
