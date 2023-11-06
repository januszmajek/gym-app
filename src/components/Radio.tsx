import * as React from "react";
import { Button, Dialog, RadioButton } from "react-native-paper";
import { Text } from "react-native-paper";

interface Option {
  label: string;
  value: string;
}

interface RadioProps {
  options: Option[];
  initValue: string;
  changeValue: void | ((value: string) => void);
  hideDialog: () => void;
}
const Radio = ({ options, initValue, changeValue, hideDialog }: RadioProps) => {
  const [value, setValue] = React.useState(initValue);

  const onSave = () => {
    if (changeValue) {
      changeValue(value);
    }
    hideDialog();
  };

  return (
    <>
      <RadioButton.Group
        onValueChange={(value) => {
          setValue(value);
        }}
        value={value}
      >
        {options.map(({ label, value }: Option) => (
          <RadioButton.Item key={value} label={label} value={value} />
        ))}
      </RadioButton.Group>
      <Dialog.Actions>
        <Button onPress={onSave}>
          <Text>Zapisz</Text>
        </Button>
      </Dialog.Actions>
    </>
  );
};

export default Radio;
