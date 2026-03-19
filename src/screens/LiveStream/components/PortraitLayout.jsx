import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Box, View } from "native-base";
import Video from "react-native-video";
import VideoPlayer from "react-native-video-controls";
import Loading from "../../../components/atoms/Loading";
import LiveStreamTabs from "../../../components/molecules/LiveStreamTabs";
import Orientation from "react-native-orientation-locker";

const PortraitLayout = ({
  url,
  isPipMode,
  isFullScreen,
  handleStreamError,
  navigation,
}) => {
  const { height } = useWindowDimensions();

  return (
    <>
      <Box height={isFullScreen ? height : 200}>
        {url ? (
          !isPipMode ? (
            <VideoPlayer
              source={{ uri: url }}
              style={{
                flex: 1,
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
              resizeMode={!isFullScreen ? "cover" : "contain"}
              toggleResizeModeOnFullscreen={false}
              onEnterFullscreen={() => Orientation.lockToLandscape()}
              onExitFullscreen={() => Orientation.lockToPortrait()}
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
                height: "100%",
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
              backgroundColor: "rgba(0, 0, 0, 0.5)",
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
