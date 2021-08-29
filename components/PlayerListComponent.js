import * as React from "react";
import {useEffect, useState} from "react";
import { Text, View, Button, StyleSheet, Dimensions, FlatList, Modal, TouchableOpacity, Image } from 'react-native';
import CreatePlayer from "./CreatePlayerComponent";
import { globalStyles, profileImgs } from "../styles/globalStyles";


const PlayerComponent = (props) => {
  const [addPlayerArea, setAddPlayerArea] = useState(false);
   const [modalOpen, setModelOpen] = useState(false);
  const players = props.data;
  // console.log("props::", props);
  
  const addNewPlayer = () => {
    setModelOpen(true);
  }

  const closeModal = () => {
    setModelOpen(false);
  }
   
  
  return (
    <View style={styles.container}>
      <Button onPress={addNewPlayer} title="Add Player" color="#41733f" style={globalStyles.primaryBtn} />
      
      {/* display add new player component when button click */}
      {/* {addPlayerArea && */}
       <Modal visible={modalOpen} animationType="slide">
        
          <View style={styles.modalContent} >
         
          <CreatePlayer setPlayers={props.setPlayers} />
          
          <Button onPress={closeModal} color="red" style={styles.closeBtn} title="close" />
        </View>
        
      </Modal>
       
      <FlatList
          style={globalStyles.listContainer}
          keyExtractor={item => item.id.toString()}         
          data={players}
          renderItem={({ item }) => (
            <TouchableOpacity  
              style={globalStyles.touchableOpacityList}>
                <View style={globalStyles.coverListItemView}>
                {item.gender === "male" ?
                  <Image
                  source={profileImgs.male}
                  // width="10"
                    style={{height:90, width: 90, borderRadius: 50, justifyContent: 'center', alignItems:'center'}}
                  /> :
                  <Image
                    source={profileImgs.female}
                    style={{height:90, width: 90, borderRadius: 50, justifyContent: 'center', alignItems:'center'}}
                    />}
                </View>
            {/* <View style={globalStyles.coverListItemView}> */}
              <Text style={globalStyles.listItem} >{item.name}</Text>
              {/* </View> */}
                 </TouchableOpacity>
           
          )}
        />
    </View>
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
    color: 'white',
    height: 100,
    flex:1, //here you can use flex:1 also
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