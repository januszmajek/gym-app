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
  // TODO: hook(?) do sprawdzenia jaki theme jest aktualnie używany
  // po zrobieniu opcji wyboru theme w ustawieniach
  const themeType = "light";

  return (
    <PaperProvider theme={themeType === "light" ? lightTheme : darkTheme}>
      {session && session.user ? (
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
