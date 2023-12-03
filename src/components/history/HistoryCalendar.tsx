import React from "react";
import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
} from "react-native-calendars";
import { StyleSheet, View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import { format } from "date-fns";

const HistoryCalendar = () => {
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
    {
      title: "2023-12-02",
      data: [
        {
          date: "2023-12-02T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-03",
      data: [
        {
          date: "2023-12-03T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-04",
      data: [
        {
          date: "2023-12-04T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-05",
      data: [
        {
          date: "2023-12-05T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-06",
      data: [
        {
          date: "2023-12-06T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-07",
      data: [
        {
          date: "2023-12-07T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-08",
      data: [
        {
          date: "2023-12-08T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-09",
      data: [
        {
          date: "2023-12-09T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-10",
      data: [
        {
          date: "2023-12-10T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-11",
      data: [
        {
          date: "2023-12-11T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-12",
      data: [
        {
          date: "2023-12-12T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-13",
      data: [
        {
          date: "2023-12-13T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-14",
      data: [
        {
          date: "2023-12-14T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-15",
      data: [
        {
          date: "2023-12-15T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-16",
      data: [
        {
          date: "2023-12-16T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-17",
      data: [
        {
          date: "2023-12-17T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-18",
      data: [
        {
          date: "2023-12-18T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-19",
      data: [
        {
          date: "2023-12-19T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-20",
      data: [
        {
          date: "2023-12-20T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-21",
      data: [
        {
          date: "2023-12-21T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-22",
      data: [
        {
          date: "2023-12-22T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-23",
      data: [
        {
          date: "2023-12-23T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-24",
      data: [
        {
          date: "2023-12-24T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-25",
      data: [
        {
          date: "2023-12-25T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-26",
      data: [
        {
          date: "2023-12-26T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-27",
      data: [
        {
          date: "2023-12-27T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-28",
      data: [
        {
          date: "2023-12-28T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-29",
      data: [
        {
          date: "2023-12-29T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-30",
      data: [
        {
          date: "2023-12-30T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2023-12-31",
      data: [
        {
          date: "2023-12-31T06:00:00.000Z",
        },
      ],
    },
  ];

  //TODO przykładowe, raczej do poprawy jak juz beda dane z bazy
  const generateMarkedDates = () => {
    const marked = {};

    data.forEach((item) => {
      // Assuming each 'title' is a date string in 'yyyy-MM-dd' format
      const date = item.title;
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

  const renderItem = (item) => {
    const index = format(new Date(item.item.date), "HH:mm");
    // const index = format(new Date(item.item.date), "dd-MM-yyyy");
    return (
      <View>
        <View key={index} style={styles.itemsWrapper}>
          <View style={styles.textWrapper}>
            <Text variant="bodySmall" style={styles.hourText}>
              {index}
            </Text>
            <Text variant="titleMedium">Trening A</Text>
          </View>
          <Button>Info</Button>
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
        // theme={useTheme()} //dostosowć
      />
      <AgendaList
        sections={data}
        renderItem={renderItem}
        // doesn't work with dots, need to handle it differently
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
    // alignItems: "center",
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
