import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, Divider, HStack, Image, Pressable, Text } from "native-base";
import { ScrollView, TouchableOpacity } from "react-native";
import { ROOMS } from "../../../services";
import { cleanImage, formatName } from "../../../utils/helpers";
import Views from "../../atoms/Views";
import { RightArrow } from "../../../assets/icon";

const ShowroomLive = ({ refreshing }) => {
  const [rooms, setRooms] = useState([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    async function getRoomLive() {
      const room = await ROOMS.getRoomLive();
      const roomLiveFilter = room?.data.data?.filter(
        (room) => room.premium_room_type !== 1
      );
      setRooms(roomLiveFilter);
    }
    getRoomLive();
  }, [refreshing]);

  return (
    rooms?.length > 0 && (
      <Box mb="4">
        <HStack alignItems="center" justifyContent="space-between">
          <Text color="white" fontSize="2xl" fontWeight="semibold">
            Showroom Live
          </Text>
          {rooms.length > 2 && (
            <TouchableOpacity onPress={() => navigate("RoomLives")}>
              <HStack space={2} alignItems="center">
                <Text color="white" fontSize="md">
                  All Live
                </Text>
                <RightArrow />
              </HStack>
            </TouchableOpacity>
          )}
        </HStack>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {rooms?.map((item, idx) => (
            <Box key={idx} mt={4} mr="3">
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  navigate("LiveStream", { item });
                }}
              >
                <Image
                  borderRadius={8}
                  source={{
                    uri: cleanImage(item.image)
                  }}
                  alt={item.main_name}
                  size="xl"
                  width={200}
                />
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    navigate("LiveStream", { item });
                  }}
                >
                  <HStack alignItems="center" mt="1">
                    <Text
                      fontSize="md"
                      mr="2"
                      fontWeight="semibold"
                      color="white"
                      py="2"
                    >
                      {formatName(item?.room_url_key)}
                    </Text>
                    <Views number={item?.view_num} />
                  </HStack>
                </TouchableOpacity>
              </TouchableOpacity>
            </Box>
          ))}
        </ScrollView>
        <Divider mt="3" />
      </Box>
    )
  );
};

export default ShowroomLive;
