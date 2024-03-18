import { Box } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { STREAM } from "../../services";
import { formatName } from "../../utils/helpers";
import VideoPlayer from "react-native-video-controls";
import Views from "../../components/atoms/Views";
import Tabs from "../../components/molecules/Tabs";

const LiveStream = () => {
  const route = useRoute();
  const { params } = route;
  const navigation = useNavigation();
  const [profile, setProfile] = useState();
  const [url, setUrl] = useState();

  useEffect(() => {
    setProfile(params.item)
    navigation.setOptions({
      headerRight: () => (
        <Views number={profile?.view_num ?? 0} />
      )
    })
  }, [profile])

  useEffect(() => {
    async function getUrl() {
      const streams = await STREAM.getStreamUrl(params?.item?.room_id,
        "sr_id=TxF6THI72vEMzNyW1PUewa6FO8H1IgQUtMiT6MX6zQHecs0sXTQ63JW33tO_DAbI"
      );
      setUrl(streams?.data[0]?.url)
    }

    getUrl();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: profile?.room_url_key && profile?.room_url_key !== "officialJKT48" ?
        formatName(profile?.room_url_key) : profile?.main_name?.replace("SHOWROOM", "")
    })
  }, [profile])

  return (
    <Box flex="1" bg="secondary">
      <Box height={200}>
        <VideoPlayer
          source={{ uri: url }}
          style={{
            position: "absolute",
            width: "100%",
            height: 200
          }}
          disableSeekbar
          disableBack
          disableTimer
        />
      </Box>
      <Box flex={1} p="2">
        <Tabs />
      </Box>
    </Box>
  )
}

export default LiveStream;