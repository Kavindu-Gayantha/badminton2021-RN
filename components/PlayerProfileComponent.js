import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Button, Icon, Avatar } from "react-native-elements";
import { globalStyles } from "../styles/globalStyles";
import { profileImgs } from "../styles/globalStyles";
import { Modal } from "react-native-ui-lib";
import EditProfileComponent from "../components/EditProfileComponent";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";

export default function PlayerProfileComponent(props) {
  console.log("props plauyer profile component: ", props);
  const { userData, userToken, navigation, setUserData } = props;

  const [editPlayerModalOpen, setEditPlayerModalOpen] = useState(false);

  // useEffect(() => {
  //   // const unsubscribe = navigation.addListener("focus", () => {
  //   // do something
  //   getUserDataWithEmail(userData.email);
  //   console.log("use effect get data by email func");
  // }, [editPlayerModalOpen]);

  const getUserDataWithEmail = async (email) => {
    //  setUpdateGirs();
    //  console.log("girls tab");
    try {
      const request = await axios.get(
        `${BASE_URL}/players/regDataByEmail/${email}`
      );
      // console.log("players get:", typeof(request.data.data));
      setUserData(request.data.data);
      console.log("user Reg Data after update plr:  ", request.data.data);
      // return request.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  // "active": true,
  //   "deleted": false,
  //   "email": "s@gmail.com",
  //   "firstName": "kavindu",
  //   "gender": "male",

  //   "id": null,
  //   "lastName": "Ari",
  //   "password": null,
  //   "university": null,
  //   "universityName": "University of Kelaniya",
  //   "userType": "Admin not",
  return (
    <View style={globalStyles.container}>
      <View style={styles.profilePicContainer}>
        <View style={styles.avatarWrap}>
          <Avatar
            rounded
            size="xlarge"
            source={
              userData != null &&
              (userData.gender == "male" || userData.gender == "Male")
                ? profileImgs.male
                : profileImgs.female
            }
          />
        </View>
        <Text style={globalStyles.titleText}>
          {userData !== null && userData.firstName} {""}{" "}
          {userData != null && userData.lastName}
        </Text>
        {userToken != null && (
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              justifyContent: "center",
              width: "80%",
              alignSelf: "center",
            }}
          >
            <View style={styles.buttonWrap}>
              <Button
                buttonStyle={{ backgroundColor: "green" }}
                title="Edit Profile"
                onPress={() => setEditPlayerModalOpen(true)}
              />
            </View>
            <View style={styles.buttonWrap}>
              <Button
                buttonStyle={{ backgroundColor: "red", color: "green" }}
                title="Delete Profile"
                onPress={null}
              />
            </View>
          </View>
        )}

        <Card containerStyle={styles.cardContainer}>
          <Text style={styles.cardTitle}>Email</Text>
          <Text>{userData != null && userData.email}</Text>
          {/* </View> */}
        </Card>
        <Card containerStyle={styles.cardContainer}>
          <Text style={styles.cardTitle}>University</Text>
          <Text>{userData != null && userData.universityName}</Text>
        </Card>
        <Card containerStyle={styles.cardContainer}>
          <Text style={styles.cardTitle}>Gender</Text>
          <Text>{userData != null && userData.gender}</Text>
        </Card>
      </View>

      <Modal
        visible={editPlayerModalOpen}
        overlayBackgroundColor="white"
        useGestureHandlerRootView
        animationType="slide"
        transparent={true}
        // blurView={CreatePlayer}
      >
        <Modal.TopBar
          title="Update Profile"
          onDone={() => setEditPlayerModalOpen(false)}
          onCancel={() => setEditPlayerModalOpen(false)}
          doneLabel="Update"
          doneButtonProps={{
            color: "green",
            borderRadius: 20,
            backgroundColor: "red",
          }}
          // doneIcon="arrow"
        />
        <EditProfileComponent
          userToken={userToken}
          userData={userData}
          getUserDataWithEmail={getUserDataWithEmail}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    paddingLeft: 25,
    height: 80,
    // flex: 1,
    backgroundColor: "white",
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
    margin: 5,
    flexDirection: "column",
    borderRadius: 20,
  },
  cardItem: {
    flex: 1,
    flexDirection: "column",
  },
  cardTitle: {
    fontWeight: "bold",
    color: "grey",
    fontSize: 20,
  },
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
  buttonWrap: {
    // width: "40%",
    alignSelf: "center",
    padding: 5,
    flex: 1,
    color: "green",
    flexDirection: "column",
  },
});
