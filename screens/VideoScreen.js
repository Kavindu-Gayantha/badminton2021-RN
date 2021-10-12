import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Card,
  Alert,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
// import YoutubePlayer from "react-native-youtube-iframe";
import AddVideoComponent from "../components/AddVideoComponent";
import HeaderComponent from "../components/HeaderComponent";
import { globalStyles } from "../styles/globalStyles";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import { CirclesLoader } from "react-native-indicator";
import { Divider } from "react-native-elements";

const VideoScreen = ({ navigation, route }) => {
  const [playing, setPlaying] = useState(false);
  const [videos, setVideos] = useState([]);
  const { loginUserType } = route.params;

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      getAllVideos();
    });

    return unsubscribe;
  }, [navigation]);

  const getAllVideos = async () => {
    // setUpdateGirs();
    // console.log("girls tab");
    try {
      const request = await axios.get(`${BASE_URL}/video/getAll`);
      // console.log("players get:", typeof(request.data.data));
      setVideos(request.data.data);
      console.log("videos:  ", request.data.data);
      // return request.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addNewVideo = (data) => {
    setVideos([...videos, data]);
  };

  return (
    <View style={globalStyles.container}>
      {/* <HeaderComponent title="Videos" navigation={navigation} />
      {loginUserType && loginUserType == "Admin" && (
        <AddVideoComponent addNewVideo={addNewVideo} />
      )}
      <ScrollView style={styles.container}>
        {videos.length > 0 ? (
          videos.reverse().map((item) => (
            <View key={item.id} style={styles.videos}>
              <YoutubePlayer
                height={300}
                play={playing}
                videoId={item.youtubeLink}
                onChangeState={onStateChange}
              />
      
              <Divider />
            </View>
          ))
        ) : (
          <View style={globalStyles.loader}>
            <CirclesLoader color="green" />
          </View>
        )}
      </ScrollView> */}
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videos: {
    marginBottom: -10,
  },
});
