import * as React from "react";
import { Appbar, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useWorkout from "../hooks/stores/useWorkout";

interface AppBarProps {
  title: string;
}

const AppBar = ({ title }: AppBarProps) => {
  const { colors } = useTheme();
  const { activeWorkoutId, setActiveWorkoutId } = useWorkout();

  const pressBackArrow = () => {
    setActiveWorkoutId(0);
  };

  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
      {activeWorkoutId && (
        <Icon
          name="arrow-left"
          size={32}
          color={colors.secondary}
          onPress={pressBackArrow}
        />
      )}
    </Appbar.Header>
  );
};

export default AppBar;
