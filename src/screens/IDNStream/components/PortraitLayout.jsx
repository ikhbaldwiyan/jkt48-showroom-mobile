import React from "react";
import { Dimensions } from "react-native";
import { Box } from "native-base";
import Video from "react-native-video";
import VideoPlayer from "react-native-video-controls";
import Loading from "../../../components/atoms/Loading";
import IDNLiveTabs from "../../../components/molecules/IDNLiveTabs";

const PortraitLayout = ({
  url,
  isPipMode,
  isFullScreen,
  customHeight,
  isOfficial,
  profile,
  setIsFullScreen,
  handleEndLive,
  handleStreamError,
  setProfile
}) => {
  return (
    <>
      <Box
        height={
          isFullScreen
            ? Dimensions.get("window").height
            : isPipMode
              ? 180
              : customHeight
        }
      >
        {url ? (
          !isPipMode ? (
            <VideoPlayer
              source={{ uri: url }}
              style={{
                position: "absolute",
                width: "100%",
                height: isFullScreen
                  ? Dimensions.get("window").height
                  : customHeight
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
                height: 400
              }}
            />
          )
        ) : (
          <Loading color="white" />
        )}
      </Box>
      <IDNLiveTabs profile={profile} setProfile={setProfile} />
    </>
  );
};

export default PortraitLayout; 