import React, { useEffect, useRef, useState } from "react";
import CardGradient from "../../../atoms/CardGradient";
import {
  Center,
  Divider,
  HStack,
  Image,
  Text,
  View,
  VStack,
  ArrowUpIcon,
  Button
} from "native-base";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native";
import { useRefresh } from "../../../../utils/hooks/useRefresh";
import useIDNLiveStore from "../../../../store/idnLiveStore";
import { RefreshIcon } from "../../../../assets/icon";
import Loading from "../../../atoms/Loading";
import useThemeStore from "../../../../store/themeStore";

const ChatIDN = () => {
  const { profile, url, setGifts } = useIDNLiveStore();
  const { refreshing, onRefresh } = useRefresh();
  const { mode: theme } = useThemeStore();
  const [messages, setMessages] = useState([]);
  const [bufferMessages, setBufferMessages] = useState([]);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const isAutoScrollRef = useRef(true);
  const flashListRef = useRef(null);
  const wsRef = useRef(null);

  const generateRandomUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  const generateRandomUsername = () => {
    const uuid = generateRandomUUID();
    const timestamp = Date.now();
    return `idn-${uuid}-${timestamp}`;
  };

  const nickname = generateRandomUsername();

  const getTextColor = (userColorCode, theme) => {
    if (theme === "light") {
      return "white";
    }

    if (userColorCode === "#ED2227" || userColorCode === null) {
      return "primary";
    }

    return userColorCode;
  };

  const setupWebSocket = async () => {
    try {
      const id = profile?.chat_room_id;

      const ws = new WebSocket(`wss://chat.idn.app`);
      wsRef.current = ws;

      let registered = false;
      let joined = false;

      ws.onopen = () => {
        console.log("WebSocket connected");
        ws.send(`NICK ${nickname}`);
        ws.send(`USER ${nickname} 0 * null`);
      };

      ws.onmessage = (event) => {
        const rawMessage = event.data;

        if (rawMessage.startsWith("PING")) {
          ws.send("PONG" + rawMessage.substring(4));
          return;
        }

        if (rawMessage.includes("001") && !registered) {
          registered = true;
          console.log("Connected, joining channel...");
          ws.send(`JOIN #${id}`);
          return;
        }

        if (rawMessage.includes("JOIN") && !joined) {
          joined = true;
          console.log("Joined channel, waiting for messages...\n");
          return;
        }

        if (rawMessage.includes("PRIVMSG")) {
          const jsonMatch = rawMessage.match(/PRIVMSG #[^ ]+ :(.*)/);
          if (jsonMatch) {
            try {
              const data = JSON.parse(jsonMatch[1]);

              if (data?.gift) {
                setGifts(data);
              }

              if (data?.chat) {
                const mappedMessage = {
                  user: data?.user,
                  comment: data?.chat?.message,
                  timestamp: data.timestamp || Date.now()
                };

                if (isAutoScrollRef.current) {
                  setMessages((prevMessages) => {
                    if (
                      prevMessages.some(
                        (msg) =>
                          msg.user?.username === data?.user?.username &&
                          msg.comment === data?.chat?.message
                      )
                    ) {
                      return prevMessages; // Skip adding duplicate message
                    }
                    return [mappedMessage, ...prevMessages];
                  });
                } else {
                  setBufferMessages((prevBuffer) => {
                    if (
                      prevBuffer.some(
                        (msg) =>
                          msg.user?.username === data?.user?.username &&
                          msg.comment === data?.chat?.message
                      )
                    ) {
                      return prevBuffer;
                    }
                    return [mappedMessage, ...prevBuffer];
                  });
                }
              }
            } catch (error) {
              console.error("Failed to parse message:", error);
            }
          }
        }
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        wsRef.current = null;
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Failed to set up WebSocket:", error);
    }
  };

  useEffect(() => {
    setupWebSocket();

    if (wsRef.current) {
      wsRef.current.close();
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [profile, refreshing]);

  useEffect(() => {
    setGifts([]);
  }, [profile]);

  const handleShowNewMessages = () => {
    if (bufferMessages.length > 0) {
      setMessages((prev) => [...bufferMessages, ...prev]);
      setBufferMessages([]);
    }
    flashListRef.current?.scrollToOffset({ offset: 0, animated: true });
    setIsAutoScroll(true);
    isAutoScrollRef.current = true;
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY < 20) {
      if (!isAutoScrollRef.current) {
        setIsAutoScroll(true);
        isAutoScrollRef.current = true;
        if (bufferMessages.length > 0) {
          setMessages((prev) => [...bufferMessages, ...prev]);
          setBufferMessages([]);
        }
      }
    } else {
      if (isAutoScrollRef.current) {
        setIsAutoScroll(false);
        isAutoScrollRef.current = false;
      }
    }
  };

  return (
    <CardGradient>
      <FlashList
        ref={flashListRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        data={messages?.length > 0 ? messages?.slice(0, 45) : []}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={50}
        renderItem={({ item, index }) => (
          <>
            <HStack alignItems="center" space={1} flexWrap="wrap">
              <Image
                borderRadius="lg"
                alt={item?.user?.name}
                style={{ width: 45, height: 45 }}
                source={{ uri: item?.user?.avatar_url }}
              />
              <View flex={1} pt={index === 0 ? "0" : "2"} p="2">
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color={getTextColor(item?.user?.color_code, theme)}
                  flexShrink={1}
                  flexWrap="wrap"
                >
                  {item?.user?.name ?? "User"}
                </Text>
                <Text mt="0.5" flexShrink={1} flexWrap="wrap">
                  {item?.comment}
                </Text>
              </View>
            </HStack>
            <Divider mb="1" />
          </>
        )}
        ListEmptyComponent={() =>
          !url ? (
            <Center p="10">
              <Loading color="white" />
            </Center>
          ) : !profile?.chat_room_id ? (
            <Center p="10">
              <VStack
                flex={1}
                space={4}
                justifyContent="center"
                alignItems="center"
              >
                <RefreshIcon size={24} />
                <Text textAlign="center" fontSize="sm">
                  Klik icon refresh jika live chat tidak muncul
                </Text>
              </VStack>
            </Center>
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {bufferMessages.length > 0 && (
        <Button
          position="absolute"
          top="3"
          alignSelf="center"
          bg="blue.500"
          borderRadius="full"
          px="5"
          py="1"
          onPress={handleShowNewMessages}
          _pressed={{ opacity: 0.8 }}
          zIndex={10}
        >
          <HStack alignItems="center" space="2">
            <ArrowUpIcon color="white" />
            <Text color="white" fontWeight="semibold">
              {bufferMessages.length} new comments
            </Text>
          </HStack>
        </Button>
      )}
    </CardGradient>
  );
};

export default ChatIDN;
