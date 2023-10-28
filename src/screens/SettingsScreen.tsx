import { View } from "react-native";
import AppBar from "../components/AppBar";
import OptionButton from "../components/OptionButton";

export default function SettingsScreen() {

	const distance = {
		type: "Jednostka odległości",
		options:[{label: "Kilometr", value: "km" }, {label: "Mila", value: "mi"}]
	};

	const weight = {
		type: "Jednostka wagi",
		options:[{label: "Kilogram", value: "kg" }, {label: "Funt", value: "lb"}]
	};

	const size = {
		type: "Jednostka długości",
		options:[{label: "Centymetr", value: "cm" }, {label: "Cal", value: "inch"}]
	};

	const theme = {
		type: "Układ kolorystyczny",
		options:[{label: "Zmrożony niebieski", value: "1" }, {label: "Szary polski", value: "2"}, {label: "Zielone ziółko", value: "3"}, {label: "Białe nosy", value: "4"}]
	};

	const buttons = [distance, weight, size, theme];

	return (
		<View>
			<AppBar title="Ustawienia" />
			{buttons.map(({type, options}) => 
				<OptionButton key={type} type={type} options={options} />
			)}
		</View>
	);
}

