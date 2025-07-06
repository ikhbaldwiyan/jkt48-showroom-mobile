import React from "react";
import { Box, HStack, Image, Text, VStack } from "native-base";

const SenderChat = ({ avatar, username, message }) => {
  return (
    <Box display="flex" alignItems="flex-end" right={0}>
      <HStack space="3" alignItems="center">
        <VStack alignItems="flex-end" space={2}>
          <HStack space={2.5} alignItems="center">
            <Text fontWeight="semibold" ml="3">
              {username}
            </Text>
            <Text fontSize="xs" mr="1" color="coolGray.400">
              19:48
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
            uri:
              avatar ??
              "https://res.cloudinary.com/dkkagbzl4/image/upload/v1715448389/ioc8l1puv69qn7nzc2e9.png"
          }}
          alt="avatar"
          shadow="5"
        />
      </HStack>
    </Box>
  );
};

export default SenderChat;
