import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, Center, HStack, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { Info } from "../../../assets/icon";
import { useMemberListShowroom } from "../../../services/hooks/useMemberList";
import { getSquareImage } from "../../../utils/helpers";
import SkeletonRoomList from "../../atoms/Skeleteon/SkeletonRoomList";

const RoomRegular = ({ refreshing, searchQuery }) => {
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();
  const columnCount = width > 600 ? 3 : 2;

  const category = !searchQuery ? "regular" : null;

  const {
    data: rooms = [],
    isLoading,
    refetch,
  } = useMemberListShowroom(category, searchQuery);

  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing]);

  const renderRoomItem = (room, idx) => (
    <Box key={idx} mr={3}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          navigate("RoomDetail", {
            room,
          });
        }}
      >
        <Box>
          <Image
            borderRadius={8}
            source={{
              uri: getSquareImage(room.image_url),
            }}
            alt={room?.name}
            size="md"
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

  const renderColumn = (columnRooms, idx) => (
    <VStack key={idx} space={4}>
      {columnRooms?.map((room, idx) => renderRoomItem(room, idx))}
    </VStack>
  );

  const renderRoomList = () => {
    const columns = [];
    const itemsPerColumn = Math.ceil(rooms?.length / columnCount);
    for (let i = 0; i < columnCount; i++) {
      const columnRooms = rooms?.slice(
        i * itemsPerColumn,
        (i + 1) * itemsPerColumn
      );
      columns.push(renderColumn(columnRooms, i));
    }
    return columns;
  };

  if (isLoading) {
    return <SkeletonRoomList />;
  }

  if (searchQuery && rooms?.length === 0) {
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

  return <HStack>{renderRoomList()}</HStack>;
};

export default RoomRegular;
