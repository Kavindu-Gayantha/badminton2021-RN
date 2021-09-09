import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import { globalStyles } from "../styles/globalStyles";
import { profileImgs } from "../styles/globalStyles";

const ProfileScreen = ({ navigation, route }) => {
  const { userToken } = route.params;
  console.log("props  profile: ", userToken);

  // "email": "admin@gmail.com",
  // "firstName": "admin",
  // "gender": "male",
  // "userType": "Admin",
  return (
    <View style={globalStyles.container}>
      <HeaderComponent title="Profile" navigation={navigation} />
      <View style={styles.profilePicContainer}>
        <Image source={profileImgs.male} style={styles.proImg} />
      </View>
      <View style={styles.profilePicContainer}>
        <Text style={globalStyles.titleText}>Hi {userToken.firstName}</Text>
      </View>
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  profilePicContainer: {
    // flex: 1/2,
    // flexDirection: 'row',
    justifyContent: 'center',
    // width: 10,
  },
  proImg: {
    // flex: 1/2,
    justifyContent: 'center',
    width: 60,
    height: 60,
    padding: 4
  }
});
