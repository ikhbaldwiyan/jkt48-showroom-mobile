import { useNavigation, useRoute } from "@react-navigation/native"
import React, { useState, useEffect } from "react";
import { Box, Image } from "native-base"
import { useLayoutEffect } from "react";
import { cleanImage, formatName } from "../../utils/helpers";

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
    <Box flex="1" bg="secondary" p="3" >
      <Image
        size="md"
        borderRadius="md"
        source={{ uri: cleanImage(profile?.image) }}
        alt="image"
        width="100%"
        height="215"
      />
    </Box>
  )
}

export default LiveStream;