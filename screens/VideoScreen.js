import React, { useState, useCallback, useRef } from "react";
import { View, Text, Alert, Button } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { globalStyles } from "../styles/globalStyles";

const VideoScreen = () => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View style={globalStyles.container}>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={"fRQ4hcOEZQo"}
        onChangeState={onStateChange}
      />
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={"fRQ4hcOEZQo"}
        onChangeState={onStateChange}
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
    </View>
  );
};

export default VideoScreen;
