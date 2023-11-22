import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import AppBar from "../components/AppBar";
import React from "react";

export default function HistoryScreen() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    screen: { backgroundColor: colors.background, minHeight: "100%" },
    text: { fontSize: 30, textAlign: "center" },
  });
  return (
    <View style={styles.screen}>
      <AppBar title="Historia" />
      <Text variant="headlineMedium" style={styles.text}>
        Historia!
      </Text>
    </View>
  );
}
