import React from "react";
import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
} from "react-native-calendars";
import { StyleSheet, View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import { format } from "date-fns";
import useTraining from "../../hooks/stores/useTraining";
import { Training } from "../../../types";

const HistoryCalendar = () => {
  const { trainings } = useTraining();
  console.log("TRAININGS:", trainings);
  const todayDate = format(new Date(), "yyyy-MM-dd");
  // testing data
  const data = [
    {
      title: "2023-12-01",
      data: [
        {
          date: "2023-12-01T06:00:00.000Z",
        },
      ],
    },
  ];

  const transformTrainings = (trainings: Training[]) => {
    const transformedData = trainings.map((training) => {
      const title = format(training.date_start, "yyyy-MM-dd");
      return {
        title,
        data: [{ ...training }],
      };
    });

    // Combine sections with the same title
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

  //TODO przykładowe, raczej do poprawy jak juz beda dane z bazy
  const generateMarkedDates = () => {
    const marked = {};

    trainings.forEach((item) => {
      // Assuming each 'date_start\' is a date string in 'yyyy-MM-dd' format
      const date = format(item.date_start, "yyyy-MM-dd");
      let color = "blue";
      if (date === todayDate) {
        color = "green"; // Color for today's date
      }

      // Define the marker for this date
      // Customize as needed
      marked[date] = { marked: true, dotColor: color };
    });

    return marked;
  };

  // const generateMarkedDates = () => {
  //   data.reduce(
  //     (acc, item) => ({
  //       ...acc,
  //       [item.title]: {
  //         marked: true,
  //         dotColor: item.title === todayDate ? "green" : "blue",
  //       },
  //     }),
  //     {},
  //   );
  // };

  const markedDates = generateMarkedDates();
  const transformedTrainings = transformTrainings(trainings);
  console.log(JSON.stringify(transformedTrainings, null, 2));
  console.log(JSON.stringify(data, null, 2));

  const renderItem = (item) => {
    const start_time = format(new Date(item.item.date_start), "HH:mm");
    // const index = format(new Date(item.item.date), "dd-MM-yyyy");
    return (
      <View>
        <View style={styles.itemsWrapper}>
          <View style={styles.textWrapper}>
            <Text variant="bodySmall" style={styles.hourText}>
              {start_time}
            </Text>
            <Text variant="titleMedium">{item.item.name}</Text>
          </View>
          <Button>
            <Text>Info</Text>
          </Button>
        </View>
        <Divider />
      </View>
    );
  };

  return (
    <CalendarProvider date={todayDate}>
      <ExpandableCalendar
        firstDay={1}
        closeOnDayPress={false}
        markedDates={markedDates}
        // theme={useTheme()} //dostosować
      />
      <AgendaList
        sections={transformedTrainings}
        renderItem={renderItem}
        avoidDateUpdates={true}
      />
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
    paddingBottom: 8,
  },
  textWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});

export default HistoryCalendar;
