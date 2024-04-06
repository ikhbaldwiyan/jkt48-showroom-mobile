import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Image, Pressable, Text } from "native-base";
import { ScrollView } from "react-native";
import { ROOMS } from "../../../services";
import { cleanImage, formatName } from "../../../utils/helpers";
import Views from "../../atoms/Views";

const RoomLive = ({ refreshing }) => {
  const [rooms, setRooms] = useState([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    async function getRoomLive() {
      const room = await ROOMS.getRoomLive();
      const roomLiveFilter = room?.data.data?.filter(
        (room) => room.premium_room_type !== 1
      );
      setRooms(roomLiveFilter)
    }
    getRoomLive();
  }, [refreshing]);

  return rooms?.length > 0 && (
    <Box mb="4">
      <Text color="white" fontSize="2xl" fontWeight="semibold" >Showroom Live</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {rooms?.map((item, idx) => (
          <Box key={idx} mt={4} mr="3">
            <Pressable
              onPress={() => {
                navigate("LiveStream", { item })
              }}
            >
              <Image
                borderRadius={8}
                source={{
                  uri: cleanImage(item.image)
                }} alt={item.main_name} size="xl" width={200}
              />
              <HStack alignItems="center" mt="1">
                <Text fontSize="md" mr="2" fontWeight="semibold" color="white" py="2">
                  {formatName(item?.room_url_key)}
                </Text>
                <Views number={item?.view_num} />
              </HStack>
            </Pressable>
          </Box>
        ))}
      </ScrollView>
    </Box>
  )
}

export default RoomLive