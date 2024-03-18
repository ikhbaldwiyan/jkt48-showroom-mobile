import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native"
import { Box, HStack, Image, Text } from "native-base"
import { cleanImage, formatName, formatViews } from "../../utils/helpers";
import { ROOMS } from "../../services";
import Tabs from "../../components/molecules/Tabs";

const RoomDetail = () => {
  const route = useRoute();
  const { params } = route;

  const navigation = useNavigation();
  const [profile, setProfile] = useState();

  useEffect(() => {
    async function getRoomProfile() {
      const response = await ROOMS.getRoomProfile({
        room_id: params.room.room_id,
      });
      setProfile(response.data)
    }
    getRoomProfile();
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: profile ? formatName(profile?.room_url_key) : "Profile"
    })
  }, [profile])

  return (
    <Box flex="1" bg="secondary" p="3">
      <Image
        size="md"
        borderRadius="md"
        borderBottomLeftRadius="0"
        borderBottomRightRadius="0"
        source={{ uri: cleanImage(profile?.image, true) }}
        alt="image"
        width="100%"
        height="215"
      />
      <Box
        p="3"
        bg="teal"
        borderBottomLeftRadius="5"
        borderBottomRightRadius="6" width="100%"
      >
        <Text fontSize="20" fontWeight="bold">
          {profile?.main_name}
        </Text>
        <HStack justifyContent="space-between" py="2">
          <Text fontWeight="semibold">
            Room Level: {profile?.room_level}
          </Text>
          <Text fontWeight="semibold">
            Followers: {formatViews(profile?.follower_num ?? 0)}
          </Text>
        </HStack>
      </Box>
      <Tabs />
    </Box>
  )
}

export default RoomDetail