import * as React from "react";
import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import { globalStyles } from "../styles/globalStyles";
import CreateSmsComponent from "../components/CreateSmsComponent";

const SmsScreen = ({ navigation }) => {
  const [smsAlerts, setSmsAlerts] = useState([]);
  //  const [updatePlayer, setUpdatePlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      getAllSmsAlerts();
    });
    return unsubscribe;
  }, [navigation]);

  const getAllSmsAlerts = async () => {
    setLoading(true);
    try {
      const request = await axios.get(`${BASE_URL}/sms/getAll`);
      // console.log("players get:", typeof(request.data.data));
      setSmsAlerts(request.data.data);
      console.log("smsAlerts state:  ", smsAlerts);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
  return (
    <View style={globalStyles.container}>
      <CreateSmsComponent />
    </View>
  );
};
export default SmsScreen;
