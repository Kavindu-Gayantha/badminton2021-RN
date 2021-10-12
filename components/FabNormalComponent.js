import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FAB, Icon } from "react-native-elements";

const FabNormalComponent = ({ iconName, openSchedulePopUp }) => {
  return (
    <FAB
      visible
      placement="right"
      overlayColor="green"
      color="green"
      raised
      onPress={openSchedulePopUp}
      icon={<Icon name={iconName} size={25} color="white" />}
    />
  );
};

export default FabNormalComponent;

const styles = StyleSheet.create({});
