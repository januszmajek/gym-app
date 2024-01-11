import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import useStatisticChart from "../../hooks/stores/useStatisticChart";
import StatisticHeader from "./StatisticHeader";

interface StatisticProps {
  statistic_id: string;
}

const Statistic: React.FC<StatisticProps> = ({ statistic_id }) => {
  const { getStatisticChartByStatisticId } = useStatisticChart();
  const statisticChart = getStatisticChartByStatisticId(statistic_id);

  return (
    <View>
      <StatisticHeader statisticId={statistic_id} />
      <Text>Statistic!!!</Text>
      <Text>{statistic_id}</Text>
    </View>
  );
};

export default Statistic;
