import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import {
  Avatar,
  Card,
  Dialog,
  FAB,
  IconButton,
  Portal,
  Text,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { Appbar } from "react-native-paper";

import React, { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { Statistic } from "../../../types";
import useStatistic from "../../hooks/stores/useStatistic";
import uuid from "react-native-uuid";
import { supabase } from "../../../supabase/supabase";
import useSession from "../../hooks/stores/useSession";

export default function StatisticsList() {
  const [statisticName, setStatisticName] = useState("");
  const [statisticUnit, setStatisticUnit] = useState("");
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const { session } = useSession();
  const { setActiveStatisticId, addStatistic } = useStatistic();

  const handleCreateStatistic = async () => {
    if (session) {
      const newStatistic: Statistic = {
        id: uuid.v4() as string,
        name: statisticName,
        icon: "human",
        unit: statisticUnit,
        currentValue: 0,
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
    buttonStyle: {
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: 10,
      color: colors.primaryContainer,
      paddingVertical: 12,
    },
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
      color: colors.primaryContainer,
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
    disabledButtonStyle: {
      backgroundColor: colors.onSurfaceDisabled,
    },
    // container: { flex: 1 },
  });
  const { statistics } = useStatistic();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const showStatistic = (id: string) => {
    console.log("Show Statistic:", id);
    setActiveStatisticId(id);
  };

  const customItem = ({ item }: { item: Statistic }) => (
    <Card style={styles.card}>
      <Card.Title
        title={`${item.name}`}
        titleVariant="titleLarge"
        subtitle={`Current: ${item.currentValue}${item.unit}`}
        left={(props) => <Avatar.Icon {...props} icon={item.icon} />}
        right={(props) => (
          <IconButton
            {...props}
            icon="chevron-right"
            size={35}
            onPress={() => showStatistic(item.id)}
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
            setStatisticUnit("");
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
              <TextInput
                style={styles.inputText}
                outlineStyle={styles.outline}
                value={statisticUnit}
                label="Measurement unit e.g. kg, %"
                onChangeText={(statistictUnit) =>
                  setStatisticUnit(statistictUnit)
                }
                mode="outlined"
              />
              {/*dziwne*/}
              <TouchableRipple
                onPress={handleCreateStatistic}
                disabled={statisticName.length < 1}
                style={[
                  styles.buttonStyle,
                  statisticName.length < 1 && styles.disabledButtonStyle,
                ]}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableRipple>
            </Dialog.Content>
          </KeyboardAvoidingView>
        </Dialog>
      </Portal>
    </View>
  );
}
