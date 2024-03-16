import React, { useEffect, useState } from 'react'
import { Box, HStack, Image, Pressable, Text } from "native-base";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { cleanImage, formatViews } from "../../../utils/helpers";
import { ROOMS, STREAM } from "../../../services";
import UserIcon from "../../../assets/icon/UserIcon";

const PremiumLive = () => {
  const [rooms, setRooms] = useState([]);
  const [theater, setTheater] = useState({});
  const { navigate } = useNavigation();

  useEffect(() => {
    async function getPremiumLive() {
      const room = await ROOMS.getRoomLive();
      const premiumLive = room?.data.data?.filter(
        (room) => room.premium_room_type === 1
      );
      setRooms(premiumLive)
    }
    getPremiumLive();
  }, []);

  useEffect(() => {
    async function getTodayTheater() {
      const theater = await STREAM.getTodaySchedule();
      setTheater(theater.data)
    };
    getTodayTheater();
  }, []);

  return rooms.length > 0 && (
    <Box mb="4">
      <Text color="white" fontSize="2xl" fontWeight="semibold" >Premium Live</Text>
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
                  uri: theater ? theater?.setlist?.image : cleanImage(item.image)
                }} alt={item.main_name} size="xl" width={200}
              />
              <HStack alignItems="center" mt="2">
                <Text fontSize="md" mr="2" fontWeight="semibold" color="white" py="2">
                  {theater
                    ? theater?.setlist?.name
                    : item?.main_name}
                </Text>
                <HStack bg="primary" width={65} h={27} justifyContent="center" alignItems="center" borderRadius={8}>
                  <UserIcon />
                  <Text ml="1" fontSize="14" fontWeight="semibold" color="white">
                    {formatViews(item?.view_num)}
                  </Text>
                </HStack>
              </HStack>
            </Pressable>
          </Box>
        )
        )}
      </ScrollView>
    </Box>
  )
}

export default PremiumLive