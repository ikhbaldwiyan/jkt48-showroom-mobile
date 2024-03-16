import { Box } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import VideoPlayer from "react-native-video-controls";

const IDNStream = () => {
  const route = useRoute();
  const { params } = route;
  const navigation = useNavigation();
  const [profile, setProfile] = useState();

  useEffect(() => {
    setProfile(params.item)
    navigation.setParams({
      views: profile?.view_num
    })
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: profile?.user?.name 
    })
  }, [profile])

  return (
    <Box flex="1" bg="secondary">
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
  )
}

export default IDNStream;