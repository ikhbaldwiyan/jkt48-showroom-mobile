import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, Image, Text } from "native-base";
import { cleanImage, formatName, formatViews } from "../../utils/helpers";
import useProfileStore from "../../store/profileStore";
import Loading from "../../components/atoms/Loading";
import ProfileTabs from "../../components/molecules/ProfileTabs";
import { Followers, IDCard } from "../../assets/icon";

const RoomDetail = () => {
  const route = useRoute();
  const { params } = route;

  const navigation = useNavigation();
  const { profile, getProfile, clearProfile } = useProfileStore();

  useEffect(() => {
    const fetchProfile = async () => {
      await getProfile(params.room.room_id);
    };

    fetchProfile();

    return () => {
      clearProfile();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: profile ? formatName(profile?.room_url_key) : "Profile"
    });
  }, [profile]);

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
          <Box
            p="3"
            bg="teal"
            borderBottomLeftRadius="5"
            borderBottomRightRadius="6"
            width="100%"
          >
            <Text fontSize="20" fontWeight="bold">
              {profile?.main_name}
            </Text>
            <HStack justifyContent="space-between" py="3">
              <HStack space={2} alignItems="center">
                <IDCard />
                <Text fontWeight="semibold">
                  Room Level: {profile?.room_level}
                </Text>
              </HStack>
              <HStack space={2} alignItems="center">
                <Followers />
                <Text fontWeight="semibold">
                  Follower: {formatViews(profile?.follower_num ?? 0)}
                </Text>
              </HStack>
            </HStack>
          </Box>
          <ProfileTabs />
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default RoomDetail;
