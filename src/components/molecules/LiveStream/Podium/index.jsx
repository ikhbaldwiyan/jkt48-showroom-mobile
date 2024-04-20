import { useRoute } from "@react-navigation/native";
import {
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack
} from "native-base";
import { useEffect, useState } from "react";
import { RefreshControl, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { STREAM } from "../../../../services";
import { useRefresh } from "../../../../utils/hooks/useRefresh";

export const Podium = ({ isIDNLive }) => {
  const route = useRoute();
  const { params } = route;
  const [podium, setPodium] = useState([]);
  const [views, setViews] = useState(0);
  const { refreshing, onRefresh } = useRefresh();

  async function getPodiumList() {
    const response = await STREAM.getLivePodium(params?.item?.live_id);
    setPodium(response?.data?.activityLog?.watch?.reverse());
    setViews(response?.data?.liveData?.users)
  }

  async function getIDNPodiumList() {
    const response = await STREAM.getIDNLivePodium(params?.item?.slug);
    setPodium(response?.data?.activityLog?.watch?.reverse());
    setViews(response?.data?.liveData?.users)
  }

  useEffect(() => {
    try {
      isIDNLive ? getIDNPodiumList() : getPodiumList();
    } catch (error) {
      console.log(error);
    }
  }, [params.item]);

  useEffect(() => {
    setTimeout(() => {
      isIDNLive ? getIDNPodiumList() : getPodiumList();
    }, 1000);

    // Set interval to fetch data every 2 minutes
    const interval = setInterval(() => {
      isIDNLive ? getIDNPodiumList() : getPodiumList();
    }, 2 * 60 * 1000); // 2 minutes in milliseconds

    return () => clearInterval(interval);
  }, [params?.item?.live_id, refreshing]);

  return (
    <LinearGradient
      colors={["#24A2B7", "#3B82F6"]}
      style={styles.linearGradient}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Center>
          <Text fontWeight="bold">
            {views} Orang sedang menonton
          </Text>
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
    </LinearGradient>
  );
};

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 12,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  }
});
