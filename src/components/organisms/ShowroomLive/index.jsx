import React, { useCallback, useEffect, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Box, Divider, HStack, Image, Text, ScrollView } from "native-base";
import { TouchableOpacity, AppState } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { ROOMS } from "../../../services";
import { cleanImage, formatName, getTimes } from "../../../utils/helpers";
import Views from "../../atoms/Views";
import { RightArrow, TimesFill } from "../../../assets/icon";

const ShowroomLive = ({ refreshing }) => {
  const { navigate } = useNavigation();
  const [appState, setAppState] = useState(AppState.currentState);

  const fetchRoomLive = async () => {
    const response = await ROOMS.getRoomLive();
    return response?.data.data;
  };

  // Use the new React Query v5 signature
  const { data: rooms = [], refetch } = useQuery({
    queryKey: ["roomLive"],
    queryFn: fetchRoomLive
  });

  // Refetch when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useEffect(() => {
    refetch();
  }, [refreshing]);

  // Handle app state changes (background -> foreground)
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        refetch(); // Refetch data when app comes to foreground
      }
      setAppState(nextAppState);
    };

    // Listen to app state changes
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    // Clean up the event listener on component unmount
    return () => {
      subscription.remove();
    };
  }, [appState, refetch]);

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
                  source={{ uri: cleanImage(item.image) }}
                  alt={item.main_name}
                  size="xl"
                  width={200}
                />
                <Box
                  borderTopLeftRadius="8"
                  borderBottomRightRadius="8"
                  position="absolute"
                  background="primary"
                  py="1"
                  px="2"
                >
                  <HStack space={1} alignItems="center">
                    <TimesFill />
                    <Text>{getTimes(item?.started_at)}</Text>
                  </HStack>
                </Box>
              </TouchableOpacity>
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
            </Box>
          ))}
        </ScrollView>
        <Divider mt="3" />
      </Box>
    )
  );
};

export default ShowroomLive;
