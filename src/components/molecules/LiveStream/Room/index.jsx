import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  PlayIcon,
  Text,
  View
} from "native-base";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, TouchableOpacity } from "react-native";
import { LiveIcon } from "../../../../assets/icon";
import { ROOMS } from "../../../../services";
import useLiveStreamStore from "../../../../store/liveStreamStore";
import useThemeStore from "../../../../store/themeStore";
import { useRefresh } from "../../../../utils/hooks/useRefresh";
import CardGradient from "../../../atoms/CardGradient";

export const Room = () => {
  const [roomLives, setRoomLives] = useState([]);
  const { refreshing, onRefresh } = useRefresh();
  const { profile, setProfile } = useLiveStreamStore();
  const { mode } = useThemeStore();

  useEffect(() => {
    async function getRoomLive() {
      const room = await ROOMS.getRoomLive();
      const roomLiveFilter = room?.data.data?.filter(
        (room) => room.premium_room_type !== 1
      );
      setRoomLives(roomLiveFilter);
    }
    getRoomLive();
  }, [refreshing]);

  return (
    <CardGradient>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {roomLives?.map((item, idx) => (
          <Box key={idx}>
            <HStack
              py="2"
              alignItems="center"
              justifyItems="center"
              justifyContent="space-around"
            >
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
                <Box bg="red" mt="2" rounded="lg" p="1" px="3">
                  <HStack alignItems="center" space={1}>
                    <LiveIcon size={16} />
                    <Text fontWeight="semibold">Live</Text>
                  </HStack>
                </Box>
              </View>
              <Button
                mt="8"
                colorScheme="black"
                bg={item.room_id === profile.room_id ? "red" : mode === "light" ? "secondary" : "primary"}
              >
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setProfile(item);
                  }}
                >
                  <PlayIcon size={14} color="white" />
                </TouchableOpacity>
              </Button>
            </HStack>
            {roomLives.length > 1 && <Divider mt="2" />}
          </Box>
        ))}
      </ScrollView>
    </CardGradient>
  );
};
