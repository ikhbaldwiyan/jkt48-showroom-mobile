import React, { useEffect, useState } from "react";
import { Box, HStack, Image, Pressable, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { cleanImage, formatName, getSquareImage } from "../../../utils/helpers";
import { ROOMS } from "../../../services";

const RoomRegular = ({ refreshing }) => {
  const [rooms, setRooms] = useState([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    async function getRoomList() {
      const gen10 = await ROOMS.getRoomGen10();
      const response = await ROOMS.getRoomRegular();
      setRooms([...response.data, ...gen10.data]);
    }
    getRoomList();
  }, [refreshing]);

  const renderRoomItem = (room, idx) => (
    <Box key={idx} mr={3}>
      <Pressable
        onPress={() => {
          navigate("RoomDetail", {
            room: {
              room_id: room.id ?? room.room_id,
              ...room
            }
          });
        }}
      >
        <Image
          borderRadius={8}
          source={{
            uri: room.image_square
              ? cleanImage(room.image_square)
              : getSquareImage(room.image_url)
          }}
          alt={room?.main_name ?? room?.name}
          size="md"
          width="160"
          height="137"
        />
        <Box mt={2}>
          <Text fontSize="md" fontWeight="medium" color="white">
            {formatName(room?.room_url_key ?? room?.url_key)}
          </Text>
        </Box>
      </Pressable>
    </Box>
  );

  const renderColumn = (columnRooms, idx) => (
    
    <VStack key={idx} space={4}>
      {columnRooms.map((room, idx) => renderRoomItem(room, idx))}
    </VStack>
  );

  const renderRoomList = () => {
    const columns = [];
    const columnCount = 2; // Limiting to 2 columns
    const itemsPerColumn = Math.ceil(rooms.length / columnCount);
    for (let i = 0; i < columnCount; i++) {
      const columnRooms = rooms.slice(
        i * itemsPerColumn,
        (i + 1) * itemsPerColumn
      );
      columns.push(renderColumn(columnRooms, i));
    }
    return columns;
  };

  return (
    <Box>
      <HStack>{renderRoomList()}</HStack>
    </Box>
  );
};

export default RoomRegular;
