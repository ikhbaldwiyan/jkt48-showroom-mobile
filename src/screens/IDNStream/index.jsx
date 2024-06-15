import { Box, Button, HStack, Text, useToast } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import VideoPlayer from "react-native-video-controls";
import Views from "../../components/atoms/Views";
import IDNLiveTabs from "../../components/molecules/IDNLiveTabs";
import useUser from "../../utils/hooks/useUser";
import { activityLog } from "../../utils/activityLog";
import { Dimensions, LogBox, StatusBar } from "react-native";
import useIDNLiveStore from "../../store/idnLiveStore";
import { RefreshIcon } from "../../assets/icon";
import { useRefresh } from "../../utils/hooks/useRefresh";
import Loading from "../../components/atoms/Loading";

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
    clearUrl
  } = useIDNLiveStore();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { refreshing, onRefresh } = useRefresh();

  async function fetchLiveInfo() {
    await getLiveProfile(profile?.user?.username);
  }

  const handleRefresh = async () => {
    onRefresh();
    clearUrl();
    await getStreamUrl(profile?.user?.username);

    trackAnalytics("refresh_idn_button", {
      username: userProfile?.account_id ?? "Guest",
      room: profile?.user?.name
    });
  };

  useEffect(() => {
    getLiveProfile(profile?.user?.username);
  }, [profile?.slug]);

  useEffect(() => {
    setProfile(params.item);
    fetchLiveInfo();
    getStreamUrl(params?.item.user?.username);

    return () => {
      clearLiveStream();
      clearUrl();
    };
  }, []);

  useEffect(() => {
    getStreamUrl(profile?.user?.username);
  }, [profile, refreshing]);

  useEffect(() => {
    setProfile(params.item);
  }, []);

  useEffect(() => {
    if (url) {
      trackAnalytics("watch_idn_live", {
        username: userProfile?.account_id ?? "Guest",
        room: profile?.user?.name
      });
    }
  }, [userProfile, url]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack>
          <Button
            py="1"
            size="xs"
            onPress={handleRefresh}
            isLoading={refreshing}
            borderRadius="md"
            background="black"
            mr={2}
          >
            <RefreshIcon />
          </Button>
          <Views number={profile?.view_count ?? 0} />
        </HStack>
      )
    });
  }, [profile, refreshing]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: profile?.user?.name,
      headerShown: isFullScreen ? false : true
    });
  }, [profile, isFullScreen]);

  useEffect(() => {
    if (userProfile) {
      activityLog({
        logName: "Watch",
        userId: userProfile?._id,
        description: `Watch IDN Live ${profile?.user?.name}`,
        liveId: profile?.slug
      });
    }
    LogBox.ignoreAllLogs(true);
  }, [params.item, profile, userProfile]);

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
      placement: "top-right"
    });
  };

  useEffect(() => {
    StatusBar.setHidden(isFullScreen);

    return () => {
      StatusBar.setHidden(false);
    };
  }, [isFullScreen]);

  return (
    <Box flex="1" bg="secondary">
      <Box height={isFullScreen ? Dimensions.get("window").height : 480}>
        {url ? (
          <VideoPlayer
            source={{ uri: url }}
            style={{
              position: "absolute",
              width: "100%",
              height: isFullScreen ? Dimensions.get("window").height : 480
            }}
            disableSeekbar
            disableBack
            disableTimer
            onEnterFullscreen={() => setIsFullScreen(true)}
            onExitFullscreen={() => setIsFullScreen(false)}
            onEnd={() => handleEndLive()}
          />
        ) : (
          <Loading color="white" />
        )}
      </Box>
      <IDNLiveTabs profile={profile} setProfile={setProfile} />
    </Box>
  );
};

export default IDNStream;
