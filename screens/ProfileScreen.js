import * as React from "react";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import { globalStyles } from "../styles/globalStyles";
import { profileImgs } from "../styles/globalStyles";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import { Avatar, Icon } from "react-native-elements";
import PlayerProfileComponent from "../components/PlayerProfileComponent";

const MyProfileScreen = (props) => {
  const { navigation } = props;
  console.log("props my  profile: ", props.props);
  const userToken =
    props.route.params.userToken !== null && props.route.params.userToken;
  console.log("token my profile ", userToken);
  const [userData, setUserData] = useState(null);

  // make an API for get my reg details API for logged in user

  // const userProfile =
  //   props.route.params.userData !== null && props.route.params.userData;

  // "email": "admin@gmail.com",
  // "firstName": "admin",
  // "gender": "male",
  // "userType": "Admin",

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      getUserDataWithEmail(userToken.email);
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
      setUserData(request.data.data);
      console.log("user Reg Data:  ", request.data.data);
      // return request.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <HeaderComponent title="My Profile" navigation={navigation} />
      {/* <View style={styles.profilePicContainer}>
        <Avatar
          rounded
          size="large"
          source={
            userToken != null && userToken.gender == "male"
              ? profileImgs.male
              : profileImgs.female
          }
        /> */}
        {/* <View>
          <Text style={styles.title}>
            Hi{" "}
            {userToken !== null
              ? userToken.firstName
              : userProfile !== null && userProfile.name}
            {/* <View><Text style={{fontSize: 15}}>{userToken != null && userToken.email}</Text></View> */}
          {/* </Text> */} 
          {/* <Text style={styles.subTitle}>
            {userToken != null && userToken.email} */}
          {/* </Text>
        </View> */}
        {/* <View style={styles.iconWrap}>
          <Icon
            iconStyle={styles.iconStyle}
            name="edit"
            type="material"
            color="green"
            onPress={null}
            
          />
          <Icon
            iconStyle={styles.iconStyle}
            name="delete"
            type="material"
            color="red"
            onPress={null}
          />
        </View> */}
      {/* </View> */}
      <PlayerProfileComponent userData={userData} />
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
    alignSelf: 'center',
    backgroundColor: "white",
    margin: 5,
    borderRadius: 10,
    width: "95%",
    // borderColor: 'red',
  },
  proImg: {
    // flex: 1/5,
    justifyContent: "center",
    width: 60,
    height: 60,
    // margin: "5%",
  },
  title: {
    justifyContent: "center",
    // flex: 1,
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
    // flex: 1/2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconWrap: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "red",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 8,
    margin: 8,
  },
});
