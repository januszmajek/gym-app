import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import Radio from "./Radio";
import ButtonLabel from "./ButtonLabel";
import { useSettingsStore } from "../hooks/useSettingsStore";

interface Option {
  label: string;
  value: string;
}

interface OptionButtonProps {
  type: string;
  label: string;
  options: Option[];
  icon: string;
}



const OptionButton = ({ type, label, options, icon }: OptionButtonProps) => {
  const [visible, setVisible] = React.useState(false);
  const value =
    type === "theme"
      ? useSettingsStore((state) => state.theme)
      : type === "weight"
      ? useSettingsStore((state) => state.weightUnit)
      : type === "distance"
      ? useSettingsStore((state) => state.distanceUnit)
      : type === "length"
      ? useSettingsStore((state) => state.lengthUnit)
      : "";

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <View>
      <Button
        onPress={showDialog}
        labelStyle={styles.labelStyle}
        contentStyle={styles.contentStyle}
        style={styles.style}
        icon={icon}
      >
        <ButtonLabel bigLabel={label} smallLabel={value} />
      </Button>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={styles.container}
        >
          <Dialog.Title style={styles.title}>{label}</Dialog.Title>
          <Radio options={options} />
          <Dialog.Actions>
            <Button onPress={hideDialog}>
              <Text>Zapisz</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default OptionButton;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10 },
  contentStyle: {
    justifyContent: "flex-start",
  },
  labelStyle: {
    fontSize: 32,
    paddingHorizontal: 10,
    paddingVertical: 1,
    textAlign: "left",
  },
  style: {
    borderRadius: 0,
    paddingVertical: 2,
  },
  title: { fontSize: 20, textAlign: "center" },
});
