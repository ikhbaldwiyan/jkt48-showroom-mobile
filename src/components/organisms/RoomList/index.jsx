import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Box, HStack, Image, Pressable, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    async function getRoomLive() {
      const response = await axios.get("https://sorum.vercel.app/api/rooms/academy");
      setRooms(response.data)
    }
    getRoomLive();
  }, []);

  const renderRoomItem = (room, idx) => (
    <Pressable
      onPress={() => {
        navigate("RoomDetail", { room })
      }}
    >
      <Box key={idx} mr={3}>
        <Image
          borderRadius={8}
          source={{ uri: room.image_square?.replace("s.jpeg", "l.jpeg") }}
          alt={room?.main_name} size="md" width="160" height="137"
        />
        <Box mt={2}>
          <Text fontSize="md" fontWeight="medium" color="white">
            {room?.room_url_key?.replace("JKT48_", " ")} JKT48
          </Text>
        </Box>
      </Box>
    </Pressable>
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
      const columnRooms = rooms.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn);
      columns.push(renderColumn(columnRooms, i));
    }
    return columns;
  };

  return (
    <Box>
      <Text color="white" fontSize="2xl" py="4" pt="1" fontWeight="semibold">
        Room List
      </Text>
      <HStack>
        {renderRoomList()}
      </HStack>
    </Box>
  );
}

export default RoomList