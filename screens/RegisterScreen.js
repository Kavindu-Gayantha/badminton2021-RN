import * as React from "react";
import { useState, useEffect } from "react";
import { Text, View, TextInput } from "react-native";
import { globalStyles } from "../styles/globalStyles";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");

  return (
    <View style={globalStyles.container}>
      <TextInput
        placeholder="First Name"
        onChangeText={(value) => setFirstName(value)}
        value={firstName}
        style={styles.inputBox}
      />
      <TextInput
        placeholder="User Type"
        onChangeText={props.handleChange("facultyName")}
        value={selectedFaculty}
        style={styles.inputBox}
        keyboardType="default"
        onResponderStart={() => setFacultyDropDown(true)}
      />
      {facultyDropDown &&
        faculties &&
        faculties.map((value) => {
          return (
            <View style={styles.dropDown} key={value.id}>
              <Text onPress={(e) => selectFaculty(value)}>{value.faculty}</Text>
            </View>
          );
        })}
    </View>
  );
};
export default RegisterScreen;
