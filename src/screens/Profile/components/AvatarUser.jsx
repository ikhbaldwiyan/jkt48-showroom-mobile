import React from "react";
import { Box, Image, Popover, Pressable, Text } from "native-base";
import { AndroidIcon, Donate, ThropyIcon } from "../../../assets/icon";
import useAvatarStore from "../../../store/avatarStore";

const AvatarUser = ({ userProfile, profile, isLogin }) => {
  const { avatarImage } = useAvatarStore();

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
    <>
      <Box
        w={badge ? "130" : "120"}
        h={badge ? "130" : "120"}
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
                  uri: avatarImage ?? profile?.avatar_url
                }
              : require("../../../assets/image/ava.png")
          }
          alt="avatar"
          shadow="5"
        />
      </Box>
      {badge && (
        <Box
          top="110px"
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
        </Box>
      )}
    </>
  );
};

export default AvatarUser;
