import * as React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Dimensions,
  FlatList,
  // Modal,
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
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import ToastComponent from "./ToastComponent";
import { ToastBackgroundGlobalColors } from "../styles/globalStyles";
import AttendanceMarkComponent from "./AttendanceMarkComponent";
import { Modal } from "react-native-ui-lib";

const PlayerComponent = (props) => {
  const [addPlayerArea, setAddPlayerArea] = useState(false);
  const [modalOpen, setModelOpen] = useState(false);
  const [morePlayerModalOpen, setMorePlayerModalOpen] = useState(false);
  const [singlePlayerObj, setSinglePlayerObj] = useState(null);
  const [attendanceView, setAttendanceView] = useState(false);
  const [switchVal, setSwitchVal] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [dateIn, setDateIn] = useState();
  const [responseMessage, setResponseMessage] = useState();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  // toasts
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBackgroundColor, setToastBackgroundColor] = useState("");

  const datePickerOnChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    console.log("date chagned: ", currentDate);
    setOpen(false);
  };
  // const today = new Date();
  const players = props.data;
  // console.log("props ::", props);
  const { loginUserType, navigation, setPlayers, userToken } = props;

  // var date = new Date().getDate(); //Current Date
  // var month = new Date().getMonth() + 1; //Current Month
  // var year = new Date().getFullYear(); //Current Year

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
    // setCurrentDate(date + "/" + month + "/" + year);

    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      setMorePlayerModalOpen(false);
      // setAttendanceView(false);

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
      date: new Date(),
      attendantPlayerIds: switchVal,
      addedAdminRegId: userToken.uniId,
    };
    attendanceSubmitMethod(attendanceObj);
    console.log("ssksk: ", attendanceObj);
  };

  //Create attendance API here
  const attendanceSubmitMethod = async () => {
    const body = {
      date: date,
      attendantPlayerIds: switchVal,
      addedAdminRegId: userToken.uniId,
    };
    try {
      const request = await axios.post(`${BASE_URL}/attendance/submit`, body);
      // setShowSubmitTxt(true);
      setResponseMessage(request.data.statusMessage);
      // props.setSmsAlerts(request.data.data);
      setToastMessage(request.data.statusMessage);
      setToastVisible(true);
      setToastBackgroundColor(
        request.data.status
          ? ToastBackgroundGlobalColors.success
          : ToastBackgroundGlobalColors.fail
      );
      setAttendanceView(false);

      console.log("request response", request.data.statusMessage);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleOverlay = () => {
    setMorePlayerModalOpen(!morePlayerModalOpen);
  };

  const addNewPlayer = () => {
    setModelOpen(true);
    setFabOpen(false);
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
        <AttendanceMarkComponent
          switchVal={switchVal}
          date={date}
          attendanceSubmitMethod={attendanceSubmitMethod}
          setOpen={setOpen}
        />
      )}

      {/* display add new player component when button click */}
      {/* {addPlayerArea && */}
      <ToastComponent
        toastVisible={toastVisible}
        toastMessage={toastMessage}
        toastBackgroundColor={toastBackgroundColor}
        setToastVisible={setToastVisible}
      />
      {open && (
        <DateTimePicker
          value={date}
          themeVariant="green"
          mode="date"
          is24Hour={true}
          display="default"
          onChange={datePickerOnChange}
        />
      )}
      {/* <Modal visible={modalOpen} animationType="slide">
        <View style={styles.modalContent}>
          <CreatePlayer setPlayers={setPlayers} />

          <Button
            onPress={closeModal}
            color="red"
            style={styles.closeBtn}
            title="close"
          />
        </View>
      </Modal> */}
      <Modal
        visible={modalOpen}
        overlayBackgroundColor="white"
        useGestureHandlerRootView
        animationType="slide"
        transparent={true}
        // blurView={CreatePlayer}
      >
        <Modal.TopBar
          title="Create a new Player"
          onDone={() => setModelOpen(false)}
          onCancel={() => setModelOpen(false)}
          doneLabel="Create"
          doneButtonProps={{
            color: "green",
            borderRadius: 20,
            backgroundColor: "red",
          }}
          // doneIcon="arrow"
        />
        <CreatePlayer
          toastVisible={toastVisible}
          toastMessage={toastMessage}
          toastBackgroundColor={toastBackgroundColor}
          setToastVisible={setToastVisible}
          setToastMessage={setToastMessage}
          setToastBackgroundColor={setToastBackgroundColor}
          setPlayers={setPlayers}
          userToken={userToken}
          setModelOpen={setModelOpen}
        />
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
        keyExtractor={(item) => item && item.id.toString()}
        data={players}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => openMorePlayerModel(item)}
            style={globalStyles.touchableOpacityList}
          >
            <View style={globalStyles.coverListItemView}>
              {item && (item.gender === "Male" || item.gender === "male") ? (
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
              {item && item.name} - {item && item.facultyName}{" "}
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
      {userToken && userToken.userType == "Admin" && (
        <FabButton
          fabOpen={fabOpen}
          setFabOpen={setFabOpen}
          addNewPlayer={addNewPlayer}
          setAttendanceView={setAttendanceView}
        />
      )}
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
    alignItems: "center",
    padding: 10,
    fontWeight: "bold",
  },
});
