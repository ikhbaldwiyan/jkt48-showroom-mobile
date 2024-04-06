import React, { useEffect, useState } from 'react';
import { Box, Divider, HStack, Image, Pressable, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ROOMS, STREAM } from "../../../services";
import { cleanImage } from "../../../utils/helpers";
import Views from "../../atoms/Views";
import Times from "../../atoms/Times";

const PremiumLive = ({ refreshing }) => {
  const [rooms, setRooms] = useState([]);
  const [theater, setTheater] = useState({});
  const { navigate } = useNavigation();

  useEffect(() => {
    async function getPremiumLive() {
      const room = await ROOMS.getRoomLive();
      const premiumLive = room?.data.data?.filter(
        (room) => room.premium_room_type === 1
      );
      setRooms(premiumLive);
    }
    getPremiumLive();
  }, [refreshing]);

  useEffect(() => {
    async function getTodayTheater() {
      const theater = await STREAM.getTodaySchedule();
      setTheater(theater.data)
    };
    getTodayTheater();
  }, []);

  return rooms?.length > 0 && (
    <Box mb="4">
      <Text color="white" fontSize="2xl" fontWeight="semibold" >Premium Live</Text>
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
              }} 
              alt={item.main_name}
              width="330"
              height="200"
            />
            <HStack alignItems="center" mt="2">
              <Text fontSize="xl" mr="2" fontWeight="semibold" color="white" py="2">
                {theater
                  ? theater?.setlist?.name
                  : item?.main_name}
              </Text>
              <Views number={item?.view_num} />
              <Times start_time={item.started_at} />
            </HStack>
          </Pressable>
        </Box>
      )
      )}
      <Divider mt="3"/>
    </Box>
  )
}

export default PremiumLive