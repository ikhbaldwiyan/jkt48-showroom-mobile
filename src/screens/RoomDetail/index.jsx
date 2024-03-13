import { useNavigation, useRoute } from "@react-navigation/native"
import React, { useState, useEffect } from "react";
import { Box, Image, Text } from "native-base"
import { useLayoutEffect } from "react";

const RoomDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { params } = route;
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
        source={{ uri: profile?.image }}
        alt="image"
        width="100%"
        height="215"
      />
    </Box>
  )
}

export default RoomDetail