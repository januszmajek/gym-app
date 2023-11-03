import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Dialog, Portal} from "react-native-paper";
import Radio from "./Radio";
import ButtonLabel from "./ButtonLabel";

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
			<Button 
				onPress={showDialog} 
				labelStyle={styles.labelStyle} 
				contentStyle={styles.contentStyle}
				style={styles.style}
				icon="arm-flex">
				<ButtonLabel bigLabel={type} smallLabel={type} />
			</Button>
			<Portal>
				<Dialog 
					visible={visible} 
					onDismiss={hideDialog} 
					style={styles.container}>
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
	style: { borderRadius: 0, width: "100%", flexDirection: "row", alignItems: "center"},
	labelStyle: { fontSize: 20, textAlign: "left", padding: 8},
	contentStyle: {},
});