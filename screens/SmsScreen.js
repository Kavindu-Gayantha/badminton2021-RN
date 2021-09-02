import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import { globalStyles } from "../styles/globalStyles";
import CreateSmsComponent from "../components/CreateSmsComponent";
import SmsListComponent from "../components/SmsListComponent";

const SmsScreen = ({ navigation }) => {
  const [smsAlerts, setSmsAlerts] = useState([]);
  const [data, setData] = useState([]);
  //  const [updatePlayer, setUpdatePlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      getAllSmsAlerts();
      console.log("smsAlerts state use effect :  ", smsAlerts);
    });
    return unsubscribe;
  }, [navigation]);

  const getAllSmsAlerts = async () => {
    setLoading(true);
    try {
      const request = await axios.get(`${BASE_URL}/sms/getAll`);
      // console.log("players get:", typeof(request.data.data));
      setSmsAlerts(request.data.data);
      // console.log("smsAlerts state:  ", request.data.data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const addSMSList = (input) => {
    // const data = [];
    // setData([...data, input]);
    setSmsAlerts([...smsAlerts, input]);

    // setSmsAlerts(data.push(smsAlerts));
  };

  return (
    <View style={styles.container}>
      <CreateSmsComponent setSmsAlerts={addSMSList} />
      <SmsListComponent data={smsAlerts} />
    </View>
  );
};
export default SmsScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#98ee99",
    borderWidth: 1,
    padding: 5,
    // marginTop: 5,
    flex: 1,
  },
});
