import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, Divider, FlatList, HStack, Image, Text, View, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { cleanImage, formatName } from "../../utils/helpers";
import Views from "../../components/atoms/Views";
import Layout from "../../components/templates/Layout";
import { useRefresh } from "../../utils/hooks/useRefresh";
import { TopMember, HistoryLive, EmptyLive } from "../../components/organisms";
import { LiveIcon, RefreshIcon } from "../../assets/icon";
import { FlashList } from "@shopify/flash-list";
import { useShowroomLive } from "../../services/hooks/useShowroomLive";

const ShowroomLive = ({ navigation }) => {
  const { navigate } = useNavigation();
  const { refreshing, onRefresh } = useRefresh();
  const { data: rooms = [], refetch, isLoading } = useShowroomLive();

  useEffect(() => {
    refetch();
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
        ),
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
              uri: cleanImage(item.image_square),
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
      <VStack space="2">
        <FlashList
          numColumns={2}
          data={rooms}
          renderItem={renderRoomItem}
          keyExtractor={(item) => item?.room_url_key}
          ListEmptyComponent={<EmptyLive isLoading={isLoading} />}
          estimatedItemSize={100}
        />
        <Divider mt={isLoading ? "16" : "2"} />
        <TopMember liveType="showroom" />
        <HistoryLive />
      </VStack>
    </Layout>
  );
};

export default ShowroomLive;
