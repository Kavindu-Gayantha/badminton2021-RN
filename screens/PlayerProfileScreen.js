import * as React from "react";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import { globalStyles } from "../styles/globalStyles";
import { profileImgs } from "../styles/globalStyles";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import MyProfileComponent from "../components/PlayerProfileComponent";
import PlayerProfileComponent from "../components/PlayerProfileComponent";
import { Avatar } from "react-native-elements";

const PlayerProfileScreen = (props) => {
  const [userData, setUserData] = useState(null);
  const { navigation } = props;
  console.log("props  profile: ", props);
  const userProfile =
    props.route.params.userData !== null && props.route.params.userData;
  // console.log("user profole: ", userProfile);
  // make an API for get user data by user id ,
  // "active": true,
  // "deleted": false,
  // "email": "s@gmail.com",
  // "firstName": "kavindu",
  // "gender": "male",
  // "id": null,
  // "lastName": "Ari",
  // "password": null,
  // "university": null,
  // "universityName": "University of Kelaniya",
  // "userType": "Admin not",

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      getUserDataWithEmail(userProfile.email);
    });
    return unsubscribe;
  }, [navigation]);

  const getUserDataWithEmail = async (email) => {
    //  setUpdateGirs();
    //  console.log("girls tab");
    try {
      const request = await axios.get(
        `${BASE_URL}/players/regDataByEmail/${email}`
      );
      // console.log("players get:", typeof(request.data.data));
      // setgirls(request.data.data);
      setUserData(request.data.data);
      console.log("user Reg Data:  ", request.data.data);
      // return request.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <HeaderComponent title="User Profile" navigation={navigation} />
      {/* <View style={styles.profilePicContainer}>
        <Image source={profileImgs.male} style={styles.proImg} />
      </View> */}

      <PlayerProfileComponent userData={userData} />
    </View>
  );
};
export default PlayerProfileScreen;

const styles = StyleSheet.create({
  profilePicContainer: {
    // flex: 1/2,
    // flexDirection: 'row',
    justifyContent: "center",
    // width: 10,
  },
  proImg: {
    // flex: 1/2,
    justifyContent: "center",
    width: 60,
    height: 60,
    padding: 4,
  },
  avatarWrap: {
    alignItems: "center",
    padding: 15,
    // width: 50,
  },
});
