import { Center, HStack, Image, ScrollView, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { STREAM } from "../../../../services";
import useIDNLiveStore from "../../../../store/idnLiveStore";
import { useRefresh } from "../../../../utils/hooks/useRefresh";
import CardGradient from "../../../atoms/CardGradient";

export const PodiumIDN = () => {
  const [podium, setPodium] = useState([]);
  const [views, setViews] = useState(0);
  const { refreshing, onRefresh } = useRefresh();
  const { profile } = useIDNLiveStore();

  async function getIDNPodiumList() {
    const response = await STREAM.getIDNLivePodium(profile?.slug);
    setPodium(response?.data?.activityLog?.watch?.reverse());
    setViews(response?.data?.liveData?.users);
  }

  useEffect(() => {
    try {
      getIDNPodiumList();
    } catch (error) {
      console.log(error);
    }
  }, [profile]);

  useEffect(() => {
    setTimeout(() => {
      getIDNPodiumList();
    }, 1000);

    // Set interval to fetch data every 2 minutes
    const interval = setInterval(() => {
      getIDNPodiumList();
    }, 2 * 60 * 1000); // 2 minutes in milliseconds

    return () => clearInterval(interval);
  }, [refreshing]);

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
