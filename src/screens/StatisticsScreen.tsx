import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import AppBar from "../AppBar";

export default function StatisticsScreen() {
	return (
		<View>
			<AppBar title="Statystyki" />
			<Text variant="headlineMedium" style={styles.text}>
        Statystyki!
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	text: { fontSize: 30, textAlign: "center" },
});
