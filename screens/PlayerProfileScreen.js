import * as React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import { globalStyles } from "../styles/globalStyles";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import PlayerProfileComponent from "../components/PlayerProfileComponent";

const PlayerProfileScreen = (props) => {
  const [userData, setUserData] = useState(null);
  const { navigation } = props;

  const userProfile =
    props.route.params.userData !== null && props.route.params.userData;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserDataWithEmail(userProfile.email);
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
      <HeaderComponent title="User Profile" navigation={navigation} />

      <PlayerProfileComponent userData={userData} />
    </View>
  );
};
export default PlayerProfileScreen;

const styles = StyleSheet.create({
  profilePicContainer: {
    justifyContent: "center",
  },
  proImg: {
    justifyContent: "center",
    width: 60,
    height: 60,
    padding: 4,
  },
  avatarWrap: {
    alignItems: "center",
    padding: 15,
  },
});
