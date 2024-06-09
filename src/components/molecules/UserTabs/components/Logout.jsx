import React, { useState } from "react";
import { Text, Button, HStack, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { LoginIcon } from "../../../../assets/icon";
import { removeStorage } from "../../../../utils/storage";
import trackAnalytics from "../../../../utils/trackAnalytics";
import { ModalConfirmation } from "../../../atoms/Modal";
import useUser from "../../../../utils/hooks/useUser";
import { useNavigation } from "@react-navigation/native";

const Logout = () => {
  const { profile } = useUser();
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
    <View mb="10">
      <Button
        bg="gray.500"
        borderRadius="lg"
        variant="solid"
        onPress={handleModal}
      >
        <TouchableOpacity>
          <HStack space={2}>
            <LoginIcon size={24} />
            <Text fontSize={16} fontWeight="semibold">
              Logout
            </Text>
          </HStack>
        </TouchableOpacity>
      </Button>
      <ModalConfirmation
        title="Logout"
        modal={modalLogout}
        onClose={handleModal}
        confrimAction={handleLogout}
      >
        <Text color="black">Are you sure want logout?</Text>
      </ModalConfirmation>
    </View>
  );
};

export default Logout;
