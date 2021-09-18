import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HeaderComponent from '../components/HeaderComponent';
import { globalStyles } from '../styles/globalStyles';

const SchedulePracticeScreen = (props) => {

  const userToken = props.route.params.userToken;
  const navigation = props.navigation;
  const userType = props.route.params.userToken.userType;
  console.log("props schedule screen: ", props);

  return (
    <View style={globalStyles.container}>
      <HeaderComponent title="Schedule" navigation={navigation} />
      <Text>schedule screen</Text>
    </View>
  );
}

export default SchedulePracticeScreen

const styles = StyleSheet.create({})
