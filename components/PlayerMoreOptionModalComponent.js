import React from 'react'
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { Icon, Overlay } from 'react-native-elements';

const PlayerMoreOptionModalComponent = (props) => {
  // console.log("prps model compoonent; ", props);

  const {
    singlePlayerObj,
    setMorePlayerModalOpen,
    morePlayerModalOpen,
    toggleOverlay,
    navigation
  } = props;


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
    <View>
      <Overlay isVisible={morePlayerModalOpen} onBackdropPress={toggleOverlay}>
        <Text style={styles.morePlayersModalTitle}>
          {singlePlayerObj != null && singlePlayerObj.name}
        </Text>
        <View style={styles.morePlayerModalContent}>
          <View style={styles.morePlayerBtns}>
            <Icon
              name="edit"
              type="material"
              color="green"
              onPress={() => onPressMorePlayerModelIcon("edit")}
            />
          </View>
          <View style={styles.morePlayerBtns}>
            <Icon
              name="delete"
              type="material"
              color="green"
              onPress={() => onPressMorePlayerModelIcon("delete")}
            />
          </View>
          <View style={styles.morePlayerBtns}>
            <Icon
              name="person"
              type="material"
              color="green"
              onPress={() => onPressMorePlayerModelIcon("profile")}
            />
          </View>
        </View>
      </Overlay>
    </View>
  );
}

export default PlayerMoreOptionModalComponent

const styles = StyleSheet.create({
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
});
