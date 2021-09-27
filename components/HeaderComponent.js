import * as React from "react";
import { Text, Button, View, StyleSheet } from "react-native";
import { Icon, Header } from "react-native-elements";
import { globalStyles } from "../styles/globalStyles";
import LinearGradient from "react-native-linear-gradient";

const HeaderComponent = ({ navigation, title }) => {
  // console.log("props:  ", title);
  return (
    // <View style={styles.titleGrid}>
    //   {/* <Button
    //     onPress={() => navigation.goBack()}
    //     color="#66bb6a"
    //     backgroundColor="#000000"
    //     title="Back"
    //     style={globalStyles.primaryBtn}
    //   >
    //     Back
    //   </Button> */}
    //   <HeaderLeftComponent />
    //   <Text style={styles.title}>{title}</Text>
    //   <Text style={styles.titleRight}>Go Home</Text>
    // </View>
    <Header
      // linearGradientProps={{
      //   colors: ["red", "pink"],
      //   start: { x: 0, y: 0.5 },
      //   end: { x: 1, y: 0.5 },
      // }}
      // ViewComponent={LinearGradient}
      containerStyle={styles.titleGrid}
      leftComponent={<HeaderLeftComponent navigation={navigation} />}
      centerComponent={<HeaderCenterComponent title={title} />}
      rightComponent={<HeaderRightComponent navigation={navigation} />}
    />
  );
};
const HeaderLeftComponent = ({ navigation }) => {
  return (
    <Icon
      raised
      name="arrow-back"
      type="material"
      color="green"
      onPress={() => navigation.goBack()}
    />
  );
};

const HeaderCenterComponent = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

const HeaderRightComponent = ({ navigation }) => {
  return (
    <Icon
      raised
      name="home"
      type="material"
      color="green"
      onPress={() => navigation.navigate("HomeTabs")}
    />
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  titleGrid: {
    // top: 0,
    backgroundColor: "#134717",
    fontWeight: "bold",
    alignItems: "center",
    // backgroundImage
    // height: 100,
    // padding: 10,
  },
  titleLeft: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "row",
    backgroundColor: "#32A335",
    alignContent: "center",
  },
  title: {
    flex: 3,
    textAlign: "center",
    // flexDirection: "row",
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  titleRight: {
    flex: 1,
    textAlign: "center",
    flexDirection: "row",
  },
});
