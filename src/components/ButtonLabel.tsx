import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ButtonLabelProps {
  bigLabel: string;
  smallLabel: string;
}

const ButtonLabel = ({ bigLabel, smallLabel }: ButtonLabelProps) => (
  <View>
    <Text style={styles.bigLabel}>{bigLabel}</Text>
    <Text style={styles.smallLabel}>{smallLabel}</Text>
  </View>
);

export default ButtonLabel;

const styles = StyleSheet.create({
  bigLabel: { fontSize: 20 },
  smallLabel: { fontSize: 16 },
});
