import React, { useEffect, useState } from "react";
import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
} from "react-native-calendars";
import { StyleSheet, View } from "react-native";
import { Button, Divider, Text, useTheme } from "react-native-paper";
import { format, parseISO } from "date-fns";
import useTraining from "../../hooks/stores/useTraining";
import { Training } from "../../../types";
import useHistory from "../../hooks/stores/useHistory";
import useThemeStore from "../../hooks/stores/useThemeStore";

const HistoryCalendar = () => {
  const { trainings, getTrainingById } = useTraining();
  const { setActiveTraining, setActiveTrainingHistoryId } = useHistory();
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const { value: themeType } = useThemeStore();
  const [themeId, setThemeId] = useState(
    themeType === "Light" ? "light" : "dark",
  );
  const { colors } = useTheme();

  const transformTrainings = (trainings: Training[]) => {
    const transformedData = trainings.map((training) => {
      const title = format(
        parseISO(training.date_start.toString()),
        "yyyy-MM-dd",
      );
      return {
        title,
        data: [{ ...training }],
      };
    });

    const groupedData = transformedData.reduce((acc, section) => {
      const existingSection = acc.find((item) => item.title === section.title);
      if (existingSection) {
        existingSection.data.push(...section.data);
      } else {
        acc.push(section);
      }
      return acc;
    }, []);

    return groupedData;
  };

  useEffect(() => {
    setThemeId(themeType === "Light" ? "light" : "dark");
  }, [themeType, colors]);

  const generateMarkedDates = () => {
    const marked = {};

    trainings.forEach((item) => {
      const date = format(parseISO(item.date_start.toString()), "yyyy-MM-dd");
      let color = "blue";
      if (date === todayDate) {
        color = colors.secondary;
      }
      marked[date] = { marked: true, dotColor: color };
    });

    return marked;
  };

  const markedDates = generateMarkedDates();
  const transformedTrainings = transformTrainings(trainings);

  const handleInfoPress = (id) => {
    setActiveTrainingHistoryId(id);
    setActiveTraining(getTrainingById(id));
  };

  const renderItem = (item) => {
    const start_time = format(new Date(item.item.date_start), "HH:mm");
    return (
      <View>
        <View style={styles.itemsWrapper}>
          <View style={styles.textWrapper}>
            <Text variant="bodySmall" style={styles.hourText}>
              {start_time}
            </Text>
            <Text variant="titleMedium">{item.item.name}</Text>
          </View>
          <Button onPress={() => handleInfoPress(item.item.id)}>
            <Text>Info</Text>
          </Button>
        </View>
        <Divider />
      </View>
    );
  };

  return (
    <CalendarProvider date={todayDate}>
      <View key={themeId}>
        <ExpandableCalendar
          firstDay={1}
          closeOnDayPress={false}
          markedDates={markedDates}
          theme={{
            backgroundColor: colors.background,
            calendarBackground: colors.background,
            textSectionTitleColor: colors.onBackground,
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: colors.primaryContainer,
            todayTextColor: colors.onBackground,
            todayBackgroundColor: colors.primaryContainer,
            dayTextColor: colors.onPrimaryContainer,
            dotColor: colors.primary,
            selectedDotColor: colors.onBackground,
            monthTextColor: colors.onBackground,
          }}
          extraData={colors}
        />
        <AgendaList
          sections={transformedTrainings}
          renderItem={renderItem}
          avoidDateUpdates={true}
          theme={{ calendarBackground: colors.background }}
        />
      </View>
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  hourText: { alignSelf: "center", width: 35 },
  itemsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 30,
    paddingVertical: 8,
  },
  textWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});

export default HistoryCalendar;
