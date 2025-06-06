import React, { useCallback, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Box, Divider, HStack, Image, Text, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native";
import { cleanImage, formatName, getTimes } from "../../../utils/helpers";
import Views from "../../atoms/Views";
import { RightArrow } from "../../../assets/icon";
import { useAppStateChange } from "../../../utils/hooks";
import { useShowroomLive } from "../../../services/hooks/useShowroomLive";

const ShowroomLive = ({ refreshing }) => {
  const { navigate } = useNavigation();
  const { data: rooms = [], refetch } = useShowroomLive();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useEffect(() => {
    refetch();
  }, [refreshing]);

  useAppStateChange(refetch);

  return (
    rooms?.length > 0 && (
      <Box mb="4">
        <HStack alignItems="center" justifyContent="space-between">
          <Text color="white" fontSize="2xl" fontWeight="semibold">
            Showroom Live
          </Text>
          {rooms.length > 2 && (
            <TouchableOpacity onPress={() => navigate("ShowroomLive")}>
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
                  px="1"
                  top="1.5"
                  left="2"
                  zIndex="99"
                  position="absolute"
                  bg="blueGray.600"
                  borderRadius="sm"
                  shadow={6}
                >
                  <HStack space={1} alignItems="center">
                    <Text fontSize={12}>{getTimes(item?.started_at)}</Text>
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
                    {item?.room_url_key === "officialJKT48"
                      ? "JKT48 Offical"
                      : formatName(item?.room_url_key)}
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
