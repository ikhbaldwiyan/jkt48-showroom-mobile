import React, { useEffect, useState, useCallback } from "react";
import {
  useIsFocused,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { useProfile } from "../../services/hooks/useProfile";
import useAuthStore from "../../store/authStore";
import useUser from "../../utils/hooks/useUser";

import { formatViews } from "../../utils/helpers";
import trackAnalytics from "../../utils/trackAnalytics";

import { TouchableOpacity } from "react-native";
import { Box, Button, HStack, Image, Text, VStack } from "native-base";
import { Donate, EditProfile, Info, UserIcon } from "../../assets/icon";
import Layout from "../../components/templates/Layout";
import Logout from "../../components/molecules/UserTabs/components/Logout";
import Theme from "../../components/templates/Theme";
import NoLogin from "./components/NoLogin";
import MenuInfo from "./components/MenuInfo";
import { Oshimen, ScheduleOshimen } from "../../components/organisms";

const Profile = () => {
  const { profile, session, user } = useUser();
  const { data: userProfile, refetch } = useProfile(user?.account_id);
  const { setUserProfile } = useAuthStore();
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const isFocused = useIsFocused();
  const oshimen = userProfile?.oshimen;

  useEffect(() => {
    if (session) {
      setIsLogin(true);
      setUserProfile(userProfile);
    }
  }, [session]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Box mr="2">
          <MenuInfo />
        </Box>
      ),
    });
  }, [profile]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const handleAbout = () => {
    navigation.navigate("About");
    trackAnalytics("about_app_click", {
      username: userProfile?.name ?? "Guest",
    });
  };

  const handleSupport = () => {
    navigation.navigate("SupportProject");
    trackAnalytics("support_project_btn_click", {
      username: userProfile?.name ?? "Guest",
    });
  };

  if (!isLogin) {
    return (
      <NoLogin
        isLogin={isLogin}
        navigation={navigation}
        profile={profile}
        userProfile={userProfile}
        handleAbout={handleAbout}
      />
    );
  }

  return (
    <Layout flex={1} bg="secondary">
      <HStack mb="2" space={4}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setIsOpen(true)}>
          {oshimen ? (
            <Image
              width={106}
              height={155}
              source={{ uri: oshimen?.image }}
              borderRadius="xl"
              alt="oshimen"
            />
          ) : (
            <Box
              justifyContent="center"
              alignItems="center"
              rounded="xl"
              bg="black"
              flex={1}
              p="3"
              width={106}
            >
              <UserIcon size={20} />
              <Text mt="1" textAlign="center">
                Pilih Oshimen
              </Text>
            </Box>
          )}
        </TouchableOpacity>
        <VStack space={3} flex={1}>
          <HStack space={3}>
            <Box flex={1} borderRadius="xl" bg="black" p="3">
              <Text fontWeight="semibold">{profile?.name}</Text>
              <Text mt="1" color="gray.400">
                ID: {userProfile?.user_id}
              </Text>
            </Box>
            <Box borderRadius="xl" bg="black" p="3">
              <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri: profile?.avatar_url,
                }}
                alt="avatar"
                shadow="5"
              />
            </Box>
          </HStack>
          <TouchableOpacity activeOpacity={0.7} onPress={() => setIsOpen(true)}>
            <Box borderRadius="xl" bg="black" p="3">
              <HStack justifyContent="space-between">
                <Text fontWeight="semibold">
                  {oshimen?.stage_name ?? "Oshimen"}
                </Text>
                <EditProfile size={18} />
              </HStack>
              <Text fontSize="sm" mt="1" color="gray.400">
                {oshimen?.name ?? "-"}
              </Text>
            </Box>
          </TouchableOpacity>
        </VStack>
      </HStack>
      <Box flex={1}>
        <HStack space={2.5} mt="2" mb="4">
          <Box flex={1} p="2.5" bg="primary" borderRadius={10}>
            <VStack space={1} justifyContent="center" alignItems="center">
              <Text>Total Watch</Text>
              <Box p="0.9" px="3" bg="blueLight" borderRadius={10}>
                <Text color="primary" fontWeight="extrabold">
                  {formatViews(userProfile?.totalWatchLive)}x
                </Text>
              </Box>
            </VStack>
          </Box>
          <Box flex={1} p="2.5" bg="primary" borderRadius={10}>
            <VStack space={1} justifyContent="center" alignItems="center">
              <Text>SR Watched</Text>
              <Box p="0.9" px="3" bg="blueLight" borderRadius={10}>
                <Text color="primary" fontWeight="extrabold">
                  {formatViews(userProfile?.watchShowroomMember)}x
                </Text>
              </Box>
            </VStack>
          </Box>
          <Box flex={1} p="2.5" bg="primary" borderRadius={10}>
            <VStack space={1} justifyContent="center" alignItems="center">
              <Text>IDN Watched</Text>
              <Box p="0.9" px="3" bg="blueLight" borderRadius={10}>
                <Text color="primary" fontWeight="extrabold">
                  {formatViews(userProfile?.watchLiveIDN)}x
                </Text>
              </Box>
            </VStack>
          </Box>
        </HStack>
        <ScheduleOshimen />
        <Theme />
        <HStack my="1.5" mb="4" space={3}>
          <Button
            flex={1}
            variant="outline"
            borderRadius="2xl"
            onPress={handleSupport}
            borderColor="primary"
            borderWidth={1}
          >
            <TouchableOpacity onPress={handleSupport}>
              <HStack alignItems="center" space={2}>
                <Donate size={20} />
                <Text color="blueGray.100" fontSize="15" fontWeight="medium">
                  Support
                </Text>
              </HStack>
            </TouchableOpacity>
          </Button>
          <Button
            flex={1}
            variant="outline"
            borderColor="primary"
            borderRadius="2xl"
            onPress={handleAbout}
          >
            <TouchableOpacity onPress={handleAbout}>
              <HStack alignItems="center" space={1.5}>
                <Info color="white" />
                <Text color="blueGray.100" fontSize="15" fontWeight="medium">
                  About
                </Text>
              </HStack>
            </TouchableOpacity>
          </Button>
        </HStack>
        <Logout />
        <Oshimen isOpen={isOpen} setIsOpen={setIsOpen} />
      </Box>
    </Layout>
  );
};

export default Profile;
