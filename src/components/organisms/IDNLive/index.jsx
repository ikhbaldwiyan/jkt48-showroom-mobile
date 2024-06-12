import React, { useEffect, useState } from "react";
import { Box, Divider, HStack, Image, Pressable, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native";
import { ROOMS } from "../../../services";
import Views from "../../atoms/Views";
import { RightArrow } from "../../../assets/icon";

const IDNLIve = ({ refreshing }) => {
  const [rooms, setRooms] = useState([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    async function getIDNLIve() {
      try {
        const response = await ROOMS.getIDNLIveRoom();
        setRooms(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getIDNLIve();
  }, [refreshing]);

  return (
    rooms.length > 0 && (
      <Box mb="4">
        <HStack alignItems="center" justifyContent="space-between">
          <Text color="white" fontSize="2xl" fontWeight="semibold">
            IDN Live
          </Text>
          <TouchableOpacity onPress={() => navigate("IDNLives")}>
            <HStack space={2} alignItems="center">
              <Text color="white" fontSize="md">
                All Live
              </Text>
              <RightArrow />
            </HStack>
          </TouchableOpacity>
        </HStack>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {rooms?.map((item, idx) => (
            <Box key={idx} mt={4} mr="3">
              <Pressable
                onPress={() => {
                  navigate("IDNStream", { item });
                }}
              >
                <Box>
                  <Image
                    size="xl"
                    borderRadius={8}
                    source={{ uri: item?.image ?? item.user.avatar }}
                    alt={item?.user?.name}
                    height={230}
                    width={200}
                    resizeMode="cover"
                  />
                </Box>
                <Box
                  bg="teal"
                  top="0"
                  right="0"
                  position="absolute"
                  borderRadius="6"
                  borderRightRadius={0}
                  borderTopLeftRadius="0"
                  borderTopRightRadius={6}
                  p="2"
                  maxWidth={120}
                >
                  <Text isTruncated>{item?.title}</Text>
                </Box>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    navigate("IDNStream", { item });
                  }}
                >
                  <HStack mt="1" alignItems="center">
                    <Text
                      fontSize="md"
                      mr="2"
                      fontWeight="semibold"
                      color="white"
                      py="2"
                    >
                      {item?.user?.name}
                    </Text>
                    <Views number={item?.view_count} />
                  </HStack>
                </TouchableOpacity>
              </Pressable>
            </Box>
          ))}
        </ScrollView>
        <Divider mt="3" />
      </Box>
    )
  );
};

export default IDNLIve;
