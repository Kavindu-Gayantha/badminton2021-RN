import * as React from "react";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import { globalStyles } from "../styles/globalStyles";
import { profileImgs } from "../styles/globalStyles";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";

const MyProfileScreen = (props) => {
  const { navigation } = props;
  console.log("props  profile: ", props);
  const userToken =
    props.route.params.userToken !== null && props.route.params.userToken;
  
  // make an API for get my reg details API for logged in user 


  // const userProfile =
  //   props.route.params.userData !== null && props.route.params.userData;

  // "email": "admin@gmail.com",
  // "firstName": "admin",
  // "gender": "male",
  // "userType": "Admin",

  useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
      // do something
            getUserDataWithEmail(userToken.email);
    });
       return unsubscribe; 
    }, [navigation]);

  const getUserDataWithEmail = async (email) => {

    //  setUpdateGirs();
    //  console.log("girls tab");
     try {
       const request = await axios.get(`${BASE_URL}/players/regDataByEmail/${email}`);
       // console.log("players get:", typeof(request.data.data));
      //  setgirls(request.data.data);
       console.log("user Reg Data:  ", request.data.data);
       // return request.data.data;
     } catch (error) {
       console.log(error);
     }
  }

  return (
    <View style={globalStyles.container}>
      <HeaderComponent title="My Profile" navigation={navigation} />
      <View style={styles.profilePicContainer}>
        <Image source={userToken.gender == "male" ? profileImgs.male: profileImgs.female} style={styles.proImg} />

        <View >
          <Text style={styles.title}>
            Hi{" "}
            {userToken !== null
              ? userToken.firstName
              : userProfile !== null && userProfile.name}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default MyProfileScreen;

const styles = StyleSheet.create({
  profilePicContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    padding: 10,
    height: 10,
    // width: 10,
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
    justifyContent: 'center',
    // flex: 1,
    padding: 10,
    color: 'green',
    fontSize: 25,
    // textAlignVertical: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
    // alignContent: 'center',
  }
});
