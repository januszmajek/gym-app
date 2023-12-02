import { View, Text, StyleSheet } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { supabase } from "../../../supabase/supabase";
import React from "react";
import useSession from "../../hooks/stores/useSession";

const LogoutButton = () => {
  const { colors } = useTheme();
  const { setSession } = useSession();

  const styles = StyleSheet.create({
    buttonStyle: {
      alignItems: "center",
      backgroundColor: colors.primaryContainer,
      borderRadius: 0,
      display: "flex",
      flexDirection: "row",
      gap: 15,
      paddingHorizontal: 14,
      paddingVertical: 13,
    },
    label: { color: colors.primary, fontSize: 20 },
  });

  const handleLogout = () => {
    setSession(null);
    supabase.auth.signOut();
  };

  return (
    <View>
      <TouchableRipple onPress={handleLogout} style={styles.buttonStyle}>
        <>
          <Icon name="logout" size={32} color={colors.primary} />
          <Text style={styles.label}>Wyloguj się</Text>
        </>
      </TouchableRipple>
    </View>
  );
};

export default LogoutButton;
