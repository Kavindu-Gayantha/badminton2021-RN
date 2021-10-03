import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    top: 1,
    backgroundColor: "#98ee99",
    // backgroundColor: "white"
  },
  loader: {
    justifyContent: "center",
    // alignContent: 'center',
    flex: 1,
    alignSelf: "center",
  },
  titleText: {
    color: "#08570A",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    // fontFamily: 'nunito-bold'
  },
  primaryBtn: {
    color: "#32A335",
    // buttonColor: '',
    // backgroundColor: '',
  },
  secondaryBtn: {
    color: "white",
  },
  listContainer: {
    backgroundColor: "#98ee99",
    marginBottom: 5,
    // shadowColor:
  },
  listItem: {
    marginLeft: -4,
    paddingLeft: 5,
    backgroundColor: "white",
    // margin: 1,
    color: "#000000",
    fontWeight: "bold",
    // height: 70,
    textAlignVertical: "center",
    fontSize: 18,
    //  borderRadius: 1,
    flex: 3,
  },
  listItem2: {
    // margin: 1,
    paddingLeft: 10,
    backgroundColor: "white",
    // margin: 1,
    color: "#000000",
    fontWeight: "bold",
    // height: 70,
    //  textAlignVertical: 'center',
    fontSize: 18,
    borderRadius: 1,
    flex: 1,
  },
  touchableOpacityList: {
    margin: 1,
    color: "white",
    // width: '80%',
    height: 70,
    flex: 1, //here you can use flex:1 also
    // textAlignVertical: 'center',
    flexDirection: "row",
    // width: '100%'
  },
  flatListImg: {
    height: 70,
    width: 70,
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  coverListItemView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    // width: 80, // alignItems: 'center',
    textAlignVertical: "center",
    // flexDirection: 'column'
    // maxWidth: '100%'
    backgroundColor: "white",
  },
  noDataContainer: {
    backgroundColor: "white",
    margin: 0,
  },
  noDataMsg: {
    fontSize: 12,
    paddingTop: 2,
    color: "green",
    textAlign: "center",
  },
});

export const profileImgs = {
  male: require("../assets/profileMen.jpg"),
  female: require("../assets/profileWomen.jpg"),
};

export const ToastBackgroundGlobalColors = {
  success: "green",
  fail: "red",
};
