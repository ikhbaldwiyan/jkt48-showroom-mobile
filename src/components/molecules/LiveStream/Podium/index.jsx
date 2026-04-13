import { useEffect, useState } from "react";
import {
  Box,
  Center,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import { RefreshControl, TouchableOpacity } from "react-native";
import { STREAM } from "../../../../services";
import useLiveStreamStore from "../../../../store/liveStreamStore";
import { useRefresh } from "../../../../utils/hooks/useRefresh";
import CardGradient from "../../../atoms/CardGradient";
import { FlashList } from "@shopify/flash-list";
import UserModal from "../../../atoms/UserModal";
import trackAnalytics from "../../../../utils/trackAnalytics";
import InfoPodium from "../../../atoms/InfoPodium";
import BadgeUser from "../../../atoms/BadgeUser";

export const Podium = () => {
  const { profile } = useLiveStreamStore();
  const [podium, setPodium] = useState([]);
  const [views, setViews] = useState(0);
  const { refreshing, onRefresh } = useRefresh();
  const displayedNames = new Set();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getPodiumList() {
    setIsLoading(true);
    try {
      const response = await STREAM.getLivePodium(profile?.live_id);
      setPodium(response?.data?.activityLog?.watch?.reverse());
      setViews(response?.data?.liveData?.users);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
    if (isLoading && podium.length === 0) {
      return (
        <VStack my="4" alignItems="center" width="100%">
          <Center>
            <Skeleton size="50px" rounded="full" />
            <Skeleton h="3" w="12" mt="2" rounded="sm" />
          </Center>
        </VStack>
      );
    }

    if (displayedNames.has(item.user.name)) {
      return null;
    }
    displayedNames.add(item.user.name);

    return (
      <VStack my="4" alignItems="center" width="100%">
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => {
            setSelectedUser(item.user);
            trackAnalytics("podium_user_click", {
              name: item.user.name,
              user_id: item.user.user_id,
            });
          }}
        >
          <Center>
            <Image
              alt={item.user.name}
              style={{ width: 50, height: 50 }}
              source={{
                uri:
                  item?.user?.avatar ??
                  "https://static.showroom-live.com/image/avatar/1028686.png?v=100",
              }}
            />
            <BadgeUser user={item?.user} />
          </Center>
        </TouchableOpacity>
      </VStack>
    );
  };

  return (
    <CardGradient>
      <FlashList
        data={
          isLoading && podium.length === 0 ? Array.from({ length: 12 }) : podium
        }
        renderItem={renderItem}
        keyExtractor={(item, idx) =>
          isLoading && podium.length === 0
            ? `skeleton-${idx}`
            : `${item.user.name}-${idx}`
        }
        numColumns={4}
        contentContainerStyle={{ padding: 6 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        estimatedItemSize={100}
        ListHeaderComponent={
          isLoading ? (
            <Box alignItems="center" justifyContent="center">
              <Text>Loading user...</Text>
            </Box>
          ) : (
            <HStack
              mb="2"
              justifyContent="center"
              alignItems="center"
              space={3}
            >
              <Text fontWeight="medium">{views} Orang sedang menonton</Text>
              <InfoPodium />
            </HStack>
          )
        }
      />
      <UserModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </CardGradient>
  );
};
