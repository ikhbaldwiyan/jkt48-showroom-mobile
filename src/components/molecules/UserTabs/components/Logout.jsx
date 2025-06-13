import React, { useState } from "react";
import { Text, Button, HStack, View } from "native-base";
import { TouchableOpacity } from "react-native";
import trackAnalytics from "../../../../utils/trackAnalytics";
import { ModalConfirmation } from "../../../atoms/Modal";
import useUser from "../../../../utils/hooks/useUser";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../../../store/authStore";
import useMultiAccessStore from "../../../../store/multiAccesStore";
import { useQueryClient } from "@tanstack/react-query";

const Logout = ({ isProfile = false }) => {
  const navigation = useNavigation();
  const { profile } = useUser();
  const { logout } = useAuthStore();
  const [modalLogout, setModalLogout] = useState(false);
  const { setOpenMultiModal } = useMultiAccessStore();
  const queryClient = useQueryClient();

  const handleModal = () => {
    setModalLogout(!modalLogout);
  };

  const handleLogout = () => {
    handleModal();
    logout();
    setOpenMultiModal();
    navigation.replace("SplashScreen");
    queryClient.removeQueries(["profile"]);

    trackAnalytics("logout", {
      username: profile?.name
    });
  };

  return (
    <View>
      <Button
        size="sm"
        borderRadius="10"
        variant="ghost"
        onPress={handleModal}
      >
        <TouchableOpacity onPress={handleModal}>
          <HStack space={1.5} alignItems="center">
            <Text fontSize="14" fontWeight="semibold">
              Logout
            </Text>
          </HStack>
        </TouchableOpacity>
      </Button>
      <ModalConfirmation
        title="Konfirmasi Logout"
        modal={modalLogout}
        onClose={handleModal}
        confrimAction={handleLogout}
      >
        <Text color="black">Apakah Anda yakin ingin logout ?</Text>
      </ModalConfirmation>
    </View>
  );
};

export default Logout;
