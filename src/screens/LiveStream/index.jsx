import { Box } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { STREAM } from "../../services";
import { formatName } from "../../utils/helpers";
import VideoPlayer from "react-native-video-controls";
import Views from "../../components/atoms/Views";
import LiveStreamTabs from "../../components/molecules/LiveStreamTabs";
import useUser from "../../utils/hooks/useUser";
import { activityLog } from "../../utils/activityLog";
import { LogBox } from "react-native";

const LiveStream = () => {
  const route = useRoute();
  const { params } = route;
  const navigation = useNavigation();
  const [profile, setProfile] = useState();
  const [liveInfo, setLiveInfo] = useState({});
  const [url, setUrl] = useState();
  const { session, userProfile } = useUser();

  useEffect(() => {
    setProfile(params.item)
    navigation.setOptions({
      headerRight: () => (
        <Views number={liveInfo?.views ?? profile?.view_num ?? 0} />
      )
    })
  }, [profile, params.item, liveInfo])

  async function getLiveInfo() {
    try {
      const response = await STREAM.getStreamInfo(
        params?.item?.room_id,
        session?.cookie_login_id ?? "cookies"
      );
      setLiveInfo(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getLiveInfo();
  }, [params?.item])

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
    async function getUrl() {
      const streams = await STREAM.getStreamUrl(params?.item?.room_id,
        "sr_id=TxF6THI72vEMzNyW1PUewa6FO8H1IgQUtMiT6MX6zQHecs0sXTQ63JW33tO_DAbI"
      );
      setUrl(streams?.data[0]?.url)
    }

    getUrl();
  }, [params.item]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: profile?.room_url_key && profile?.room_url_key !== "officialJKT48" ?
        formatName(profile?.room_url_key) : profile?.main_name?.replace("SHOWROOM", "")
    })
  }, [profile])

  useEffect(() => {
    async function registerUserRoom() {
      try {
        await STREAM.visitRoom({
          cookies_login_id: session?.cookie_login_id,
          room_id: params.item.room_id
        });
      } catch (error) {
        console.log(error)
      }
    }

    registerUserRoom();
  }, [params.item, session]);

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
    LogBox.ignoreAllLogs(true)
  }, [profile, url, userProfile]);

  return (
    <Box flex="1" bg="secondary">
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
            navigation.navigate('Main');
          }}
        />
      </Box>
      <Box flex={1} p="2">
        <LiveStreamTabs />
      </Box>
    </Box>
  )
}

export default LiveStream;