import * as React from "react";
import BoyComponent from "../components/BoysListComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import { View, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { CirclesLoader } from "react-native-indicator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BoysScreen = ({ navigation }, props) => {
  const [boys, setBoys] = useState([]);

  const [loading, setLoading] = useState(false);
  const [morePlayerModalOpen, setMorePlayerModalOpen] = useState(false);
  const [userToken, setUserToken] = useState(null);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTokenMethod();

      setMorePlayerModalOpen(false);
    });

    return unsubscribe;
  }, [navigation]);

  const getTokenMethod = async () => {
    try {
      const userToken = await AsyncStorage.getItem("loginToken");
      setUserToken(JSON.parse(userToken));
      console.log("token boys screen: ", JSON.parse(userToken));
      getAllBoys(JSON.parse(userToken));
      return userToken;
    } catch (error) {
      console.log(error);
    }
  };
  const getAllBoys = async (token) => {
    try {
      const loginUserUniId = token.uniId;

      setLoading(true);
      const request = await axios.get(
        `${BASE_URL}/players/getBoys/${loginUserUniId}`
      );

      setBoys(request.data.data);
      console.log("boys:  ", boys);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  // getAllBoys();
  return (
    <View style={styles.container}>
      {boys.length > 0 ? (
        <BoyComponent
          setMorePlayerModalOpen={setMorePlayerModalOpen}
          morePlayerModalOpen={morePlayerModalOpen}
          navigation={navigation}
          data={boys}
        />
      ) : (
        <View style={globalStyles.loader}>
          <CirclesLoader color="green" />
        </View>
      )}
    </View>
  );
};

export default BoysScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",

    marginTop: "1%",
  },
  titleGrid: {
    top: 0,
    fontWeight: "bold",
    alignItems: "center",

    flex: 1,
    marginTop: 5,
    flexDirection: "row",
    marginBottom: 8,
    padding: 3,
  },
  titleLeft: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "row",
    backgroundColor: "green",
    alignContent: "center",
  },
  title: {
    flex: 3,
    textAlign: "center",
    flexDirection: "row",
  },
  titleRight: {
    flex: 1,
    textAlign: "center",
    flexDirection: "row",
  },
  noDataContainer: {
    flex: 11,

    color: "blue",
    fontWeight: "bold",
    margin: 5,
  },
});
