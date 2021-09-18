import * as React from "react";
import { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import { supabase } from "../lib/superbaseInit";
import { useState } from "react";
// import axios from "./../api/axios";
import { GetRequest } from "../api/Requests";
import PlayerComponent from "../components/PlayerListComponent";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import { globalStyles } from "../styles/globalStyles";
// import { createClient } from '@supabase/supabase-js'
import { CirclesLoader } from "react-native-indicator";
import HeaderComponent from "../components/HeaderComponent";

const PlayersScreen = ({ navigation, route }) => {
  // setUpdatePlayers([]);
  const [players, setPlayers] = useState([]);
  const [updatePlayer, setUpdatePlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userToken } = route.params;
  const loginUserType = userToken.userType;
  // console.log("user token route param: ", userToken);

  useEffect(() => {
    // setUpdatePlayers();

    getAllPlayers();
  }, []);

  const getAllPlayers = async () => {
    const loginUserUniId = userToken.uniId;
    console.log("login user UNi ID: ", loginUserUniId);
    setLoading(true);
    try {
      const request = await axios.get(
        `${BASE_URL}/players/getAll/${loginUserUniId}`
      );
      // console.log("players get:", typeof(request.data.data));
      setPlayers(request.data.data);
      console.log("players state:  ", players);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
  // set new player to existing playerlist
  const addPlayer = (input) => {
    setPlayers([...players, input]);
  };

  return (
    <View style={globalStyles.container}>
      <HeaderComponent title="All Players" navigation={navigation} />

      {players && players.length > 0 ? (
        <PlayerComponent
          data={players}
          loginUserType={loginUserType}
          userToken={userToken}
          navigation={navigation}
          setPlayers={addPlayer}
        />
      ) : (
        <View style={globalStyles.loader}>
          <CirclesLoader color="green" />
        </View>
      )}
    </View>
  );
};
export default PlayersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    marginTop: "12%",
  },
  titleGrid: {
    top: 0,
    fontWeight: "bold",
    alignItems: "center",
    // justifyContent: 'center',
    // flex: 3,
    marginTop: 15,
    flexDirection: "row",
    marginBottom: 8,
    padding: 3,
  },
  titleLeft: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "row",
    backgroundColor: "#32A335",
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
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    color: "blue",
    fontWeight: "bold",
    margin: 5,
  },
});
