import { useEffect, useState } from "react";
import { Center, Image, Text, VStack } from "native-base";
import { RefreshControl } from "react-native";
import { STREAM } from "../../../../services";
import useLiveStreamStore from "../../../../store/liveStreamStore";
import { useRefresh } from "../../../../utils/hooks/useRefresh";
import CardGradient from "../../../atoms/CardGradient";
import { FlashList } from "@shopify/flash-list";

export const Podium = () => {
  const { profile } = useLiveStreamStore();
  const [podium, setPodium] = useState([]);
  const [views, setViews] = useState(0);
  const { refreshing, onRefresh } = useRefresh();
  const displayedNames = new Set();

  async function getPodiumList() {
    const response = await STREAM.getLivePodium(profile?.live_id);
    setPodium(response?.data?.activityLog?.watch?.reverse());
    setViews(response?.data?.liveData?.users);
  }

  useEffect(() => {
    try {
      getPodiumList();
    } catch (error) {
      console.log(error);
    }
  }, [profile]);

  useEffect(() => {
    setTimeout(() => {
      getPodiumList();
    }, 1000);

    const interval = setInterval(() => {
      getPodiumList();
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [profile, refreshing]);

  const renderItem = ({ item }) => {
    if (displayedNames.has(item.user.name)) {
      return null;
    }
    displayedNames.add(item.user.name);

    return (
      <VStack my="4" alignItems="center" width="100%">
        <Image
          alt={item.user.name}
          style={{ width: 50, height: 50 }}
          source={{
            uri:
              item?.user?.avatar ??
              "https://static.showroom-live.com/image/avatar/1028686.png?v=100"
          }}
        />
        <Text mt="2" fontSize="sm" fontWeight="semibold" isTruncated>
          {item.user.name}
        </Text>
      </VStack>
    );
  };

  return (
    <CardGradient>
      <FlashList
        data={podium}
        renderItem={renderItem}
        keyExtractor={(item, idx) => `${item.user.name}-${idx}`}
        numColumns={4}
        contentContainerStyle={{ padding: 6 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <Center>
            <Text fontWeight="bold">{views} Orang sedang menonton</Text>
          </Center>
        }
      />
    </CardGradient>
  );
};
