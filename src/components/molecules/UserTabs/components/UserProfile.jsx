import React from "react";
import { HStack, ScrollView, Text, VStack } from "native-base";
import {
  Cloud,
  IDCard,
  Star,
  UserIcon,
  WatchIcon
} from "../../../../assets/icon";
import useUser from "../../../../utils/hooks/useUser";
import CardGradient from "../../../atoms/CardGradient";
import Theme from "../../../templates/Theme";
import { formatViews } from "../../../../utils/helpers";

export const UserProfile = () => {
  const { profile, user, userProfile } = useUser();

  return (
    <CardGradient halfCard>
      <ScrollView mt="2">
        <VStack space={4}>
          <HStack space={2} alignItems="center">
            <UserIcon size="16" />
            <Text fontSize="14" fontWeight="semibold">
              Name:
            </Text>
            <Text fontSize="14">{profile?.name}</Text>
          </HStack>
          <HStack space={2} alignItems="center">
            <IDCard size="16" />
            <Text fontSize="14" fontWeight="semibold">
              ID SR:
            </Text>
            <Text fontSize="14">{user?.account_id}</Text>
          </HStack>
          <HStack space={2} alignItems="center">
            <Star />
            <Text fontSize="14" fontWeight="semibold">
              Level:
            </Text>
            <Text fontSize="14">{profile?.fan_level}</Text>
          </HStack>
          <HStack space={2} alignItems="center">
            <WatchIcon color="white" size={20} />
            <Text fontSize="14" fontWeight="semibold">
              Total Watch Live:
            </Text>
            <Text fontSize="14">
              {userProfile?.totalWatchLive
                ? formatViews(userProfile?.totalWatchLive) + "x"
                : "0x"}
            </Text>
          </HStack>
          <HStack space={2} alignItems="center">
            <Cloud />
            <Text fontSize={14} fontWeight="semibold">
              Live Background Theme
            </Text>
          </HStack>
          <Theme isButton />
        </VStack>
      </ScrollView>
    </CardGradient>
  );
};
