import React, { useEffect, useLayoutEffect, useState } from "react";
import { Box, Button, HStack, Spinner, Text, useToast } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Dimensions, LogBox, StatusBar } from "react-native";
import VideoPlayer from "react-native-video-controls";
import Views from "../../components/atoms/Views";
import LiveStreamTabs from "../../components/molecules/LiveStreamTabs";
import { STREAM } from "../../services";
import { activityLog } from "../../utils/activityLog";
import useUser from "../../utils/hooks/useUser";
import useLiveStreamStore from "../../store/liveStreamStore";
import { useRefresh } from "../../utils/hooks/useRefresh";
import { RefreshIcon } from "../../assets/icon";
import Loading from "../../components/atoms/Loading";
import useThemeStore from "../../store/themeStore";
import Theme from "../../components/templates/Theme";

const PremiumLive = () => {
  const route = useRoute();
  const toast = useToast();
  const navigation = useNavigation();
  const { params } = route;

  const [url, setUrl] = useState();
  const [isPaid, setIsPaid] = useState(false);

  const { session, userProfile } = useUser();
  const { refreshing, onRefresh } = useRefresh();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const roomId = params?.item?.profile?.room_id;
  const setlist = params?.item?.theater?.setlist?.name;

  const {
    profile,
    liveInfo,
    setProfile,
    getLiveInfo,
    registerUserRoom,
    users,
    token,
    setToken,
    getPremiumLive,
    premiumLive,
    setHideComment,
    clearLiveStream
  } = useLiveStreamStore();
  const { mode } = useThemeStore();

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
          <Button
            py="1"
            onPress={handleRefresh}
            borderRadius="md"
            background="black"
            size="xs"
          >
            {refreshing ? <Spinner size={16} color="white" /> : <RefreshIcon />}
          </Button>
          <Theme />
          <Views
            color="primary"
            number={liveInfo?.views ?? profile?.view_num ?? 0}
          />
        </HStack>
      ),
      headerShown: isFullScreen ? false : true
    });
  }, [profile, params.item.profile, liveInfo, isFullScreen, mode]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "JKT48"
    });
  }, []);

  const handleRefresh = async () => {
    onRefresh();
    setUrl("");
    getUrl();
  };

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
    await getPremiumLive();
    await getLiveInfo(profile?.room_id, token);
  }

  async function getUrl() {
    const streams = await STREAM.getStreamUrl(roomId, token);

    if (streams.data.code === 404) {
      setIsPaid(false);
      !isPaid && handleNoTicket();
    } else {
      setIsPaid(true);
      setUrl(streams?.data[0]?.url);
    }
  }

  useEffect(() => {
    premiumLive && token && getUrl();
  }, [token]);

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
    const liveIdUser = session?.cookie_login_id;
    if (userProfile && isPaid) {
      activityLog({
        logName: "Premium Live",
        userId: userProfile?._id,
        description: `Watch Premium Live ${setlist}`,
        liveId: liveIdUser
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
              <Text>Premium Live Ended</Text>
            </Box>
          );
        },
        placement: "top-right"
      });
    }
    navigation.navigate("RoomDetail", {
      room: {
        room_id: profile?.room_id
      }
    });
  };

  useEffect(() => {
    setToken(session?.cookie_login_id);
    users?.map((item) => {
      if (item?.user_id?.user_id === userProfile?.user_id) {
        if (item.status === "paid") {
          setIsPaid(true);
          setHideComment(true);
          setToken(premiumLive?.webSocketId);
        }
      }
    });
  }, [premiumLive, token]);

  useEffect(() => {
    StatusBar.setHidden(isFullScreen);
  }, [isFullScreen]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", () => {
      setIsFullScreen(!isFullScreen);
    });
    return () => subscription?.remove();
  }, [isFullScreen]);

  return (
    <Box flex="1" bg="secondary">
      {!isPaid ? (
        <Box flex="1" justifyContent="center" alignItems="center">
          <Spinner size={50} color="white" />
        </Box>
      ) : (
        <>
          <Box height={isFullScreen ? Dimensions.get("window").height : 200}>
            {url ? (
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
                toggleResizeModeOnFullscreen={false}
                onEnterFullscreen={() => setIsFullScreen(true)}
                onExitFullscreen={() => setIsFullScreen(false)}
                onEnd={() => {
                  navigation.navigate("Main");
                }}
                onError={handleRefresh}
              />
            ) : (
              <Loading />
            )}
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
