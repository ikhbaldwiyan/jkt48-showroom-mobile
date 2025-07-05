import React, { useEffect, useState, useLayoutEffect } from "react";
import { LogBox, StatusBar } from "react-native";
import { Box, Button, HStack, Text, useToast } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { activityLog } from "../../utils/activityLog";
import { formatName } from "../../utils/helpers";
import { LiveIcon, RefreshIcon } from "../../assets/icon";
import { usePipMode, useRefresh, useUser, useLandscape } from "../../utils/hooks";
import trackAnalytics from "../../utils/trackAnalytics";
import useLiveStreamStore from "../../store/liveStreamStore";
import useThemeStore from "../../store/themeStore";

import Views from "../../components/atoms/Views";
import MenuList from "./components/MenuList";
import LandscapeLayout from "./components/LandscapeLayout";
import PortraitLayout from "./components/PortraitLayout";

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
  const { isPipMode } = usePipMode();
  const isLandscape = useLandscape();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack space={2} alignItems="center">
          <Button
            px="1.5"
            size="xs"
            onPress={handleRefresh}
            isLoading={refreshing}
            borderRadius="md"
            background="black"
            mr="0.5"
          >
            <RefreshIcon />
          </Button>
          <Views
            color="primary"
            number={liveInfo?.views ?? profile?.view_num ?? 0}
          />
          <MenuList />
        </HStack>
      ),
      headerShown: isPipMode || isFullScreen || isLandscape ? false : true
    });
  }, [profile, liveInfo, refreshing, isFullScreen, mode, isPipMode, isLandscape]);

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

  return (
    <Box flex="1" bg="secondary">
      {isLandscape ? (
        <LandscapeLayout
          url={url}
          isPipMode={isPipMode}
          isFullScreen={isFullScreen}
          profile={profile}
          setIsFullScreen={setIsFullScreen}
          handleEndLive={handleEndLive}
          handleStreamError={handleStreamError}
          navigation={navigation}
          isLandscape={isLandscape}
        />
      ) : (
        <PortraitLayout
          url={url}
          isPipMode={isPipMode}
          isFullScreen={isFullScreen}
          profile={profile}
          setIsFullScreen={setIsFullScreen}
          handleEndLive={handleEndLive}
          handleStreamError={handleStreamError}
          navigation={navigation}
        />
      )}
    </Box>
  );
};

export default LiveStream;
