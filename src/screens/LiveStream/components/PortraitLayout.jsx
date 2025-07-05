import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Box, View } from "native-base";
import Video from "react-native-video";
import VideoPlayer from "react-native-video-controls";
import Loading from "../../../components/atoms/Loading";
import LiveStreamTabs from "../../../components/molecules/LiveStreamTabs";

const PortraitLayout = ({
  url,
  isPipMode,
  isFullScreen,
  setIsFullScreen,
  handleStreamError,
  navigation
}) => {
  return (
    <>
      <Box height={isFullScreen ? Dimensions.get("window").height : 200}>
        {url ? (
          !isPipMode ? (
            <VideoPlayer
              source={{ uri: url }}
              style={{
                flex: 1,
                position: "absolute",
                width: Dimensions.get("window").width,
                height: "100%"
              }}
              toggleResizeModeOnFullscreen={false}
              onEnterFullscreen={() => setIsFullScreen(true)}
              onExitFullscreen={() => setIsFullScreen(false)}
              onError={handleStreamError}
              onEnd={() => {
                navigation.navigate("Main");
              }}
              disableSeekbar
              disableBack
              disableTimer
            />
          ) : (
            <Video
              source={{ uri: url }}
              playInBackground
              pictureInPicture
              style={{
                flex: 1,
                width: "100%",
                height: "100%"
              }}
              resizeMode="cover"
            />
          )
        ) : (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)"
            }}
          >
            <Loading size={25} color="white" />
          </View>
        )}
      </Box>
      <Box flex="1" p="2">
        {!isFullScreen && <LiveStreamTabs />}
      </Box>
    </>
  );
};

export default PortraitLayout; 