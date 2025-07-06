import React, { useLayoutEffect, useState, useRef } from "react";
import {
  Alert,
  Box,
  Center,
  CircleIcon,
  CloseIcon,
  HStack,
  IconButton,
  ScrollView,
  Text,
  VStack
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import ChatBubble from "./components/ChatBubble";
import SenderChat from "./components/SenderChat";
import InputMessage from "./components/InputMessage";

const PublicChat = () => {
  const navigation = useNavigation();
  const [isClose, setIsClose] = useState(false);
  const scrollViewRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Public Chat",
      headerRight: () => (
        <HStack space={2} alignItems="center">
          <CircleIcon size="xs" color="green.500" />
          <Text>427 Online</Text>
        </HStack>
      )
    });
  }, []);

  return (
    <>
      <Box flex="1" bg="secondary" p="3">
        {!isClose && (
          <Alert borderRadius={8} w="100%" bg="#0EA5E9" mb="2">
            <VStack space={2} w="100%">
              <HStack
                space={1}
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <HStack space={2} flexShrink={1}>
                  <Text fontWeight="500" fontSize="13" color="white">
                    Selamat datang di Public Chat JKT48 Showroom Fanmade! Disini
                    kalian bisa saling diskusi mengenai apapun tentang JKT48
                    yaa!
                  </Text>
                </HStack>
                <IconButton
                  variant="unstyled"
                  _focus={{
                    borderWidth: 0
                  }}
                  icon={<CloseIcon size="4" />}
                  _icon={{
                    color: "coolGray.300"
                  }}
                  onPress={() => setIsClose(true)}
                />
              </HStack>
            </VStack>
          </Alert>
        )}

        <ScrollView
          mt="2"
          ref={scrollViewRef}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: false })
          }
        >
          <VStack space={4}>
            <Center>
              <Box
                p="2"
                py="1"
                display="flex"
                borderRadius="md"
                justifyContent="center"
                alignItems="center"
                bg="coolGray.500"
              >
                <Text fontWeight="medium" fontSize="xs" color="gray.300">
                  Yesterday
                </Text>
              </Box>
            </Center>
            <ChatBubble
              avatar="https://static.showroom-live.com/image/avatar/37.png?v=108"
              username="Indah"
              message="Hello World"
            />
            <ChatBubble
              avatar="https://static.showroom-live.com/image/avatar/1.png?v=108"
              username="Lowly"
              message="Admin datanggg"
            />
            <ChatBubble
              avatar="https://static.showroom-live.com/image/avatar/1042177.png?v=108"
              username="Jhon Doe"
              message="The quick brown fox over the lazy dog."
            />
            <ChatBubble
              avatar="https://static.showroom-live.com/image/avatar/1042617.png?v=108"
              username="Belthazar"
              message="Apaan nih"
            />
            <Center>
              <Box
                p="2"
                py="1"
                display="flex"
                borderRadius="md"
                justifyContent="center"
                alignItems="center"
                bg="coolGray.500"
              >
                <Text fontWeight="medium" fontSize="xs" color="gray.300">
                  Today
                </Text>
              </Box>
            </Center>
            <ChatBubble
              avatar="https://static.showroom-live.com/image/avatar/20.png?v=108"
              username="Sheanlyy"
              message="Halo guys, apa kabar?"
            />
            <SenderChat
              username="Admin"
              message="Welcome to Public Chat JKT48 Showroom Fanmade"
            />

            <ChatBubble
              avatar="https://static.showroom-live.com/image/avatar/2.png?v=108"
              username="Indah"
              message="Haloo"
            />
            <ChatBubble username="Inzoid" message="Jangan spamm ya guys" />
            <ChatBubble
              isAdmin
              message="Iyaa ges"
            />
          </VStack>
        </ScrollView>
      </Box>

      <InputMessage />
    </>
  );
};

export default PublicChat;
