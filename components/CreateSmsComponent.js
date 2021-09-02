import React from "react";
import { View, Text, TextInput, StyleSheet, Card } from "react-native";
import { useState } from "react";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";
import { Formik } from "formik";

const CreateSmsComponent = () => {
  const [msg, setMsg] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [showSubmitTxt, setShowSubmitTxt] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const onSubmitSms = () => {
    console.log("sms: ", msg);
    // setMsg("");
  };
  const submitText = (value) => {
    console.log("submit text vlaue: ", value);
  };
  return (
    <View style={styles.createMsgContainer}>
      <Formik
        initialValues={{ msg }}
        onSubmit={(values) => {
          console.log("valalala:  ", values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              placeholder="Enter MSG"
              onChangeText={(value) => setMsg(value)}
              value={msg}
              style={styles.inputBox}
            />

            <Button
              title="SEND"
              buttonStyle={styles.btn}
              onPress={onSubmitSms}
            />
            {showErrors == true ? (
              <Text style={styles.errorMsg}>
                Please provide required data to continue...
              </Text>
            ) : (
              showSubmitTxt == true && (
                <Text style={styles.successMsg}>{responseMessage}</Text>
              )
            )}
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CreateSmsComponent;
const styles = StyleSheet.create({
  inputBox: {
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "green",
    padding: 10,
    margin: 5,
  },
  btn: {
    backgroundColor: "green",
    width: "20%",
    justifyContent: "center",
    alignSelf: "center",
  },
  createMsgContainer: {
    borderBottomColor: "red",
    borderStartWidth: 10,
    borderRadius: 15,
    borderEndWidth: 10,
    padding: 8,
    borderStartColor: "#002000",
    borderEndColor: "#002000",
    margin: 3,
    shadowColor: "red",
    shadowOpacity: 13,
  },
});
