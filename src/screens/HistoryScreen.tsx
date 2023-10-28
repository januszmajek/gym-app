import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import AppBar from "../AppBar";

export default function HistoryScreen() {
	return (
		<View>
			<AppBar title="Historia" />
			<Text variant="headlineMedium" style={styles.text}>
        Historia!
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	text: { fontSize: 30, textAlign: "center" },
});
