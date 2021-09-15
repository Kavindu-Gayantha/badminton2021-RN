import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SpeedDial } from "react-native-elements";
import { globalStyles } from "../styles/globalStyles";

const FabButton = ({ addNewPlayer }) => {
  const [open, setOpen] = useState(false);

  // const setOpen = () => {
  //   // setOpen
  // }

  return (
    // <View style={styles.container}>
    <SpeedDial
      color="#134717"
      size="large"
      style={styles.container}
      isOpen={open}
      icon={{ name: "edit", color: "white" }}
      openIcon={{ name: "close", color: "white" }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
    >
      <SpeedDial.Action
        color="green"
        icon={{ name: "add", color: "#fff" }}
        title="Add Player"
        onPress={() => addNewPlayer()}
      />
      <SpeedDial.Action
        color="green"
        icon={{ name: "person", color: "#fff" }}
        title="Attendance"
        onPress={() => console.log("Delete Something")}
      />
    </SpeedDial>
    // </View>
  );
};

export default FabButton;

const styles = StyleSheet.create({
  container: {
    margin: 1,
    padding: 1,
    // backgroundColor: 'red',
    // flex: 1,
    color: "green",
  },
});
