import React, { useCallback, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Box, Divider, HStack, Image, Text, ScrollView } from "native-base";
import { TouchableOpacity, Pressable } from "react-native";
import Views from "../../atoms/Views";
import { IDNLiveIcon, RightArrow } from "../../../assets/icon";
import { useAppStateChange } from "../../../utils/hooks";
import { formatName, getIDNLiveTime } from "../../../utils/helpers";
import CardGradient from "../../atoms/CardGradient";
import { useIDNLive } from "../../../services/hooks/useIDNLive";

const IDNLive = ({ refreshing }) => {
  const { navigate } = useNavigation();
  const { data: rooms = [], refetch } = useIDNLive();

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
                  px="1"
                  top="2"
                  left="2"
                  zIndex="99"
                  position="absolute"
                  bg="rgba(0,0,0,0.3)"
                  borderRadius="sm"
                  shadow={6}
                >
                  <Text fontSize="12" fontWeight="semibold" color="muted.200">
                    {getIDNLiveTime(item.live_at)}
                  </Text>
                </Box>
                <Box position="absolute" top="2" right="2" zIndex="99">
                  <IDNLiveIcon />
                </Box>
                <Box>
                  <Image
                    size="xl"
                    borderRadius="10"
                    borderTopLeftRadius="10"
                    borderTopRightRadius="10"
                    borderBottomLeftRadius="0"
                    borderBottomRightRadius="0"
                    source={{ uri: item?.image ?? item.user.avatar }}
                    alt={item?.user?.name}
                    height={200}
                    width={175}
                    resizeMode="cover"
                  />
                </Box>
                <CardGradient color="lightDark">
                  <Text fontWeight="medium" fontSize={13} isTruncated>
                    {item?.title.length > 19
                      ? item?.title?.slice(0, 18) + "..."
                      : item?.title}
                  </Text>
                </CardGradient>
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
                      {formatName(item?.user?.name, true)}
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
