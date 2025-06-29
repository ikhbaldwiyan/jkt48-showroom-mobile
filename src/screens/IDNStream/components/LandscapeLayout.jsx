import React from "react";
import { Box } from "native-base";
import Video from "react-native-video";
import VideoPlayer from "react-native-video-controls";
import Loading from "../../../components/atoms/Loading";
import IDNLiveTabs from "../../../components/molecules/IDNLiveTabs";

const LandscapeLayout = ({
  url,
  isPipMode,
  isOfficial,
  profile,
  setIsFullScreen,
  handleEndLive,
  handleStreamError,
  setProfile
}) => {
  return (
    <Box flex="1" flexDirection="row">
      {/* Video Section */}
      <Box flex={1}>
        <Box height="100%">
          {url ? (
            !isPipMode ? (
              <VideoPlayer
                source={{ uri: url }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%"
                }}
                disableSeekbar
                disableBack
                disableTimer
                onEnterFullscreen={() => setIsFullScreen(true)}
                onExitFullscreen={() => setIsFullScreen(false)}
                onEnd={() => handleEndLive()}
                toggleResizeModeOnFullscreen={isOfficial ? false : true}
                onError={handleStreamError}
                poster={profile?.image}
              />
            ) : (
              <Video
                source={{ uri: url }}
                playInBackground
                pictureInPicture
                resizeMode="cover"
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%"
                }}
              />
            )
          ) : (
            <Loading color="white" />
          )}
        </Box>
      </Box>

      {/* Tabs Section */}
      <Box flex={1} bg="secondary">
        <IDNLiveTabs profile={profile} setProfile={setProfile} />
      </Box>
    </Box>
  );
};

export default LandscapeLayout;
