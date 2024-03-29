import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, Button, Divider, HStack, Icon, Image, PlayIcon, Text, View } from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { ROOMS } from "../../../../services";

export const Room = () => {
  const route = useRoute();
  const { params } = route;
  const { navigate } = useNavigation();
  const [roomLives, setRoomLives] = useState([]);

  useEffect(() => {
    async function getRoomLive() {
      const room = await ROOMS.getRoomLive();
      const roomLiveFilter = room?.data.data?.filter(
        (room) => room.premium_room_type !== 1
      );
      setRoomLives(roomLiveFilter)
    }
    getRoomLive();
  }, []);

  return (
    <LinearGradient colors={['#24A2B7', '#3B82F6']} style={styles.linearGradient}>
      {roomLives?.map((item, idx) => (
        <Box key={idx}>
          <HStack py="2"alignItems="center" justifyItems="center" justifyContent="space-around">
            <Image
              mr="3"
              alt={item.room_url_key}
              style={{ width: 120, height: 75 }}
              source={{ uri: item?.image }}
              rounded="lg"
            />
            <View justifyContent="center" alignItems="center">
              <Text fontSize="16" fontWeight="bold">
                {item.room_url_key.replace("JKT48_", "")}
              </Text>
              <Box bg="red" mt="2" rounded="lg" p="1" px="4">
                <Text fontWeight="semibold">
                  Live
                </Text>
              </Box>
            </View>
            <Pressable
              onPress={() => {
                navigate("LiveStream", { item })
              }}
            >
              <Button
                mt="8"
                colorScheme="success"
                bg={item.room_id === params.item.room_id ? "success.800" : "secondary"}
              >
                <PlayIcon size={14} color="white" />
              </Button>
            </Pressable>
          </HStack>
          {roomLives.length > 1 && (
            <Divider mt="2" />
          )}
        </Box>
      ))}
    </LinearGradient>
  )
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 12,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  },
})