import React, { useEffect, useState } from "react";
import { Box, HStack, Image, Text, VStack, Skeleton } from "native-base"; // Import Skeleton from NativeBase
import { useNavigation } from "@react-navigation/native";
import { cleanImage, formatName } from "../../../utils/helpers";
import { ROOMS } from "../../../services";
import { LiveIcon } from "../../../assets/icon";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import SkeletonRoomList from "../../atoms/Skeleteon/SkeletonRoomList";

const RoomTrainee = ({ refreshing, searchQuery }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();
  const columnCount = width > 600 ? 3 : 2;

  useEffect(() => {
    async function getRoomList() {
      setLoading(true); // Set loading to true when fetching data
      try {
        const response = await ROOMS.getRoomTrainee();
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    }
    getRoomList();
  }, [refreshing]);

  const filteredRooms = rooms.filter(
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
            width={width / columnCount - 20} // Adjust width based on column count and screen width
            height={(width / columnCount - 16) * 0.85} // Maintain aspect ratio
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

  return (
    <Box>
      {loading ? <SkeletonRoomList /> : <HStack>{renderRoomList()}</HStack>}
    </Box>
  );
};

export default RoomTrainee;
