import React, { useEffect, useState } from "react";
import { Box, Button, HStack, InfoIcon, Text, VStack } from "native-base";
import UserTabs from "../../components/molecules/UserTabs";
import useUser from "../../utils/hooks/useUser";
import { Image, TouchableOpacity } from "react-native";
import { Donate, Info, LoginIcon, PencilIcon } from "../../assets/icon";
import Layout from "../../components/templates/Layout";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Logout from "../../components/molecules/UserTabs/components/Logout";
import trackAnalytics from "../../utils/trackAnalytics";

const Profile = () => {
  const { userProfile, profile, session } = useUser();
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (session) {
      setIsLogin(true);
    }
  }, [session]);

  const handleAbout = () => {
    navigation.navigate("About");
    trackAnalytics("about_app_click", {
      username: userProfile?.name ?? "Guest"
    });
  };

  const handleSupport = () => {
    navigation.navigate("SupportProject");
    trackAnalytics("support_project_btn_click", {
      username: userProfile?.name ?? "Guest"
    });
  };

  const Avatar = () => (
    <>
      <Box
        w="120"
        h="120"
        borderWidth="8px"
        borderColor="white"
        justifyContent="center"
        alignItems="center"
        backgroundColor="#A9EDF9"
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
      {session && (
        <Button
          top="95"
          bg="white"
          borderColor="primary"
          borderWidth="2"
          position="absolute"
          w="10"
          h="10"
          borderRadius="50"
          display="flex"
          justifyContent="center"
          alignItems="center"
          onPress={() => navigation.navigate("Avatar")}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Avatar")}
          >
            <PencilIcon />
          </TouchableOpacity>
        </Button>
      )}
    </>
  );

  if (!isLogin) {
    return (
      <Layout isHeader>
        <Box py="45" justifyContent="center" alignItems="center">
          <VStack space={5} alignItems="center">
            <Avatar />
            <Text>Silakan login untuk mengakses menu profile</Text>
            <Button
              onPress={() => navigation.replace("Login")}
              borderRadius="lg"
              variant="filled"
              bg="primary"
            >
              <TouchableOpacity onPress={() => navigation.replace("Login")}>
                <HStack alignItems="center" space={1}>
                  <LoginIcon size={24} />
                  <Text color="white" fontWeight="bold" mr="2" isTruncated>
                    Login Disini
                  </Text>
                </HStack>
              </TouchableOpacity>
            </Button>
            <Button
              variant="solid"
              bgColor="cyan.700"
              borderRadius="lg"
              onPress={handleAbout}
            >
              <TouchableOpacity onPress={handleAbout}>
                <HStack alignItems="center" space={1}>
                  <Info color="white" />
                  <Text fontWeight="semibold">About Application</Text>
                </HStack>
              </TouchableOpacity>
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
        <Text mt="1" fontWeight="bold" fontSize="2xl">
          {profile?.name}
        </Text>
      </VStack>
      <Box flex={1} p="3">
        <UserTabs />
        <Button
          variant="solid"
          bgColor="teal"
          borderRadius="10"
          onPress={handleSupport}
        >
          <TouchableOpacity onPress={handleSupport}>
            <HStack alignItems="center" space={2}>
              <Donate size={20} />
              <Text fontSize="15" fontWeight="semibold">
                Support Project
              </Text>
            </HStack>
          </TouchableOpacity>
        </Button>
        <Button
          mt="2"
          variant="solid"
          bgColor="cyan.700"
          borderRadius="10"
          onPress={handleAbout}
        >
          <TouchableOpacity onPress={handleAbout}>
            <HStack alignItems="center" space={1.5}>
              <Info color="white" />
              <Text fontSize="15" fontWeight="semibold">
                About Application
              </Text>
            </HStack>
          </TouchableOpacity>
        </Button>
        <Logout />
      </Box>
    </Box>
  );
};

export default Profile;
