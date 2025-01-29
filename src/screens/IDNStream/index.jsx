import React, { useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, LogBox, StatusBar } from "react-native";
import { Box, Button, HStack, Text, useToast } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { activityLog } from "../../utils/activityLog";
import { formatName } from "../../utils/helpers";
import { RefreshIcon } from "../../assets/icon";
import { usePipMode, useRefresh, useUser } from "../../utils/hooks";
import trackAnalytics from "../../utils/trackAnalytics";
import useIDNLiveStore from "../../store/idnLiveStore";

import Loading from "../../components/atoms/Loading";
import Video from "react-native-video";
import VideoPlayer from "react-native-video-controls";
import Views from "../../components/atoms/Views";
import IDNLiveTabs from "../../components/molecules/IDNLiveTabs";
import MenuIDN from "./components/MenuIDN";

const IDNStream = () => {
  const route = useRoute();
  const { params } = route;
  const toast = useToast();
  const navigation = useNavigation();
  const { userProfile } = useUser();
  const {
    profile,
    setProfile,
    getLiveProfile,
    clearLiveStream,
    getStreamUrl,
    url,
    clearUrl,
  } = useIDNLiveStore();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { refreshing, onRefresh } = useRefresh();
  const { isPipMode } = usePipMode();
  const isOfficial = profile?.user?.name === "JKT48";
  const customHeight = isOfficial ? 200 : 400;

  useEffect(() => {
    setProfile(params.item);
    getStreamUrl(params?.item.user?.username);

    return () => {
      clearLiveStream();
      clearUrl();
    };
  }, []);

  async function fetchLiveInfo() {
    await getLiveProfile(profile?.user?.username);
  }

  const handleRefresh = async () => {
    onRefresh();
    clearUrl();
    await getStreamUrl(profile?.user?.username);

    trackAnalytics("refresh_idn_button", {
      username: userProfile?.name ?? "Guest",
      room: profile?.user?.name,
    });
  };

  useEffect(() => {
    profile && getStreamUrl(profile?.user?.username);
  }, [profile, refreshing]);

  useEffect(() => {
    setProfile(params.item);
  }, []);

  useEffect(() => {
    if (url) {
      trackAnalytics("watch_idn_live", {
        username: userProfile?.name ?? "Guest",
        room: profile?.user?.name,
      });
    }
  }, [userProfile, url]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack space={2} alignItems="center">
          <Button
            py="1"
            size="xs"
            onPress={handleRefresh}
            isLoading={refreshing}
            borderRadius="md"
            background="black"
            px="1.5"
          >
            <RefreshIcon />
          </Button>
          <Views number={profile?.view_count ?? 0} />
          <MenuIDN />
        </HStack>
      ),
    });
  }, [profile, refreshing, isPipMode]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:
        profile?.user?.name !== "JKT48"
          ? formatName(profile?.user?.name, true)
          : profile?.user?.name,
      headerShown: isPipMode || isFullScreen ? false : true,
    });
  }, [profile, isFullScreen, isPipMode]);

  useEffect(() => {
    if (userProfile && url) {
      activityLog({
        logName: "Watch",
        userId: userProfile?._id,
        description: `Watch IDN Live ${profile?.user?.name}`,
        liveId: profile?.slug,
      });
    }
    LogBox.ignoreAllLogs(true);
  }, [params.item, profile, userProfile, url]);

  const handleEndLive = () => {
    navigation.navigate("Main");
    toast.show({
      render: () => {
        return (
          <Box bg="red" px="2" mt="10" m="3" py="1" rounded="sm" mb={5}>
            <Text>{profile?.user?.name ?? "Room"} Offline</Text>
          </Box>
        );
      },
      placement: "top-right",
    });
  };

  useEffect(() => {
    StatusBar.setHidden(isFullScreen);

    if (isFullScreen) {
      trackAnalytics("open_full_screen_idn", {
        username: userProfile?.name ?? "Guest",
        room: profile?.user?.name,
      });
    }

    return () => {
      StatusBar.setHidden(false);
    };
  }, [isFullScreen]);

  useEffect(() => {
    setTimeout(() => {
      fetchLiveInfo();
    }, 1000);

    const interval = setInterval(() => {
      fetchLiveInfo();
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshing]);

  const handleStreamError = () => {
    handleRefresh();
  };

  return (
    <Box flex="1" bg="secondary">
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
    </Box>
  );
};

export default IDNStream;
