import * as React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import { globalStyles } from "../styles/globalStyles";
import { Card, Divider } from "react-native-elements";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const image = require("../assets/welcomescreen.jpg");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const [resStatus, setResStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const onPressLogin = () => {
    const loginSubmitObject = {
      email: email,
      password: password,
    };

    loginFunction(loginSubmitObject).then(() => {
      console.log(" submit finished : ", loginSubmitObject);
    });
  };

  const loginFunction = async (body) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    try {
      const request = await axios.post(`${BASE_URL}/auth/login`, body);

      if (request.data.status == true) {
        // setLoading(false);

        setResStatus(true);
        setTokenMethod(request.data.data);

        navigation.navigate("HomeTabs");
      } else {
        setTimeout(() => {
          setLoading(false);
          alert(`Oops: ${request.data.statusMessage}`);
        }, 1000);
      }

      console.log("request response", request.data.statusMessage);
    } catch (error) {
      alert("Oops!", error);
    }
  };

  const setTokenMethod = async (token) => {
    try {
      await AsyncStorage.setItem("loginToken", JSON.stringify(token));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Card containerStyle={styles.cardContainer}>
          <Card.Title>
            <Text style={styles.title}>Login to Badminton App</Text>
          </Card.Title>
          <Divider orientation="vertical" width={5} />
          <TextInput
            placeholder="Email"
            onChangeText={(value) => setEmail(value)}
            value={email}
            keyboardType="email-address"
            style={styles.inputBox}
          />
          <TextInput
            placeholder="Password"
            onChangeText={(value) => setPassword(value)}
            value={password}
            style={styles.inputBox}
            secureTextEntry={true}
            onResponderStart={() => setShowSubmitBtn(true)}
          />

          <Button
            title="Login"
            buttonStyle={styles.submitButton}
            loading={loading}
            onPress={onPressLogin}
          />

          <View>
            <Text style={{ textAlign: "center" }}>Or</Text>
            <Button
              title="Register"
              buttonStyle={styles.submitButton}
              onPress={() => navigation.navigate("Register")}
            />
          </View>
        </Card>
      </ImageBackground>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 2,
    backgroundColor: "#98ee99",
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
    alignSelf: "center",
  },
  cardContainer: {
    justifyContent: "center",
    opacity: 0.6,
    backgroundColor: "white",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
