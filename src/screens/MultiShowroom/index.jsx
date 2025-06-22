import React, { useState, useLayoutEffect, useEffect } from "react";
import { WebView } from "react-native-webview";
import { Box } from "native-base";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../components/atoms/Loading";
import { JKT48_SHOWROOM_WEB } from "@env";
import { useUser } from "../../utils/hooks";
import { useProfile } from "../../services/hooks/useProfile";
import useApiConfig from "../../store/useApiConfig";

const MultiShowroom = () => {
  const { setOptions } = useNavigation();
  const { userProfile } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const { data: profile } = useProfile(userProfile?.user_id);
  const [url, setUrl] = useState(
    `${JKT48_SHOWROOM_WEB}/multi-room-sr-mobile?view_type=android&threeRoom=${profile?.can_3_room}&fourRoom=${profile?.can_4_room}`
  );
  const { SETTING_MULTI_ROOM_GLOBAL } = useApiConfig();

  useLayoutEffect(() => {
    setOptions({
      headerTitle: "Multi Showroom"
    });
  }, [setOptions]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (
      profile?.is_donator ||
      (profile?.top_leaderboard && profile?.totalWatchLive > 400) ||
      SETTING_MULTI_ROOM_GLOBAL
    ) {
      setUrl(
        `${JKT48_SHOWROOM_WEB}/multi-room-sr-mobile?view_type=android&threeRoom=true&fourRoom=true`
      );
    }
  }, [profile]);

  return (
    <Box flex={1}>
      <WebView
        source={{ uri: url }}
        style={{ flex: 1, backgroundColor: "#282C34" }}
      />
      {isLoading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          justifyContent="center"
          alignItems="center"
          bg="secondary"
        >
          <Loading color="white" />
        </Box>
      )}
    </Box>
  );
};

export default MultiShowroom;
