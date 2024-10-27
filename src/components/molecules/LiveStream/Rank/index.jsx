import { Box, FlatList, HStack, Image, Text, View } from "native-base";
import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { STREAM } from "../../../../services";
import useLiveStreamStore from "../../../../store/liveStreamStore";
import { FlashList } from "@shopify/flash-list"

import { useRefresh } from "../../../../utils/hooks/useRefresh";
import CardGradient from "../../../atoms/CardGradient";

export const Rank = () => {
  const { profile } = useLiveStreamStore();
  const [ranks, setRanks] = useState([]);
  const { refreshing, onRefresh } = useRefresh();

  async function getRankShowroom() {
    try {
      const room = await STREAM.getRankShowroom(profile?.room_id);
      setRanks(room?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRankShowroom();
  }, [refreshing, profile]);

  useEffect(() => {
    setTimeout(() => {
      getRankShowroom();
    }, 1000);

    // Set interval to fetch data every 2 minutes
    const interval = setInterval(() => {
      getRankShowroom();
    }, 2 * 60 * 1000); // 2 minutes in milliseconds

    return () => clearInterval(interval);
  }, [profile]);

  return (
    <CardGradient>
      <FlashList
        data={ranks}
        renderItem={({ item }) => (
          <Box>
            <HStack
              py="1"
              alignItems="center"
              justifyItems="center"
              px="3"
              space={6}
            >
              <Text fontWeight="bold">{item?.order_no}</Text>
              <Box p="2">
                <HStack space={3} alignItems="center" justifyContent="center">
                  <Image
                    style={{ width: 45, height: 45 }}
                    source={{
                      uri: item?.user?.avatar_url
                    }}
                    alt="avatar"
                  />
                  <View justifyContent="center" alignItems="center">
                    <Text fontWeight="semibold">{item?.user?.name}</Text>
                  </View>
                </HStack>
              </Box>
            </HStack>
          </Box>
        )}
        estimatedItemSize={100}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </CardGradient>
  );
};
