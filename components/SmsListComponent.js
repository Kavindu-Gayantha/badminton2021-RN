import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../styles/globalStyles";
import moment from "moment";
import { CirclesLoader } from "react-native-indicator";

const SmsListComponent = (props) => {
  const smsList = props.data.reverse();

  return (
    <ScrollView style={styles.container}>
      {smsList && smsList.length > 0 ? (
        smsList.map((item) => (
          <Card containerStyle={styles.cardContainer} key={item.id}>
            <Card.Title style={styles.cardTitle}>
              <Text>{moment(item.timestamp).format("LLLL")}</Text>
            </Card.Title>
            <Text style={styles.msg}>{item.msg}</Text>
          </Card>
        ))
      ) : (
        <Card containerStyle={globalStyles.noDataContainer}>
          <Text style={globalStyles.noDataMsg}>NO DATA</Text>
        </Card>
      )}
    </ScrollView>
  );
};

export default SmsListComponent;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#98ee99",
    marginTop: 5,
    flex: 1,
  },
  cardContainer: {
    backgroundColor: "white",
    margin: 0,
  },
  cardTitle: {
    textAlign: "left",
    fontSize: 12,
    color: "grey",
    textShadowColor: "red",
    // paddingBottom: -1,
    marginBottom: 3,
  },
  msg: {
    fontSize: 18,
    paddingTop: 2,
    color: "#000000",
  },
});
