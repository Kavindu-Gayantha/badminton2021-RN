import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 3,
    top: 18,
    // backgroundColor: "#66bb6a"
  },
  loader: {
    justifyContent: 'center',
    // alignContent: 'center',
    flex: 1,
    alignSelf: 'center'
  },
  titleText: {
    color: '#08570A',
    fontSize: 30,
    // fontFamily: 'nunito-bold'
  },
  primaryBtn: {
    color: '#32A335',
    // buttonColor: '',
    // backgroundColor: '',
  },
  secondaryBtn: {
    color: 'white'
  },
   listContainer: {
    backgroundColor: '#66bb6a',
  },
   listItem: {
        margin: 1,
        paddingLeft: 10,
        backgroundColor: 'white',
        margin: 2,
        color: '#000000',
        fontWeight: 'bold',
        height: 100,
     textAlignVertical: 'center',
     fontSize: 18,
     borderRadius: 10,
        flex: 3,
  },
  touchableOpacityList: {
    margin: 2,
    color: 'white',
    // width: '80%',
    height: 100,
    flex:1, //here you can use flex:1 also
    // textAlignVertical: 'center',
    flexDirection: 'row',
    // width: '100%'
  },
  flatListImg: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 1,
    // flex: 1/4,
  },
  coverListItemView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    // width:70,    // alignItems: 'center',
    textAlignVertical: 'center',
    // flexDirection: 'row'
  }
  
})

export const profileImgs = {
  'male': require('../assets/profileMen.jpg'),
  'female': require('../assets/profileWomen.jpg')
}