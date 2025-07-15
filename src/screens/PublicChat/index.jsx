import React, { useLayoutEffect, useState, useRef } from "react";
import {
  Alert,
  Box,
  Center,
  CircleIcon,
  CloseIcon,
  HStack,
  IconButton,
  Pressable,
  ScrollView,
  Text,
  VStack
} from "native-base";
import { RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ChatBubble from "./components/ChatBubble";
import InputMessage from "./components/InputMessage";
import { formatViews } from "../../utils/helpers";
import { useRefresh } from "../../utils/hooks/useRefresh";
import {
  useChatList,
  useOnlineUsers
} from "../../services/hooks/usePublicChat";
import useUser from "../../utils/hooks/useUser";
import Loading from "../../components/atoms/Loading";

const PublicChat = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const { user } = useUser();
  const isAdmin = user?.user_id === "4751328";

  const { data, refetch } = useOnlineUsers();
  const {
    data: chatList,
    isLoading,
    refetch: refetchChat
  } = useChatList({
    room_id: "532815",
    last_chat_id: 0
  });
  const { refreshing, onRefresh } = useRefresh();
  const [isClose, setIsClose] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Public Chat",
      headerRight: () => (
        <HStack space={2} alignItems="center">
          <CircleIcon size="xs" color="green.500" />
          <Text>{formatViews(data?.onlineUsers)} Online</Text>
        </HStack>
      )
    });
  }, [data]);

  const handleRefresh = () => {
    onRefresh();
    refetch();
    refetchChat();
  };

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
                    Selamat datang di Public Chat! Disini kalian bisa saling
                    diskusi mengenai apapun tentang JKT48 yaa!
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
          contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: false })
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
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
                  Today
                </Text>
              </Box>
            </Center>
            {chatList?.length > 0 ? (
              chatList?.map((item, idx) => (
                <ChatBubble
                  key={idx}
                  userId={item?.user_id}
                  avatar={item?.avatar}
                  date={item?.date}
                  username={item?.username}
                  message={item?.message}
                  isCanDelete={isAdmin}
                  chatId={item?.chat_id}
                />
              ))
            ) : isLoading ? (
              <Box
                mt="70"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Loading size={40} color="white" />
              </Box>
            ) : null}
          </VStack>
        </ScrollView>
      </Box>

      {user ? (
        <InputMessage />
      ) : (
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Box display="flex" alignItems="center" bg="coolGray.700" p="4">
            <Text>Silakan Login untuk mengirim pesan ke public chat</Text>
          </Box>
        </Pressable>
      )}
    </>
  );
};

export default PublicChat;
