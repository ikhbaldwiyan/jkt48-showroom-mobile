import React from "react";
import { Box, HStack, Image, ScrollView, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import EmptyLive from "../EmptyLive";
import { cleanImage, formatName, getTimes } from "../../../utils/helpers";
import { FlashList } from "@shopify/flash-list";
import Views from "../../atoms/Views";
import { useNavigation } from "@react-navigation/native";

const ShowroomLiveCard = ({ rooms, isLiveStream, isLoading }) => {
  const { navigate } = useNavigation();

  const renderRoomItem = ({ item, index }) => {
    const isLastRow = index >= rooms.length - (rooms.length % 2 === 0 ? 2 : 1);

    return (
      <Box flex={1} key={index} mr="3" mb={isLastRow ? "0" : "3"}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigate("LiveStream", { item });
          }}
        >
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
            <Text fontSize="12" fontWeight="semibold" color="muted.200">
              {getTimes(item?.started_at)}
            </Text>
          </Box>
          <Box position="relative">
            <Image
              source={{
                uri: cleanImage(item?.image_square)
              }}
              alt={item?.profile?.room_url_key ?? item?.room_url_key}
              size="xl"
              width="100%"
              borderRadius="8"
            />
          </Box>
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
                {formatName(item?.room_url_key, true)}
              </Text>
              <Views number={item?.view_num} />
            </HStack>
          </TouchableOpacity>
        </TouchableOpacity>
      </Box>
    );
  };

  if (isLiveStream) {
    return (
      <FlashList
        numColumns={2}
        data={rooms}
        renderItem={renderRoomItem}
        keyExtractor={(item) => item?.room_url_key}
        ListEmptyComponent={<EmptyLive isLoading={isLoading} type="sorum" />}
        estimatedItemSize={100}
      />
    );
  }

  return rooms?.length > 0 ? (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <HStack mt="2" space={3}>
        {rooms?.map((item, idx) => (
          <VStack key={idx} space={2} mb={1}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigate("LiveStream", { item });
              }}
            >
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
                <Text fontSize="12" fontWeight="semibold" color="muted.200">
                  {getTimes(item?.started_at)}
                </Text>
              </Box>
              <Box position="relative" w="160px" h="130px">
                <Image
                  source={{
                    uri: cleanImage(item?.image_square)
                  }}
                  alt={item?.profile?.room_url_key ?? item?.room_url_key}
                  w="160px"
                  h="130px"
                  borderRadius="8"
                />
              </Box>
              <HStack mt="2.5" space={2} alignItems="center">
                <Text fontSize="md" fontWeight="semibold">
                  {formatName(item?.room_url_key, true)}
                </Text>
                <Views number={item?.view_num} />
              </HStack>
            </TouchableOpacity>
          </VStack>
        ))}
      </HStack>
    </ScrollView>
  ) : (
    <Box mb="3">
      <EmptyLive type="sorum" isLoading={isLoading} />
    </Box>
  );
};

export default ShowroomLiveCard;
