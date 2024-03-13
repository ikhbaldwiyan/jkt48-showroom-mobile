import axios from "axios";
import React, { useEffect, useState } from 'react'
import { Box, Image, Pressable, Text } from "native-base";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { cleanImage, formatName, formatViews } from "../../../utils/helpers";

const RoomLive = () => {
  const [rooms, setRooms] = useState([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    async function getRoomLive() {
      const room = await axios.get("https://sorum.vercel.app/api/rooms/onlives");
      const roomLiveFilter = room?.data.data?.filter(
        (room) => room.premium_room_type !== 1
      );
      setRooms(roomLiveFilter)
    }
    getRoomLive();
  }, []);

  return rooms.length > 0 && (
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
              <Box flexDir="row" mt="2">
                <Text fontSize="md" mr="2" fontWeight="semibold" color="white" py="2">
                  {formatName(item?.room_url_key)}
                </Text>
                <Box bg="primary" p="2" borderRadius={8}>
                  <Text fontSize="14" fontWeight="semibold" color="white">{formatViews(item.view_num)}</Text>
                </Box>
              </Box>
            </Pressable>
          </Box>
        )
        )}
      </ScrollView>
    </Box>
  )
}

export default RoomLive