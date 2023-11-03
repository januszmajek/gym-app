import * as React from "react";
import { Appbar } from "react-native-paper";

interface AppBarProps {
  title: string;
}

const AppBar = ({ title }: AppBarProps) => (
	<Appbar.Header>
		<Appbar.Content title={title} />
	</Appbar.Header>
);

export default AppBar;

