import * as React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Dimensions,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import CreatePlayer from "./CreatePlayerComponent";
import { Overlay, Card, Icon } from "react-native-elements";
import { globalStyles, profileImgs } from "../styles/globalStyles";
import PlayerMoreOptionModalComponent from "./PlayerMoreOptionModalComponent";
import FabButton from "./FabButton";

const PlayerComponent = (props) => {
  const [addPlayerArea, setAddPlayerArea] = useState(false);
  const [modalOpen, setModelOpen] = useState(false);
  const [morePlayerModalOpen, setMorePlayerModalOpen] = useState(false);
  const [singlePlayerObj, setSinglePlayerObj] = useState(null);
  const players = props.data.reverse();
  // console.log("props::", props);
  const { loginUserType, navigation, setPlayers, userToken } = props;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      setMorePlayerModalOpen(false);
    });
    return unsubscribe;
  }, [navigation]);

  const toggleOverlay = () => {
    setMorePlayerModalOpen(!morePlayerModalOpen);
  };

  const addNewPlayer = () => {
    setModelOpen(true);
  };

  const closeModal = () => {
    setModelOpen(false);
    // setMorePlayerModalOpen(false);
  };

  const openMorePlayerModel = (player) => {
    console.log("one long press player: ", player);
    setSinglePlayerObj(player);
    setMorePlayerModalOpen(true);
  };

  // long press model open icon click event
  const onPressMorePlayerModelIcon = (icon) => {
    console.log("clicked item modal: ", icon);
    switch (icon) {
      case "profile":
        {
          navigation.navigate("PlayerProfile", { userData: singlePlayerObj });
        }
        break;
    }
    // navigation.navigate("Profile")
  };

  return (
    <View style={styles.container}>
      {/* {loginUserType && loginUserType == "Admin" && (
        <Button
          onPress={addNewPlayer}
          title="Add Player"
          color="#41733f"
          style={globalStyles.primaryBtn}
        />
      )} */}
      {/* display add new player component when button click */}
      {/* {addPlayerArea && */}
      <Modal visible={modalOpen} animationType="slide">
        <View style={styles.modalContent}>
          <CreatePlayer setPlayers={setPlayers} />

          <Button
            onPress={closeModal}
            color="red"
            style={styles.closeBtn}
            title="close"
          />
        </View>
      </Modal>

      {/*  more player long press modal open  */}
      {/* <Overlay isVisible={morePlayerModalOpen} onBackdropPress={toggleOverlay}>
        <Text style={styles.morePlayersModalTitle}>
          {singlePlayerObj != null && singlePlayerObj.name}
        </Text> */}

      {/* <View style={styles.morePlayerModalContent}>
          <View style={styles.morePlayerBtns}>
            <Icon
              name="edit"
              type="material"
              color="green"
              onPress={() => onPressMorePlayerModelIcon("edit")}
            />
          </View>
          <View style={styles.morePlayerBtns}>
            <Icon
              name="delete"
              type="material"
              color="green"
              onPress={() => onPressMorePlayerModelIcon("delete")}
            />
          </View>
          <View style={styles.morePlayerBtns}>
            <Icon
              name="person"
              type="material"
              color="green"
              onPress={() => onPressMorePlayerModelIcon("profile")}
            />
          </View>
        </View> */}
      <PlayerMoreOptionModalComponent
        toggleOverlay={toggleOverlay}
        setMorePlayerModalOpen={setMorePlayerModalOpen}
        morePlayerModalOpen={morePlayerModalOpen}
        singlePlayerObj={singlePlayerObj}
        navigation={navigation}
      />
      {/* <FabButton /> */}
      {/* </Overlay> */}

      <FlatList
        style={globalStyles.listContainer}
        keyExtractor={(item) => item.id.toString()}
        data={players}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => openMorePlayerModel(item)}
            style={globalStyles.touchableOpacityList}
          >
            <View style={globalStyles.coverListItemView}>
              {item.gender === "Male" || item.gender === "male" ? (
                <Image
                  source={profileImgs.male}
                  // width="10"
                  style={globalStyles.flatListImg}
                />
              ) : (
                <Image
                  source={profileImgs.female}
                  style={globalStyles.flatListImg}
                />
              )}
            </View>
            {/* <View style={globalStyles.coverListItemView}> */}
            <Text style={globalStyles.listItem}>
              {item.name} - {item.facultyName}{" "}
            </Text>
            {/* </View> */}
          </TouchableOpacity>
        )}
      />
      <FabButton addNewPlayer={addNewPlayer} />
    </View>
  );
};

export default PlayerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: 'center',
    justifyContent: "center",
    // padding: 1
    marginBottom: '2%',
  },
  playerList: {
    // maxHeight: Dimensions.get('screen')
    backgroundColor: "white",
    // justifyContent: 'flex-start'
  },
  item: {
    margin: 1,
    color: "white",
    height: 100,
    flex: 1, //here you can use flex:1 also
    textAlignVertical: "center",
  },
  modalContent: {
    backgroundColor: "yellow",
    flex: 12,
    padding: 12,
    margin: 2,
  },
  morePlayersModalTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    padding: 5,
  },
  morePlayerModalContent: {
    padding: 1,
    margin: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    width: "60%",
  },
  morePlayerBtns: {
    flexDirection: "column",
    padding: 1,
    margin: 1,
    flex: 1,
  },
  button: {
    color: "red",
    width: "100%",
    margin: "2%",
  },
  closeBtn: {
    color: "red",
    backgroundColor: "red",
  },
});
