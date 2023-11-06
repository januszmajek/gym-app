import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import Radio from "./Radio";
import ButtonLabel from "./ButtonLabel";
import useWeightStore from "../hooks/useWeightStore";
import useDistanceStore from "../hooks/useDistanceStore";
import useThemeStore from "../hooks/useThemeStore";
import useLengthStore from "../hooks/useLengthStore";

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

const OptionRadioButton = ({
  type,
  label,
  options,
  icon,
}: OptionButtonProps) => {
  const [visible, setVisible] = React.useState(false);

  const store = () => {
    if (type === "weight") {
      return useWeightStore();
    } else if (type === "distance") {
      return useDistanceStore();
    } else if (type === "length") {
      return useLengthStore();
    } else {
      return useThemeStore();
    }
  };

  const { value, changeValue } = store();

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
          <Radio
            options={options}
            initValue={value}
            changeValue={changeValue}
            hideDialog={hideDialog}
          />
        </Dialog>
      </Portal>
    </View>
  );
};

export default OptionRadioButton;

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
