import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import { globalStyles } from "../styles/globalStyles";
import CreateSmsComponent from "../components/CreateSmsComponent";
import SmsListComponent from "../components/SmsListComponent";
import { CirclesLoader } from "react-native-indicator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SmsScreen = ({ navigation, route }) => {
  const [smsAlerts, setSmsAlerts] = useState([]);
  const [data, setData] = useState([]);
  const [userToken, setUserToken] = useState("");
  const [loading, setLoading] = useState(false);

  const { userType } = userToken;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      getAllSmsAlerts();
      console.log("smsAlerts state use effect :  ", smsAlerts);
      const userToken = getTokenMethod();

      console.log("Token in smstabs: ", userToken);
    });
    return unsubscribe;
  }, [navigation]);

  const getTokenMethod = async () => {
    try {
      const userToken = await AsyncStorage.getItem("loginToken");
      setUserToken(JSON.parse(userToken));
      return userToken;
    } catch (error) {
      console.log(error);
    }
  };
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
      {userType && userType == "Admin" && (
        <CreateSmsComponent setSmsAlerts={addSMSList} />
      )}
      {smsAlerts.length > 0 ? (
        <SmsListComponent data={smsAlerts} />
      ) : (
        <View style={globalStyles.loader}>
          <CirclesLoader color="green" />
        </View>
      )}
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
