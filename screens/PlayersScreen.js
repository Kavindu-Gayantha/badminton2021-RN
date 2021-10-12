import * as React from "react";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useState } from "react";
import PlayerComponent from "../components/PlayerListComponent";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import { globalStyles } from "../styles/globalStyles";
import { CirclesLoader } from "react-native-indicator";
import HeaderComponent from "../components/HeaderComponent";

const PlayersScreen = ({ navigation, route }) => {
  const [players, setPlayers] = useState([]);
  const [updatePlayer, setUpdatePlayer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const { userToken } = route.params;
  const loginUserType = userToken.userType;

  useEffect(() => {
    getAllPlayers();
    getUserDataWithEmail(userToken.email);
  }, [updatePlayer]);

  const getAllPlayers = async () => {
    const loginUserUniId = userToken.uniId;
    console.log("login user UNi ID: ", loginUserUniId);
    setLoading(true);
    try {
      const request = await axios.get(
        `${BASE_URL}/players/getAll/${loginUserUniId}`
      );

      setPlayers(request.data.data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
  const getUserDataWithEmail = async (email) => {
    try {
      const request = await axios.get(
        `${BASE_URL}/players/regDataByEmail/${email}`
      );

      setUserData(request.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // set new player to existing playerlist
  const addPlayer = (input) => {
    setUpdatePlayer(input);
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
          userData={userData}
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
    marginTop: "12%",
  },
  titleGrid: {
    top: 0,
    fontWeight: "bold",
    alignItems: "center",
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
    color: "blue",
    fontWeight: "bold",
    margin: 5,
  },
});
