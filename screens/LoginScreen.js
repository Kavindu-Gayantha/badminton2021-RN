import * as React from "react";
import { useState, useEffect } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { globalStyles } from "../styles/globalStyles";
import { Card, Divider } from "react-native-elements";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);

  const onPressLogin = () => {
    const loginSubmitObject = {
      email: email,
      password: password,
    };
    console.log("submit : ", loginSubmitObject);
    navigation.navigate("HomeTabs");
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title>
          <Text style={globalStyles.titleText}>Login to Badminton App</Text>
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
          // keyboardType="password"
          secureTextEntry={true}
          onResponderStart={() => setShowSubmitBtn(true)}
        />
        {showSubmitBtn && (
          <Button
            title="Login"
            buttonStyle={styles.submitButton}
            onPress={onPressLogin}
          />
        )}

        {showSubmitBtn && (
          <View>
            <Text style={{ textAlign: "center" }}>Or</Text>
            <Button
              title="Register"
              buttonStyle={styles.submitButton}
              onPress={onPressLogin}
            />
          </View>
        )}
      </Card>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 2,
    backgroundColor: "#ddd",
    // margin: 15,
    padding: 10,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    padding: 5,
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
    // alignItems: 'center',
    backgroundColor: "#98ee99",
    flex: 1,
    // width: '100%'
    // marginBottom: 20,
    // margin:20,
  },
});
