import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import { globalStyles } from "../styles/globalStyles";
import { profileImgs } from "../styles/globalStyles";

const PlayerProfileScreen = (props) => {
  const { navigation } = props;
  console.log("props  profile: ", props);
  const userProfile =
    props.route.params.userData !== null && props.route.params.userData;
  console.log("user profole: ", userProfile);
  // make an API for get user data by user id ,
  // "email": "admin@gmail.com",
  // "firstName": "admin",
  // "gender": "male",
  // "userType": "Admin",
  return (
    <View style={globalStyles.container}>
      <HeaderComponent title="User Profile" navigation={navigation} />
      {/* <View style={styles.profilePicContainer}>
        <Image source={profileImgs.male} style={styles.proImg} />
      </View> */}
      <View style={styles.profilePicContainer}>
        <Text style={globalStyles.titleText}>
          {userProfile !== null && userProfile.name}
        </Text>
      </View>
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
});
