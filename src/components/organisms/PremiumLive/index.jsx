import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Divider, HStack, Image, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ROOMS, STREAM } from "../../../services";
import { cleanImage } from "../../../utils/helpers";
import Views from "../../atoms/Views";
import Times from "../../atoms/Times";
import { BirthdayIcon } from "../../../assets/icon";

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
      setTheater(theater.data);
    }
    getTodayTheater();
  }, []);

  return (
    rooms?.length > 0 && (
      <Box mb="4">
        <Text color="white" fontSize="2xl" fontWeight="semibold">
          Premium Live
        </Text>
        {rooms?.map((item, idx) => (
          <Box key={idx} mt={4} mr="3">
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigate("PremiumLive", {
                  item: {
                    profile: item,
                    theater
                  }
                });
              }}
            >
              <Image
                borderRadius={8}
                source={{
                  uri: theater
                    ? theater?.setlist?.image
                    : cleanImage(item.image)
                }}
                alt={item.main_name}
                width="330"
                height="200"
              />
              {theater?.isBirthdayShow && (
                <Box
                  borderTopRightRadius="8"
                  borderBottomLeftRadius="8"
                  position="absolute"
                  background="red"
                  right={0}
                  py="1"
                  px="2"
                >
                  <HStack space={2} alignItems="center">
                    <BirthdayIcon size={16} />
                    <Text>{theater.birthdayMember.stage_name}</Text>
                  </HStack>
                </Box>
              )}
              <HStack alignItems="center" mt="2">
                <Text
                  fontSize="xl"
                  mr="2"
                  fontWeight="semibold"
                  color="white"
                  py="2"
                >
                  {theater && theater?.setlist?.name !== "Cara Meminum Ramune"
                    ? theater?.setlist?.name
                    : "JKT48 Official"}
                </Text>
                <Views number={item?.view_num} />
                <Times start_time={item.started_at} />
              </HStack>
            </TouchableOpacity>
          </Box>
        ))}
        <Divider mt="3" />
      </Box>
    )
  );
};

export default PremiumLive;
