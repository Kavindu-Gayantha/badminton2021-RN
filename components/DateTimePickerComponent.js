import React from "react";
import { StyleSheet, Text, View, Platform, Button } from "react-native";
import { useState } from "react";
// import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateTimePickerComponent = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log("data lLL: ", currentDate);
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <View>
      {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DateTimePickerComponent;

const styles = StyleSheet.create({});
