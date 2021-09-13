import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Icon } from 'react-native-elements';
import { globalStyles } from '../styles/globalStyles'

export default function PlayerProfileComponent( props ) {
  console.log("props plauyer profile component: ", props);
  const { userData } = props;

  // "active": true,
  //   "deleted": false,
  //   "email": "s@gmail.com",
  //   "firstName": "kavindu",
  //   "gender": "male",
  //   "id": null,
  //   "lastName": "Ari",
  //   "password": null,
  //   "university": null,
  //   "universityName": "University of Kelaniya",
  //   "userType": "Admin not",
  return (
    <View style={globalStyles.container}>
      <Card containerStyle={styles.cardContainer}>
        {/* {/* <View style={styles.cardItem}> */}
        {/* <Icon name="person"  /> */}
        {/* </View>  */}
        {/* <View style={styles.cardItem}> */}
        <Text style={styles.cardTitle}>Email</Text>
        <Text>{userData != null && userData.email}</Text>
        {/* </View> */}
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.cardTitle}>University</Text>
        <Text>{userData != null && userData.universityName}</Text>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.cardTitle}>Gender</Text>
        <Text>{userData != null && userData.gender}</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    paddingLeft: 25,
    height: 80,
    // flex: 1,
    backgroundColor: "white",
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
    margin: 5,
    flexDirection: "column",
    borderRadius: 20,
  },
  cardItem: {
    flex: 1,
    flexDirection: "column",
    // backgroundColor: 'red'
    // padding: 3,
    // margin: 5,
    // width: 40,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 20,
  }
});
