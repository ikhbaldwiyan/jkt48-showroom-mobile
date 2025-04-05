import { useEffect, useState } from "react";
import { Center, HStack, Image, Text, VStack } from "native-base";
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
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => {
            setSelectedUser(item.user);
            trackAnalytics("podium_user_click", {
              name: item.user.name,
              user_id: item.user.user_id
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
                  "https://static.showroom-live.com/image/avatar/1028686.png?v=100"
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
        data={podium}
        renderItem={renderItem}
        keyExtractor={(item, idx) => `${item.user.name}-${idx}`}
        numColumns={4}
        contentContainerStyle={{ padding: 6 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        estimatedItemSize={100}
        ListHeaderComponent={
          <HStack mb="2" justifyContent="center" alignItems="center" space={3}>
            <Text fontWeight="medium">{views} Orang sedang menonton</Text>
            <InfoPodium />
          </HStack>
        }
      />
      <UserModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </CardGradient>
  );
};
