import React from "react";
import useAuthStore from "../../../store/authStore";
import { useNavigation } from "@react-navigation/native";
import { hasMultiRoomAccess } from "../../../utils/helpers";

import {
  Box,
  Divider,
  HStack,
  PlayIcon,
  ScrollView,
  Text,
  VStack
} from "native-base";
import {
  LiveIcon,
  Medal,
  MultiLiveIcon,
  TheaterIcon,
  ThropyIcon
} from "../../../assets/icon";
import { TouchableOpacity } from "react-native";

const MenuHome = () => {
  const { navigate } = useNavigation();
  const { userProfile: profile } = useAuthStore();

  const menus = [
    {
      name: "Theater",
      icon: <TheaterIcon size="24" color="white" />,
      screen: "Theater"
    },
    ...(hasMultiRoomAccess(profile)
      ? [
          {
            name: "Multi Live",
            icon: <MultiLiveIcon size="25" color="white" />,
            screen: "Multi Live"
          }
        ]
      : []),
    {
      name: "Showroom",
      icon: <LiveIcon size="24" color="white" />,
      screen: "ShowroomLive"
    },
    {
      name: "IDN Live",
      icon: <PlayIcon size="6" color="white" />,
      screen: "IDNLives"
    },
    {
      name: "Leaderboard",
      icon: <ThropyIcon size="25" color="white" />,
      screen: "LeaderboardUser"
    },
    {
      name: "Top Member",
      icon: <Medal size="24" color="white" />,
      screen: "LeaderboardMember"
    }
  ];

  return (
    <Box mb="4">
      <Text mb="3" fontSize="2xl" fontWeight="semibold">
        Menu
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <HStack space={3}>
          {menus.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.8}
              onPress={() => navigate(item.screen)}
            >
              <Box p="2.5" px="3" bg="primary" borderRadius={10}>
                <VStack space={1} justifyContent="center" alignItems="center">
                  {item.icon}
                  <Box mt="2" p="0.9" px="2" bg="blueLight" borderRadius={10}>
                    <Text color="primary" fontWeight="bold">
                      {item?.name}
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </TouchableOpacity>
          ))}
        </HStack>
      </ScrollView>
      <Divider mt="5" />
    </Box>
  );
};

export default MenuHome;
