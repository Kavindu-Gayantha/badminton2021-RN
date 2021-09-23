import * as React from "react";
import { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { globalStyles, profileImgs } from "../styles/globalStyles";
import PlayerMoreOptionModalComponent from "./PlayerMoreOptionModalComponent";
import { ListItem, Text, Switch } from "react-native-ui-lib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastBackgroundGlobalColors } from "../styles/globalStyles";
import { ExpandableSection } from "react-native-ui-lib";
import AttendanceMarkComponent from "./AttendanceMarkComponent";
import { Icon } from "react-native-elements/dist/icons/Icon";

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
  const keyExtractor = (item) => item.id.toString();

  function renderRow(row, id) {
    // console.log("row : ", row);
    // const statusColor = row.inventory.status === 'Paid' ? Colors.green30 : Colors.red30;

    return (
      <View>
        <ListItem
          // @ts-expect-error
          activeBackgroundColor="whtie"
          // backgroundColor="green"
          containerStyle={globalStyles.listContainer}
          activeOpacity={0.3}
          height={77.5}
          onLongPress={() => openMorePlayerModel(row)}
          onPress={() => alert(`pressed on order #${id + 1}`)}
        >
          <ListItem.Part left>
            <Image
              source={
                row.gender == "male" || row.gender == "Male"
                  ? profileImgs.male
                  : profileImgs.female
              }
              style={styles.image}
            />
          </ListItem.Part>
          <ListItem.Part
            middle
            column
            containerStyle={[
              styles.border,
              { paddingRight: 17, backgroundColor: "white" },
            ]}
          >
            <ListItem.Part containerStyle={{ marginBottom: 3 }}>
              <Text
                green10
                text60
                style={{ flex: 1, marginRight: 10, fontWeight: "bold" }}
                // numberOfLines={1}
              >
                {row.name}
              </Text>
              <Text green50 text80 style={{ marginTop: 2 }}>
                {row.id}
              </Text>
              {/* {attendanceView == true && (
                <Switch
                  backgroundColor="white"
                  onColor="green"
                  offColor="#b2fab4"
                  useCustomTheme
                  onValueChange={() => onChangeSwitch(row)}
                  value={switchVal.includes(row.id)}
                  
                />
              )} */}
            </ListItem.Part>
            <ListItem.Part>
              <Text
                style={{ flex: 1, marginRight: 10 }}
                text90
                grey40
                // numberOfLines={1}
              >
                {row.email}
              </Text>
              <Text text90 green20>
                **
              </Text>
            </ListItem.Part>
          </ListItem.Part>
        </ListItem>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* <FlatList
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
            
            <Text style={globalStyles.listItem}>
              {item.name} - {item.facultyName}{" "}
            </Text>
           
          </TouchableOpacity>
        )}
      /> */}
      <FlatList
        data={girlsList}
        renderItem={({ item, index }) => renderRow(item, index)}
        keyExtractor={keyExtractor}
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
    // flex: 1,
    backgroundColor: "white",
    // alignItems: 'center',
    justifyContent: "center",
    // marginTop: "1%",
    // backgroundColor: "#66bb6a",
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
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: 10,
    // margin: "5%",
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "green",
    // borderRadius: 20,
    // backgroundColor: "red",
  },
});
