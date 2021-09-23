import * as React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
// import { Switch } from "react-native-elements";

import { globalStyles, profileImgs } from "../styles/globalStyles";
import { BASE_URL } from "../api/BASE_URL";
import PlayerMoreOptionModalComponent from "./PlayerMoreOptionModalComponent";
import { ListItem, Text, Switch } from "react-native-ui-lib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastBackgroundGlobalColors } from "../styles/globalStyles";
import { ExpandableSection, Drawer } from "react-native-ui-lib";
import AttendanceMarkComponent from "./AttendanceMarkComponent";
import { Icon } from "react-native-elements/dist/icons/Icon";

const BoyComponent = (props) => {
  const [addPlayerArea, setAddPlayerArea] = useState(false);
  const [modalOpen, setModelOpen] = useState(false);
  const boysList = props.data;
  const [singlePlayerObj, setSinglePlayerObj] = useState(null);
  const [attendanceView, setAttendanceView] = useState(true);
  const [switchVal, setSwitchVal] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [date, setDate] = useState(new Date());

  // const [singlePlayerObj, setSinglePlayerObj] = useState(null);
  // const [attendanceView, setAttendanceView] = useState(false);
  //  const [switchVal, setSwitchVal] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [dateIn, setDateIn] = useState();
  const [responseMessage, setResponseMessage] = useState();
  //  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  // toasts
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBackgroundColor, setToastBackgroundColor] = useState("");
  const [expanded, setExpanded] = useState(false);

  // const { userType } = userToken;
  // console.log("props sms screen: ", props);
  // const userToken = props.route.params.userToken;
  // const navigation = props.navigation;
  // const userType = props.route.params.userToken.userType;

  // const chevronUp = URL('')
  const onExpandMethod = () => {
    setExpanded(!expanded);
  };
  // const loginUserType = userToken.userType;

  function getHeaderElement() {
    return (
      <View
        style={{ flexDirection: "row", alignSelf: "center", padding: "1%" }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text style={globalStyles.titleText}>Marking Attendance</Text>
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

  console.log("props boys component:  ", props);
  // const girlsList = props.data;
  const { navigation, morePlayerModalOpen, setMorePlayerModalOpen } = props;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      const userToken = getTokenMethod();

      console.log("Token in boys: ", userToken);
    });
    return unsubscribe;
  }, [navigation]);

  const getTokenMethod = async () => {
    try {
      const userToken = await AsyncStorage.getItem("loginToken");
      setUserToken(JSON.parse(userToken));
      console.log("token boys screen: ", userToken);
      return JSON.parse(userToken);
    } catch (error) {
      console.log(error);
    }
  };

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
  const toggleOverlay = () => {
    setMorePlayerModalOpen(!morePlayerModalOpen);
  };

  const openMorePlayerModel = (player) => {
    console.log("one long press player: ", player);
    setSinglePlayerObj(player);
    setMorePlayerModalOpen(true);
  };

  const keyExtractor = (item) => item.id.toString();
  function renderLeftItem(row) {
    return <Text>Left</Text>;
  }
  function renderRow(row, id) {
    // console.log("row : ", row);
    // const statusColor = row.inventory.status === 'Paid' ? Colors.green30 : Colors.red30;

    return (
      <View>
        <Drawer leftItem={renderLeftItem()} useNativeAnimations>
          <ListItem
            // @ts-expect-error
            activeBackgroundColor="green"
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
        </Drawer>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* {userToken && userToken.userType == "Admin" && ( */}
      {/* <ExpandableSection
        top={false}
        expanded={expanded}
        sectionHeader={getHeaderElement()}
        onPress={onExpandMethod}
      >
        <AttendanceMarkComponent
          switchVal={switchVal}
          date={date}
          attendanceSubmitMethod={attendanceSubmitMethod}
          setOpen={setOpen}
        />
      </ExpandableSection> */}
      {/*  )} */}
      {/* <Button onPress={addNewPlayer} title="Add Player" style={styles.button} /> */}

      {/* display add new player component when button click */}
      {/* {addPlayerArea && */}
      {/* <FlatList
        style={globalStyles.listContainer}
        keyExtractor={(item) => item.id.toString()}
        data={boysList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => openMorePlayerModel(item)}
            style={globalStyles.touchableOpacityList}
          >
            <View style={globalStyles.coverListItemView}>
              {item.gender === "Male" || item.gender === "male" ? (
                <Image
                  source={profileImgs.male}
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
        data={boysList}
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
    // <Text style={{paddingTop: 122}}>hi</Text>
  );
};

export default BoyComponent;

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
