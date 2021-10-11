import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Formik } from "formik";
// import { yupToFormErrors } from "formik";
import * as yup from "yup";
import { Switch } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import { Gender } from "../lib/constants";
// import { TextInput } from "react-native-gesture-handler";
import ToastComponent from "./ToastComponent";
import { globalStyles } from "../styles/globalStyles";
import { RadioGroup, RadioButton } from "react-native-ui-lib";
import { ToastBackgroundGlobalColors } from "../styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const editFacultyDetailsComponent = ({
  userToken,
  userData,
  getUserDataWithEmail,
}) => {
  const [showPwd, setShowPwd] = useState(false);
  const [showFacultyDropDown, setShowFacultyDropDown] = useState(false);
  const [selectedGender, setSelectedGender] = useState(userData.gender);
  const [selectedFac, setSelectedFac] = useState("");
  const [email, setEmail] = useState(userData.email);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [pwd, setPwd] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [response, setResponseMessage] = useState("");

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBackgroundColor, setToastBackgroundColor] = useState("");

  // const [genderDropDown, setGenderDropDown] = useState(false);
  console.log("lslssls: token edit ", userToken);
  console.log("lslssls: user data ", userData);

  const getAllFacultiesByTokenId = async () => {
    const loginUserUniId = userToken.uniId;
    // setLoading(true);
    try {
      const request = await axios.get(
        `${BASE_URL}/faculty/getAllActive/${loginUserUniId}`
      );
      setFaculties(request.data.data);
      console.log("faculties:  ", faculties);
    } catch (error) {
      console.log(error);
    }
    // setLoading(false);
  };

  useEffect(() => {
    // setCurrentDate(date + "/" + month + "/" + year);
    // const unsubscribe = navigation.addListener("focus", () => {
    // do something
    // getUserDataWithEmail();
    // });
    // return unsubscribe;
    getAllFacultiesByTokenId();
  }, []);

  // const editProfileFormValidation = yup.object({
  //   email: yup.string().required(),
  // });
  // const []

  const onSubmitCreatePlayer = () => {
    const loginUserUniId = userToken.uniId;
    const updatePlayerObj = {
      id: userData.id != null ? userData.id : userToken.regId,
      email: email,
      firstName: firstName,
      lastName: lastName,

      gender: selectedGender,
    };
    console.log("submit", updatePlayerObj);
    editPlayerApiMethod(updatePlayerObj);
  };

  const editPlayerApiMethod = async (body) => {
    const loginUserUniId = userToken.uniId;
    try {
      const request = await axios.post(
        `${BASE_URL}/profile/editMyProfile`,
        body
      );
      // setShowSubmitTxt(true);
      setResponseMessage(request.data.statusMessage);
      setToastBackgroundColor(
        request.data.status
          ? ToastBackgroundGlobalColors.success
          : ToastBackgroundGlobalColors.fail
      );
      setToastMessage(request.data.statusMessage);
      setToastVisible(true);
      getUserDataWithEmail(request.data.data.email);
      // setToas
      console.log("request response", request.data.statusMessage);
      getAndSetTokenMethod(
        request.data.data.email,
        request.data.data.firstName
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getAndSetTokenMethod = async (newEmail, newFname) => {
    try {
      const userToken = await AsyncStorage.getItem("loginToken");
      // setUserToken(JSON.parse(userToken));
      const existingToken = JSON.parse(userToken);
      console.log("token update profile screen: ", userToken);
      const updatedToken = {
        email: newEmail != null ? newEmail : existingToken.email,
        firstName: newFname != null ? newFname : existingToken.firstName,
        gender: existingToken.gender,
        regId: existingToken.regId,
        uniId: existingToken.uniId,
        userType: existingToken.userType,
      };
      setTokenMethod(updatedToken);
      return JSON.parse(userToken);
    } catch (error) {
      console.log(error);
    }
  };

  const setTokenMethod = async (token) => {
    try {
      await AsyncStorage.setItem("loginToken", JSON.stringify(token));
      console.log("updated token update profile screen: ", token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        // validationSchema={editProfileFormValidation}
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          gender: "",
        }}
        onSubmit={(values) => {
          console.log("valalala:  ", values);
        }}
      >
        {(props) => (
          <View>
            <Text style={{ marginTop: 4, marginBottom: 1, paddingBottom: 1 }}>
              Email
            </Text>
            <TextInput
              placeholder="Email"
              onChangeText={(value) => setEmail(value)}
              value={email}
              keyboardType="email-address"
              style={styles.inputBox}
            />
            <Text style={{ marginTop: 4, marginBottom: 1, paddingBottom: 1 }}>
              First Name
            </Text>
            <TextInput
              placeholder="First Name"
              onChangeText={(value) => setFirstName(value)}
              value={firstName}
              style={styles.inputBox}
            />
            <Text style={{ marginTop: 4, marginBottom: 1, paddingBottom: 1 }}>
              Last Name
            </Text>
            <TextInput
              placeholder="Last Name"
              onChangeText={(value) => setLastName(value)}
              value={lastName}
              style={styles.inputBox}
            />
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "baseline",
                padding: 10,
                backgroundColor: "gray",
                marginTop: 5,
              }}
            > */}
            {/* <View style={{ flexDirection: "column" }}>
                <Text style={{ padding: 5 }}>Want to reset the password?</Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Switch
                  // backgroundColor="white"
                  color="green"
                  onValueChange={() => setShowPwd(true)}
                  value={showPwd}
                  // onChange={() => onChangeSwitch(item)}
                />
              </View> */}
            {/* </View> */}

            {/* {showPwd && (
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(value) => setPwd(value)}
                value={pwd}
                style={styles.inputBox}
              />
            )} */}

            <DropDownPicker
              open={showFacultyDropDown}
              value={selectedFac}
              items={faculties}
              style={styles.inputBox}
              listMode="FLATLIST"
              flatListProps={{
                initialNumToRender: 3,
              }}
              scrollViewProps={{
                decelerationRate: "fast",
              }}
              dropDownDirection="TOP"
              // zIndex={12}
              // bottomOffset={3}
              itemSeparator={true}
              selectedItemLabelStyle={{
                color: "green",
                fontWeight: "bold",
                // backgroundColor: "black",
              }}
              // mode="SIMPLE"
              closeAfterSelecting={true}
              schema={{
                label: "faculty",
                value: "faculty",
              }}
              setOpen={() => setShowFacultyDropDown(true)}
              setValue={(e, index) => setSelectedFac(e)}
              onPress={() => setShowFacultyDropDown(!showFacultyDropDown)}
              mode="BADGE"
              showBadgeDot={true}
              placeholder="Select Faculty"
              placeholderStyle={{
                color: "green",
                fontWeight: "bold",
              }}
              onChangeValue={(value) => {
                setSelectedFac(value);
                // console.log("vlaue", selectedUni);
                setShowFacultyDropDown(false);
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                // alignItems: "baseline",
                padding: 5,
                backgroundColor: "gray",
                marginTop: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  margin: 5,
                }}
              >
                <Text
                  style={{
                    padding: 5,
                    justifyContent: "center",
                  }}
                >
                  Gender
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  margin: 5,
                }}
              >
                <RadioGroup
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 1,
                    padding: 8,
                    // backgroundColor: "green",
                    // backfaceVisibility: 0,
                    // opacity: 0.6,
                  }}
                  initialValue={selectedGender}
                  onValueChange={(value) => setSelectedGender(value)}
                >
                  <RadioButton
                    color="white"
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignContent: "space-between",
                      padding: 5,
                    }}
                    labelStyle={{
                      color: "white",
                      fontWeight: "bold",
                      marginRight: 5,
                    }}
                    value={Gender[0].value}
                    label={Gender[0].value}
                  />
                  <RadioButton
                    color="white"
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignContent: "space-between",
                      padding: 5,
                    }}
                    labelStyle={{
                      color: "white",
                      fontWeight: "bold",
                      marginRight: 5,
                    }}
                    value={Gender[1].value}
                    label={Gender[1].value}
                  />
                </RadioGroup>
              </View>
            </View>

            <View
              style={{
                margin: 10,
                alignItems: "center",
              }}
            >
              <Button
                color="green"
                title="Update"
                onPress={onSubmitCreatePlayer}
              />
            </View>
            <View
              style={{
                margin: 10,
                alignItems: "center",
              }}
            >
              <ToastComponent
                toastVisible={toastVisible}
                toastMessage={toastMessage}
                toastBackgroundColor={toastBackgroundColor}
                setToastVisible={setToastVisible}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default editFacultyDetailsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 2,
    backgroundColor: "#ddd",
    margin: 8,
    padding: 8,
    height: 200,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    padding: 5,
  },
  inputBox: {
    padding: 5,
    backgroundColor: "white",
    borderRadius: 4,
    marginBottom: 15,
  },
  dropDown: {
    padding: 10,
    color: "grey",
    marginTop: 3,
    backgroundColor: "grey",
    // justifyContent: 'center',
    alignContent: "center",
    // alignSelf: 'center',
    width: "90%",
    // display: 'flex',
    // flex: 12
  },
  errorMsg: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
    textAlign: "center",
  },
  successMsg: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
    textAlign: "center",
  },
});
