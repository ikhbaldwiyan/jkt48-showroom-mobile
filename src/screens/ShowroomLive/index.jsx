import React, { useEffect, useLayoutEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useShowroomLive } from "../../services/hooks/useShowroomLive";
import { useRefresh } from "../../utils/hooks/useRefresh";

import { Divider, HStack, Text, VStack } from "native-base";
import { LiveIcon, RefreshIcon } from "../../assets/icon";
import {
  HistoryLive,
  ShowroomLiveCard,
  TopMember,
} from "../../components/organisms";
import Layout from "../../components/templates/Layout";

const ShowroomLive = ({ navigation }) => {
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
        )
    });
  }, [rooms]);

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <VStack space="2">
        <ShowroomLiveCard rooms={rooms} isLiveStream />
        <Divider mt={isLoading ? "16" : "3"} />
        <TopMember liveType="showroom" />
        <HistoryLive liveType="showroom" />
      </VStack>
    </Layout>
  );
};

export default ShowroomLive;
