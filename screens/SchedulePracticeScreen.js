import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import FabNormalComponent from "../components/FabNormalComponent";
import HeaderComponent from "../components/HeaderComponent";
import { globalStyles } from "../styles/globalStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Icon } from "react-native-elements";
import { Card } from "react-native-ui-lib";

const SchedulePracticeScreen = (props) => {
  const userToken = props.route.params.userToken;
  const navigation = props.navigation;
  const userType = props.route.params.userToken.userType;
  console.log("props schedule screen: ", props);
  // const [openSchedulePopUp, setOpenSchedulePopUp] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("time");
  const [practiseDates, setPractiseDates] = useState([
    { id: 1, date: "2021/03/03", time: "04: 30" },
    { id: 2, date: "2021/03/05", time: "04: 30" },
  ]);

  const openSchedulePopUp = () => {
    setOpen(true);
  };

  const datePickerOnChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    console.log("date chagned: ", currentDate);
    // alert(currentDate);
    setOpen(false);
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
              <Card elevation={30} containerStyle={globalStyles.cardContainer}>
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
                      // backgroundColor: "red",

                      padding: 5,
                    }}
                  >
                    <Icon name="today" size={25} />
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      // backgroundColor: "red",

                      padding: 5,
                    }}
                  >
                    <Text style={globalStyles.cardTitle}>Date</Text>
                    <Text>{item.date}</Text>
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
                    <Text>{item.time}</Text>
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
