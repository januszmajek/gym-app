import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import useStatisticChart from "../../hooks/stores/useStatisticChart";

interface StatisticProps {}

const Statistic: React.FC<StatisticProps> = () => {
  const { getStatisticChartByStatisticId } = useStatisticChart();

  return (
    <View>
      <Text>Statistic!!!</Text>
    </View>
  );
};

export default Statistic;
