import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import AppBar from "../AppBar";

export default function TrainingScreen() {
	return (
		<View>
			<AppBar title="Trening" />
			<Text variant="headlineMedium" style={styles.text}>
        Trening!
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	text: { fontSize: 30, textAlign: "center" },
});
