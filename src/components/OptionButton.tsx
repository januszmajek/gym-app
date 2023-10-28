import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Dialog, Portal} from "react-native-paper";
import Radio from "./Radio";

interface Option {
    label: string,
    value: string
}

interface OptionButtonProps {
    type: string
    options: Option[]
}

const OptionButton = ( {type, options}:OptionButtonProps) => {
	const [visible, setVisible] = React.useState(false);
    
	const showDialog = () => setVisible(true);

	const hideDialog = () => setVisible(false);

	return (
		<View>
			<Button onPress={showDialog} style={styles.button}>{type}</Button>
			<Portal>
				<Dialog visible={visible} onDismiss={hideDialog} style={styles.container}>
					<Dialog.Title style={styles.title}>{type}</Dialog.Title>
					<Radio options={options}/>
					<Dialog.Actions>
						<Button onPress={hideDialog}>Zapisz</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	);
};

export default OptionButton;

const styles = StyleSheet.create({
	container: { paddingHorizontal: 10},
	title: { fontSize: 20, textAlign: "center" },
	button: { fontSize: 28, borderRadius: 0, textAlign: "left", padding: 0},
});