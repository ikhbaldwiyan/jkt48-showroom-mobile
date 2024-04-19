import React, { useEffect, useLayoutEffect, useState } from "react";
import { Box, HStack, Spinner, Text, useToast } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LogBox } from "react-native";
import VideoPlayer from "react-native-video-controls";
import Views from "../../components/atoms/Views";
import LiveStreamTabs from "../../components/molecules/LiveStreamTabs";
import { STREAM } from "../../services";
import { activityLog } from "../../utils/activityLog";
import { formatName } from "../../utils/helpers";
import useUser from "../../utils/hooks/useUser";

const PremiumLive = () => {
  const route = useRoute();
  const toast = useToast();
  const { params } = route;
  const navigation = useNavigation();
  const [profile, setProfile] = useState();
  const [liveInfo, setLiveInfo] = useState({});
  const [url, setUrl] = useState();
  const { session, userProfile } = useUser();
  const [isPaid, setIsPaid] = useState(false);
  const roomId = params?.item?.profile?.room_id;

  useEffect(() => {
    setProfile(params.item.profile);
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
      headerTitle:
        profile?.room_url_key && profile?.room_url_key !== "officialJKT48"
          ? formatName(profile?.room_url_key)
          : profile?.main_name?.replace("SHOWROOM", "")
    });
  }, [profile]);

  async function getLiveInfo() {
    try {
      const response = await STREAM.getStreamInfo(
        roomId,
        session?.cookie_login_id ?? "cookies"
      );
      setLiveInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  }

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

  useEffect(() => {
    async function getUrl() {
      const streams = await STREAM.getStreamUrl(
        roomId,
        session?.cookie_login_id
      );
      if (streams.data.code === 404) {
        setIsPaid(false);
        handleNoTicket();
      } else {
        setIsPaid(true);
        setUrl(streams?.data[0]?.url);
      }
    }

    getUrl();
  }, [params.item]);

  useEffect(() => {
    async function registerUserRoom() {
      try {
        await STREAM.visitRoom({
          cookies_login_id: session?.cookie_login_id,
          room_id: roomId
        });
      } catch (error) {
        console.log(error);
      }
    }

    registerUserRoom();
  }, [params.item.profile, session]);

  useEffect(() => {
    getLiveInfo();
  }, [params?.item]);

  useEffect(() => {
    setTimeout(() => {
      getLiveInfo();
    }, 1000);

    const interval = setInterval(() => {
      getLiveInfo();
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [params?.item]);

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
