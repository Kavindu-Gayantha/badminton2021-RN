import * as React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import { globalStyles } from "../styles/globalStyles";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import PlayerProfileComponent from "../components/PlayerProfileComponent";

const MyProfileScreen = (props) => {
  const [editPlayerModalOpen, setEditPlayerModalOpen] = useState(false);
  const { navigation } = props;

  const userToken =
    props.route.params.userToken !== null && props.route.params.userToken;
  console.log("token my profile ", userToken);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserDataWithEmail(userToken.email);
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

  return (
    <View style={globalStyles.container}>
      <HeaderComponent title="My Profile" navigation={navigation} />

      <PlayerProfileComponent
        userToken={userToken}
        navigation={navigation}
        userData={userData}
        setUserData={setUserData}
      />
    </View>
  );
};
export default MyProfileScreen;

const styles = StyleSheet.create({
  profilePicContainer: {
    flex: 1 / 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 5,
    alignSelf: "center",
    backgroundColor: "white",
    margin: 5,
    borderRadius: 10,
    width: "95%",
  },
  proImg: {
    justifyContent: "center",
    width: 60,
    height: 60,
  },
  title: {
    justifyContent: "center",
    padding: 10,
    paddingBottom: 1,
    color: "green",
    fontSize: 28,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 15,
    paddingLeft: 10,
  },
  iconStyle: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconWrap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 8,
    margin: 8,
  },
});
