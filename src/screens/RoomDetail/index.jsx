import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native"
import { Box, Image } from "native-base"
import { cleanImage } from "../../utils/helpers";

const RoomDetail = () => {
  const route = useRoute();
  const { params } = route;

  const navigation = useNavigation();
  const [profile, setProfile] = useState();

  useEffect(() => {
    setProfile(params.room)
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: profile?.main_name
    })
  }, [profile])

  return (
    <Box flex="1" bg="secondary" p="3" >
      <Image
        size="md"
        borderRadius="md"
        source={{ uri: cleanImage(profile?.image, true) }}
        alt="image"
        width="100%"
        height="215"
      />
    </Box>
  )
}

export default RoomDetail