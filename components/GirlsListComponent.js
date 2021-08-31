import * as React from "react";
import { Text, View,Image, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles, profileImgs } from "../styles/globalStyles";


const GirlsComponent = (props) => {
  const girlsList = props.data;


  return (
    <View style={styles.container}>
      <FlatList
        style={globalStyles.listContainer}
        keyExtractor={item => item.id.toString()}   
        data={girlsList}
        renderItem={({ item }) => (
          <TouchableOpacity  
              style={globalStyles.touchableOpacityList}>
                <View style={globalStyles.coverListItemView}>
                {(item.gender === "Male" || item.gender === 'male') ?
                  <Image
                  source={profileImgs.male}
                  // width="10"
                    style={globalStyles.flatListImg}
                  /> :
                  <Image
                    source={profileImgs.female}
                    style={globalStyles.flatListImg}
                    />}
                </View>
            {/* <View style={globalStyles.coverListItemView}> */}
              <Text style={globalStyles.listItem} >{item.name} - {item.facultyName} </Text>
              {/* </View> */}
           </TouchableOpacity>
        )}  
      />
    </View>
  );
}

export default GirlsComponent;

const styles = StyleSheet.create({
  container: {
 flex: 12,
        backgroundColor: 'white',
        // alignItems: 'center',
        justifyContent: 'center',
        // marginTop: '1%',
  },
  playerList: {
    // maxHeight: Dimensions.get('screen')
    backgroundColor: 'white',
    // justifyContent: 'flex-start'
  },
  item: {
    margin: 1,
    paddingLeft: 10,
        backgroundColor: 'blue',
        margin: 2,
    color: 'white',
    height: 100,
  //  alignSelf: 'flex-start',
    textAlignVertical: 'center'
        

  },
  modalContent: {
    backgroundColor: 'yellow',
    flex: 12,
    padding: 12,
    margin: 2,
  },
  button: {
    color: 'red',
    width: '100%',
    margin: '2%',
  },
  closeBtn: {
    color: 'red',
    backgroundColor: 'red'
  }
})