import React from "react";
import { Box, HStack, Image, ScrollView, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import EmptyLive from "../EmptyLive";
import { cleanImage, formatName } from "../../../utils/helpers";
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
          <Image
            borderRadius={8}
            source={{
              uri: cleanImage(item.image_square)
            }}
            alt={item.main_name}
            size="xl"
            width="100%"
          />
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
          <VStack key={idx} space={2} mb={4}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigate("LiveStream", { item });
              }}
            >
              <Box position="relative" w="130px" h="110px">
                <Image
                  source={{
                    uri: cleanImage(item?.image_square)
                  }}
                  alt={item?.profile?.room_url_key ?? item?.room_url_key}
                  w="130px"
                  h="110px"
                  borderRadius="md"
                />
              </Box>
              <HStack mt="2" space={2} alignItems="center">
                <Text fontSize={14} fontWeight="semibold">
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
