import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { globalStyles } from "../styles/globalStyles";
import { Card, Divider } from "react-native-elements";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Gender, UniversitiesList, UserTypes } from "../lib/constants";
import { RadioGroup } from "react-native-ui-lib";
import { RadioButton } from "react-native-ui-lib";
import { ScrollView } from "react-native-gesture-handler";
// import ModalDropdown from "react-native-modal-dropdown";
import DropDownPicker from "react-native-dropdown-picker";
import ToastComponent from "../components/ToastComponent";
import { ToastBackgroundGlobalColors } from "../styles/globalStyles";

const RegisterScreen = ({ navigation }) => {
  const image = require("../assets/welcomescreen.jpg");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState(UserTypes[1].value);
  const [university, setUniversity] = useState(UniversitiesList);
  const [openUniDropDown, setOpenUniDropDown] = useState(false);
  const [selectedUni, setSelectedUni] = useState(0);
  const [gender, setGender] = useState(Gender[0].value);
  const [pwd, setPwd] = useState("");
  const [uniDropDown, setUniDropDown] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBackgroundColor, setToastBackgroundColor] = useState("");

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  // do something
  // const userToken = getTokenMethod();
  // setUniDropDown(false);
  // console.log("Token in boys: ", userToken);
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  const onUniDropDownOpenMethod = () => {
    setUniDropDown(true);
  };

  // const onChangeUniSelectMethod = useCallback((item) => {
  //   //  setUniDropDown(true);
  //   console.log("item: selected: ", selectedUni);
  //   // console.log("")
  // }, []);

  const onPressRegister = () => {
    console.log("register");
    const regObj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender,
      university: selectedUni,
      password: pwd,
      userType: userType,
    };

    console.log("reg obg:", regObj);
    if (regObj != null) {
      registerUserMethod(regObj);
    }
  };

  const registerUserMethod = async (body) => {
    // const loginAdminUniId = userToken.uniId;
    try {
      const request = await axios.post(`${BASE_URL}/auth/register`, body);
      // setShowSubmitTxt(true);
      // setResponseMessage(request.data.statusMessage);
      // props.setPlayers(request.data.data);
      setToastBackgroundColor(
        request.data.status
          ? ToastBackgroundGlobalColors.success
          : ToastBackgroundGlobalColors.fail
      );
      setToastMessage(request.data.statusMessage);
      setToastVisible(true);
      // setToas
      console.log("request response", request.data.statusMessage);
      if (request.data.status) {
        const timer = setTimeout(() => {
          console.log("Hello, World!");
          setToastVisible(false);
          navigation.navigate("Login");
        }, 3000);
        return () => clearTimeout(timer);
        // navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const genderHandleChange = (genderType) => {
    console.log("gender", genderType);
    setGender(genderType);
  };

  const handleUserType = (selectedUserType) => {
    console.log("user type: ", selectedUserType);
    setUserType(selectedUserType);
  };

  const uniHandleChange = (uni) => {
    console.log("uni", uni);
  };

  return (
    // <View style={globalStyles.container}>
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Card containerStyle={styles.cardContainer}>
          <Card.Title>
            <Text style={styles.title}>Register to Badminton App</Text>
          </Card.Title>
          <Divider orientation="vertical" width={5} />
          <RadioGroup
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 1,
              padding: 8,
              backgroundColor: "green",
              // backfaceVisibility: 0,
              // opacity: 0.6,
            }}
            initialValue={gender}
            onValueChange={genderHandleChange}
          >
            <RadioButton
              color="white"
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "space-between",
              }}
              labelStyle={{ color: "white", fontWeight: "bold" }}
              value={"Male"}
              label="Male"
            />
            <RadioButton
              color="white"
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "space-between",
              }}
              labelStyle={{ color: "white", fontWeight: "bold" }}
              value={"Female"}
              label="Female"
            />
          </RadioGroup>
          {/* user type now */}
          <Divider orientation="horizontal" width={6} />
          <RadioGroup
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 1,
              padding: 8,
              backgroundColor: "green",
              // backfaceVisibility: 0,
              // opacity: 0.6,
            }}
            initialValue={userType}
            onValueChange={handleUserType}
          >
            <RadioButton
              color="white"
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "space-between",
              }}
              labelStyle={{ color: "white", fontWeight: "bold" }}
              value={UserTypes[0].value}
              label={UserTypes[0].value}
            />
            <RadioButton
              color="white"
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "space-between",
              }}
              labelStyle={{ color: "white", fontWeight: "bold" }}
              value={UserTypes[1].value}
              label={UserTypes[1].value}
            />
          </RadioGroup>
          <TextInput
            placeholder="First Name"
            onChangeText={(value) => setFirstName(value)}
            value={firstName}
            keyboardType="default"
            style={styles.inputBox}
          />
          <TextInput
            placeholder="Last Name"
            onChangeText={(value) => setLastName(value)}
            value={lastName}
            keyboardType="default"
            style={styles.inputBox}
          />
          <TextInput
            placeholder="Email"
            onChangeText={(value) => setEmail(value)}
            value={email}
            keyboardType="email-address"
            style={styles.inputBox}
          />
          <TextInput
            placeholder="Password"
            onChangeText={(value) => setPwd(value)}
            value={pwd}
            style={styles.inputBox}
            // keyboardType="password"
            secureTextEntry={true}
            // onResponderStart={() => setShowSubmitBtn(true)}
          />
          <DropDownPicker
            open={openUniDropDown}
            value={selectedUni}
            items={university}
            style={styles.inputBox}
            listMode="FLATLIST"
            flatListProps={{
              initialNumToRender: 3,
            }}
            scrollViewProps={{
              decelerationRate: "fast",
            }}
            dropDownDirection="TOP"
            // bottomOffset={3}
            itemSeparator={true}
            selectedItemLabelStyle={{
              color: "green",
              fontWeight: "bold",
              // backgroundColor: "black",
            }}
            // mode="SIMPLE"
            closeAfterSelecting
            schema={{
              label: "value",
              value: "key",
            }}
            setOpen={onUniDropDownOpenMethod}
            setValue={(e, index) => setSelectedUni(e)}
            onPress={() => {
              // console.log("hi");
              setOpenUniDropDown(!openUniDropDown);
            }}
            mode="BADGE"
            showBadgeDot={true}
            placeholder="Select University"
            placeholderStyle={{
              color: "green",
              fontWeight: "bold",
            }}
            onChangeValue={(value) => {
              setSelectedUni(value);
              console.log("vlaue", selectedUni);
              setOpenUniDropDown(false);
            }}
          />

          {/* <TextInput
            placeholder="University"
            // onChangeText={genderHandleChange}
            value={university}
            style={styles.inputBox}
            keyboardType="default"
            onResponderStart={() => setUniDropDown(true)}
          /> */}
          {/* <ScrollView>
            {uniDropDown &&
              UniversitiesList &&
              UniversitiesList.map((array) => {
                return (
                  <View style={styles.dropDown} key={array.key}>
                    <Text onPress={(e) => uniHandleChange(array)}>
                      {array.value}
                    </Text>
                  </View>
                );
              })}
          </ScrollView> */}
          {/* {showSubmitBtn && (
              <Button
                title="Login"
                buttonStyle={styles.submitButton}
                onPress={onPressLogin}
              />
            )} */}

          <View>
            {/* <Text style={{ textAlign: "center" }}>Or</Text> */}
            <Button
              title="Register"
              buttonStyle={styles.submitButton}
              onPress={onPressRegister}
            />
          </View>
        </Card>
      </ImageBackground>
      <ToastComponent
        toastVisible={toastVisible}
        toastMessage={toastMessage}
        toastBackgroundColor={toastBackgroundColor}
        setToastVisible={setToastVisible}
      />
    </View>
    // </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 2,
    backgroundColor: "#98ee99",
    // margin: 15,
    // padding: 10,
    // justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    padding: 5,
    color: "black",
    shadowOpacity: 1,
  },
  inputBox: {
    padding: 5,
    backgroundColor: "#98ee99",
    borderRadius: 4,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "green",
    borderRadius: 28,
    margin: 8,
    width: "50%",
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
    alignSelf: "center",
  },
  cardContainer: {
    justifyContent: "center",
    opacity: 0.6,
    backgroundColor: "white",
    // flex: 1 / 3,
    // width: '100%'
    // marginBottom: 20,
    // margin:20,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  dropDown: {
    padding: 10,
    color: "grey",
    marginTop: 3,
    backgroundColor: "green",
    // justifyContent: 'center',
    alignContent: "center",
    // alignSelf: 'center',
    // width: "90%",
    // display: 'flex',
    // flex: 12
  },
});
