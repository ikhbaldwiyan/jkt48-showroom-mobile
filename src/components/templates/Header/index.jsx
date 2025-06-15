import React, { useState } from "react";
import { Box, HStack, Image, Text } from "native-base";
import Logo from "../../atoms/Logo";
import UserModal from "../../atoms/UserModal";
import useUser from "../../../utils/hooks/useUser";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LoginIcon } from "../../../assets/icon";
import trackAnalytics from "../../../utils/trackAnalytics";

const Header = () => {
  const navigation = useNavigation();
  const { profile, userProfile } = useUser();
  const [selectedUser, setSelectedUser] = useState("");

  const handleLogin = () => {
    navigation.replace("Login");
  };

  const handleUserDetail = (data) => {
    setSelectedUser(data);
    trackAnalytics("open_profile_header", {
      name: profile?.name,
      user_id: profile?.user_id
    });
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
      <TouchableOpacity
        onPress={profile ? () => handleUserDetail(userProfile) : handleLogin}
      >
        <Box maxW="100">
          {profile ? (
            <HStack alignItems="center" space={1}>
              <Text color="white" fontWeight="semibold" isTruncated>
                {profile.name.length >= 9
                  ? profile.name.slice(0, 8) + ".."
                  : profile.name}
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
      <UserModal
        showID
        isEdit
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </Box>
  );
};

export default Header;
