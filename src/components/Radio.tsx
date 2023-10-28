import * as React from "react";
import { RadioButton } from "react-native-paper";

interface Option {
    label: string,
    value: string
}

interface RadioProps {
    options: Option[]
}


const Radio = ( {options}:RadioProps ) => {
	const [value, setValue] = React.useState(options[0].value);

	return (
		<RadioButton.Group onValueChange={value => setValue(value)} value={value}>
			{options.map(({label, value}: Option) => 
				<RadioButton.Item key={value} label={label} value={value} />
			)}
		</RadioButton.Group>
	);
};

export default Radio;