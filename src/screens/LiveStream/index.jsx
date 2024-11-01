import React, { useEffect, useState, useLayoutEffect } from "react";
import { Dimensions, LogBox, StatusBar, StyleSheet } from "react-native";
import { Box, Button, HStack, Text, useToast, View } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { activityLog } from "../../utils/activityLog";
import { formatName } from "../../utils/helpers";
import { LiveIcon, PipIcon, RefreshIcon } from "../../assets/icon";
import { usePipMode, useRefresh, useUser } from "../../utils/hooks";
import trackAnalytics from "../../utils/trackAnalytics";
import useLiveStreamStore from "../../store/liveStreamStore";
import useThemeStore from "../../store/themeStore";

import Video from "react-native-video";
import Views from "../../components/atoms/Views";
import VideoPlayer from "react-native-video-controls";
import Loading from "../../components/atoms/Loading";
import LiveStreamTabs from "../../components/molecules/LiveStreamTabs";
import QualitySettings from "../../components/atoms/QualitySettings";

const LiveStream = () => {
  const route = useRoute();
  const { params } = route;
  const navigation = useNavigation();
  const {
    url,
    profile,
    liveInfo,
    setProfile,
    getLiveInfo,
    getStreamUrl,
    getStreamOptions,
    registerUserRoom,
    clearLiveStream,
    clearUrl
  } = useLiveStreamStore();
  const toast = useToast();
  const { user, session, userProfile } = useUser();
  const { refreshing, onRefresh } = useRefresh();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { mode } = useThemeStore();
  const { isPipMode, enterPipMode } = usePipMode();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack space={3.5} alignItems="center">
          <Button
            px="0"
            size="xs"
            onPress={handleRefresh}
            isLoading={refreshing}
            borderRadius="md"
            background="black"
          >
            <RefreshIcon />
          </Button>
          {!isPipMode && (
            <Button
              px="0"
              size="xs"
              onPress={() => enterPipMode(16, 9)}
              borderRadius="md"
              background="black"
            >
              <PipIcon />
            </Button>
          )}
          <QualitySettings refreshing={refreshing} />
          <Views
            color="primary"
            number={liveInfo?.views ?? profile?.view_num ?? 0}
          />
        </HStack>
      ),
      headerShown: isPipMode || isFullScreen ? false : true,
    });
  }, [profile, liveInfo, refreshing, isFullScreen, mode, isPipMode]);

  useEffect(() => {
    setProfile(params.item);
    fetchLiveInfo();

    return () => {
      clearLiveStream();
      clearUrl();
    };
  }, []);

  const handleRefresh = async () => {
    onRefresh();
    clearUrl();

    trackAnalytics("refresh_button", {
      username: user?.account_id ?? "Guest"
    });
  };

  async function fetchLiveInfo() {
    await getLiveInfo(profile?.room_id, session?.cookie_login_id);
  }

  async function getUrl() {
    await getStreamUrl(profile?.room_id, session?.cookie_login_id);
    await getStreamOptions(profile?.room_id, session?.cookie_login_id);
  }

  useEffect(() => {
    setTimeout(() => {
      fetchLiveInfo();
    }, 1000);

    const interval = setInterval(() => {
      fetchLiveInfo();
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [profile, refreshing]);

  useEffect(() => {
    getUrl();
  }, [profile, refreshing]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:
        profile?.room_url_key && profile?.room_url_key !== "officialJKT48"
          ? formatName(profile?.room_url_key, true)
          : profile?.main_name?.replace("SHOWROOM", "")
    });
  }, [profile]);

  useEffect(() => {
    if (session && profile) {
      registerUserRoom(session, profile);
    }
  }, [profile, session]);

  useEffect(() => {
    const room_name = formatName(profile?.room_url_key);

    if (userProfile && url) {
      activityLog({
        logName: "Watch",
        userId: userProfile?._id,
        description: `Watch Live ${room_name} Room`,
        liveId: profile?.live_id
      });

      trackAnalytics("watch_showroom_live", {
        username: user?.account_id ?? "Guest",
        room: profile?.room_url_key
      });
    }
    LogBox.ignoreAllLogs(true);
  }, [profile, url, userProfile]);

  useEffect(() => {
    if (liveInfo && liveInfo?.views === 0 && !url) {
      handleEndLive(profile?.room_url_key);
    }
  }, [liveInfo, profile]);

  const handleEndLive = (name) => {
    if (name !== undefined) {
      toast.show({
        render: () => {
          return (
            <Box bg="red" px="2" mt="10" m="3" py="1" rounded="sm" mb={5}>
              <Text>{formatName(name)} Offline</Text>
            </Box>
          );
        },
        placement: "top-right"
      });
    } else {
      toast.show({
        render: () => {
          return (
            <Box bg="red" px="2" mt="10" m="3" py="1" rounded="sm" mb={5}>
              <HStack alignItems="center" space="2">
                <LiveIcon size={14} />
                <Text>Live streaming ended</Text>
              </HStack>
            </Box>
          );
        },
        placement: "top-right"
      });
    }
    navigation.replace("RoomDetail", {
      room: {
        room_id: profile?.room_id
      }
    });
  };

  const handleStreamError = () => {
    handleRefresh();
    console.log("Refreshing Error Stream");
  };

  useEffect(() => {
    StatusBar.setHidden(isFullScreen);

    if (isFullScreen) {
      trackAnalytics("open_full_screen_showroom", {
        username: userProfile?.user_id ?? "Guest",
        room: profile?.user?.name
      });
    }

    return () => {
      StatusBar.setHidden(false);
    };
  }, [isFullScreen]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", () => {
      setIsFullScreen(!isFullScreen);
    });
    return () => subscription?.remove();
  });

  return (
    <Box flex="1" bg="secondary">
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
                position: "absolute",
                width: Dimensions.get("window").width,
                height: "100%"
              }}
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
      <Box flex={1} p="2">
        {!isFullScreen && <LiveStreamTabs />}
      </Box>
    </Box>
  );
};

export default LiveStream;
