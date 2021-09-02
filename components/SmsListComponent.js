import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../styles/globalStyles";

const SmsListComponent = (props) => {
  console.log("props", props);
  const smsList = props.data.reverse();

  return (
    <ScrollView style={styles.container}>
      {smsList.map((item) => (
        <Card containerStyle={styles.cardContainer} key={item.id}>
          <Card.Title style={styles.cardTitle}>
            <Text>{item.timestamp}</Text>
          </Card.Title>
          <Text style={styles.msg}>{item.msg}</Text>
        </Card>
      ))}
    </ScrollView>
  );
};

export default SmsListComponent;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#98ee99",
    // borderWidth: 1,
    // padding: -51,
    marginTop: 5,
    flex: 1,
  },
  cardContainer: {
    backgroundColor: "white",
    margin: 0,
    // flex: 1,
    // height: '100%'
    // color:'red'
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
