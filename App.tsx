import * as React from "react";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import * as appConfig from "./app.json";
import Navigation from "./src/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import lightTheme from "./src/themes/lightTheme";
import darkTheme from "./src/themes/darkTheme";
import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "./utils/supabase";
import Auth from "./src/components/authentication/Auth";
import { Session } from "@supabase/supabase-js";
import GoogleAuth from "./src/components/authentication/GoogleAuth";
import useThemeStore from "./src/hooks/stores/useThemeStore";
import PhoneBar from "./src/components/PhoneBar";

const appName = appConfig.expo.name;

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  const { value: themeType } = useThemeStore();

  return (
    <PaperProvider theme={themeType === "Jasny" ? lightTheme : darkTheme}>
      {session && session.user ? (
        <PhoneBar />
      <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      ) : (
        <>
          <Auth />
          <GoogleAuth />
        </>
      )}
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
