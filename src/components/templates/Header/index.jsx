import React, { useState } from "react";
import { Box, HStack, Image, Text } from "native-base";
import Logo from "../../atoms/Logo";
import useUser from "../../../utils/hooks/useUser";
import { ModalConfirmation } from "../../atoms/Modal";
import { TouchableOpacity } from "react-native";
import { removeStorage } from "../../../utils/storage";
import { useNavigation } from "@react-navigation/native";
import { LoginIcon } from "../../../assets/icon";
import analytics from "@react-native-firebase/analytics";

const Header = () => {
  const { profile } = useUser();
  const [modalLogout, setModalLogout] = useState(false);
  const navigation = useNavigation();

  const handleModal = () => {
    setModalLogout(!modalLogout);
  };

  const handleLogout =  () => {
    handleModal();
    removeStorage("user");
    removeStorage("session");
    removeStorage("profile");
    removeStorage("userProfile");
    navigation.replace("Login");
    
    analytics().logEvent("logout", {
      username: profile.name
    });
  };

  const handleLogin = () => {
    navigation.replace("Login");
  };

  return (
    <Box
      p="4"
      bg="black"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Logo isHeader />
      <TouchableOpacity onPress={profile ? handleModal : handleLogin}>
        <Box maxW="100">
          {profile ? (
            <HStack alignItems="center" space={2}>
              <Text color="white" fontWeight="semibold" isTruncated>
                {profile.name.length >= 7 ? profile.name.slice(0, 7) + ".." : profile.name}
              </Text>
              <Image
                style={{ width: 40, height: 40 }}
                source={{
                  uri: profile.avatar_url
                }}
                alt="avatar"
              />
            </HStack>
          ) : (
            <HStack alignItems="center" space={1}>
              <LoginIcon size={24} />
              <Text color="white" fontWeight="semibold" mr="2" isTruncated>
                Login
              </Text>
            </HStack>
          )}
        </Box>
      </TouchableOpacity>
      <ModalConfirmation
        title="Logout"
        modal={modalLogout}
        onClose={handleModal}
        confrimAction={handleLogout}
      >
        <Text color="black">Are you sure want logout?</Text>
      </ModalConfirmation>
    </Box>
  );
};

export default Header;
