import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, Divider, HStack, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { cleanImage, formatName } from "../../utils/helpers";
import Views from "../../components/atoms/Views";
import { ROOMS } from "../../services";
import Layout from "../../components/templates/Layout";
import { useRefresh } from "../../utils/hooks/useRefresh";
import { TopMember, HistoryLive, EmptyLive } from "../../components/organisms";
import { LiveIcon, RefreshIcon } from "../../assets/icon";
import { FlashList } from "@shopify/flash-list";

const ShowroomLive = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  const { navigate } = useNavigation();
  const { refreshing, onRefresh } = useRefresh();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRoomLive = async () => {
      setIsLoading(true);
      try {
        const room = await ROOMS.getRoomLive();
        const roomLiveFilter = room?.data.data;
        setRooms(roomLiveFilter);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getRoomLive();
  }, [refreshing]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Showroom Live",
      headerRight: () =>
        rooms.length > 0 ? (
          <HStack space={2} justifyContent="center" alignItems="center">
            <LiveIcon size={18} />
            <Text>{rooms?.length} Member Live</Text>
          </HStack>
        ) : (
          <TouchableOpacity activeOpacity={0.7} onPress={onRefresh}>
            <HStack space={2} justifyContent="center" alignItems="center">
              <RefreshIcon />
              <Text>Refresh</Text>
            </HStack>
          </TouchableOpacity>
        )
    });
  }, [rooms]);

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

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <VStack space="4">
        {rooms?.length > 0 ? (
          <>
            <FlashList
              numColumns={2}
              data={rooms}
              renderItem={renderRoomItem}
              keyExtractor={(item, idx) => idx.toString()}
              estimatedItemSize={10}
            />
            <Divider />
          </>
        ) : (
          <EmptyLive isLoading={isLoading} />
        )}
        <TopMember liveType="showroom" />
        <HistoryLive />
      </VStack>
    </Layout>
  );
};

export default ShowroomLive;
