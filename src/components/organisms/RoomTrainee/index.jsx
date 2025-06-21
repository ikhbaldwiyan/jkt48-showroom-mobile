import React, { useEffect } from "react";
import { Box, HStack, Image, Text, VStack, Center } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { cleanImage, formatName } from "../../../utils/helpers";
import { Info, LiveIcon } from "../../../assets/icon";
import { TouchableOpacity } from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import SkeletonRoomList from "../../atoms/Skeleteon/SkeletonRoomList";
import { useMemberList } from "../../../services/hooks/useMemberList";

const RoomTrainee = ({ refreshing, searchQuery }) => {
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();
  const columnCount = width > 600 ? 3 : 2;

  const { data: rooms = [], isLoading } = useMemberList({
    type: "trainee",
    searchQuery
  });

  useEffect(() => {
    if (refreshing) {
      refetch()
    }
  }, [refreshing])

  const filteredRooms = rooms?.filter(
    (room) =>
      room.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      room.main_name?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  const renderRoomItem = (room, idx) => (
    <Box key={idx} mr={3}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          navigate("RoomDetail", {
            room: {
              room_id: room.id ?? room.room_id,
              ...room
            }
          });
        }}
      >
        <Box>
          <Image
            borderRadius={8}
            source={{ uri: cleanImage(room.image_square) }}
            alt={room?.main_name ?? room?.name}
            size="md"
            width={width / columnCount - 20}
            height={(width / columnCount - 16) * 0.85}
          />
          {room?.is_onlive && (
            <Box
              borderTopLeftRadius="8"
              borderBottomRightRadius="8"
              position="absolute"
              background="primary"
              py="1"
              px="2"
            >
              <HStack space={1} alignItems="center">
                <LiveIcon size={16} />
                <Text fontWeight="semibold">Live</Text>
              </HStack>
            </Box>
          )}
        </Box>
        <Box mt={2}>
          <Text fontSize="md" fontWeight="medium" color="white">
            {formatName(room?.room_url_key ?? room?.url_key)}
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );

  const renderColumn = (columnRooms, idx) => (
    <VStack key={idx} space={4}>
      {columnRooms.map((room, idx) => renderRoomItem(room, idx))}
    </VStack>
  );

  const renderRoomList = () => {
    const columns = [];
    const itemsPerColumn = Math.ceil(filteredRooms.length / columnCount);
    for (let i = 0; i < columnCount; i++) {
      const columnRooms = filteredRooms.slice(
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

  if (searchQuery && filteredRooms.length === 0) {
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

export default RoomTrainee;
