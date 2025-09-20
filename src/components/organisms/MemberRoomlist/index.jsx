import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, Center, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { FlashList } from "@shopify/flash-list";
import { Info } from "../../../assets/icon";
import { useMemberListShowroom } from "../../../services/hooks/useMemberList";
import { getSquareImage } from "../../../utils/helpers";
import SkeletonRoomList from "../../atoms/Skeleteon/SkeletonRoomList";

const MemberRoomList = ({ refreshing, searchQuery, memberCategory }) => {
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();
  const columnCount = width > 600 ? 3 : 2;
  const category = !searchQuery ? memberCategory : "";

  const {
    data: rooms,
    isLoading,
    refetch,
    error
  } = useMemberListShowroom(category, searchQuery);

  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing]);

  const renderRoomItem = ({ item: room }) => (
    <Box pt="2.5">
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          navigate("RoomDetail", { room });
        }}
      >
        <Box>
          <Image
            borderRadius={8}
            source={{
              uri:
                room?.category === "regular"
                  ? getSquareImage(room.image_url)
                  : room.image_url
            }}
            alt={room?.name}
            width={width / columnCount - 20}
            height={(width / columnCount - 16) * 0.85}
          />
        </Box>
        <Box mt={2}>
          <Text fontSize="md" fontWeight="medium" color="white">
            {room?.name}
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );

  if (isLoading) {
    return (
      <Box mt="2">
        <SkeletonRoomList />
      </Box>
    );
  }

  if ((searchQuery && rooms?.length === 0) || error?.response?.status === 404) {
    return (
      <Center flex={1} py={10}>
        <VStack space={4} alignItems="center">
          <Info size={48} color="#666" />
          <Text fontSize="lg" textAlign="center">
            Member tidak ditemukan
          </Text>
        </VStack>
      </Center>
    );
  }

  return (
    <FlashList
      data={rooms}
      numColumns={2}
      renderItem={renderRoomItem}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      estimatedItemSize={100}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

export default MemberRoomList;
