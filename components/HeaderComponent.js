import * as React from "react";
import { Text, Button, View, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";

const HeaderComponent = ({ navigation }) => {
  console.log("props:  ", navigation);
  return (
    <View style={styles.titleGrid}>
      <Button
        onPress={() => navigation.goBack()}
        color="#66bb6a"
        backgroundColor="#000000"
        title="Back"
        style={globalStyles.primaryBtn}
      >
        Back
      </Button>
      <Text style={styles.title}>All Players</Text>
      <Text style={styles.titleRight}>Go Home</Text>
    </View>
  );
};
export default HeaderComponent;

const styles = StyleSheet.create({
  titleGrid: {
    top: 0,
    fontWeight: "bold",
    alignItems: "center",
    // justifyContent: 'center',
    // flex: 3,
    marginTop: 15,
    flexDirection: "row",
    marginBottom: 8,
    padding: 3,
  },
  titleLeft: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "row",
    backgroundColor: "#32A335",
    alignContent: "center",
  },
  title: {
    flex: 3,
    textAlign: "center",
    flexDirection: "row",
  },
  titleRight: {
    flex: 1,
    textAlign: "center",
    flexDirection: "row",
  },
});
