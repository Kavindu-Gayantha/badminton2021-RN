import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Toast } from "react-native-ui-lib";

const ToastComponent = ({
  toastMessage,
  toastBackgroundColor,
  toastVisible,
  setToastVisible,
}) => {
  // setToastVisible, toastVisible
  // backgroundColr
  // message
  const dismissToast = () => {
    setToastVisible(false);
  };
  return (
    <Toast
      visible={toastVisible}
      position={"bottom"}
      backgroundColor={toastBackgroundColor}
      message={toastMessage}
      onDismiss={dismissToast}
      autoDismiss={3000}
      centerMessage={true}
      // color="black"
      // action={{iconSource: Assets.icons.x, onPress: () => console.log('dismiss')}}
      showLoader={true}
    />
  );
};

export default ToastComponent;
