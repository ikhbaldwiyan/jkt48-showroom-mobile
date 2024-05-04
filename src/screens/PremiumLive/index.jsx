import React, { useEffect, useLayoutEffect, useState } from "react";
import { Box, HStack, Spinner, Text, useToast } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LogBox } from "react-native";
import VideoPlayer from "react-native-video-controls";
import Views from "../../components/atoms/Views";
import LiveStreamTabs from "../../components/molecules/LiveStreamTabs";
import { STREAM } from "../../services";
import { activityLog } from "../../utils/activityLog";
import useUser from "../../utils/hooks/useUser";
import useLiveStreamStore from "../../store/liveStreamStore";

const PremiumLive = () => {
  const route = useRoute();
  const toast = useToast();
  const navigation = useNavigation();
  const { params } = route;

  const [url, setUrl] = useState();
  const [isPaid, setIsPaid] = useState(false);
  const { session, userProfile } = useUser();

  const roomId = params?.item?.profile?.room_id;
  const setlist = params.item.theater.setlist.name;

  const {
    profile,
    liveInfo,
    setProfile,
    getLiveInfo,
    registerUserRoom,
    clearLiveStream,
  } = useLiveStreamStore();

  useEffect(() => {
    fetchLiveInfo();
    setProfile(params?.item?.profile);
    registerUserRoom(session, profile);

    return () => {
      clearLiveStream();
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack space={2} alignItems="center">
          <Views number={liveInfo?.views ?? profile?.view_num ?? 0} />
        </HStack>
      )
    });
  }, [profile, params.item.profile, liveInfo]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: setlist
    });
  }, [profile]);

  const handleNoTicket = () => {
    toast.show({
      render: () => {
        return (
          <Box bg="red" px="2" mt="3" m="3" py="1" rounded="sm" mb={5}>
            <Text>No Ticket Showroom</Text>
          </Box>
        );
      },
      placement: "bottom"
    });
    navigation.replace("ScheduleDetail", { item: params.item.theater });
  };

  async function fetchLiveInfo() {
    await getLiveInfo(profile?.room_id, session?.cookie_login_id);
  }

  useEffect(() => {
    async function getUrl() {
      const streams = await STREAM.getStreamUrl(roomId, session?.cookie_login_id);

      if (streams.data.code === 404) {
        setIsPaid(false);
        handleNoTicket();
      } else {
        setIsPaid(true);
        setUrl(streams?.data[0]?.url);
      }
    }

    getUrl();
  }, [profile]);

  useEffect(() => {
    registerUserRoom(session, profile);
  }, [profile, session]);

  useEffect(() => {
    setTimeout(() => {
      fetchLiveInfo();
    }, 1000);

    const interval = setInterval(() => {
      fetchLiveInfo();
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [profile]);

  useEffect(() => {
    if (userProfile && isPaid) {
      activityLog({
        logName: "Premium Live",
        userId: userProfile?._id,
        description: `Watch Premium Live ${setlist}`,
        liveId: profile?.live_id
      });
    }
    LogBox.ignoreAllLogs(true);
  }, [profile, url, userProfile]);

  return (
    <Box flex="1" bg="secondary">
      {!isPaid ? (
        <Box flex="1" justifyContent="center" alignItems="center">
          <Spinner size={50} color="white" />
        </Box>
      ) : (
        <>
          <Box height={200}>
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
              disableFullscreen
              onEnd={() => {
                navigation.navigate("Main");
              }}
            />
          </Box>
          <Box flex={1} p="2">
            <LiveStreamTabs isPremiumLive />
          </Box>
        </>
      )}
    </Box>
  );
};

export default PremiumLive;
