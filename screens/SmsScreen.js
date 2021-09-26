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
import { ExpandableSection, Image } from "react-native-ui-lib";
import { Icon, Card } from "react-native-elements";
// import { Col, Row, Grid } from "react-native-easy-grid";

const SmsScreen = ({ navigation }) => {
  const [smsAlerts, setSmsAlerts] = useState([]);
  const [data, setData] = useState([]);
  const [userToken, setUserToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const { userType } = userToken;
  // console.log("props sms screen: ", props);
  // const userToken = props.route.params.userToken;
  // const navigation = props.navigation;
  // const userType = props.route.params.userToken.userType;

  // const chevronUp = URL('')
  const onExpandMethod = () => {
    setExpanded(!expanded);
  };

  function getHeaderElement() {
    return (
      <View
        style={{ flexDirection: "row", alignSelf: "center", padding: "1%" }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text style={globalStyles.titleText}>Send a new MSG</Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Icon
            raised
            size={12}
            color="white"
            backgroundColor="green"
            name={expanded ? "arrow-up" : "arrow-down"}
            type="font-awesome"
          />
        </View>
      </View>
    );
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      getAllSmsAlerts(userToken);
      console.log("smsAlerts state use effect :  ", smsAlerts);
      getTokenMethod();

      console.log("Token in smstabs: ", userToken);
    });
    return unsubscribe;
  }, [navigation]);

  const getTokenMethod = async () => {
    try {
      const userToken = await AsyncStorage.getItem("loginToken");
      setUserToken(JSON.parse(userToken));
      getAllSmsAlerts(JSON.parse(userToken));

      return userToken;
    } catch (error) {
      console.log(error);
    }
  };
  const getAllSmsAlerts = async (token) => {
    setLoading(true);
    try {
      const loginUserUniId = token.uniId;
      console.log("login user uni id", loginUserUniId);
      const request = await axios.get(
        `${BASE_URL}/sms/getAll/${loginUserUniId}`
      );
      // console.log("players get:", typeof(request.data.data));
      setSmsAlerts(request.data.data);
      setLoading(false);
      console.log("sms loading:  ", loading);
    } catch (error) {
      console.log(error);
    }

    // setLoading(false);
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
        <ExpandableSection
          top={false}
          expanded={expanded}
          sectionHeader={getHeaderElement()}
          onPress={onExpandMethod}
        >
          <CreateSmsComponent userToken={userToken} setSmsAlerts={addSMSList} />
        </ExpandableSection>
      )}
      {loading == false ? (
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
  icon: {
    alignSelf: "center",
    color: "green",
  },
  cardContainer: {
    backgroundColor: "white",
    margin: 0,
    // flex: 1,
    // height: '100%'
    // color:'red'
  },
  cardTitle: {
    textAlign: "left",
    fontSize: 12,
    color: "grey",
    textShadowColor: "red",
    // paddingBottom: -1,
    marginBottom: 3,
  },
  msg: {
    fontSize: 18,
    paddingTop: 2,
    color: "#000000",
  },
  noDataContainer: {
    backgroundColor: "white",
    margin: 0,
  },
  noDataMsg: {
    fontSize: 12,
    paddingTop: 2,
    color: "#000000",
    textAlign: "center",
  },
});
