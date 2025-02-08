import React, { useState } from "react";
import { Text, Button, HStack, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { LoginIcon } from "../../../../assets/icon";
import trackAnalytics from "../../../../utils/trackAnalytics";
import { ModalConfirmation } from "../../../atoms/Modal";
import useUser from "../../../../utils/hooks/useUser";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../../../store/authStore";

const Logout = () => {
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
    navigation.replace("Login");

    trackAnalytics("logout", {
      username: profile?.name
    });
  };

  return (
    <View mt="2" mb="8">
      <Button
        bg="blueGray.600"
        borderRadius="10"
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
