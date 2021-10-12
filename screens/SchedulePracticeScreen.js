import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import FabNormalComponent from "../components/FabNormalComponent";
import HeaderComponent from "../components/HeaderComponent";
import { globalStyles } from "../styles/globalStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Icon } from "react-native-elements";
import { Card } from "react-native-ui-lib";
import { BASE_URL } from "../api/BASE_URL";
import axios from "axios";
import moment from "moment";

const SchedulePracticeScreen = (props) => {
  const userToken = props.route.params.userToken;
  const navigation = props.navigation;
  const userType = props.route.params.userToken.userType;
  console.log("props schedule screen: ", props);
  // const [openSchedulePopUp, setOpenSchedulePopUp] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("time");
  const [practiseDates, setPractiseDates] = useState([]);

  const [updatePractiseSchedule, setUpdatePractiseSchedule] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAllPractiseSchedules(userToken);
    });
    return unsubscribe;
  }, [navigation]);

  // const getTokenMethod = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem("loginToken");
  //     setUserToken(JSON.parse(token));
  //     console.log("token Girls screen: ", userToken);
  //     getAllGirls(JSON.parse(token));
  //     return userToken;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getAllPractiseSchedules = async (token) => {
    const loginUserUniId = token.uniId;
    try {
      const request = await axios.get(
        `${BASE_URL}/schedule/getAllByUniId/${loginUserUniId}`
      );
      // console.log("players get:", typeof(request.data.data));
      setPractiseDates(request.data.data);
      console.log("practise dates:  ", request.data.data);
      // setLoading(false);
      // return request.data.data;
    } catch (error) {
      alert(error);
    }
  };
  const openSchedulePopUp = () => {
    setOpen(true);
  };

  const addNewSchedule = (newlyAdded) => {
    setPractiseDates([...practiseDates, newlyAdded]);
  };

  const datePickerOnChange = (event, selectedDate) => {
    setOpen(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);

    const body = {
      addedAdminId: userToken.regId,
      dateTime: currentDate,
    };

    console.log("date chagned: ", currentDate);
    createPractiseSchedule(body).then(() => addNewSchedule(body));
  };

  const createPractiseSchedule = async (body) => {
    setLoading(true);
    try {
      const request = await axios.post(
        `${BASE_URL}/schedule/createSchedule`,
        body
      );
      setLoading(false);

      addNewSchedule(request.data.data);
      console.log("new ad prac", request.data.data);
      // setShowSubmitTxt(true);
      // setResponseMessage(request.data.statusMessage);
      // props.setSmsAlerts(request.data.data);
      console.log("request response", request.data.statusMessage);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <HeaderComponent title="Schedule" navigation={navigation} />

      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "center",
          padding: 8,
          margin: 5,
          borderRadius: 10,
        }}
      >
        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          <Icon name="event-available" color="green" size={35} />
        </View>
        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          <Text style={globalStyles.titleText}> Practise Days</Text>
        </View>
      </View>

      <View
        style={{
          margin: 5,
          width: "100%",
          justifyContent: "center",

          alignSelf: "center",
        }}
      >
        <ScrollView>
          {practiseDates.length > 0 ? (
            practiseDates.map((item) => (
              <Card
                elevation={30}
                containerStyle={globalStyles.cardContainer}
                key={item.id}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: 5,
                    }}
                  >
                    <Icon name="today" size={25} />
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: 5,
                    }}
                  >
                    <Text style={globalStyles.cardTitle}>Date</Text>
                    <Text>{moment(item.dateTime).format("DD/MM/YYYY")}</Text>
                  </View>

                  {/* next col */}

                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: 5,
                    }}
                  ></View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: 5,
                    }}
                  >
                    <Icon name="timer" size={25} />
                  </View>

                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      // backgroundColor: "red",

                      padding: 5,
                    }}
                  >
                    <Text style={globalStyles.cardTitle}>Time</Text>
                    <Text>04:30 PM</Text>
                  </View>
                </View>
              </Card>
            ))
          ) : (
            <Card containerStyle={globalStyles.noDataContainer}>
              <Text style={globalStyles.noDataMsg}>NO DATA</Text>
            </Card>
          )}
        </ScrollView>
      </View>

      {open && (
        <DateTimePicker
          value={date}
          themeVariant="green"
          is24Hour={true}
          display="calendar"
          minimumDate={new Date()}
          onChange={datePickerOnChange}
        />
      )}

      <FabNormalComponent
        iconName="more-time"
        openSchedulePopUp={openSchedulePopUp}
      />
    </View>
  );
};

export default SchedulePracticeScreen;

const styles = StyleSheet.create({});
