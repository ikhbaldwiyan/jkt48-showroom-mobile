import React, { useEffect, useState } from "react";
import { Box, Button, HStack, Popover, Text, VStack, Image } from "native-base";
import useUser from "../../utils/hooks/useUser";
import { TouchableOpacity } from "react-native";
import {
  AndroidIcon,
  Donate,
  Info,
  LoginIcon,
  ThropyIcon
} from "../../assets/icon";
import Layout from "../../components/templates/Layout";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Logout from "../../components/molecules/UserTabs/components/Logout";
import trackAnalytics from "../../utils/trackAnalytics";
import { AUTH } from "../../services";
import useAuthStore from "../../store/authStore";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { UserProfile } from "../../components/molecules/UserTabs/components";
import { useProfile } from "../../services/hooks/useProfile";
import { formatViews } from "../../utils/helpers";
import Theme from "../../components/templates/Theme";
import { APK_VERSION } from "@env";

const Profile = () => {
  const { profile, session, user } = useUser();
  const { data: userProfile } = useProfile(user?.account_id);
  const { setUserProfile } = useAuthStore();
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState();
  const isFocused = useIsFocused();

  const setRegisterProfile = async () => {
    await AUTH.detailUserApi(userProfile?.user_id)
      .then((res) => {
        setUserProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (session) {
      setIsLogin(true);
      setRegisterProfile();
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
        borderWidth="6px"
        borderColor="white"
        justifyContent="center"
        alignItems="center"
        backgroundColor="#808DA5"
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
          shadow="5"
        />
      </Box>
      {session && (
        <Box
          top="99"
          bg="white"
          position="absolute"
          w="8"
          h="8"
          borderRadius="50"
          display="flex"
          justifyContent="center"
          alignItems="center"
          onPress={() => navigation.navigate("Avatar")}
        >
          {badge && (
            <Popover
              trigger={(triggerProps) => {
                return (
                  <Pressable {...triggerProps}>
                    <Box
                      w={7}
                      h={7}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      borderRadius="full"
                      bg={badge.bg}
                    >
                      {badge.icon}
                    </Box>
                  </Pressable>
                );
              }}
            >
              <Popover.Content accessibilityLabel="Badge Info" maxW="220">
                <Popover.Arrow />
                <Popover.Body>
                  <Text fontSize="12" color="black">
                    {badge.desc}
                  </Text>
                </Popover.Body>
              </Popover.Content>
            </Popover>
          )}
        </Box>
      )}
    </>
  );

  if (!isLogin) {
    return (
      <Layout>
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

  const badgeUser = [
    {
      condition: userProfile?.top_leaderboard,
      icon: <ThropyIcon size={16} color="#24A2B7" />,
      bg: "blueLight",
      label: "Top Leaderboard",
      desc: "Badge special karena kamu masuk Top 10 Leaderboard bulanan"
    },
    {
      condition: userProfile?.is_donator,
      icon: <Donate size={16} color="white" />,
      bg: "#E49C20",
      label: "Donator",
      desc: "Badge special Donator karena sudah support project JKT48 Showroom Fanmade"
    },
    {
      condition: userProfile?.is_developer,
      icon: <AndroidIcon size={16} color="white" />,
      bg: "teal",
      label: "Developer",
      desc: "Badge khusus Developer Aplikasi JKT48 Showroom Fanmade"
    }
  ];

  const badge = badgeUser.find((b) => b.condition);

  return (
    <Layout flex={1} bg="secondary">
      <VStack space={3} alignItems="center">
        <Avatar />
        <HStack space={2} alignItems="center">
          <Text fontWeight="bold" mb="1" fontSize="2xl">
            {profile?.name}
          </Text>
        </HStack>
      </VStack>
      <Box flex={1}>
        <HStack space={2.5} mt="2" mb="4">
          <Box flex={1} p="2.5" bg="primary" borderRadius={10}>
            <VStack space={1} justifyContent="center" alignItems="center">
              <Text>Total Watch</Text>
              <Box p="0.9" px="3" bg="blueLight" borderRadius={10}>
                <Text color="primary" fontWeight="extrabold">
                  {formatViews(userProfile?.totalWatchLive)}
                </Text>
              </Box>
            </VStack>
          </Box>
          <Box flex={1} p="2.5" bg="primary" borderRadius={10}>
            <VStack space={1} justifyContent="center" alignItems="center">
              <Text>SR Watched</Text>
              <Box p="0.9" px="3" bg="blueLight" borderRadius={10}>
                <Text color="primary" fontWeight="extrabold">
                  {formatViews(userProfile?.watchShowroomMember)}
                </Text>
              </Box>
            </VStack>
          </Box>
          <Box flex={1} p="2.5" bg="primary" borderRadius={10}>
            <VStack space={1} justifyContent="center" alignItems="center">
              <Text>IDN Watched</Text>
              <Box p="0.9" px="3" bg="blueLight" borderRadius={10}>
                <Text color="primary" fontWeight="extrabold">
                  {formatViews(userProfile?.watchLiveIDN)}
                </Text>
              </Box>
            </VStack>
          </Box>
        </HStack>
        <UserProfile navigation={navigation} />
        <Theme />
        <Box my="1.5" />
        <HStack mb="4" space={3}>
          <Button
            flex={1}
            variant="solid"
            bg="blueLight"
            borderRadius="10"
            onPress={handleSupport}
            borderColor="primary"
            borderWidth={2}
          >
            <TouchableOpacity onPress={handleSupport}>
              <HStack alignItems="center" space={2}>
                <Donate color="#24A2B7" size={20} />
                <Text color="primary" fontSize="15" fontWeight="semibold">
                  Support Project
                </Text>
              </HStack>
            </TouchableOpacity>
          </Button>
          <Button
            flex={1}
            variant="solid"
            bgColor="teal"
            borderRadius="10"
            onPress={handleAbout}
          >
            <TouchableOpacity onPress={handleAbout}>
              <HStack alignItems="center" space={1.5}>
                <Info color="white" />
                <Text fontSize="15" fontWeight="semibold">
                  About App
                </Text>
              </HStack>
            </TouchableOpacity>
          </Button>
        </HStack>
        <Logout />
        <HStack mt="4" justifyContent="center" space={2} alignItems="center">
          <AndroidIcon />
          <Text fontSize={14}>
            App Version <Text fontWeight="semibold">{APK_VERSION}</Text>
          </Text>
        </HStack>
      </Box>
    </Layout>
  );
};

export default Profile;
