import * as React from "react";
import { Text, View, Button, StyleSheet, Dimensions, FlatList, Modal } from 'react-native';


const GirlsComponent = (props) => {
  const girlsList = props.data;


  return (
    <View style={styles.container}>
      <FlatList
        style={styles.playerList}
        data={girlsList}
        renderItem={({ item }) => (
          <Text style={styles.item} >
            {item.name}
          </Text>
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