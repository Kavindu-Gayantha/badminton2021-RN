import * as React from "react";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import GirlsComponent from "../components/GirlsListComponent";
import { globalStyles } from "../styles/globalStyles";
import { CirclesLoader } from "react-native-indicator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GirlsScreen = ({ navigation }) => {
  const [girls, setgirls] = useState([]);
  const [updateGirl, setUpdateGirs] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [morePlayerModalOpen, setMorePlayerModalOpen] = useState(false);

  useEffect(() => {
    // getTokenMethod();
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      getTokenMethod();
      // getAllGirls();
      setMorePlayerModalOpen(false);
  
    });
    return unsubscribe;
  }, [navigation]);

  const getTokenMethod = async () => {
    try {
      const token = await AsyncStorage.getItem("loginToken");
      setUserToken(JSON.parse(token));
      console.log("token Girls screen: ", userToken);
      getAllGirls(JSON.parse(token));
      return userToken;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllGirls = async (token) => {
    const loginUserUniId = token.uniId;
    // setUpdateGirs();
    // console.log("girls tab");
    // const loginUserUniId = userToken.uniId;
    try {
      const request = await axios.get(
        `${BASE_URL}/players/getGirls/${loginUserUniId}`
      );
      // console.log("players get:", typeof(request.data.data));
      setgirls(request.data.data);
      console.log("girls:  ", request.data.data);
      // return request.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      {girls.length > 0 ? (
        <GirlsComponent
          setMorePlayerModalOpen={setMorePlayerModalOpen}
          morePlayerModalOpen={morePlayerModalOpen}
          navigation={navigation}
          data={girls}
        />
      ) : (
        <View style={globalStyles.loader}>
          <CirclesLoader color="green" />
        </View>
      )}
    </View>
  );
};
export default GirlsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    marginTop: "1%",
  },
  noDataContainer: {
    flex: 11,
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    color: "blue",
    fontWeight: "bold",
    margin: 5,
  },
});
