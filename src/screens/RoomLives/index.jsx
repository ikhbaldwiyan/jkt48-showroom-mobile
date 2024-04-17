import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { cleanImage, formatName } from "../../utils/helpers";
import Views from "../../components/atoms/Views";
import { ROOMS } from "../../services";
import Layout from "../../components/templates/Layout";
import { useRefresh } from "../../utils/hooks/useRefresh";

const RoomLives = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  const { navigate } = useNavigation();
  const { refreshing, onRefresh } = useRefresh();

  useEffect(() => {
    async function getRoomLive() {
      const room = await ROOMS.getRoomLive();
      const roomLiveFilter = room?.data.data?.filter(
        (room) => room.premium_room_type !== 1
      );
      setRooms(roomLiveFilter);
    }
    getRoomLive();
  }, [refreshing]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Showroom Live"
    });
  }, []);

  const renderRoomItem = (item, idx) => (
    <Box key={idx} mr="4">
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
          width={150}
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

  return rooms?.length > 0 ? (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <Box mb="4">
        <HStack width="50%">{renderRoomList()}</HStack>
      </Box>
    </Layout>
  ) : (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <Box mb="4"></Box>
    </Layout>
  );
};

export default RoomLives;
