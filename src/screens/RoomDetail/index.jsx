import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Button,
  HStack,
  Image,
  Skeleton,
  Spinner,
  Text,
} from "native-base";
import { cleanImage, formatName, formatViews } from "../../utils/helpers";
import useProfileStore from "../../store/profileStore";
import Loading from "../../components/atoms/Loading";
import ProfileTabs from "../../components/molecules/ProfileTabs";
import {
  Followers,
  IDCard,
  LiveIcon,
  UserAdd,
  UserCheck,
  WatchIcon,
} from "../../assets/icon";
import moment from "moment";
import useUser from "../../utils/hooks/useUser";
import { TouchableOpacity, StyleSheet } from "react-native";
import trackAnalytics from "../../utils/trackAnalytics";
import LinearGradient from "react-native-linear-gradient";

const RoomDetail = () => {
  const route = useRoute();
  const { params } = route;

  const navigation = useNavigation();
  const { profile, getProfile, clearProfile, historyLive, followRoom } =
    useProfileStore();
  const { userProfile, session } = useUser();
  const [loadingFollow, setLoadingFollow] = useState(false);

  const fetchProfile = async () => {
    await getProfile(
      params.room.room_id ?? profile.room_id,
      session?.cookie_login_id
    );
  };

  useEffect(() => {
    fetchProfile();

    return () => {
      clearProfile();
    };
  }, [session]);

  useEffect(() => {
    trackAnalytics("visit_showroom_profile", {
      username: userProfile?.user_id ?? "Guest",
      room: profile?.room_url_key,
    });
  }, [userProfile, profile]);

  useLayoutEffect(() => {
    const isFollow = profile?.is_follow;
    const title = profile ? formatName(profile?.room_url_key) : "Profile";

    navigation.setOptions({
      headerTitle:
        profile?.room_url_key !== "officialJKT48" ? title : "JKT48 Ofiicial",
      headerRight: () =>
        session && (
          <Button
            py="1"
            size="xs"
            borderRadius="md"
            background={isFollow ? "teal" : "primary"}
            disabled={loadingFollow}
            onPress={() => handleFollowRoom(!isFollow ? 1 : 0)}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => handleFollowRoom(!isFollow ? 1 : 0)}
            >
              <HStack space={1} alignItems="center">
                {loadingFollow ? (
                  <>
                    <Spinner size={18} color="white" />
                    <Text fontWeight="bold">Loading</Text>
                  </>
                ) : (
                  <>
                    {isFollow ? <UserCheck /> : <UserAdd />}
                    <Text fontWeight="bold">
                      {isFollow ? "Followed" : "Follow"}
                    </Text>
                  </>
                )}
              </HStack>
            </TouchableOpacity>
          </Button>
        ),
    });
  }, [profile]);

  const handleFollowRoom = async (flag) => {
    setLoadingFollow(true);
    trackAnalytics("follow_member", {
      username: userProfile?.name ?? "Guest",
      room: profile?.room_url_key,
    });

    try {
      await followRoom({
        flag,
        room_id: profile?.room_id,
        csrf_token: session?.csrf_token,
        cookies_id: session?.cookie_login_id,
      });
      setLoadingFollow(false);
      await fetchProfile();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box flex="1" bg="secondary" p="3">
      {profile ? (
        <>
          <Image
            size="md"
            borderRadius="md"
            borderBottomLeftRadius="0"
            borderBottomRightRadius="0"
            source={{ uri: cleanImage(profile?.image, true) }}
            alt="image"
            width="100%"
            height={215}
          />
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={["#004A66", "#009FCB"]}
            style={styles.linearGradient}
          >
            <Box
              p="3"
              borderBottomLeftRadius="5"
              borderBottomRightRadius="6"
              width="100%"
            >
              <HStack space={2} alignItems="center">
                <LiveIcon size={18} />
                <Text fontWeight="semibold">Live Terakhir:</Text>
                <Text fontWeight="semibold">
                  {historyLive ? (
                    moment(historyLive[0]?.live_info?.date?.end).format(
                      "dddd, D MMMM HH:mm"
                    ) + " WIB"
                  ) : (
                    <Skeleton size="3" w="200" rounded="full" />
                  )}
                </Text>
              </HStack>
              <HStack justifyContent="space-between" mt="3">
                <HStack space={2} alignItems="center">
                  <IDCard />
                  <Text fontWeight="semibold">
                    Room Level: {profile?.room_level}
                  </Text>
                </HStack>
                {session ? (
                  <HStack space={2} alignItems="center">
                    <WatchIcon color="white" size="18" />
                    <Text fontWeight="semibold">
                      Total Watching: {profile?.visit_count}x
                    </Text>
                  </HStack>
                ) : (
                  <HStack space={2} alignItems="center">
                    <Followers />
                    <Text fontWeight="semibold">
                      Follower: {formatViews(profile?.follower_num ?? 0)}
                    </Text>
                  </HStack>
                )}
              </HStack>
            </Box>
          </LinearGradient>

          <ProfileTabs />
        </>
      ) : (
        <Loading color="white" />
      )}
    </Box>
  );
};

export default RoomDetail;

const styles = StyleSheet.create({
  linearGradient: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderRadius: 6,
  },
});
