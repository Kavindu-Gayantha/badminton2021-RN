import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

const AddVideoComponent = () => {
  const [urlLink, setUrlLink] = useState("");

  const addYoutubeLink = () => {
    const videoId = convertLinkIntoYoutubeVideoId(urlLink);
  };
  return (
    <View style={styles.addVideoContainer}>
      <TextInput
        placeholder="First Name"
        onChangeText={(value) => setUrlLink(value)}
        value={urlLink}
        style={styles.inputBox}
      />
      <Button title="OK" onPress={addYoutubeLink} />
    </View>
  );
};

export default AddVideoComponent;

const styles = StyleSheet.create({
  inputBox: {},
});
