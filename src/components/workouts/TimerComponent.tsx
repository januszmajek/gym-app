import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const TimerComponent = () => {
  const [seconds, setSeconds] = useState(0);
  const { colors } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const styles = StyleSheet.create({
    timerContainer: {
      flex: 1,
      paddingVertical: 8,
    },
    timerText: {
      color: colors.primary,
      fontSize: 20,
      textAlign: "center",
    },
  });

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>{`${formatTime(seconds)}`}</Text>
    </View>
  );
};

export default TimerComponent;
