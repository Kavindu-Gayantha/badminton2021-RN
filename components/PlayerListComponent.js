import * as React from "react";
import {useEffect, useState} from "react";
import { Text, View, Button, StyleSheet, Dimensions, FlatList, Modal } from 'react-native';
import CreatePlayer from "./CreatePlayerComponent";
import ModelPlayer from "./ModelCreatePlayer";


const PlayerComponent = (props) => {
  const [addPlayerArea, setAddPlayerArea] = useState(false);
   const [modalOpen, setModelOpen] = useState(false);
  const players = props.data;
  
  const addNewPlayer = () => {
    setModelOpen(true);
  }

  const closeModal = () => {
    setModelOpen(false);
  }
   
  
  return (
    <View style={styles.container}>
      <Button onPress={addNewPlayer} title="Add Player" style={styles.button} />
      
      {/* display add new player component when button click */}
      {/* {addPlayerArea && */}
       <Modal visible={modalOpen} animationType="slide">
        
          <View style={styles.modalContent} >
            
            
          <CreatePlayer />
          <Button onPress={closeModal} color="red" style={styles.closeBtn} title="close" />
          </View>
      </Modal>
        <FlatList
          style={styles.playerList}
                
          data={players}
          renderItem={({ item }) => (
            <Text style={styles.item} >{item.name}</Text>
          )}
        />
    </View>
    // <Text style={{paddingTop: 122}}>hi</Text>
  );
}

export default PlayerComponent;

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