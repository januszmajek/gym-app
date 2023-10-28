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

	return (
		<View>
			<AppBar title="Ustawienia" />
			<OptionButton type={distance.type} options={distance.options}/>
			<OptionButton type={weight.type} options={weight.options}/>
			<OptionButton type={size.type} options={size.options}/>
		</View>
	);
}

