import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import { Card } from "react-native-ui-lib";
import { Icon, Avatar } from "react-native-elements";
import { globalStyles } from "../styles/globalStyles";
import { profileImgs } from "../styles/globalStyles";
import { Modal } from "react-native-ui-lib";
import EditProfileComponent from "../components/EditProfileComponent";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import { tabKeyColorsGlobal } from "../lib/constants";
import { set } from "react-native-reanimated";
// var ScrollableTabView = require("react-native-scrollable-tab-view");
// import { ScrollableTabView } from "react-native-scrollable-tab-view";

export default function PlayerProfileComponent(props) {
  // var ScrollableTabView = require("react-native-scrollable-tab-view");

  console.log("props plauyer profile component: ", props);
  const { userData, userToken, navigation, setUserData } = props;

  const [editPlayerModalOpen, setEditPlayerModalOpen] = useState(false);

  // tab btns
  const [basicDetailsBtn, setBasicDetailsBtn] = useState(
    tabKeyColorsGlobal.activeColor
  );
  const [attendanceDetailsBtn, setAttendanceDetailsBtn] = useState(
    tabKeyColorsGlobal.nonActiveColor
  );
  const [otherDetailsBtn, setOtherDetailsBtn] = useState(
    tabKeyColorsGlobal.nonActiveColor
  );

  const uokImage = require("../assets/badminton.jpg");
  const uokImage2 = require("../assets/profileWomen.jpg");

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

  const tabViewBtnOnPress = (tabIndex) => {
    console.log("tab index: ", tabIndex);

    switch (tabIndex) {
      case 1:
        {
          setAttendanceDetailsBtn(tabKeyColorsGlobal.nonActiveColor);
          setBasicDetailsBtn(tabKeyColorsGlobal.activeColor);
          setOtherDetailsBtn(tabKeyColorsGlobal.nonActiveColor);
        }
        break;
      case 2:
        {
          setAttendanceDetailsBtn(tabKeyColorsGlobal.activeColor);
          setBasicDetailsBtn(tabKeyColorsGlobal.nonActiveColor);
          setOtherDetailsBtn(tabKeyColorsGlobal.nonActiveColor);
        }
        break;
      case 3:
        {
          setAttendanceDetailsBtn(tabKeyColorsGlobal.nonActiveColor);
          setBasicDetailsBtn(tabKeyColorsGlobal.nonActiveColor);
          setOtherDetailsBtn(tabKeyColorsGlobal.activeColor);
        }
        break;
      default: {
        setAttendanceDetailsBtn(tabKeyColorsGlobal.nonActiveColor);
        setBasicDetailsBtn(tabKeyColorsGlobal.nonActiveColor);
        setOtherDetailsBtn(tabKeyColorsGlobal.activeColor);
      }
    }
  };

  return (
    <View style={globalStyles.container}>
      <View
        style={{
          flexDirection: "row",
          padding: 5,
          flexWrap: "wrap",
          backgroundColor: "white",
          margin: 5,
          elevation: 10,
          borderRadius: 10,
          // shadowColor: "#171717",
          // shadowOffset: { width: -20, height: 4 },
          // shadowOpacity: 0.5,
          // shadowRadius: 50,
          // shadowColor: "red",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            padding: 5,
            justifyContent: "space-between",
            // alignContent: "center",
            // alignItems: "center",
            // flex: 1,
            width: "20%",
          }}
        >
          <Avatar
            rounded
            size="large"
            source={
              userData != null &&
              (userData.gender == "male" || userData.gender == "Male")
                ? profileImgs.male
                : profileImgs.female
            }
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            padding: 5,
            justifyContent: "center",
            alignSelf: "flex-start",
            // alignContent: "center",
            // alignItems: "center",
            width: "70%",
            // backgroundColor: "red",
            // flex: 6,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "green",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {userData !== null && userData.firstName}{" "}
            {userData != null && userData.lastName}
          </Text>
          {userToken != null && (
            <View
              style={{
                marginLeft: 3,
                marginRight: 3,
                flexDirection: "row",
                // justifyContent: "center",
                justifyContent: "space-around",
                // alignContent: "center",
                width: "60%",
                alignSelf: "flex-start",
                // backgroundColor: "blue",
                color: "green",
              }}
            >
              <View style={styles.buttonWrap}>
                {/* <Button
                  buttonStyle={{ backgroundColor: "green" }}
                  title="Edit Profile"
                  onPress={() => setEditPlayerModalOpen(true)}
                /> */}
                <Icon
                  name="edit"
                  color="green"
                  solid
                  onPress={() => setEditPlayerModalOpen(true)}
                />
              </View>
              {/* <View style={styles.buttonWrap}>
                <Button
                  buttonStyle={{ backgroundColor: "green" }}
                  title="Edit Profile"
                  onPress={() => setEditPlayerModalOpen(true)}
                />
                <Icon color="green" name="edit" />
              </View> */}
              <View style={styles.buttonWrap}>
                {/* <Button
                  buttonStyle={{ backgroundColor: "red", color: "green" }}
                  title="Delete Profile"
                  onPress={null}
                /> */}
                <Icon name="delete" solid color="red" />
              </View>
              <View style={styles.buttonWrap}>
                {/* <Button
                  buttonStyle={{ backgroundColor: "red", color: "green" }}
                  title="Delete Profile"
                  onPress={null}
                /> */}
                <Icon name="live-help" solid color="green" />
              </View>
              {userToken &&
                (userToken.userType == "Admin" ||
                  userToken.userType == "admin") && (
                  <View style={styles.buttonWrap}>
                    <Icon name="swap-horizontal-circle" solid color="green" />
                  </View>
                )}
            </View>
            // </View>
          )}
        </View>

        {/* <View style={{flexDirection: 'row', flexWrap: 'wrap'}}> */}

        {/* {userToken != null && (
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              justifyContent: "center",
              width: "80%",
              alignSelf: "center",
              backgroundColor: "red",
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
          // </View>
        )} */}
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
          padding: 0,
        }}
      >
        <View style={styles.tabButtonWrap}>
          <Button
            buttonStyle={{ backgroundColor: "red", color: "blue" }}
            title="Basic Details"
            color={basicDetailsBtn}
            onPress={() => tabViewBtnOnPress(1)}
          />
        </View>
        <View style={styles.tabButtonWrap}>
          <Button
            // buttonStyle={{ backgroundColor: "red", color: "green" }}
            title="Attendance"
            color={attendanceDetailsBtn}
            onPress={() => tabViewBtnOnPress(2)}
          />
        </View>
        <View style={styles.tabButtonWrap}>
          <Button
            // buttonStyle={{ backgroundColor: "red", color: "green" }}
            title="Other"
            color={otherDetailsBtn}
            onPress={() => tabViewBtnOnPress(3)}
          />
        </View>
      </View>

      {basicDetailsBtn == tabKeyColorsGlobal.activeColor && (
        <ScrollView style={styles.tabViewContainer}>
          <View>
            <Card
              elevation={30}
              // enableShadow={false}
              containerStyle={styles.cardContainer}
            >
              <Text style={styles.cardTitle}>Email</Text>
              <Text>{userData != null && userData.email}</Text>
              {/* </View> */}
            </Card>
            <Card elevation={30} containerStyle={styles.cardContainer}>
              <Text style={styles.cardTitle}>First Name</Text>
              <Text>{userData != null && userData.firstName}</Text>
            </Card>
            <Card elevation={30} containerStyle={styles.cardContainer}>
              <Text style={styles.cardTitle}>Last Name</Text>
              <Text>{userData != null && userData.lastName}</Text>
            </Card>
            <Card elevation={30} containerStyle={styles.cardContainer}>
              <Text style={styles.cardTitle}>Gender</Text>
              <Text>{userData != null && userData.gender}</Text>
            </Card>
          </View>
        </ScrollView>
      )}

      {attendanceDetailsBtn == tabKeyColorsGlobal.activeColor && (
        <ScrollView style={styles.tabViewContainer}>
          <View>
            <Text>Attendance</Text>
          </View>
        </ScrollView>
      )}

      {otherDetailsBtn == tabKeyColorsGlobal.activeColor && (
        <ScrollView style={styles.tabViewContainer}>
          {/* <ImageBackground
            source={uokImage}
            resizeMode="cover"
            style={{ justifyContent: "space-evenly", flex: 1 }}
          > */}
          <View>
            <Card
              elevation={30}
              // enableShadow={false}

              containerStyle={styles.cardContainer}
            >
              {/* <Image
                  source={uokImage2}
                  style={{
                    justifyContent: "center",
                    width: 40,
                    flexWrap: "wrap",
                  }}
                /> */}
              <Text style={styles.cardTitle}>University</Text>
              <Text>{userData != null && userData.universityName}</Text>
              {/* </View> */}
            </Card>
            <Card elevation={30} containerStyle={styles.cardContainer}>
              <Text style={styles.cardTitle}>Faculty</Text>
              <Text>
                {userData != null && userData.facultyIdForEditProfile}
              </Text>
            </Card>
            <Card elevation={30} containerStyle={styles.cardContainer}>
              <Text style={styles.cardTitle}>User Type</Text>
              <Text>{userData != null && userData.userType}</Text>
            </Card>
            {/* <Card elevation={30} containerStyle={styles.cardContainer}>
              <Text style={styles.cardTitle}>Gender</Text>
              <Text>{userData != null && userData.gender}</Text>
            </Card> */}
          </View>
          {/* </ImageBackground> */}
        </ScrollView>
      )}
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
    // paddingLeft: 25,
    height: 80,
    // flex: 1,
    backgroundColor: "white",
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
    margin: 5,
    flexDirection: "column",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "red",
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
    // width: "80%",
    alignSelf: "center",
    padding: 5,
    // backgroundColor: "red",
    // flex: 1 / 3,
    color: "green",
    flexDirection: "column",
  },
  tabButtonWrap: {
    padding: 5,
    marginBottom: -4,
    marginHorizontal: -3,
    // borderRadius: 50,
    alignItems: "stretch",
    // backgroundColor: "red",
    flex: 1,
  },
  tabViewContainer: {
    backgroundColor: "white",
    padding: 0,
    flex: 1,
    // marginLeft: 5,
    // marginRight: 5,
    // marginTop: 0,
    // borderTopEndRadius: 50,
    // borderTopLeftRadius: -300,
    // border
  },
});
