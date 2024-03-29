import { Box, View } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import VideoPlayer from "react-native-video-controls";
import Views from "../../components/atoms/Views";
import { Podium } from "../../components/molecules/LiveStream";

const IDNStream = () => {
  const route = useRoute();
  const { params } = route;
  const navigation = useNavigation();
  const [profile, setProfile] = useState();

  useEffect(() => {
    setProfile(params.item)
    navigation.setOptions({
      headerRight: () => (
        <Views number={profile?.view_count ?? 0} />
      )
    })
  }, [profile])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: profile?.user?.name
    })
  }, [profile])

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
        />
      </Box>
      <Box p="3" mt="2" height={500}>
        <Podium isIDNLive={true} />
      </Box>
    </Box>
  )
}

export default IDNStream;