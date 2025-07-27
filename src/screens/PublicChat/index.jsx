import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
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
import { RefreshControl, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ChatBubble from "./components/ChatBubble";
import InputMessage from "./components/InputMessage";
import { formatChatDate, formatViews } from "../../utils/helpers";
import { useRefresh } from "../../utils/hooks/useRefresh";
import {
  useChatList,
  useOnlineUsers,
  useRoomInfo
} from "../../services/hooks/usePublicChat";
import useUser from "../../utils/hooks/useUser";
import Loading from "../../components/atoms/Loading";
import moment from "moment";

const PublicChat = () => {
  const { user } = useUser();
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const isAdmin = user?.user_id === "4751328";

  const [lastChatId, setLastChatId] = useState(0);
  const [allLoadedChats, setAllLoadedChats] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, refetch } = useOnlineUsers();
  const { data: roomInfo } = useRoomInfo({
    room_key: "d2e834751328"
  });
  const {
    data: chatList,
    isLoading,
    refetch: refetchChat
  } = useChatList({
    room_id: "532815",
    last_chat_id: lastChatId
  });
  
  const { refreshing, onRefresh } = useRefresh();
  const [isClose, setIsClose] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const allChat = [
    ...(Array.isArray(allLoadedChats) ? allLoadedChats : []),
    ...messages
  ];

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

  // get realtime chat
  const newSocket = new WebSocket("wss://online.showroom-live.com/");

  newSocket.addEventListener("open", () => {
    newSocket.send(`SUB\t${roomInfo?.bcsvr_key}`);
  });

  useEffect(() => {
    newSocket.addEventListener("message", (event) => {
      const message = event.data;
      const chat = JSON.parse(message.split("\t")[2]);

      if (chat?.t === 202) {
        setIsDelete(!isDelete);
      }

      const newChat = {
        chat_id: chat.id,
        username: chat.n,
        date: chat.ts,
        message: chat.s,
        avatar: chat.i,
        user_id: chat.u
      };

      if (chat?.s?.length > 1) {
        setMessages((prevState) => {
          if (
            prevState?.some(
              (data) => data?.username === chat?.n && data?.message === chat?.s
            )
          ) {
            return prevState;
          }
          if (Array.isArray(prevState) && chat?.t === 200) {
            return [...prevState, newChat];
          } else {
            return [newChat];
          }
        });
      }
    });
  }, [roomInfo, messages, isDelete]);

  useEffect(() => {
    refetchChat();
    setMessages([]);
  }, [isDelete]);

  useEffect(() => {
    if (lastChatId === 0 && chatList && chatList.length > 0) {
      setAllLoadedChats(chatList);
    }
  }, [chatList, lastChatId]);

  useEffect(() => {
    if (isLoadingMore) {
      setIsLoadingMore(true);
    }
  }, [allLoadedChats]);

  const handleLoadNewChat = () => {
    if (chatList && chatList.length > 0) {
      const firstChatId = chatList[0]?.chat_id;
      if (firstChatId && firstChatId !== lastChatId) {
        setLastChatId(firstChatId);
        setIsLoadingMore(true);
        setAllLoadedChats((prevChats) => {
          const newChats = chatList.filter(
            (chat) => !prevChats.some((prev) => prev.chat_id === chat.chat_id)
          );
          return [...newChats, ...prevChats];
        });
      }
    }
  };

  useEffect(() => {
    const keyboardListener = Keyboard.addListener('keyboardDidShow', () => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    });
    return () => keyboardListener.remove();
  }, []);

  return (
    <>
      <Box flex="1" bg="secondary">
        {!isClose && roomInfo && (
          <Box pt="1" p="3" pb="0">
            <Alert borderRadius={8} w="100%" bg="#0EA5E9" mb="2">
              <VStack space={2} w="100%">
                <HStack
                  space={1}
                  alignItems="flex-start"
                  justifyContent="space-between"
                >
                  <HStack space={2} flexShrink={1}>
                    <Text fontWeight="500" fontSize="13" color="white">
                      {roomInfo?.community_description}
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
          </Box>
        )}

        <ScrollView
          p="3"
          px="0"
          ref={scrollViewRef}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}
          onContentSizeChange={() => {
            if (!isLoadingMore) {
              scrollViewRef.current?.scrollToEnd({ animated: false });
            }
          }}
          onScroll={({ nativeEvent }) => {
            if (nativeEvent.contentOffset.y <= 10) {
              handleLoadNewChat();
            }
          }}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {isLoading && isLoadingMore && (
            <Box
              mb="1"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Loading size={30} color="white" />
            </Box>
          )}
          <VStack p="3" pb="8" space={4}>
            {allChat?.length > 0 &&
              (() => {
                let lastDate = null;
                return allChat.map((item, idx) => {
                  const chatDate = moment.unix(item?.date).format("YYYY-MM-DD");
                  const showDateBadge = chatDate !== lastDate;
                  lastDate = chatDate;

                  return (
                    <React.Fragment key={idx}>
                      {showDateBadge && (
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
                            <Text
                              fontWeight="medium"
                              fontSize="xs"
                              color="gray.300"
                            >
                              {formatChatDate(item?.date)}
                            </Text>
                          </Box>
                        </Center>
                      )}
                      <ChatBubble
                        userId={item?.user_id}
                        avatar={item?.avatar}
                        date={item?.date}
                        username={item?.username}
                        message={item?.message}
                        isCanDelete={isAdmin}
                        chatId={item?.chat_id}
                      />
                    </React.Fragment>
                  );
                });
              })()}
          </VStack>
          {isLoading && !isLoadingMore && (
            <Box
              display="flex"
              flexGrow={1}
              alignItems="center"
              justifyContent="center"
            >
              <Loading size={40} color="white" />
            </Box>
          )}
        </ScrollView>
      </Box>

      {user ? (
        <InputMessage setIsLoadingMore={setIsLoadingMore} />
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
