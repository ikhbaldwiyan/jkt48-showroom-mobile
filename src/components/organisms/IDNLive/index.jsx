import React, { useEffect, useState } from 'react'
import { Box, Image, Pressable, Text } from "native-base";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { formatViews } from "../../../utils/helpers";
import { ROOMS } from "../../../services";

const IDNLIve = () => {
  const [rooms, setRooms] = useState([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    async function getIDNLIve() {
      const response = await ROOMS.getIDNLIveRoom();
      console.log(response)
      setRooms(response.data)
    }
    getIDNLIve();
  }, []);

  return rooms.length > 0 && (
    <Box mb="4">
      <Text color="white" fontSize="2xl" fontWeight="semibold" >IDN Live</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {rooms?.map((item, idx) => (
          <Box key={idx} mt={4} mr="3">
            <Pressable
              onPress={() => {
                navigate("LiveStream", { item })
              }}
            >
              <Image
                size="xl"
                borderRadius={8}
                source={{ uri: item?.image }}
                alt={item?.user?.name}
                height={300}
                width={200}
              />
              <Box flexDir="row" mt="2">
                <Text fontSize="md" mr="2" fontWeight="semibold" color="white" py="2">
                  {item?.user?.name}
                </Text>
                <Box bg="primary" p="2" borderRadius={8}>
                  <Text fontSize="14" fontWeight="semibold" color="white">{formatViews(item.view_count)}</Text>
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

export default IDNLIve