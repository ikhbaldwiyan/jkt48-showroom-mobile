import React, { useState } from "react";
import { Text, Button, HStack, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { LoginIcon } from "../../../../assets/icon";
import trackAnalytics from "../../../../utils/trackAnalytics";
import { ModalConfirmation } from "../../../atoms/Modal";
import useUser from "../../../../utils/hooks/useUser";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../../../store/authStore";

const Logout = ({ isProfile = false }) => {
  const { profile } = useUser();
  const { logout } = useAuthStore();
  const [modalLogout, setModalLogout] = useState(false);
  const navigation = useNavigation();

  const handleModal = () => {
    setModalLogout(!modalLogout);
  };

  const handleLogout = () => {
    handleModal();
    logout();
    navigation.replace("SplashScreen");

    trackAnalytics("logout", {
      username: profile?.name
    });
  };

  return (
    <View mt={isProfile ? "2" : 0} mb={isProfile ? "8" : 0}>
      <Button
        bg={isProfile ? "blueGray.600" : "none"}
        borderRadius="10"
        size={isProfile ? "md" : "sm"}
        variant={isProfile ? "solid" : "ghost"}
        onPress={handleModal}
      >
        <TouchableOpacity onPress={handleModal}>
          <HStack space={2} alignItems="center">
            <LoginIcon size={24} />
            <Text fontSize={isProfile ? 16 : 14} fontWeight="semibold">
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
