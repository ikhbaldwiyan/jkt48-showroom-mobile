import React, { useEffect, useState } from "react";
import { Box, Button, HStack, Text, VStack } from "native-base";
import UserTabs from "../../components/molecules/UserTabs";
import useUser from "../../utils/hooks/useUser";
import { Image } from "react-native";
import { LoginIcon } from "../../assets/icon";
import Layout from "../../components/templates/Layout";
import { useNavigation } from "@react-navigation/native";
import Logout from "../../components/molecules/UserTabs/components/Logout";

const Profile = () => {
  const { profile, session } = useUser();
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState();

  useEffect(() => {
    if (session) {
      setIsLogin(true);
    }
  }, [session]);

  const Avatar = () => (
    <Box
      mt="2"
      w="135"
      h="135"
      justifyContent="center"
      alignItems="center"
      backgroundColor="white"
      borderRadius="full"
    >
      <Box
        w="120"
        h="120"
        justifyContent="center"
        alignItems="center"
        backgroundColor="teal"
        borderRadius="full"
      >
        <Image
          style={{ width: 80, height: 80 }}
          source={
            isLogin
              ? {
                  uri: profile?.avatar_url
                }
              : require("../../assets/image/ava.png")
          }
          alt="avatar"
        />
      </Box>
    </Box>
  );

  if (!isLogin) {
    return (
      <Layout isHeader>
        <Box py="45" justifyContent="center" alignItems="center">
          <VStack space={5} alignItems="center">
            <Avatar />
            <Text fontWeight="bold">
              Silahkan login untuk mengakses menu profile
            </Text>
            <Button
              onPress={() => navigation.replace("Login")}
              borderRadius="lg"
              variant="filled"
              bg="primary"
            >
              <HStack alignItems="center" space={1}>
                <LoginIcon size={24} />
                <Text color="white" fontWeight="semibold" mr="2" isTruncated>
                  Login Disini
                </Text>
              </HStack>
            </Button>
          </VStack>
        </Box>
      </Layout>
    );
  }

  return (
    <Box flex={1} bg="secondary">
      <VStack mt="4" space={3} alignItems="center">
        <Avatar />
        <Text fontWeight="bold" fontSize="2xl">
          {profile?.name}
        </Text>
      </VStack>
      <Box flex={1} p="3">
        <UserTabs />
        <Logout />
      </Box>
    </Box>
  );
};

export default Profile;
