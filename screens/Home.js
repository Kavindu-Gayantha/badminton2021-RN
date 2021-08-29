import * as React from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles } from '../styles/globalStyles';


const HomeScreen = ({navigation}) => {
    const userName = "Kavindu"
    const loginUserType = "Admin";
    // const loginUserType = "User";

    function press() {
  var count = 0;
  console.log(`Presssed ${++count}`);
}
const goNextPage = () => {
    navigation.navigate("Players");
  };
    return(
         <View style={styles.container}>
      <Text style={styles.title}>Hi {userName}</Text>
      <View
        style={styles.separator}
      />
      <View style={styles.buttonGroup}>
        {loginUserType === "Admin" &&
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={press}>
            Practice Days
          </Text>
        </TouchableOpacity>}
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={goNextPage}>
            Players
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={press}>
            SMS
          </Text>
        </TouchableOpacity>
        {loginUserType === "Admin" &&
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={press}>
            Videos
          </Text>
        </TouchableOpacity> }
      </View>

      {/* <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
    </View>
    );
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    top: 0,
    display: "flex",
    alignContent: "flex-start",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    alignContent: "flex-start",
    flexDirection: "row",
    width: "90%",
    height: 80,
    // marginTop: 1,
    padding: 1,
  },

  buttonContainer: {
    flex: 1,
    backgroundColor: "#134717",
    marginRight: 1,
    // height: 80,
    padding: 5,
    alignItems: "center",
    // marginBottom: 40,
  },
  buttonText: {
    width: "80%",
    height: "100%",
    textAlignVertical: "center",
    textAlign: "center",
    margin: 0,
    color: "white",
    fontWeight: "bold",
  },
});

