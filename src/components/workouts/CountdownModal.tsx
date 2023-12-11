import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  Text,
  ProgressBar,
  useTheme,
  Snackbar,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface CountdownModalProps {
  visible: boolean;
  onClose: () => void;
  duration: number;
}

const CountdownModal: React.FC<CountdownModalProps> = ({
  visible,
  onClose,
  duration,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(duration);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const { colors } = useTheme();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (visible && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
      setProgress(secondsRemaining / duration);
    }

    return () => clearInterval(timer);
  }, [visible, secondsRemaining]);

  useEffect(() => {
    if (visible) {
      setSecondsRemaining(duration);
    }
  }, [visible, duration]);

  useEffect(() => {
    const m = String(Math.floor(secondsRemaining / 60)).padStart(2, "0");
    const s = String(secondsRemaining % 60).padStart(2, "0");
    setMinutes(m);
    setSeconds(s);
  }, [secondsRemaining]);

  const styles = StyleSheet.create({
    bannerView: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 5,
      width: "100%",
    },
    closeContainer: {
      borderRadius: 5,
      padding: 5,
    },
    modalStyle: {
      backgroundColor: colors.background,
      display: "flex",
      flexDirection: "column",
    },
    progressBarContainer: {
      width: "100%",
    },
  });

  return (
    <Snackbar
      duration={duration * 1000}
      onDismiss={onClose}
      visible={visible}
      style={styles.modalStyle}
    >
      <View style={styles.progressBarContainer}>
        <ProgressBar progress={progress} color={colors.primary} />
      </View>
      <View style={styles.bannerView}>
        <Text variant="displayMedium">
          {minutes}:{seconds}
        </Text>
        <TouchableRipple onPress={onClose} style={styles.closeContainer}>
          <Icon name="close" size={43} color={colors.primary} />
        </TouchableRipple>
      </View>
    </Snackbar>
  );
};
export default CountdownModal;
