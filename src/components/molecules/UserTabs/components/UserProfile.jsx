import { useNavigation } from "@react-navigation/native";
import { Button, Divider, HStack, ScrollView, Text, VStack } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  AndroidIcon,
  Cloud,
  History,
  IDCard,
  LiveIcon,
  LoginIcon,
  Star,
  UserIcon
} from "../../../../assets/icon";
import useUser from "../../../../utils/hooks/useUser";
import { removeStorage } from "../../../../utils/storage";
import trackAnalytics from "../../../../utils/trackAnalytics";
import CardGradient from "../../../atoms/CardGradient";
import { ModalConfirmation } from "../../../atoms/Modal";
import Theme from "../../../templates/Theme";

export const UserProfile = () => {
  const { profile, user, userProfile } = useUser();
  const [modalLogout, setModalLogout] = useState(false);
  const navigation = useNavigation();

  const handleModal = () => {
    setModalLogout(!modalLogout);
  };

  const handleLogout = () => {
    handleModal();
    removeStorage("user");
    removeStorage("session");
    removeStorage("profile");
    removeStorage("userProfile");
    navigation.replace("Login");

    trackAnalytics("logout", {
      username: profile?.name
    });
  };

  return (
    <CardGradient>
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
            <Text fontSize="md">{userProfile?.totalWatchLive}x</Text>
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
          <Text fontWeight="bold" fontSize={16}>
            Settings
          </Text>
          <HStack space={2} alignItems="center">
            <AndroidIcon />
            <Text fontSize={14} fontWeight="semibold">
              APK Version 1.2
            </Text>
            <Text>|</Text>
            <HStack space={1} alignItems="center">
              <History />
              <Text fontWeight="bold"> Check Change Log</Text>
            </HStack>
          </HStack>
          <HStack space={2} alignItems="center">
            <Cloud />
            <Text fontSize={14} fontWeight="semibold">
              Live Showroom Theme
            </Text>
          </HStack>
          <Theme isButton />
          <Button
            mt="1"
            bg="gray.500"
            borderRadius="md"
            variant="solid"
            onPress={handleModal}
          >
            <TouchableOpacity onPress={handleModal}>
              <HStack space={2}>
                <LoginIcon size={24} />
                <Text fontSize={16} fontWeight="semibold">
                  Logout
                </Text>
              </HStack>
            </TouchableOpacity>
          </Button>
        </VStack>
        <ModalConfirmation
          title="Logout"
          modal={modalLogout}
          onClose={handleModal}
          confrimAction={handleLogout}
        >
          <Text color="black">Are you sure want logout?</Text>
        </ModalConfirmation>
      </ScrollView>
    </CardGradient>
  );
};
