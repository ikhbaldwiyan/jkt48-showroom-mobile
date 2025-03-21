import { useEffect, useState } from "react";
import { RefreshControl, TouchableOpacity } from "react-native";
import { Center, HStack, Image, ScrollView, Text, VStack } from "native-base";
import { STREAM } from "../../../../services";
import useIDNLiveStore from "../../../../store/idnLiveStore";
import { useRefresh } from "../../../../utils/hooks/useRefresh";
import CardGradient from "../../../atoms/CardGradient";
import UserModal from "../../../atoms/UserModal";
import { useMostWatchIDN } from "../../../../services/hooks/useMostWatchIDN";

export const PodiumIDN = () => {
  const [podium, setPodium] = useState([]);
  const [views, setViews] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const { refreshing, onRefresh } = useRefresh();
  const { profile } = useIDNLiveStore();
  const displayedNames = new Set();
  const { data: mostWatch } = useMostWatchIDN(selectedUser?._id);
  const favMember = Array.isArray(mostWatch?.data)
    ? mostWatch.data.filter((item) => item?.member?.name !== "JKT48")
    : [];

  async function getIDNPodiumList() {
    try {
      const response = await STREAM.getIDNLivePodium(profile?.slug);
      setPodium(response?.data?.activityLog?.watch?.reverse() || []);
      setViews(response?.data?.liveData?.users || 0);
    } catch (error) {
      console.error("Error fetching podium list:", error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getIDNPodiumList();
    }, 1000);

    // Set interval to fetch data every 2 minutes
    const interval = setInterval(() => {
      getIDNPodiumList();
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
          space={3}
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
        >
          {podium?.map((item, idx) => {
            if (displayedNames.has(item.user.name)) {
              return null;
            }
            displayedNames.add(item.user.name);
            return (
              <VStack my="4" key={idx} width="20%">
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => setSelectedUser(item.user)}
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
                    <Text
                      mt="2"
                      fontSize="sm"
                      fontWeight="semibold"
                      isTruncated
                    >
                      {item.user.name}
                    </Text>
                  </Center>
                </TouchableOpacity>
              </VStack>
            );
          })}
        </HStack>
      </ScrollView>
      <UserModal
        favMember={favMember[0]}
        userInfo={mostWatch?.user}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </CardGradient>
  );
};
