import React, { useCallback, useEffect, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Box, Divider, HStack, Image, Text, ScrollView } from "native-base";
import { TouchableOpacity, Pressable, AppState } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { ROOMS } from "../../../services";
import Views from "../../atoms/Views";
import { RightArrow } from "../../../assets/icon";

const IDNLive = ({ refreshing }) => {
  const { navigate } = useNavigation();
  const [appState, setAppState] = useState(AppState.currentState);

  const fetchIDNLiveRoom = async () => {
    const response = await ROOMS.getIDNLIveRoom();
    return response?.data;
  };

  // Use the new React Query v5 signature
  const { data: rooms = [], refetch } = useQuery({
    queryKey: ["idnLiveRoom"],
    queryFn: fetchIDNLiveRoom,
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
    rooms.length > 0 && (
      <Box mb="4">
        <HStack alignItems="center" justifyContent="space-between">
          <Text color="white" fontSize="2xl" fontWeight="semibold">
            IDN Live
          </Text>
          {rooms.length > 2 && (
            <TouchableOpacity onPress={() => navigate("IDNLives")}>
              <HStack space={2} alignItems="center">
                <Text color="white" fontSize="sm">
                  Semua live
                </Text>
                <RightArrow />
              </HStack>
            </TouchableOpacity>
          )}
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

export default IDNLive;
