import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import AppBar from "../components/AppBar";
import useLengthStore from "../hooks/useLengthStore";
import useWeightStore from "../hooks/useWeightStore";
import useDistanceStore from "../hooks/useDistanceStore";
export default function TrainingScreen() {
  const { value: lengthUnit } = useLengthStore();
  const { value: weightUnit } = useWeightStore();
  const { value: distanceUnit } = useDistanceStore();

  return (
    <View>
      <AppBar title="Trening" />
      <Text variant="headlineMedium" style={styles.text}>
        Trening!
      </Text>
      <Text>Biegasz w {distanceUnit}</Text>
      <Text>Podnosisz {weightUnit}</Text>
      <Text>Mierzysz bica w {lengthUnit}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 30, textAlign: "center" },
});
