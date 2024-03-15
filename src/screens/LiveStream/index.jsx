import { useNavigation, useRoute } from "@react-navigation/native"
import React, { useState, useEffect } from "react";
import { Box } from "native-base"
import { useLayoutEffect } from "react";
import { formatName } from "../../utils/helpers";
import Video from 'react-native-video';
import { STREAM } from "../../services";

const LiveStream = () => {
  const route = useRoute();
  const { params } = route;
  const navigation = useNavigation();
  const [profile, setProfile] = useState();
  const [url, setUrl] = useState();

  useEffect(() => {
    setProfile(params.item)
  }, [])

  useEffect(() => {
    async function getUrl() {
      const streams = await STREAM.getStreamUrl(params?.item?.room_id);
      setUrl(streams?.data[0]?.url)
    }
    getUrl();

  }, []);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: profile?.room_url_key ? formatName(profile?.room_url_key) : profile?.user?.name
    })
  }, [profile])

  return (
    <Box flex="1" bg="secondary">
      <Video
        source={{ uri: url }}
        style={{
          width: "100%",
          height: 204
        }}
      />
    </Box>
  )
}

export default LiveStream;