import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Dialog,
  FAB,
  IconButton,
  Portal,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Appbar } from "react-native-paper";

import React, { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { Statistic } from "../../types";
import useStatistic from "../hooks/stores/useStatistic";
import uuid from "react-native-uuid";
import { supabase } from "../../supabase/supabase";
import useSession from "../hooks/stores/useSession";

export default function StatisticsScreen() {
  const [statisticName, setStatisticName] = useState("");
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const { session } = useSession();
  const { setActiveStatisticId, addStatistic } = useStatistic();

  const handleCreateWorkout = async () => {
    if (session) {
      const newStatistic = {
        id: uuid.v4() as string,
        user_id: session?.user.id,
        name: statisticName,
      };
      console.log("Adding workout:", newStatistic);
      addStatistic(newStatistic);
      setActiveStatisticId(newStatistic.id);

      const { data, error: supabaseError } = await supabase
        .from("statistics")
        .insert(newStatistic)
        .select()
        .single();

      if (supabaseError) {
        console.log(supabaseError.message);
        return;
      }
      if (data) {
        console.log("Added workout:", data);
      }
    }
    hideDialog();
    setStatisticName("");
  };

  const styles = StyleSheet.create({
    screen: { backgroundColor: colors.background, minHeight: "100%" },
    card: { marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 5 },
    cardTitle: { fontSize: 20 },
    //button
    fab: {
      bottom: 0,
      margin: 16,
      position: "absolute",
      right: 0,
    },
    //dialog
    dialogContainer: {
      paddingHorizontal: 5,
    },
    buttonText: {
      //TODO: check later
      color: "rgb(255, 255, 255)",
    },
    dialogContent: {
      gap: 20,
    },
    inputText: {
      textDecorationLine: "none",
    },
    outline: {
      borderRadius: 4,
    },
    listPadding: {
      paddingVertical: 69,
    },
    // container: { flex: 1 },
  });
  const { statistics } = useStatistic();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const defaultItems = () => (
    <>
      <Card style={styles.card}>
        <Card.Title
          title="Weight"
          titleStyle={styles.cardTitle}
          titleVariant="titleLarge"
          subtitle="Current: 81kg"
          left={(props) => <Avatar.Icon {...props} icon="scale-bathroom" />}
          right={(props) => (
            <IconButton
              {...props}
              icon="chevron-right"
              size={30}
              onPress={() => {}}
            />
          )}
        />
      </Card>
      <Card style={styles.card}>
        <Card.Title
          title="Body fat"
          titleStyle={styles.cardTitle}
          subtitle="Current: 30%"
          left={(props) => <Avatar.Icon {...props} icon="water-percent" />}
          right={(props) => (
            <IconButton
              {...props}
              icon="chevron-right"
              size={30}
              onPress={() => {}}
            />
          )}
        />
      </Card>
      <Card style={styles.card}>
        <Card.Title
          title="Belly waist"
          titleStyle={styles.cardTitle}
          subtitle="Current: 105cm"
          left={(props) => <Avatar.Icon {...props} icon="ruler" />}
          right={(props) => (
            <IconButton
              {...props}
              icon="chevron-right"
              size={30}
              onPress={() => {}}
            />
          )}
        />
      </Card>
    </>
  );
  const customItem = ({ item }: { item: Statistic }) => (
    <Card style={styles.card}>
      <Card.Title
        title={`${item.name}`}
        titleVariant="titleLarge"
        subtitle="CurrentDate: Value unit"
        left={(props) => <Avatar.Icon {...props} icon="text-box-outline" />}
        right={(props) => (
          <IconButton
            {...props}
            icon="chevron-right"
            size={35}
            onPress={() => {}}
          />
        )}
      />
    </Card>
  );

  const listFooter = () => <View style={styles.listPadding} />;

  return (
    <View style={styles.screen}>
      <Appbar.Header>
        <Appbar.Content title="Statistics" />
      </Appbar.Header>
      <FlashList
        data={statistics}
        ListHeaderComponent={defaultItems}
        renderItem={customItem}
        keyExtractor={(item) => item.id}
        estimatedItemSize={18}
        ListFooterComponent={listFooter}
      />
      {/*TODO:optimalize*/}
      <FAB icon="plus" style={styles.fab} onPress={showDialog} />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => {
            setStatisticName("");
            hideDialog();
          }}
          style={styles.dialogContainer}
        >
          {/*//TODO: nie dizała*/}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 0} // Adjust the offset based on your UI
            // style={styles.container}
          >
            <Dialog.Title>
              <Text variant="titleLarge">Create measurement</Text>
            </Dialog.Title>
            <Dialog.Content style={styles.dialogContent}>
              <TextInput
                style={styles.inputText}
                outlineStyle={styles.outline}
                value={statisticName}
                label="Measurement name"
                autoFocus
                onChangeText={(statistictName) =>
                  setStatisticName(statistictName)
                }
                mode="outlined"
              />
              {/*dziwne*/}
              <Button
                mode="contained"
                onPress={handleCreateWorkout}
                disabled={statisticName.length < 1}
              >
                <Text style={styles.buttonText}>Save</Text>
              </Button>
            </Dialog.Content>
          </KeyboardAvoidingView>
        </Dialog>
      </Portal>
    </View>
  );
}
