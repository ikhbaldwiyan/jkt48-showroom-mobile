import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, Button, HStack, Text, useToast } from "native-base";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  LogBox,
  StatusBar
} from "react-native";

import { RefreshIcon } from "../../assets/icon";
import useIDNLiveStore from "../../store/idnLiveStore";
import { activityLog } from "../../utils/activityLog";
import { formatName } from "../../utils/helpers";
import { usePipMode, useRefresh, useUser, useLandscape } from "../../utils/hooks";
import trackAnalytics from "../../utils/trackAnalytics";

import Views from "../../components/atoms/Views";
import LandscapeLayout from "./components/LandscapeLayout";
import MenuIDN from "./components/MenuIDN";
import PortraitLayout from "./components/PortraitLayout";

const IDNStream = () => {
  const route = useRoute();
  const { params } = route;
  const toast = useToast();
  const navigation = useNavigation();
  const { userProfile } = useUser();
  const isLandscape = useLandscape();
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
      headerTitle: formatName(profile?.user?.name, true),
      headerShown: isPipMode || isFullScreen || isLandscape ? false : true,
    });
  }, [profile, isFullScreen, isPipMode, isLandscape]);

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
    navigation.replace("IDNLives");
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
      {isLandscape ? (
        <LandscapeLayout
          profile={profile}
          setProfile={setProfile}
          url={url}
          isPipMode={isPipMode}
          isFullScreen={isFullScreen}
          isOfficial={isOfficial}
          setIsFullScreen={setIsFullScreen}
          handleEndLive={handleEndLive}
          handleStreamError={handleStreamError}
        />
      ) : (
        <PortraitLayout
          profile={profile}
          setProfile={setProfile}
          url={url}
          isPipMode={isPipMode}
          isFullScreen={isFullScreen}
          customHeight={customHeight}
          isOfficial={isOfficial}
          setIsFullScreen={setIsFullScreen}
          handleEndLive={handleEndLive}
          handleStreamError={handleStreamError}
        />
      )}
    </Box>
  );
};

export default IDNStream;
