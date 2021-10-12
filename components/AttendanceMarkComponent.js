import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import moment from "moment";

const AttendanceMarkComponent = ({
  switchVal,
  date,
  attendanceSubmitMethod,
  setOpen,
}) => {
  return (
    <View style={styles.currentDateViewStyle}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 25,
          color: "green",
          padding: 5,
        }}
      >
        Marking Attendance
      </Text>
      {/* <DateTimePickerComponent  /> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flex: 1,
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Count: {switchVal != null && switchVal.length}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            // justifyContent: "space-between",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Icon
              name="alarm"
              onPress={() => {
                console.log("touched");
                setOpen(true);
              }}
            />
            <Text style={{ fontSize: 10 }}>
              {moment(date).format("MMMM Do YYYY")}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "column",
            flex: 1,
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Button
            title="Submit"
            color="green"
            onPress={attendanceSubmitMethod}
          />
        </View>
      </View>
    </View>
  );
};

export default AttendanceMarkComponent;

const styles = StyleSheet.create({
  currentDateViewStyle: {
    alignItems: "center",
    padding: 10,
    fontWeight: "bold",
  },
});
