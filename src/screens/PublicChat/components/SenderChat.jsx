import React from "react";
import { Box, HStack, Image, Text, VStack } from "native-base";
import { getTimes } from "../../../utils/helpers";

const SenderChat = ({ avatar, username, message, date, userId }) => {
  const isAdmin = userId == 4751328;

  return (
    <Box display="flex" alignItems="flex-end" right={0}>
      <HStack space="1.5" alignItems="center">
        <VStack alignItems="flex-end" space={2}>
          <HStack space={2.5} alignItems="center">
            <Text fontWeight="semibold" ml="3">
              {username}
            </Text>
            <Text fontSize="xs" mr="1" color="coolGray.400">
              {getTimes(date)}
            </Text>
          </HStack>
          <Box
            maxW="270"
            bg="primary"
            p="3"
            py={2}
            borderRadius="2xl"
            borderTopRightRadius="4"
          >
            <Text fontSize="13">{message}</Text>
          </Box>
        </VStack>
        <Image
          borderRadius="xl"
          style={{ width: 45, height: 45 }}
          source={{
            uri: isAdmin
              ? "https://res.cloudinary.com/dkkagbzl4/image/upload/v1715448389/ioc8l1puv69qn7nzc2e9.png"
              : avatar
          }}
          alt="avatar"
          shadow="5"
        />
      </HStack>
    </Box>
  );
};

export default SenderChat;
