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
import { Switch } from "react-native-elements";
import { Input } from "react-native-elements/dist/input/Input";
// import DateTimePickerComponent from "./DateTimePickerComponent";

const PlayerComponent = (props) => {
  const [addPlayerArea, setAddPlayerArea] = useState(false);
  const [modalOpen, setModelOpen] = useState(false);
  const [morePlayerModalOpen, setMorePlayerModalOpen] = useState(false);
  const [singlePlayerObj, setSinglePlayerObj] = useState(null);
  const [attendanceView, setAttendanceView] = useState(false);
  const [switchVal, setSwitchVal] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [dateIn, setDateIn] = useState();

  // const today = new Date();
  const players = props.data;
  // console.log("props::", props.data);
  const { loginUserType, navigation, setPlayers, userToken } = props;

  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year

  const onChangeSwitch = (item) => {
    console.log("swith : ", item.id);
    if (switchVal.indexOf(item.id) == -1) {
      setSwitchVal([...switchVal, item.id]);
      console.log("swich values array: ", switchVal);
    }

    // list of ids are available now

    // setSwitchVal([...switchVal, item.id]);
    // console.log("swich values array: ", switchVal);
  };
  useEffect(() => {
    setCurrentDate(date + "/" + month + "/" + year);
   
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      setMorePlayerModalOpen(false);

      //  setCurrentDate(
      //    date + "/" + month + "/" + year
      //  );
      // setCurrentDate(`${date}/${month}/${year}`);
      // console.log("date <<<< ", currentDate);
      // console.log("date get date: ", date);
    });
    return unsubscribe;
  }, [navigation]);

  const submitAttendance = () => {
    const attendanceObj = {
      'date': new Date(),
      'Ids': switchVal,
    }

    console.log("ssksk: ", attendanceObj);
    setAttendanceView(false);

  }
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
      {loginUserType && loginUserType == "Admin" && attendanceView == true && (
        <View style={styles.currentDateViewStyle}>
          <Text style={{ fontWeight: "bold", fontSize: 25, color: 'green',padding: 5 }}>
            Marking Attendance
          </Text>
          {/* <DateTimePickerComponent  /> */}
          <View
            style={{
              flexDirection: "row",
              // flex: 1,
              height: "5%",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                flex: 1,
                justifyContent: "space-between",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Count: {switchVal != null && switchVal.length}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                flex: 1,
                justifyContent: "space-between",
                textAlign: "center",
                alignItems: "center",
                
              }}
            >
              <Text style={{ fontSize: 15, }}>Date: {currentDate}</Text>
              {/* <Input style={{margin: -30,}} Date onChange={(a)=> setDateIn(a)} value={dateIn} /> */}
            </View>
            <View
              style={{
                flexDirection: "column",
                flex: 1,
                justifyContent: "space-between",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Button title="Submit" color="green" onPress={submitAttendance} />
            </View>
          </View>
        </View>
      )}
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

            <Text style={globalStyles.listItem}>
              {item.name} - {item.facultyName}{" "}
            </Text>
            {attendanceView == true && (
              <Switch
                backgroundColor="white"
                color="green"
                onValueChange={() => onChangeSwitch(item)}
                value={switchVal.includes(item.id)}
                // onChange={() => onChangeSwitch(item)}
              />
            )}

            {/* </View> */}
          </TouchableOpacity>
        )}
      />
      <FabButton
        addNewPlayer={addNewPlayer}
        setAttendanceView={setAttendanceView}
      />
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
    marginBottom: "5%",
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
  datePickerContainer: {
    padding: 5,
    justifyContent: "center",
    flex: 1,
  },
  currentDateViewStyle: {
    alignItems: 'center',
    padding: 10,
    fontWeight: 'bold',
    
  },
});
