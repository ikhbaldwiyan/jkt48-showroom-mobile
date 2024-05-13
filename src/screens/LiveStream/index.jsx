import React, { useEffect, useLayoutEffect } from "react";
import { Box, Button, HStack, Text, useToast } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { formatName } from "../../utils/helpers";
import VideoPlayer from "react-native-video-controls";
import Views from "../../components/atoms/Views";
import LiveStreamTabs from "../../components/molecules/LiveStreamTabs";
import useUser from "../../utils/hooks/useUser";
import { activityLog } from "../../utils/activityLog";
import { Dimensions, LogBox } from "react-native";
import { LiveIcon, RefreshIcon } from "../../assets/icon";
import { useRefresh } from "../../utils/hooks/useRefresh";
import useLiveStreamStore from "../../store/liveStreamStore";
import Loading from "../../components/atoms/Loading";

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
    registerUserRoom,
    clearLiveStream,
    clearUrl
  } = useLiveStreamStore();
  const { session, userProfile } = useUser();
  const { refreshing, onRefresh } = useRefresh();
  const toast = useToast();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack space={2} alignItems="center">
          <Button
            onPress={handleRefresh}
            isLoading={refreshing}
            borderRadius="md"
            py="1"
            background="teal"
            size="xs"
          >
            <RefreshIcon />
          </Button>
          <Views number={liveInfo?.views ?? profile?.view_num ?? 0} />
        </HStack>
      )
    });
  }, [profile, liveInfo, refreshing]);

  useEffect(() => {
    setProfile(params.item);
    fetchLiveInfo();

    return () => {
      clearLiveStream();
    };
  }, []);

  const handleRefresh = async () => {
    onRefresh();
    clearUrl();
    await getUrl();
  };

  async function fetchLiveInfo() {
    await getLiveInfo(profile?.room_id, session?.cookie_login_id);
  }

  async function getUrl() {
    await getStreamUrl(profile?.room_id, session?.cookie_login_id);
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
          ? formatName(profile?.room_url_key)
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

  return (
    <Box flex="1" bg="secondary">
      <Box height={200}>
        {url ? (
          <VideoPlayer
            source={{ uri: url }}
            style={{
              position: "absolute",
              width: Dimensions.get("window").width,
              height: "100%"
            }}
            disableSeekbar
            disableBack
            disableTimer
            disableFullscreen
            onError={handleStreamError}
            onEnd={() => {
              navigation.navigate("Main");
            }}
          />
        ) : (
          <Loading color="white" />
        )}
      </Box>
      <Box flex={1} p="2">
        <LiveStreamTabs isPremiumLive={liveInfo.isPremiumLive} />
      </Box>
    </Box>
  );
};

export default LiveStream;
