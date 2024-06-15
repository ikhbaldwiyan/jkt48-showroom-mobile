import React, { useState } from "react";
import { Divider, HStack, ScrollView, Text, VStack } from "native-base";
import {
  AndroidIcon,
  Cloud,
  IDCard,
  LiveIcon,
  Star,
  UserIcon
} from "../../../../assets/icon";
import useUser from "../../../../utils/hooks/useUser";
import CardGradient from "../../../atoms/CardGradient";
import Theme from "../../../templates/Theme";
import ChangeLog from "./ChangeLog";

export const UserProfile = () => {
  const { profile, user, userProfile } = useUser();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <CardGradient halfCard>
      <ScrollView mt="2">
        <VStack space={4}>
          <HStack space={2} alignItems="center">
            <UserIcon size="16" />
            <Text fontSize="md" fontWeight="semibold">
              Name:
            </Text>
            <Text fontSize="md">{profile?.name}</Text>
          </HStack>
          <HStack space={2} alignItems="center">
            <IDCard size="16" />
            <Text fontSize="md" fontWeight="semibold">
              ID SR:
            </Text>
            <Text fontSize="md">{user?.account_id}</Text>
          </HStack>
          <HStack space={2} alignItems="center">
            <Star />
            <Text fontSize="md" fontWeight="semibold">
              Level:
            </Text>
            <Text fontSize="md">{profile?.fan_level}</Text>
          </HStack>
          <HStack space={2} alignItems="center">
            <LiveIcon />
            <Text fontSize="md" fontWeight="semibold">
              Total Watch Live:
            </Text>
            <Text fontSize="md">
              {userProfile?.totalWatchLive
                ? userProfile?.totalWatchLive + "x"
                : "0x"}
            </Text>
          </HStack>
        </VStack>
        <Divider
          borderColor="white"
          borderRadius="md"
          borderWidth="2"
          mt="5"
          my="4"
        />
        <VStack space={3}>
          <HStack space={2} alignItems="center">
            <Cloud />
            <Text fontSize={14} fontWeight="semibold">
              Live Background Theme
            </Text>
          </HStack>
          <Theme isButton />
          <HStack space={2} alignItems="center">
            <AndroidIcon />
            <Text fontSize={14} fontWeight="semibold">
              APK Version 1.2
            </Text>
            <Text>|</Text>
            <ChangeLog modal={modal} toggleModal={toggleModal} />
          </HStack>
        </VStack>
      </ScrollView>
    </CardGradient>
  );
};