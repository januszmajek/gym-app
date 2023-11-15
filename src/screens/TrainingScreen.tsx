import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import AppBar from "../components/AppBar";
// import useLengthStore from "../hooks/stores/useLengthStore";
// import useWeightStore from "../hooks/stores/useWeightStore";
// import useDistanceStore from "../hooks/stores/useDistanceStore";
// import useVibrateStore from "../hooks/stores/useVibrateStore";
// import useKeepScreenOnStore from "../hooks/stores/useKeepScreenOnStore";
import ExerciseList from "../components/ExerciseList";
export default function TrainingScreen() {
  // const { value: lengthUnit } = useLengthStore();
  // const { value: weightUnit } = useWeightStore();
  // const { value: distanceUnit } = useDistanceStore();
  // const { value: vibrate } = useVibrateStore();
  // const { value: keepScreenOn } = useKeepScreenOnStore();

  return (
    <View>
      <AppBar title="Trening" />
      <Text variant="headlineMedium" style={styles.text}>
        Pozdro poćwicz
      </Text>
      <ExerciseList />
      {/*<Text>Biegasz w {distanceUnit}</Text>*/}
      {/*<Text>Podnosisz {weightUnit}</Text>*/}
      {/*<Text>Mierzysz bica w {lengthUnit}</Text>*/}
      {/*<Text>{vibrate ? "Wibrujesz" : "Nie wibrujesz"}</Text>*/}
      {/*<Text>{keepScreenOn ? "Nie wygaszasz ekranu" : "Wygaszasz ekran"}</Text>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 30, textAlign: "center" },
});
