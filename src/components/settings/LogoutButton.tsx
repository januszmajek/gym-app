import { StyleSheet } from "react-native";
import { Card, TouchableRipple } from "react-native-paper";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { supabase } from "../../../supabase/supabase";
import React from "react";
import useSession from "../../hooks/stores/useSession";

const LogoutButton = () => {
  const { setSession } = useSession();

  const styles = StyleSheet.create({
    buttonStyle: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: 15,
      paddingHorizontal: 10,
      paddingVertical: 16,
    },
    cardStyle: { marginHorizontal: 10, marginVertical: 5 },
    ripple: {
      borderRadius: 10,
    },
  });

  const handleLogout = () => {
    setSession(null);
    supabase.auth.signOut();
  };

  return (
    <Card style={styles.cardStyle}>
      <TouchableRipple onPress={handleLogout} style={styles.ripple}>
        <Card.Content style={styles.buttonStyle}>
          <Icon name="logout" size={32} />
          <Text variant="bodyLarge">Log out</Text>
        </Card.Content>
      </TouchableRipple>
    </Card>
  );
};

export default LogoutButton;
