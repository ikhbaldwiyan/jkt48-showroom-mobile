import React, { useEffect, useState } from 'react'
import { Box, HStack, Image, Pressable, Text } from "native-base";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { formatViews } from "../../../utils/helpers";
import { ROOMS } from "../../../services";
import UserIcon from "../../../assets/icon/UserIcon";

const IDNLIve = () => {
  const [rooms, setRooms] = useState([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    async function getIDNLIve() {
      const response = await ROOMS.getIDNLIveRoom();
      setRooms(response.data)
    }
    getIDNLIve();
  }, []);

  return rooms.length > 0 && (
    <Box mb="4">
      <Text color="white" fontSize="2xl" fontWeight="semibold">
        IDN Live
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {rooms?.map((item, idx) => (
          <Box key={idx} mt={4} mr="3">
            <Pressable
              onPress={() => {
                navigate("IDNStream", { item })
              }}
            >
              <Box>
                <Image
                  size="xl"
                  borderRadius={8}
                  source={{ uri: item?.image }}
                  alt={item?.user?.name}
                  height={230}
                  width={200}
                  resizeMode="cover"
                />
              </Box>
              <Box
                bg="teal"
                top="0" right="0"
                position="absolute"
                borderRadius="6"
                borderRightRadius={0}
                borderTopLeftRadius="0"
                borderTopRightRadius={6} p="2"
                maxWidth={120}
              >
                <Text isTruncated>
                  {item?.title}
                </Text>
              </Box>
              <HStack mt="1" alignItems="center">
                <Text fontSize="md" mr="2" fontWeight="semibold" color="white" py="2">
                  {item?.user?.name.replace("JKT48", "")}
                </Text>
                <HStack bg="primary" width={75} h={30} justifyContent="center" alignItems="center" borderRadius={8}>
                  <UserIcon />
                  <Text ml="1" fontSize="14" fontWeight="semibold" color="white">
                    {formatViews(item?.view_count)}
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

export default IDNLIve