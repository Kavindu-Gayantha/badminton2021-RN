import * as React from "react";
import {useEffect, useState} from "react";
import { Text, View, Button, StyleSheet, Dimensions, FlatList, Modal } from 'react-native';
import CreatePlayer from "./CreatePlayerComponent";


const ModelPlayer = () => {
  const [modalOpen, setModelOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* <Modal visible={modalOpen} animationType="slide">
        
        <View style={styles.modalContent} >
          <Text>odal</Text>
          <CreatePlayer />
        </View>
</Modal> */}
    </View>
  );
}

export default ModelPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 12,
    backgroundColor: 'red',
  }
});