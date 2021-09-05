import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";

const AddVideoComponent = (props) => {
  // console.log("props add new vide : ", props);
  const [urlLink, setUrlLink] = useState("");

  const onSubmiYoutubeLink = () => {
    // console.log("youuuuu: ", urlLink);
    const body = {
      youtubeLink: urlLink,
    };
    if (body.youtubeLink !== "") {
      addYoutubeLink(body).then(() => setUrlLink(""));
    }
  };

  const convertYoutubeLinkToYoutubeId = (response) => {
    const youtubeLink = response.youtubeLink.toString();
    // console.log("responsessssss: ", youtubeLink);

    const videoId = youtubeLink.substring(17, youtubeLink.length);
    console.log("id:  ", videoId);

    if (videoId) {
      const videoNewObj = {
        id: response.id,
        youtubeLink: videoId,
      };
      props.addNewVideo(videoNewObj);
    }
  };

  //Create player API here
  const addYoutubeLink = async (body) => {
    try {
      const request = await axios.post(`${BASE_URL}/video/create`, body);
      // setShowSubmitTxt(true);
      // setResponseMessage(request.data.statusMessage);
      setUrlLink(request.data.data);
      convertYoutubeLinkToYoutubeId(request.data.data);
      console.log("request response", request.data.statusMessage);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.addVideoContainer}>
      <View style={styles.urlInputView}>
        <TextInput
          placeholder="Youtube Video Link"
          onChangeText={(value) => setUrlLink(value)}
          
          style={styles.inputBox}
        />
      </View>
      <View style={styles.urlInputViewBtn}>
        <Button title="OK" onPress={onSubmiYoutubeLink} />
      </View>
    </View>
  );
};

export default AddVideoComponent;

const styles = StyleSheet.create({
  inputBox: {
    borderColor: "white",
    color: "green",
  },
  addVideoContainer: {
    margin: 5,
    padding: 5,
    flex: 1 / 9,
    // borderColor: 'red',
    flexDirection: "row",
  },
  urlInputView: {
    flex: 3,
  },
  urlInputViewBtn: {
    flex: 1,
  },
});
