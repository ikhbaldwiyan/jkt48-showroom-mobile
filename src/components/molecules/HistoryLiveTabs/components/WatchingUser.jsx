import { useEffect, useState } from "react";
import { RefreshControl, TouchableOpacity } from "react-native";
import {
  Box,
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { STREAM } from "../../../../services";
import useIDNLiveStore from "../../../../store/idnLiveStore";
import { useRefresh } from "../../../../utils/hooks/useRefresh";
import CardGradient from "../../../atoms/CardGradient";
import UserModal from "../../../atoms/UserModal";
import trackAnalytics from "../../../../utils/trackAnalytics";
import BadgeUser from "../../../atoms/BadgeUser";
import { usePodiumList } from "../../../../services/hooks/useHistoryLive";
import Loading from "../../../atoms/Loading";

export const WatchingUser = ({ platform, liveId }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { refreshing, onRefresh } = useRefresh();
  const displayedNames = new Set();

  const { data, isLoading } = usePodiumList(platform, liveId);
  const podium = data?.activityLog?.watch?.reverse();
  const views = data?.liveData?.users;

  return (
    <CardGradient isRounded>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <Box justifyContent="center" height={200} alignItems="center">
            <Loading />
          </Box>
        ) : (
          <>
            <HStack justifyContent="center" alignItems="center" space={3}>
              <Text fontWeight="medium">{views} Views</Text>
            </HStack>
            <HStack
              mt="2"
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
                        <BadgeUser user={item.user} />
                      </Center>
                    </TouchableOpacity>
                  </VStack>
                );
              })}
            </HStack>
          </>
        )}
      </ScrollView>
      <UserModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </CardGradient>
  );
};
