import * as React from "react";
import { Appbar, useTheme } from "react-native-paper";

interface AppBarProps {
  title: string;
}

const AppBar = ({ title }: AppBarProps) => {
  const { colors } = useTheme();

  return (
    <Appbar.Header>
      <Appbar.Content title={title} color={colors.primary} />
    </Appbar.Header>
  );
};

export default AppBar;
