import * as React from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import Radio from "./Radio";

const OptionButton = () => {
	const [visible, setVisible] = React.useState(false);

	const showDialog = () => setVisible(true);

	const hideDialog = () => setVisible(false);

	return (
		<View>
			<Button onPress={showDialog}>Show Dialog</Button>
			<Portal>
				<Dialog visible={visible} onDismiss={hideDialog}>
					<Dialog.Title>Wybierz jednostkę</Dialog.Title>
					<Radio/>
					<Dialog.Actions>
						<Button onPress={hideDialog}>Zapisz</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	);
};

export default OptionButton;