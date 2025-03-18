import React, { useCallback, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Box, Divider, HStack, Image, Text, ScrollView } from "native-base";
import { TouchableOpacity, Pressable } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { ROOMS } from "../../../services";
import Views from "../../atoms/Views";
import { RightArrow } from "../../../assets/icon";
import { useAppStateChange } from "../../../utils/hooks";
import { getIDNLiveTime } from "../../../utils/helpers";

const IDNLive = ({ refreshing }) => {
  const { navigate } = useNavigation();

  const fetchIDNLiveRoom = async () => {
    const response = await ROOMS.getIDNLIveRoom();
    return response?.data;
  };

  const { data: rooms = [], refetch } = useQuery({
    queryKey: ["idnLiveRoom"],
    queryFn: fetchIDNLiveRoom
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useEffect(() => {
    refetch();
  }, [refreshing]);

  // Handle app state changes (background -> foreground)
  useAppStateChange(refetch);

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
                <Box
                  p="2"
                  bg="cyan.700"
                  borderRightRadius="0"
                  borderTopLeftRadius="8"
                  borderTopRightRadius="8"
                  maxWidth={200}
                >
                  <HStack justifyContent="space-between">
                    <Text isTruncated>{item?.title}</Text>
                    <Text fontWeight="medium">
                      {getIDNLiveTime(item.live_at)}
                    </Text>
                  </HStack>
                </Box>
                <Box>
                  <Image
                    size="xl"
                    borderRadius="8"
                    borderTopLeftRadius="0"
                    borderTopRightRadius="0"
                    source={{ uri: item?.image ?? item.user.avatar }}
                    alt={item?.user?.name}
                    height={230}
                    width={200}
                    resizeMode="cover"
                  />
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
