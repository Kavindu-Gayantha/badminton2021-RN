import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { globalStyles, profileImgs } from "../styles/globalStyles";
import PlayerMoreOptionModalComponent from "./PlayerMoreOptionModalComponent";

const GirlsComponent = (props) => {
  // const [morePlayerModalOpen, setMorePlayerModalOpen] = useState(false);
  const [singlePlayerObj, setSinglePlayerObj] = useState(null);
  console.log("props girls component:  ", props);
  const girlsList = props.data;
  const { navigation, morePlayerModalOpen, setMorePlayerModalOpen } = props;

  const toggleOverlay = () => {
    setMorePlayerModalOpen(!morePlayerModalOpen);
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
      <FlatList
        style={globalStyles.listContainer}
        keyExtractor={(item) => item.id.toString()}
        data={girlsList}
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
      <PlayerMoreOptionModalComponent
        toggleOverlay={toggleOverlay}
        setMorePlayerModalOpen={setMorePlayerModalOpen}
        morePlayerModalOpen={morePlayerModalOpen}
        singlePlayerObj={singlePlayerObj}
        navigation={navigation}
      />
    </View>
  );
};

export default GirlsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: 'center',
    justifyContent: "center",
    // marginTop: '1%',
    backgroundColor: "#66bb6a",
  },
  playerList: {
    // maxHeight: Dimensions.get('screen')
    backgroundColor: "white",
    // justifyContent: 'flex-start'
  },
  item: {
    margin: 1,
    paddingLeft: 10,
    backgroundColor: "blue",
    margin: 2,
    color: "white",
    height: 100,
    //  alignSelf: 'flex-start',
    textAlignVertical: "center",
  },
  modalContent: {
    backgroundColor: "yellow",
    flex: 12,
    padding: 12,
    margin: 2,
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
