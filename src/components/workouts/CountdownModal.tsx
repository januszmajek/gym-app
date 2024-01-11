import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import {
  Text,
  ProgressBar,
  useTheme,
  Snackbar,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Vibration } from "react-native";
import Sound from "react-native-sound";
import useSettings from "../../hooks/stores/useSettings";
interface CountdownModalProps {
  visible: boolean;
  onClose: () => void;
  duration: number;
  id: string;
}

const CountdownModal: React.FC<CountdownModalProps> = ({
  visible,
  onClose,
  duration,
  id,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(duration);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const { vibrate } = useSettings();
  const { colors } = useTheme();

  const soundRef = useRef<Sound | null>(null);

  useEffect(() => {
    soundRef.current = new Sound(
      "countdown_toyota.mp3",
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.error("Error loading sound file:", error);
        }
        console.log(
          "duration in seconds: " +
            soundRef.current?.getDuration() +
            " number of channels: " +
            soundRef.current?.getNumberOfChannels(),
        );
      },
    );
  }, []);

  useEffect(() => {
    // Component Mount logic

    // Clean up function to be executed when the component is unmounted
    return () => {
      // Play the sound and vibrate when the component is unmounted
      if (vibrate) Vibration.vibrate([500, 500]);
      soundRef.current?.play((success) => {
        if (success) {
          console.log("Sound played successfully");
        } else {
          console.error("Error playing sound");
        }
      });
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (visible && secondsRemaining >= 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
      setProgress(secondsRemaining / duration);
    }

    return () => clearInterval(timer);
  }, [visible, id, secondsRemaining]);

  useEffect(() => {
    if (visible) {
      setSecondsRemaining(duration);
    }
  }, [visible, id, duration]);

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
