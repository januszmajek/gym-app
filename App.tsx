import * as React from "react";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import * as appConfig from "./app.json";
import Navigation from "./src/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import lightTheme from "./src/themes/lightTheme";
import darkTheme from "./src/themes/darkTheme";
import "react-native-url-polyfill/auto";
import { useEffect } from "react";
import { supabase } from "./supabase/supabase";
import Auth from "./src/components/authentication/Auth";
import useThemeStore from "./src/hooks/stores/useThemeStore";
import PhoneBar from "./src/components/PhoneBar";
import useSession from "./src/hooks/stores/useSession";

const appName = appConfig.expo.name;

export default function App() {
  const { session, setSession } = useSession();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      session && setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      session && setSession(session);
    });
  }, []);
  const { value: themeType } = useThemeStore();

  return (
    <PaperProvider theme={themeType === "Jasny" ? lightTheme : darkTheme}>
      <PhoneBar />
      {session && session.user ? (
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      ) : (
        <>
          <Auth />
        </>
      )}
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
