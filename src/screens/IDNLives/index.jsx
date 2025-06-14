import React, { useEffect, useLayoutEffect } from "react";
import { Box, Divider, HStack, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { useRefresh } from "../../utils/hooks/useRefresh";
import { useIDNLive } from "../../services/hooks/useIDNLive";

import { FlashList } from "@shopify/flash-list";
import { LiveIcon, RefreshIcon } from "../../assets/icon";
import Layout from "../../components/templates/Layout";
import { EmptyLive, HistoryLive, TopMember } from "../../components/organisms";
import IDNLiveCard from "../../components/atoms/IDNLiveCard";

const IDNLives = ({ navigation }) => {
  const { refreshing, onRefresh } = useRefresh();
  const { data: rooms = [], refetch, isLoading } = useIDNLive();

  useEffect(() => {
    refetch();
  }, [refreshing]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "IDN Live",
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

  const renderItem = ({ item, index }) => {
    const isLastRow = index >= rooms.length - (rooms.length % 2 === 0 ? 2 : 1);

    return (
      <Box
        flex={1}
        mb={isLastRow ? 2 : 4}
        mr={index % 2 === 0 ? "1" : 0}
        ml={index % 2 !== 0 ? "1" : 0}
      >
        <IDNLiveCard data={item} />
      </Box>
    );
  };

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <VStack space={2}>
        <FlashList
          numColumns={2}
          data={rooms}
          renderItem={renderItem}
          keyExtractor={(item) => item?.user?.name}
          ListEmptyComponent={<EmptyLive isLoading={isLoading} />}
          estimatedItemSize={100}
        />
        <Divider mt={isLoading ? "16" : rooms?.length > 2 ? 2 : 3} />
        <TopMember liveType="idn" />
        <HistoryLive liveType="idn" />
      </VStack>
    </Layout>
  );
};

export default IDNLives;
