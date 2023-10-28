import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import TrainingScreen from "./screens/TrainingScreen";
import StatisticsScreen from "./screens/StatisticsScreen";
import HistoryScreen from "./screens/HistoryScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function Navigation() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
			}}
			tabBar={({ navigation, state, descriptors, insets }) => (
				<BottomNavigation.Bar
					navigationState={state}
					safeAreaInsets={insets}
					onTabPress={({ route, preventDefault }) => {
						const event = navigation.emit({
							type: "tabPress",
							target: route.key,
							canPreventDefault: true,
						});

						if (event.defaultPrevented) {
							preventDefault();
						} else {
							navigation.dispatch({
								...CommonActions.navigate(route.name, route.params),
								target: state.key,
							});
						}
					}}
					renderIcon={({ route, focused, color }) => {
						const { options } = descriptors[route.key];
						if (options.tabBarIcon) {
							return options.tabBarIcon({ focused, color, size: 24 });
						}

						return null;
					}}
					getLabelText={({ route }) => {
						const { options } = descriptors[route.key];
						const label =
              options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.title;

						return label;
					}}
				/>
			)}
		>
			<Tab.Screen
				name="Trening"
				component={TrainingScreen}
				options={{
					tabBarLabel: "Trening",
					tabBarIcon: ({ color, size }) => {
						return <Icon name="arm-flex" size={size} color={color} />;
					},
				}}
			/>
			<Tab.Screen
				name="History"
				component={HistoryScreen}
				options={{
					tabBarLabel: "Historia",
					tabBarIcon: ({ color, size }) => {
						return <Icon name="history" size={size} color={color} />;
					},
				}}
			/>
			<Tab.Screen
				name="Statistics"
				component={StatisticsScreen}
				options={{
					tabBarLabel: "Statystyki",
					tabBarIcon: ({ color, size }) => {
						return <Icon name="chart-line" size={size} color={color} />;
					},
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					tabBarLabel: "Ustawienia",
					tabBarIcon: ({ color, size }) => {
						return <Icon name="cog" size={size} color={color} />;
					},
				}}
			/>
		</Tab.Navigator>
	);
}

