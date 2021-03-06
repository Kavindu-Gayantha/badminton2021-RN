import * as React from "react";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import { ListItem, Icon, Overlay, Card } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const list = [
  {
    title: "Profile",
    icon: "person",
  },
  {
    title: "Help",
    icon: "help",
  },
  {
    title: "Log out",
    icon: "logout",
  },
  {
    title: "About",
    icon: "info",
  },
];

const SettingsScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTokenMethod();
    });
    return unsubscribe;
  }, [navigation]);

  const editListItemPressed = (item) => {
    console.log("itemp pressed: ", item);
    switch (item) {
      case "About":
        {
          toggleOverlay();
        }
        break;
      case "Profile":
        {
          navigation.navigate("MyProfile", { userToken: userToken });
        }
        break;
      case "Help":
        {
          navigation.navigate("Help");
        }
        break;
      case "Log out": {
        AsyncStorage.clear().then(navigation.navigate("Login"));
      }
    }
  };

  const getTokenMethod = async () => {
    try {
      const token = await AsyncStorage.getItem("loginToken");
      setUserToken(JSON.parse(token));

      return userToken;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {list.map((item, i) => (
        <ListItem
          key={i}
          bottomDivider
          onPress={() => editListItemPressed(item.title)}
        >
          <Icon name={item.icon} />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Card>
          <Card.Title style={{ fontSize: 20 }}>Made By:</Card.Title>
          <Text style={{ textAlign: "center" }}>Kavindu Gayantha</Text>
          <Text style={{ textAlign: "center" }}>
            Software Engineering Undergraduate
          </Text>
          <Text style={{ textAlign: "center" }}> University of Kelaniya </Text>
        </Card>
      </Overlay>
    </View>
  );
};
export default SettingsScreen;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#134717",
    height: 50,
    color: "white",
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#98ee99",
  },
  textWrap: {
    flex: 9,
    padding: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  iconWrap: {
    flex: 1,
    padding: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
  },
  overlayTextWrap: {
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    alignSelf: "center",
    flex: 1,
  },
});
