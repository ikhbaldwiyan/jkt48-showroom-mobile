import { useRoute } from "@react-navigation/native";
import { Center, HStack, Image, ScrollView, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { STREAM } from "../../../../services";
import useLiveStreamStore from "../../../../store/liveStreamStore";
import { useRefresh } from "../../../../utils/hooks/useRefresh";
import CardGradient from "../../../atoms/CardGradient";

export const Podium = () => {
  const route = useRoute();
  const { params } = route;
  const { profile } = useLiveStreamStore();
  const [podium, setPodium] = useState([]);
  const [views, setViews] = useState(0);
  const { refreshing, onRefresh } = useRefresh();

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

    // Set interval to fetch data every 2 minutes
    const interval = setInterval(() => {
      getPodiumList();
    }, 2 * 60 * 1000); // 2 minutes in milliseconds

    return () => clearInterval(interval);
  }, [profile, refreshing]);

  return (
    <CardGradient>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Center>
          <Text fontWeight="bold">{views} Orang sedang menonton</Text>
        </Center>
        <HStack
          space={2}
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
        >
          {podium?.map((item, idx) => (
            <VStack my="4" key={idx} alignItems="center" width="20%">
              <Image
                alt={item.user.name}
                style={{ width: 50, height: 50 }}
                source={{ uri: item?.user?.avatar }}
              />
              <Text mt="2" fontSize="sm" fontWeight="semibold" isTruncated>
                {item.user.name}
              </Text>
            </VStack>
          ))}
        </HStack>
      </ScrollView>
    </CardGradient>
  );
};