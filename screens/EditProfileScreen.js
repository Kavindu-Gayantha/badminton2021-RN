import * as React from "react";
import { Text, View } from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import { globalStyles } from "../styles/globalStyles";

const EditProfileScreen = ({ navigation }) => {
  console.log("props edit profile: ", navigation);
  return (
    <View style={globalStyles.container}>
      <HeaderComponent title="Edit Profile" navigation={navigation} />
      <Text>edit profile screen</Text>
    </View>
  );
};
export default EditProfileScreen;
