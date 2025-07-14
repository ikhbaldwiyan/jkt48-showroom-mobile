import React from "react";
import { Box } from "native-base";
import Video from "react-native-video";
import VideoPlayer from "react-native-video-controls";
import Loading from "../../../components/atoms/Loading";
import LiveStreamTabs from "../../../components/molecules/LiveStreamTabs";

const LandscapeLayout = ({
  url,
  isPipMode,
  setIsFullScreen,
  isFullScreen,
  handleStreamError,
  navigation
}) => {
  return (
    <Box flex="2" flexDirection="row">
      <Box flex={1.3}>
        <Box height="100%">
          {url ? (
            !isPipMode ? (
              <VideoPlayer
                source={{ uri: url }}
                style={{
                  flex: 1,
                  position: "absolute",
                  width: "100%",
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
            <Box
              flex={1}
              justifyContent="center"
              alignItems="center"
              backgroundColor="rgba(0, 0, 0, 0.5)"
            >
              <Loading size={25} color="white" />
            </Box>
          )}
        </Box>
      </Box>

      {!isFullScreen && !isPipMode && (
        <Box pt="1" p="2" flex={1} bg="secondary">
          <LiveStreamTabs />
        </Box>
      )}
    </Box>
  );
};

export default LandscapeLayout;
