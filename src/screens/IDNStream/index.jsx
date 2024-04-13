import { Box, Text, useToast } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import VideoPlayer from "react-native-video-controls";
import Views from "../../components/atoms/Views";
import IDNLiveTabs from "../../components/molecules/IDNLiveTabs";
import useUser from "../../utils/hooks/useUser";
import { activityLog } from "../../utils/activityLog";
import { LogBox } from "react-native";

const IDNStream = () => {
  const route = useRoute();
  const { params } = route;
  const navigation = useNavigation();
  const [profile, setProfile] = useState();
  const { userProfile } = useUser();
  const toast = useToast();

  useEffect(() => {
    setProfile(params.item)
    navigation.setOptions({
      headerRight: () => (
        <Views number={profile?.view_count ?? 0} />
      )
    })
  }, [profile, params.item])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: profile?.user?.name
    })
  }, [profile, params.item])

  useEffect(() => {
    const live = params.item;
    if (userProfile) {
      activityLog({
        logName: "Watch",
        userId: userProfile?._id,
        description: `Watch IDN Live ${live?.user?.name}`,
        liveId: live?.slug,
      });
    }
    LogBox.ignoreAllLogs(true)
  }, [params.item, profile, userProfile]);

  const handleEndLive = () => {
    navigation.navigate("Main");
    toast.show({
      render: () => {
        return (
          <Box bg="red" px="2" mt="10" m="3" py="1" rounded="sm" mb={5}>
            <Text>{profile?.user?.name} Offline</Text>
          </Box>
        );
      },
      placement: "top-right",
    });
  };

  return (
    <Box flex="1" bg="secondary">
      <Box height="480">
        <VideoPlayer
          source={{ uri: params.item.stream_url }}
          style={{
            position: "absolute",
            width: "100%",
            height: 480
          }}
          disableSeekbar
          disableBack
          disableTimer
          onEnd={() => handleEndLive()}
        />
      </Box>
      <IDNLiveTabs />
    </Box>
  )
}

export default IDNStream;