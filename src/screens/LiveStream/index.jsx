import { Box, Button, HStack, Spinner, Text, useToast } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { STREAM } from "../../services";
import { formatName } from "../../utils/helpers";
import VideoPlayer from "react-native-video-controls";
import Views from "../../components/atoms/Views";
import LiveStreamTabs from "../../components/molecules/LiveStreamTabs";
import useUser from "../../utils/hooks/useUser";
import { activityLog } from "../../utils/activityLog";
import { Dimensions, LogBox } from "react-native";
import { RefreshIcon } from "../../assets/icon";
import { useRefresh } from "../../utils/hooks/useRefresh";

const LiveStream = () => {
  const route = useRoute();
  const { params } = route;
  const navigation = useNavigation();
  const [profile, setProfile] = useState();
  const [liveInfo, setLiveInfo] = useState({});
  const [url, setUrl] = useState();
  const { session, userProfile } = useUser();
  const { refreshing, onRefresh } = useRefresh();
  const toast = useToast();

  useEffect(() => {
    setProfile(params.item);
    getLiveInfo();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack space={2} alignItems="center">
          {/* <Button
            onPress={onRefresh}
            isLoading={refreshing}
            borderRadius="md"
            py="1"
            background="teal"
            size="xs"
          >
            <RefreshIcon />
          </Button> */}
          <Views number={liveInfo?.views ?? profile?.view_num ?? 0} />
        </HStack>
      )
    });
  }, [profile, liveInfo, refreshing]);

  async function getLiveInfo() {
    try {
      const response = await STREAM.getStreamInfo(
        profile?.room_id,
        session?.cookie_login_id ?? "cookies"
      );
      setLiveInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getLiveInfo();
    }, 1000);

    const interval = setInterval(() => {
      getLiveInfo();
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [profile, refreshing]);

  useEffect(() => {
    async function getUrl() {
      const streams = await STREAM.getStreamUrl(
        profile?.room_id,
        session?.cookie_login_id
      );
      setUrl(streams?.data[0]?.url);
    }

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
    async function registerUserRoom() {
      try {
        await STREAM.visitRoom({
          cookies_login_id: session?.cookie_login_id,
          room_id: profile?.room_id
        });
      } catch (error) {
        console.log(error);
      }
    }

    registerUserRoom();
  }, [profile, session]);

  useEffect(() => {
    const room_name = formatName(profile?.room_url_key);

    if (userProfile) {
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
  }, [liveInfo]);

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
    }
    navigation.navigate("Main");
  };

  return (
    <Box flex="1" bg="secondary">
      {url ? (
        <>
          <Box height={200}>
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
              onEnd={() => {
                navigation.navigate("Main");
              }}
            />
          </Box>
          <Box flex={1} p="2">
            <LiveStreamTabs
              profile={profile}
              setProfile={setProfile}
              isPremiumLive={liveInfo.isPremiumLive}
            />
          </Box>
        </>
      ) : (
        <Box flex="1" justifyContent="center" alignItems="center">
          <Spinner size={50} color="white" />
        </Box>
      )}
    </Box>
  );
};

export default LiveStream;
