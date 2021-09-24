import * as React from "react";
import { useState, useEffect } from "react";
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
import { Gender, UniversitiesList } from "../lib/constants";
import { RadioGroup } from "react-native-ui-lib";
import { RadioButton } from "react-native-ui-lib";

const RegisterScreen = ({ navigation }) => {
  const image = require("../assets/welcomescreen.jpg");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  // const [university, setUniversity] = useState(null);
  const [gender, setGender] = useState("Male");
  const [pwd, setPwd] = useState("");
  const [uniDropDown, setUniDropDown] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      // const userToken = getTokenMethod();
      setUniDropDown(false);
      // console.log("Token in boys: ", userToken);
    });
    return unsubscribe;
  }, [navigation]);

  const onPressRegister = () => {
    console.log("register");
  };

  const genderHandleChange = (genderType) => {
    console.log("gender", genderType);
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
              backfaceVisibility: 0,
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
              value="Male"
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
              value="Female"
              label="Female"
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

          {/* <TextInput
            placeholder="University"
            // onChangeText={genderHandleChange}
            value={university}
            style={styles.inputBox}
            keyboardType="default"
            onResponderStart={() => setUniDropDown(true)}
          /> */}
          {/* {uniDropDown &&
            UniversitiesList &&
            UniversitiesList.map((array) => {
              return (
                <View style={styles.dropDown} key={array.key}>
                  <Text onPress={(e) => uniHandleChange(array)}>
                    {array.value}
                  </Text>
                </View>
              );
            })} */}
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
    justifyContent: "center",
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
    // flex: 1/2,
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
