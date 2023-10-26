import * as React from "react";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import * as appConfig from "./app.json";
import Navigation from "./src/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import lightTheme from "./src/themes/lightTheme";
import darkTheme from "./src/themes/darkTheme";

const appName = appConfig.expo.name;

export default function App() {
  // TODO: hook(?) do sprawdzenia jaki theme jest aktualnie używany
  // po zrobieniu opcji wyboru theme w ustawieniach
  const themeType = "light";

  return (
    <PaperProvider theme={themeType === "light" ? lightTheme : darkTheme}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
