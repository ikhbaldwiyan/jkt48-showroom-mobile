import React from "react";
import { Box, HStack, Text } from "native-base";
import { Donate, ThropyIcon } from "../../../assets/icon";

const BadgeUser = ({ user }) => {
  return user?.top_leaderboard ? (
    <HStack mt="2" space={1.5} alignItems="center" justifyContent="center">
      <Text fontSize="sm" fontWeight="semibold" isTruncated>
        {user?.name.length > 5 ? user?.name?.slice(0, 4) + ".." : user?.name}
      </Text>
      <Box
        display="flex"
        justifyItems="start"
        justifyContent="center"
        alignItems="center"
        w={19}
        h={19}
        borderRadius="full"
        bg="blueLight"
      >
        <ThropyIcon size={12} color="#24A2B7" />
      </Box>
    </HStack>
  ) : user?.is_donator ? (
    <HStack mt="2" space={1.5} alignItems="center" justifyContent="center">
      <Text fontSize="sm" fontWeight="semibold" isTruncated>
        {user?.name.length > 5 ? user?.name.slice(0, 4) + ".." : user?.name}
      </Text>
      <Box
        display="flex"
        justifyItems="start"
        justifyContent="center"
        alignItems="center"
        w={19}
        h={19}
        borderRadius="full"
        bg="green.700"
      >
        <Donate size={10} color="white" />
      </Box>
    </HStack>
  ) : (
    <Text mt="2" fontSize="sm" fontWeight="semibold" isTruncated>
      {user?.name}
    </Text>
  );
};

export default BadgeUser;
