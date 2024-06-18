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
import { ROOMS } from "../../../../services";
import useIDNLiveStore from "../../../../store/idnLiveStore";
import useThemeStore from "../../../../store/themeStore";
import { useRefresh } from "../../../../utils/hooks/useRefresh";
import CardGradient from "../../../atoms/CardGradient";

export const RoomListIDN = () => {
  const { profile, setProfile } = useIDNLiveStore();
  const [roomLives, setRoomLives] = useState([]);
  const { refreshing, onRefresh } = useRefresh();
  const { mode } = useThemeStore();

  useEffect(() => {
    async function getIDNLIve() {
      const response = await ROOMS.getIDNLIveRoom();
      setRoomLives(response.data);
    }
    getIDNLIve();
  }, [refreshing]);

  const getTheme = (isActive) => {
    if (mode === "dark") {
      return isActive ? "red" : "primary";
    } else {
      return isActive ? "red" : "black";
    }
  };

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
                alt={item.title}
                style={{ width: 80, height: 80 }}
                source={{ uri: item?.user?.avatar }}
                rounded="lg"
              />
              <View justifyContent="center" alignItems="center">
                <Text fontSize="16" fontWeight="bold">
                  {item?.user?.name !== "JKT48"
                    ? item?.user?.name.replace("JKT48", "")
                    : item?.user?.name}
                </Text>
                <Box bg="red" mt="2" rounded="lg" p="1" px="4">
                  <Text fontWeight="semibold">Live</Text>
                </Box>
              </View>
              <Button
                mt="8"
                colorScheme="black"
                bg={getTheme(item.user.username === profile?.user?.username)}
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
