import React from "react";
import { Box, HStack, Image, Text, VStack } from "native-base";
import useUser from "../../../utils/hooks/useUser";
import SenderChat from "./SenderChat";
import { getTimes } from "../../../utils/helpers";
import { Wrench } from "../../../assets/icon";

const ChatBubble = ({ avatar, username, message, idx, userId, date }) => {
  const { user } = useUser();
  const isAdmin = userId == 4751328;

  if (userId === parseInt(user?.user_id)) {
    return (
      <SenderChat
        avatar={avatar}
        username={username}
        message={message}
        date={date}
        userId={user?.user_id}
      />
    );
  }

  return (
    <Box key={idx}>
      <HStack space="1.5" alignItems="center">
        <Image
          borderRadius={isAdmin ? "xl" : "none"}
          style={{ width: 45, height: 45 }}
          source={{
            uri: isAdmin
              ? "https://res.cloudinary.com/dkkagbzl4/image/upload/v1715448389/ioc8l1puv69qn7nzc2e9.png"
              : avatar
          }}
          alt="avatar"
          shadow="5"
        />
        <VStack alignItems="flex-start" space={2}>
          <HStack space={2.5} alignItems="center">
            <Text
              color={isAdmin ? "cyan.500" : "white"}
              fontWeight="semibold"
              ml="1"
            >
              {isAdmin ? "Admin" : username}
            </Text>
            {isAdmin && (
              <Box mt="1">
                <Wrench size={14} />
              </Box>
            )}
            <Text fontSize="xs" color="coolGray.400">
              {getTimes(date)}
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
