import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import AppBar from "../AppBar";

export default function SettingsScreen() {
	return (
		<View>
			<AppBar title="Ustawienia" />
			<Text variant="headlineMedium" style={styles.text}>
    Ustawienia!
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	text: { fontSize: 30, textAlign: "center" },
});
