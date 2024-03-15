import { useNavigation, useRoute } from "@react-navigation/native"
import React, { useState, useEffect } from "react";
import { Box } from "native-base"
import { useLayoutEffect } from "react";
import { formatName } from "../../utils/helpers";
import Video from 'react-native-video';

const LiveStream = () => {
  const route = useRoute();
  const { params } = route;
  const navigation = useNavigation();
  const [profile, setProfile] = useState();

  useEffect(() => {
    setProfile(params.item)
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: profile?.room_url_key ? formatName(profile?.room_url_key) : profile?.user?.name
    })
  }, [profile])

  return (
    <Box flex="1" bg="secondary">
      <Video
        source={{ uri: "https://hls-origin275.showroom-cdn.com/liveedge/ngrp:e6f3037825315549632017c1f23198633f271752d629adc18dbc55440be63272_all/chunklist_b363457.m3u8" }}
        style={{
          width: "100%",
          height: 200
        }}
      />
      <Box p="3">
        <Box bg="primary" p="3">

        </Box>
      </Box>
    </Box>
  )
}

export default LiveStream;