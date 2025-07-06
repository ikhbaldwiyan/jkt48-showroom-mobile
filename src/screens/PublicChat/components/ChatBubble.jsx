import React from "react";
import { Box, HStack, Image, Text, VStack } from "native-base";

const ChatBubble = ({ avatar, username, message, isAdmin }) => {
  return (
    <Box>
      <HStack space="3" alignItems="center">
        <Image
          borderRadius={isAdmin ? "xl" : "none"}
          style={{ width: 45, height: 45 }}
          source={{
            uri: isAdmin
              ? "https://res.cloudinary.com/dkkagbzl4/image/upload/v1715448389/ioc8l1puv69qn7nzc2e9.png"
              : avatar ??
                "https://static.showroom-live.com/image/avatar/59.png?v=108"
          }}
          alt="avatar"
          shadow="5"
        />
        <VStack alignItems="flex-start" space={2}>
          <HStack space={2.5} alignItems="center">
            <Text
              color={isAdmin ? "primary" : "white"}
              fontWeight="semibold"
              ml="1"
            >
              {isAdmin ? "Admin" : username}
            </Text>
            <Text fontSize="xs" color="coolGray.400">
              19:48
            </Text>
          </HStack>
          <Box
            p="3"
            py="2.5"
            bg="black"
            maxW="270"
            borderRadius="2xl"
            borderTopLeftRadius={4}
          >
            <Text fontSize="13">{message}</Text>
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ChatBubble;
