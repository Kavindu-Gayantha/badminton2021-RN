import { Formik } from "formik";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  Button,
  StyleSheet,
  Dimensions,
  FlatList,
  TextInput,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import { Gender } from "../lib/constants";
import { Toast, View } from "react-native-ui-lib";
import ToastComponent from "./ToastComponent";
import { ToastBackgroundGlobalColors } from "../styles/globalStyles";

const CreatePlayer = (props) => {
  console.log("set plalala", props);
  const {
    setToastVisible,
    toastVisible,
    toastBackgroundColor,
    toastMessage,
    setToastMessage,
    setToastBackgroundColor,
    setModelOpen,
    userToken,
  } = props;
  // const { setPlayers() } = props;
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [facultyDropDown, setFacultyDropDown] = useState(false);
  const [genderDropDown, setGenderDropDown] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [showSubmitTxt, setShowSubmitTxt] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const [selectedFaculty, setSelectedFac] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getAllFaculties = async () => {
      setLoading(true);
      try {
        const request = await axios.get(`${BASE_URL}/faculty/getAllActive`);
        setFaculties(request.data.data);
        // console.log("faculties:  ", faculties);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getAllFaculties();
  }, [`/faculty/getAllActive`]);

  // player creation object
  let createPlayerObject = {
    firstName: "",
    lastName: "",
    gender: "",
  };

  const submitFormCreatePlayer = (values) => {
    console.log("form submit", values);
  };

  const selectFaculty = (selectedFaculty) => {
    // createPlayerObject.facultyName = selectedFaculty.faculty;
    setSelectedFac(selectedFaculty.faculty);
    // console.log("selected: ", selectedFaculty.faculty);
    setFacultyDropDown(false);
  };

  const onSelectGender = (selected) => {
    // createPlayerObject.gender = selected.value;
    setSelectedGender(selected.value);
    setGenderDropDown(false);
  };

  //submit function here
  const onSubmitCreatePlayer = () => {
    let playerObject = {
      firstName: firstName,
      lastName: lastName,
      gender: selectedGender,
      email: email,
    };

    if (
      playerObject.firstName != "" ||
      playerObject.email != "" ||
      playerObject.gender != "" ||
      playerObject.lastName != ""
    ) {
      console.log("submit form: ", playerObject);
      setShowErrors(false);
      setShowSubmitTxt(true);
      createPlayerMethod(playerObject).then(() => {
        // setFirstName("");
        // setLastName("");
        // setSelectedGender("");
        // setEmail("");
        setModelOpen(false);
        // playerObject = null;
      });
    } else {
      setShowErrors(true);
      // setToastVisible(true);
      // setToastBackgroundColor(ToastBackgroundGlobalColors.fail);
      // setToastMessage("Please Fill Required fields");
      alert("Oops!, Please Provide Required Data to continue..");
    }
  };

  //Create player API here
  const createPlayerMethod = async (body) => {
    const loginAdminUniId = userToken.uniId;
    try {
      const request = await axios.post(
        `${BASE_URL}/players/create/${loginAdminUniId}`,
        body
      );
      setShowSubmitTxt(true);
      setResponseMessage(request.data.statusMessage);
      props.setPlayers(request.data.data);
      setToastBackgroundColor(
        request.data.status
          ? ToastBackgroundGlobalColors.success
          : ToastBackgroundGlobalColors.fail
      );
      setToastMessage(request.data.statusMessage);
      setToastVisible(true);
      // setToas
      console.log("request response", request.data.statusMessage);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container} animated renderDelay={10}>
      {/* <Text style={styles.title}>Create a new Player</Text> */}
      <Formik
        initialValues={{ createPlayerObject }}
        onSubmit={(values) => {
          // console.log("valalala:  ", values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              placeholder="Email"
              onChangeText={(value) => setEmail(value)}
              value={props.values.email}
              keyboardType="email-address"
              style={styles.inputBox}
            />
            <TextInput
              placeholder="First Name"
              onChangeText={(value) => setFirstName(value)}
              value={props.values.firstName}
              style={styles.inputBox}
            />
            <TextInput
              placeholder="Last Name"
              onChangeText={(value) => setLastName(value)}
              value={props.values.LastName}
              style={styles.inputBox}
            />
            {/* <TextInput
              placeholder="Faculty"
              onChangeText={props.handleChange("facultyName")}
              value={selectedFaculty}
              style={styles.inputBox}
              keyboardType="default"
              onResponderStart={() => setFacultyDropDown(true)}
            /> */}
            {/* {facultyDropDown &&
              faculties &&
              faculties.map((value) => {
                return (
                  <View style={styles.dropDown} key={value.id}>
                    <Text onPress={(e) => selectFaculty(value)}>
                      {value.faculty}
                    </Text>
                  </View>
                );
              })} */}

            <TextInput
              placeholder="Gender"
              onChangeText={props.handleChange("gender")}
              value={selectedGender}
              style={styles.inputBox}
              keyboardType="default"
              onResponderStart={() => setGenderDropDown(true)}
            />
            {genderDropDown &&
              Gender &&
              Gender.map((array) => {
                return (
                  <View style={styles.dropDown} key={array.key}>
                    <Text onPress={(e) => onSelectGender(array)}>
                      {array.value}
                    </Text>
                  </View>
                );
              })}

            <Button
              color="green"
              title="Create"
              onPress={onSubmitCreatePlayer}
            />
            {/* {showErrors == true && ( */}
            {/* <View
                style={{
                  alignContent: "flex-end",
                  alignSelf: "baseline",
                  marginTop: 20,
                }}
              > */}
            <ToastComponent
              toastVisible={showErrors}
              toastMessage="Please provide required data to continue"
              toastBackgroundColor={ToastBackgroundGlobalColors.fail}
              setToastVisible={setShowErrors}
            />
            {/* </View> */}
            {/* ) : (
              showSubmitTxt == true && (
                <Text style={styles.successMsg}>{responseMessage}</Text>
              )
            )} */}
            {/* </View> */}
            {/* )} */}

            {/* </View> */}
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CreatePlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 2,
    backgroundColor: "#ddd",
    margin: 5,
    padding: 5,
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
    marginTop: 10,
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
