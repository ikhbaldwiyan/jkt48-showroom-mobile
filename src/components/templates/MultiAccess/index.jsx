import React from "react";
import { Button, Text, Center, Box, Modal, HStack } from "native-base";
import { LogoNormal, MultiLiveIcon } from "../../../assets/icon";
import { activityLog } from "../../../utils/activityLog";
import { useNavigation } from "@react-navigation/native";
import { hasMultiRoomAccess } from "../../../utils/helpers";
import { useProfile } from "../../../services/hooks/useProfile";
import useAuthStore from "../../../store/authStore";

const MultiAccess = ({ isVisible, onClose }) => {
  const { user } = useAuthStore();
  const { data: profile } = useProfile(user?.account_id);
  const navigation = useNavigation();

  const handleOpenMultiLive = () => {
    activityLog({
      logName: "Multi Live",
      description: `Multi Live fitur open`,
      userId: "id"
    });
    navigation.navigate("Multi Live");
    onClose();
  };

  const checkUserAccess = () => {
    if (hasMultiRoomAccess(profile)) {
      return isVisible;
    } else {
      return false;
    }
  };

  return (
    <Modal
      size="full"
      isOpen={checkUserAccess()}
      onClose={onClose}
      avoidKeyboard
    >
      <Box bg="secondary" p={5} rounded="xl" shadow={3} width="85%">
        <Text fontWeight="bold" textAlign="center" fontSize="18" mb={4}>
          Fitur Multi Live Terbuka 🥳
        </Text>
        <Center>
          <LogoNormal width={100} height={100} />
        </Center>
        <Text mt="4" textAlign="center" mb={2}>
          Selamat akun kamu mendapatkan early akses untuk mencoba fitur{" "}
          <Text fontWeight="semibold">Multi Live Showroom</Text> dan{" "}
          <Text fontWeight="semibold">Multi Live IDN</Text>
        </Text>
        <Button
          mt="2"
          mb={2}
          py="2.5"
          borderRadius="xl"
          onPress={handleOpenMultiLive}
          colorScheme="cyan"
        >
          <HStack space={2} alignItems="center">
            <MultiLiveIcon size={20} />
            <Text fontWeight="bold" fontSize="md">
              Buka Multi Live
            </Text>
          </HStack>
        </Button>
      </Box>
    </Modal>
  );
};

export default MultiAccess;
