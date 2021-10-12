import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";

const HomeScreen = ({ navigation }) => {
  const [userType, setUserType] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const userName = userToken && userToken.firstName;

  const homeImage = require("./../assets/badminton.jpg");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const userToken = getTokenMethod();

      console.log("Token in hometabs: ", userToken);
    });
    return unsubscribe;
  }, [navigation]);

  const getUserDataWithEmail = async (email) => {
    try {
      const request = await axios.get(
        `${BASE_URL}/players/regDataByEmail/${email}`
      );

      setUserData(request.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTokenMethod = async () => {
    try {
      const userToken = await AsyncStorage.getItem("loginToken");
      setUserToken(JSON.parse(userToken));
      console.log("token Home screen: ", userToken);
      return JSON.parse(userToken);
    } catch (error) {
      console.log(error);
    }
  };

  function press() {
    var count = 0;
    console.log(`Presssed ${++count}`);
  }
  const goNextPage = (routeLink) => {
    navigation.navigate(routeLink, { userToken: userToken });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi {userName}</Text>
      <View style={styles.separator} />

      <View
        style={{
          width: "90%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",

            justifyContent: "space-evenly",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-evenly",
              margin: 1,
            }}
          >
            <Button
              iconPosition="top"
              buttonStyle={{ backgroundColor: "green" }}
              onPress={() => goNextPage("SchedulePractice")}
              icon={() => (
                <Icon name="perm-contact-calendar" size={25} color="white" />
              )}
              title="Schedule"
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-evenly",
              margin: 1,
            }}
          >
            <Button
              iconPosition="top"
              iconPosition="top"
              buttonStyle={{ backgroundColor: "green" }}
              onPress={() => goNextPage("Players")}
              icon={() => <Icon name="groups" size={25} color="white" />}
              title="Players"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",

            justifyContent: "space-evenly",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-evenly",
              margin: 1,
            }}
          >
            <Button
              iconPosition="top"
              iconPosition="top"
              buttonStyle={{ backgroundColor: "green" }}
              onPress={() => goNextPage("Videos")}
              icon={() => <Icon name="assignment" size={25} color="white" />}
              title="Report"
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-evenly",
              margin: 1,
            }}
          >
            <Button
              iconPosition="top"
              iconPosition="top"
              buttonStyle={{ backgroundColor: "green" }}
              onPress={() => goNextPage("Videos")}
              icon={() => (
                <Icon name="ondemand-video" size={25} color="white" />
              )}
              title="Videos"
            />
          </View>
        </View>
      </View>
      {/* </ImageBackground> */}
      {/* <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    top: 0,
    display: "flex",
    alignContent: "flex-start",
  },
  separator: {
    marginVertical: 40,
    height: 5,
    width: "80%",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    alignContent: "flex-start",
    flexDirection: "row",
    width: "90%",
    height: 80,

    padding: 1,
  },

  buttonContainer: {
    flex: 1,
    backgroundColor: "#134717",
    marginRight: 1,
    padding: 5,
    alignItems: "center",
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
